import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';
import SEO, { breadcrumb } from '../../components/SEO';
import SensoryProfileReport from '../../components/SensoryProfileReport';
import { computeProfile, bandLabel, profileContent } from '../../lib/sensoryProfile';
import quiz from '../../data/sensoryProfile.json';

/* ==========================================================================
   THE ESTUS SENSORY PROFILE
   A free, neuroaffirming sensory self-discovery tool (kids + teen/adult) with
   a strengths-first on-screen result and a branded, keepable PDF export.

   The quiz UI lives in the site's neon design system; the PDF (see
   SensoryProfileReport) is rendered in the clinical "Estus report style".
   Question bank, scoring, and result copy are all data-driven (src/data).
   ========================================================================== */

const { items, sections, responseScales, contexts, comfortSettings, versions, respondentModes } = quiz;
const ITEMS_BY_ID = Object.fromEntries(items.map((it) => [it.id, it]));

const STORE_KEY = 'esp-progress-v1';
const COMFORT_KEY = 'esp-comfort-v1';

/* ---- tiny utilities ------------------------------------------------------ */
function fireEvent(name, data) {
  try {
    track(name, data);
  } catch (e) {
    /* analytics unavailable: no-op */
  }
}
function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function writeJSON(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    /* storage unavailable: degrade gracefully */
  }
}
function clearKey(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    /* no-op */
  }
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduce(mq.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);
  return reduce;
}

function formatDate(d) {
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function versionLabelFor(version, respondentMode) {
  if (version === 'adult') return 'Teens & adults · self-report';
  if (respondentMode === 'caregiver') return 'Kids · parent / carer report';
  if (respondentMode === 'together') return 'Kids · answered together';
  return 'Kids';
}

/* ---- Comfort settings ---------------------------------------------------- */
function ComfortBar({ comfort, setComfort, open, setOpen }) {
  return (
    <div className={`esp-comfort${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="esp-comfort__toggle"
        aria-expanded={open}
        aria-controls="esp-comfort-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">⚙</span> Comfort
      </button>
      {open && (
        <div className="esp-comfort__panel" id="esp-comfort-panel" role="group" aria-label="Comfort settings">
          {comfortSettings.map((c) => (
            <label className="esp-comfort__row" key={c.id}>
              <input
                type="checkbox"
                checked={!!comfort[c.id]}
                onChange={(e) => setComfort({ ...comfort, [c.id]: e.target.checked })}
              />
              <span>
                <span className="esp-comfort__label">{c.label}</span>
                <span className="esp-comfort__hint">{c.hint}</span>
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Answer group (accessible radiogroup, arrow + number keys) ----------- */
function AnswerGroup({ item, wordingKey, scale, selected, onSelect }) {
  const options = responseScales[scale];
  const varies = responseScales.varies;
  const all = [...options, varies];
  const btnRefs = useRef([]);
  const legendId = `esp-legend-${item.id}`;
  const selectedIdx = all.findIndex((o) => String(o.value) === String(selected) || (o.id === 'varies' && selected === 'varies'));
  const [focusIdx, setFocusIdx] = useState(selectedIdx >= 0 ? selectedIdx : 0);
  const isChild = scale === 'child';

  const focusOption = (i) => {
    setFocusIdx(i);
    btnRefs.current[i]?.focus();
  };
  const valueOf = (o) => (o.id === 'varies' ? 'varies' : o.value);

  const onKeyDown = (e) => {
    const n = all.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = (focusIdx + 1) % n;
      focusOption(ni);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = (focusIdx - 1 + n) % n;
      focusOption(ni);
    }
  };

  return (
    <fieldset className="esp-item">
      <legend id={legendId} className={`esp-item__text${isChild ? ' esp-item__text--child' : ''}`}>
        {item.wordings[wordingKey]}
      </legend>
      <div
        className={`esp-options${isChild ? ' esp-options--child' : ''}`}
        role="radiogroup"
        aria-labelledby={legendId}
        onKeyDown={onKeyDown}
      >
        {all.map((o, i) => {
          const val = valueOf(o);
          const isSel = String(selected) === String(val);
          const isVaries = o.id === 'varies';
          return (
            <button
              key={o.id}
              ref={(el) => (btnRefs.current[i] = el)}
              type="button"
              role="radio"
              aria-checked={isSel}
              tabIndex={focusIdx === i ? 0 : -1}
              className={`esp-opt${isVaries ? ' esp-opt--varies' : ''}${isChild ? ' esp-opt--child' : ''}${isSel ? ' is-selected' : ''}`}
              onClick={() => onSelect(item.id, isSel ? undefined : val)}
              onFocus={() => setFocusIdx(i)}
            >
              {isChild && !isVaries && (
                <span className="esp-opt__emoji" aria-hidden="true">
                  {o.emoji}
                </span>
              )}
              <span className="esp-opt__label">{o.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ---- Screens ------------------------------------------------------------- */
function Landing({ onChoose }) {
  return (
    <div className="esp-landing">
      <section className="esp-hero">
        <span className="eyebrow eyebrow--teal">Free sensory self-discovery</span>
        <h1 className="esp-hero__title">{quiz.meta.title}</h1>
        <p className="esp-hero__promise">{quiz.meta.promise}</p>
        <ul className="esp-chips" aria-label="What you get">
          {quiz.meta.trustChips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="esp-versions" aria-label="Choose a version">
        {['adult', 'kids'].map((key) => {
          const v = versions[key];
          return (
            <button type="button" className="esp-version-card" key={key} onClick={() => onChoose(key)}>
              <span className="esp-version-card__emoji" aria-hidden="true">
                {v.emoji}
              </span>
              <span className="esp-version-card__label">{v.label}</span>
              <span className="esp-version-card__age">Ages {v.ageLabel}</span>
              <span className="esp-version-card__blurb">{v.blurb}</span>
              <span className="esp-version-card__go">Start ▸</span>
            </button>
          );
        })}
      </section>

      <section className="esp-about">
        <div className="esp-about__col">
          <h2 className="esp-about__head">What this is</h2>
          <ul>
            {quiz.whatItIs.is.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="esp-about__col esp-about__col--not">
          <h2 className="esp-about__head">What it isn't</h2>
          <ul>
            {quiz.whatItIs.isNot.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <p className="esp-privacy">
        Your answers stay on your device until you choose to export them. Nothing is sent to a server.{' '}
        <Link to="/services/occupational-therapy">See how Estus can help ▸</Link>
      </p>
    </div>
  );
}

function RespondentMode({ onChoose, onBack }) {
  return (
    <section className="esp-panel esp-choose">
      <button type="button" className="esp-back" onClick={onBack}>
        ← Back
      </button>
      <h1 className="esp-choose__title">Who's answering?</h1>
      <p className="esp-choose__sub">Pick whichever feels right. You can switch later.</p>
      <div className="esp-mode-cards">
        {['caregiver', 'together'].map((key) => {
          const m = respondentModes[key];
          return (
            <button type="button" className="esp-mode-card" key={key} onClick={() => onChoose(key)}>
              <span className="esp-mode-card__emoji" aria-hidden="true">
                {m.emoji}
              </span>
              <span className="esp-mode-card__label">{m.label}</span>
              <span className="esp-mode-card__blurb">{m.blurb}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Setup({ version, setup, setSetup, onStart, onBack }) {
  const ageBands = versions[version].ageBands;
  const canStart = !!setup.ageBand;
  const toggleContext = (id) => {
    const next = setup.contexts.includes(id)
      ? setup.contexts.filter((c) => c !== id)
      : [...setup.contexts, id];
    setSetup({ ...setup, contexts: next });
  };
  return (
    <section className="esp-panel esp-setup">
      <button type="button" className="esp-back" onClick={onBack}>
        ← Back
      </button>
      <h1 className="esp-choose__title">A few optional details</h1>
      <p className="esp-choose__sub">These only tune the wording and personalise your PDF. Skip anything you like.</p>

      <label className="esp-field">
        <span className="esp-field__label">First name <span className="esp-field__opt">optional</span></span>
        <input
          type="text"
          className="esp-input"
          value={setup.name}
          maxLength={40}
          placeholder={version === 'kids' ? "Child's first name" : 'Your first name'}
          onChange={(e) => setSetup({ ...setup, name: e.target.value })}
        />
        <span className="esp-field__hint">Used only to personalise your results, e.g. “Ari's Sensory Profile”.</span>
      </label>

      <fieldset className="esp-field">
        <legend className="esp-field__label">Age band <span className="esp-field__req">needed</span></legend>
        <div className="esp-pills">
          {ageBands.map((b) => (
            <button
              type="button"
              key={b.id}
              className={`esp-pill${setup.ageBand === b.id ? ' is-active' : ''}`}
              aria-pressed={setup.ageBand === b.id}
              onClick={() => setSetup({ ...setup, ageBand: b.id })}
            >
              {b.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="esp-field">
        <legend className="esp-field__label">
          Answering mostly about <span className="esp-field__opt">optional</span>
        </legend>
        <div className="esp-pills">
          {contexts.map((c) => (
            <button
              type="button"
              key={c.id}
              className={`esp-pill${setup.contexts.includes(c.id) ? ' is-active' : ''}`}
              aria-pressed={setup.contexts.includes(c.id)}
              onClick={() => toggleContext(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="esp-setup__foot">
        <button type="button" className="btn btn--big" disabled={!canStart} onClick={onStart}>
          Start the questions ▸
        </button>
        {!canStart && <span className="esp-field__hint">Pick an age band to begin.</span>}
        <p className="esp-field__hint">
          About 5 to 8 minutes. No timers. Take any breaks you need; your progress saves as you go.
        </p>
      </div>
    </section>
  );
}

function SectionScreen({ sectionIdx, wordingKey, scale, answers, onSelect, onBack, onNext }) {
  const section = sections[sectionIdx];
  const sectionItems = section.itemIds.map((id) => ITEMS_BY_ID[id]);
  const answeredInSection = section.itemIds.filter((id) => answers[id] !== undefined).length;
  const isLast = sectionIdx === sections.length - 1;

  return (
    <section className="esp-panel esp-section" key={section.id}>
      <div className="esp-progress">
        <div className="esp-progress__meta">
          <span className="esp-progress__label">
            Section {sectionIdx + 1} of {sections.length}
          </span>
          <span className="esp-progress__count">
            {answeredInSection} / {sectionItems.length} answered
          </span>
        </div>
        <div className="esp-progress__segs" role="presentation">
          {sections.map((s, i) => (
            <span key={s.id} className={`esp-seg${i < sectionIdx ? ' is-done' : ''}${i === sectionIdx ? ' is-current' : ''}`} />
          ))}
        </div>
      </div>

      <h1 className="esp-section__title">{section.title}</h1>
      <p className="esp-section__micro">{section.micro}</p>

      <div className="esp-items">
        {sectionItems.map((it) => (
          <AnswerGroup
            key={it.id}
            item={it}
            wordingKey={wordingKey}
            scale={scale}
            selected={answers[it.id]}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="esp-nav">
        <button type="button" className="esp-back" onClick={onBack}>
          ← Back
        </button>
        <button type="button" className="btn" onClick={onNext}>
          {isLast ? 'See my profile ▸' : 'Next section ▸'}
        </button>
      </div>
      <p className="esp-section__skipnote">Every question is optional. Skip anything that doesn't fit.</p>
    </section>
  );
}

function ScaleCard({ scale }) {
  const c = profileContent.scales[scale.code];
  const band = scale.band;
  return (
    <div className="esp-scale-card" style={{ '--sc': c.colour }}>
      <div className="esp-scale-card__head">
        <h3 className="esp-scale-card__name">{c.name}</h3>
        <span className="esp-scale-card__band">{bandLabel(band)}</span>
      </div>
      <p className="esp-scale-card__tag">{c.tagline}</p>
      {band ? (
        <>
          <p className="esp-scale-card__lead">{c.lead[band]}</p>
          <p className="esp-scale-card__adv">
            <strong>What it gives you:</strong> {c.advantage}
          </p>
          <ul className="esp-scale-card__strats">
            {c.strategies[band].map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="esp-scale-card__lead esp-soft">Not enough answers in this area to describe a pattern yet.</p>
      )}
    </div>
  );
}

function Results({ profile, version, respondentMode, setup, onRetake }) {
  const observer = profile.voice === 'observer';
  const heading = profile.name
    ? `${profile.name}'s sensory profile`
    : observer
      ? 'This sensory profile'
      : 'Your sensory profile';
  const dateLabel = useMemo(() => formatDate(new Date()), []);
  const versionLabel = versionLabelFor(version, respondentMode);

  const handleDownload = () => {
    fireEvent('sensory_export_pdf', { version, respondentMode: respondentMode || 'self' });
    window.print();
  };

  return (
    <>
      {/* Hero */}
      <section className="esp-result-hero">
        <span className="eyebrow eyebrow--teal">Your results</span>
        <h1 className="esp-result-hero__name">{heading}</h1>
        <p className="esp-result-hero__summary">{profile.summary}</p>
      </section>

      {/* Strengths */}
      <section className="esp-panel">
        <div className="esp-block">
          <h2 className="esp-h2">Sensory joys &amp; strengths</h2>
          <p className="esp-block__lead">{profileContent.strengths.intro}</p>
          <div className="esp-strengths">
            {profile.strengths.map((s) => (
              <div className="esp-strength" key={s.id}>
                <span className="esp-strength__star" aria-hidden="true">
                  ★
                </span>
                <div>
                  <div className="esp-strength__title">{s.title}</div>
                  <p className="esp-strength__line">{s.line}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern cards */}
        <div className="esp-block">
          <h2 className="esp-h2">Your six sensory patterns</h2>
          <div className="esp-scale-grid">
            {profile.scaleList.map((s) => (
              <ScaleCard key={s.code} scale={s} />
            ))}
          </div>
        </div>

        {/* Domain map */}
        <div className="esp-block">
          <h2 className="esp-h2">{profileContent.domainMap.title}</h2>
          <div className="esp-domainmap">
            {profile.domains.map((d) => (
              <div className="esp-domain-row" key={d.key}>
                <span className="esp-domain-label">{d.label}</span>
                <span className="esp-domain-track">
                  <span className="esp-domain-fill" style={{ width: `${Math.round(d.fill * 100)}%`, background: d.colour }} />
                </span>
              </div>
            ))}
          </div>
          <p className="esp-note">
            {observer
              ? profileContent.domainMap.observerNote.replace(/\{Name\}/g, profile.name || 'your child')
              : profileContent.domainMap.note}
          </p>
        </div>
      </section>

      {/* Export bar */}
      <section className="esp-export">
        <div className="esp-export__inner">
          <div>
            <h2 className="esp-export__head">Take your profile with you</h2>
            <p className="esp-export__sub">
              A polished PDF report in the Estus clinical style, covering strengths, patterns, strategies, and a
              clinician appendix. It's yours to keep, share, or bring to an appointment.
            </p>
          </div>
          <div className="esp-export__btns">
            <button type="button" className="btn btn--big" onClick={handleDownload}>
              ⬇ Download PDF
            </button>
            <button type="button" className="esp-textbtn" onClick={onRetake}>
              Start again
            </button>
          </div>
          <p className="esp-export__hint">
            “Download PDF” opens your browser's print dialog. Choose <strong>Save as PDF</strong> as the destination.
          </p>
        </div>
      </section>

      {/* What next / CTA */}
      <section className="esp-cta-band">
        <div className="esp-cta-box">
          <h2>{profileContent.cta.headline}</h2>
          <p>{profileContent.cta.body}</p>
          <Link className="btn btn--big" to={profileContent.cta.buttonHref} onClick={() => fireEvent('sensory_cta_click', { version })}>
            {profileContent.cta.buttonLabel}
          </Link>
          <p className="esp-disclaimer">{profileContent.disclaimer}</p>
        </div>
      </section>

      {/* Print-only report (portaled to body) */}
      <SensoryProfileReport
        profile={profile}
        versionLabel={versionLabel}
        contexts={setup.contexts}
        dateLabel={dateLabel}
      />
    </>
  );
}

function Calculating() {
  return (
    <section className="esp-panel esp-calc" aria-live="polite">
      <div className="esp-calc__ring" aria-hidden="true" />
      <p className="esp-calc__label">Mapping your sensory world…</p>
    </section>
  );
}

/* ---- Root ---------------------------------------------------------------- */
export default function SensoryProfileQuiz() {
  const prefersReduced = usePrefersReducedMotion();

  const [screen, setScreen] = useState('landing'); // landing|mode|setup|section|calculating|result
  const [version, setVersion] = useState(null); // adult|kids
  const [respondentMode, setRespondentMode] = useState(null); // caregiver|together (kids only)
  const [setup, setSetup] = useState({ name: '', ageBand: '', contexts: [] });
  const [answers, setAnswers] = useState({});
  const [sectionIdx, setSectionIdx] = useState(0);
  const [profile, setProfile] = useState(null);
  const [comfort, setComfort] = useState({ reduceMotion: false, calmColour: false, largerText: false });
  const [comfortOpen, setComfortOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const reduceMotion = prefersReduced || comfort.reduceMotion;

  // Respondent code + response scale derive from version + mode.
  const respondent = version === 'adult' ? 'A' : respondentMode === 'together' ? 'K' : 'C';
  const wordingKey = respondent;
  const responseScaleId = respondent === 'K' ? 'child' : 'standard';

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion]);

  // Hydrate comfort + reduce-motion default from OS, then saved progress.
  useEffect(() => {
    const savedComfort = readJSON(COMFORT_KEY);
    if (savedComfort) setComfort((c) => ({ ...c, ...savedComfort }));
    else if (prefersReduced) setComfort((c) => ({ ...c, reduceMotion: true }));

    const saved = readJSON(STORE_KEY);
    if (saved && saved.version && saved.answers && Object.keys(saved.answers).length >= 0 && saved.screen === 'section') {
      setVersion(saved.version);
      setRespondentMode(saved.respondentMode || null);
      setSetup(saved.setup || { name: '', ageBand: '', contexts: [] });
      setAnswers(saved.answers || {});
      setSectionIdx(Math.min(saved.sectionIdx || 0, sections.length - 1));
      setScreen('section');
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist comfort + apply document-level reduce-motion (never on first paint).
  useEffect(() => {
    if (!hydrated) return;
    writeJSON(COMFORT_KEY, comfort);
  }, [comfort, hydrated]);

  // Persist quiz progress while answering.
  useEffect(() => {
    if (!hydrated) return;
    if (screen === 'section') {
      writeJSON(STORE_KEY, { version, respondentMode, setup, answers, sectionIdx, screen });
    }
  }, [screen, version, respondentMode, setup, answers, sectionIdx, hydrated]);

  const handleSelect = useCallback((itemId, value) => {
    setAnswers((prev) => {
      const next = { ...prev };
      if (value === undefined) delete next[itemId];
      else next[itemId] = value;
      return next;
    });
  }, []);

  const chooseVersion = (v) => {
    setVersion(v);
    fireEvent('sensory_start', { version: v });
    setScreen(v === 'kids' ? 'mode' : 'setup');
    scrollTop();
  };

  const chooseMode = (m) => {
    setRespondentMode(m);
    setScreen('setup');
    scrollTop();
  };

  const startQuestions = () => {
    setSectionIdx(0);
    setScreen('section');
    fireEvent('sensory_questions_start', { version });
    scrollTop();
  };

  const finish = useCallback(() => {
    const result = computeProfile(answers, { respondent, name: setup.name });
    setProfile(result);
    clearKey(STORE_KEY);
    fireEvent('sensory_complete', {
      version,
      respondentMode: respondentMode || 'self',
      answered: result.answeredTotal,
    });
    if (reduceMotion) {
      setScreen('result');
      scrollTop();
    } else {
      setScreen('calculating');
      scrollTop();
      setTimeout(() => {
        setScreen('result');
        scrollTop();
      }, 1200);
    }
  }, [answers, respondent, setup.name, version, respondentMode, reduceMotion, scrollTop]);

  const nextSection = () => {
    if (sectionIdx >= sections.length - 1) {
      finish();
      return;
    }
    fireEvent('sensory_section_complete', { section: sectionIdx + 1 });
    setSectionIdx((i) => i + 1);
    scrollTop();
  };

  const backFromSection = () => {
    if (sectionIdx === 0) {
      setScreen('setup');
      scrollTop();
      return;
    }
    setSectionIdx((i) => i - 1);
    scrollTop();
  };

  const backToLanding = () => {
    setScreen('landing');
    scrollTop();
  };
  const backFromSetup = () => {
    setScreen(version === 'kids' ? 'mode' : 'landing');
    scrollTop();
  };

  const retake = () => {
    clearKey(STORE_KEY);
    setAnswers({});
    setSectionIdx(0);
    setProfile(null);
    setVersion(null);
    setRespondentMode(null);
    setSetup({ name: '', ageBand: '', contexts: [] });
    setScreen('landing');
    fireEvent('sensory_retake', {});
    scrollTop();
  };

  const rootClass = [
    'esp',
    comfort.calmColour ? 'esp--calm' : '',
    comfort.largerText ? 'esp--large' : '',
    reduceMotion ? 'esp--reduce' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <SEO
        title={`${quiz.meta.title} | Estus Health`}
        description="A free, private, neuroaffirming sensory self-discovery tool for kids, teens, and adults. Map your sensory strengths and patterns in about 7 minutes and download a beautiful PDF report to keep."
        path="/resources/sensory-profile" schema={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Free Resources', path: '/resources' }, { name: 'Sensory Profile Quiz', path: '/resources/sensory-profile' }])}
      />
      <style>{STYLES}</style>

      <div className={rootClass}>
        <ComfortBar comfort={comfort} setComfort={setComfort} open={comfortOpen} setOpen={setComfortOpen} />

        <div className="esp-wrap">
          {screen === 'landing' && <Landing onChoose={chooseVersion} />}
          {screen === 'mode' && <RespondentMode onChoose={chooseMode} onBack={backToLanding} />}
          {screen === 'setup' && (
            <Setup version={version} setup={setup} setSetup={setSetup} onStart={startQuestions} onBack={backFromSetup} />
          )}
          {screen === 'section' && (
            <SectionScreen
              sectionIdx={sectionIdx}
              wordingKey={wordingKey}
              scale={responseScaleId}
              answers={answers}
              onSelect={handleSelect}
              onBack={backFromSection}
              onNext={nextSection}
            />
          )}
          {screen === 'calculating' && <Calculating />}
          {screen === 'result' && profile && (
            <Results
              profile={profile}
              version={version}
              respondentMode={respondentMode}
              setup={setup}
              onRetake={retake}
            />
          )}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ Styles */
const STYLES = `
.esp { --esp-grad: linear-gradient(90deg,#344982 0%,#2f6f9e 34%,#2ca5b8 66%,#ab5c95 100%); position: relative; }
.esp .esp-wrap { max-width: 860px; margin: 0 auto; padding: 40px 24px 80px; }
.esp.esp--large { font-size: 1.14em; }
.esp.esp--calm { filter: saturate(0.72); }
.esp.esp--reduce *, .esp.esp--reduce *::before, .esp.esp--reduce *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }

/* Comfort bar */
.esp .esp-comfort { position: fixed; top: 84px; right: 16px; z-index: 45; text-align: right; }
.esp .esp-comfort__toggle {
  font-family: var(--f-display); font-size: .68rem; text-transform: uppercase; letter-spacing: .4px;
  background: var(--surface); color: var(--text); border: 2px solid var(--line); border-radius: 999px;
  padding: 8px 14px; cursor: pointer; box-shadow: 3px 3px 0 var(--shadow-col);
}
.esp .esp-comfort__panel {
  margin-top: 8px; background: var(--surface); border: 3px solid var(--line); border-radius: 14px;
  box-shadow: 6px 6px 0 var(--shadow-col); padding: 12px; width: 250px; text-align: left;
}
.esp .esp-comfort__row { display: flex; gap: 10px; align-items: flex-start; padding: 8px 6px; cursor: pointer; }
.esp .esp-comfort__row input { margin-top: 3px; width: 18px; height: 18px; accent-color: var(--mauve); flex: none; }
.esp .esp-comfort__label { display: block; font-weight: 600; font-size: .9rem; color: var(--text); }
.esp .esp-comfort__hint { display: block; font-size: .76rem; color: var(--text-soft); line-height: 1.4; }

/* Shared */
.esp .esp-panel { animation: espIn .4s ease both; }
@keyframes espIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
.esp .esp-h2 { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: 1.2rem; letter-spacing: .02em; margin: 0 0 14px; }
.esp .esp-back {
  background: transparent; border: 2px solid var(--line); color: var(--text); border-radius: 999px;
  font-family: var(--f-display); text-transform: uppercase; font-size: .72rem; letter-spacing: .4px;
  padding: 10px 18px; cursor: pointer; margin-bottom: 18px;
}
.esp .esp-back:hover { background: var(--surface-2); }
.esp .esp-note { font-size: .84rem; color: var(--text-soft); line-height: 1.55; margin: 12px 0 0; }
.esp .esp-soft { color: var(--text-soft); }

/* Landing */
.esp .esp-hero { text-align: center; padding: 10px 0 26px; }
.esp .esp-hero__title { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: clamp(2.1rem, 6vw, 3.4rem); letter-spacing: -1px; line-height: 1.03; margin: 18px auto 14px; max-width: 16ch; }
.esp .esp-hero__promise { font-size: 1.18rem; font-weight: 600; color: var(--text); max-width: 40ch; margin: 0 auto; line-height: 1.5; }
.esp .esp-chips { list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; padding: 0; margin: 22px 0 0; }
.esp .esp-chips li { font-family: var(--f-display); font-size: .68rem; text-transform: uppercase; letter-spacing: .5px; color: var(--heading); background: var(--surface); border: 2px solid var(--line); border-radius: 999px; padding: 8px 15px; }

.esp .esp-versions { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 8px 0 44px; }
.esp .esp-version-card {
  display: flex; flex-direction: column; align-items: flex-start; gap: 6px; text-align: left; cursor: pointer;
  background: var(--surface); border: 3px solid var(--line); border-radius: 20px; padding: 26px 24px;
  box-shadow: 6px 6px 0 var(--shadow-col); transition: transform .14s ease, box-shadow .14s ease;
}
.esp .esp-version-card:hover { transform: translate(-3px,-3px); box-shadow: 10px 10px 0 var(--shadow-col); }
.esp .esp-version-card__emoji { font-size: 2.6rem; line-height: 1; }
.esp .esp-version-card__label { font-family: var(--f-head); text-transform: uppercase; color: var(--heading); font-size: 1.3rem; }
.esp .esp-version-card__age { font-family: var(--f-display); font-size: .68rem; text-transform: uppercase; letter-spacing: .5px; color: var(--mauve); }
.esp .esp-version-card__blurb { font-size: .95rem; color: var(--text-soft); line-height: 1.5; }
.esp .esp-version-card__go { margin-top: 8px; font-family: var(--f-display); text-transform: uppercase; font-size: .8rem; color: var(--teal); }

.esp .esp-about { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
.esp .esp-about__col { background: var(--surface); border: 3px solid var(--line); border-radius: 18px; padding: 22px 24px; box-shadow: 5px 5px 0 var(--shadow-col); }
.esp .esp-about__col--not { border-top: 6px solid var(--mauve); }
.esp .esp-about__col:first-child { border-top: 6px solid var(--teal); }
.esp .esp-about__head { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: 1rem; margin: 0 0 12px; }
.esp .esp-about__col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.esp .esp-about__col li { position: relative; padding-left: 22px; font-size: .92rem; color: var(--text-soft); line-height: 1.5; }
.esp .esp-about__col:first-child li::before { content: "✓"; position: absolute; left: 0; color: var(--teal); font-weight: 700; }
.esp .esp-about__col--not li::before { content: "—"; position: absolute; left: 0; color: var(--mauve); font-weight: 700; }
.esp .esp-privacy { text-align: center; font-size: .88rem; color: var(--text-soft); max-width: 52ch; margin: 0 auto; line-height: 1.55; }
.esp .esp-privacy a { color: var(--mauve); font-weight: 700; text-decoration: underline; }

/* Choose (mode) */
.esp .esp-choose__title { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: clamp(1.7rem, 5vw, 2.6rem); letter-spacing: -.5px; margin: 0 0 8px; }
.esp .esp-choose__sub { color: var(--text-soft); font-size: 1.05rem; margin: 0 0 26px; }
.esp .esp-mode-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.esp .esp-mode-card {
  display: flex; flex-direction: column; gap: 8px; text-align: left; cursor: pointer;
  background: var(--surface); border: 3px solid var(--line); border-radius: 18px; padding: 24px;
  box-shadow: 5px 5px 0 var(--shadow-col); transition: transform .14s ease, box-shadow .14s ease;
}
.esp .esp-mode-card:hover { transform: translate(-3px,-3px); box-shadow: 9px 9px 0 var(--shadow-col); }
.esp .esp-mode-card__emoji { font-size: 2rem; }
.esp .esp-mode-card__label { font-family: var(--f-head); text-transform: uppercase; color: var(--heading); font-size: 1.05rem; line-height: 1.2; }
.esp .esp-mode-card__blurb { font-size: .92rem; color: var(--text-soft); line-height: 1.5; }

/* Setup */
.esp .esp-field { border: 0; padding: 0; margin: 0 0 24px; display: block; }
.esp .esp-field__label { display: block; font-family: var(--f-display); text-transform: uppercase; font-size: .78rem; letter-spacing: .4px; color: var(--heading); margin-bottom: 10px; }
.esp .esp-field__opt, .esp .esp-field__req { font-family: var(--f-body); font-size: .7rem; text-transform: none; letter-spacing: 0; padding: 2px 8px; border-radius: 999px; margin-left: 6px; }
.esp .esp-field__opt { color: var(--text-soft); background: var(--surface-2); }
.esp .esp-field__req { color: var(--btn-text); background: var(--mauve); }
.esp .esp-field__hint { display: block; font-size: .82rem; color: var(--text-soft); margin-top: 8px; line-height: 1.5; }
.esp .esp-input { width: 100%; max-width: 360px; font-family: var(--f-body); font-size: 1rem; color: var(--text); background: var(--surface); border: 3px solid var(--line); border-radius: 12px; padding: 12px 14px; }
.esp .esp-input:focus-visible { outline: 3px solid var(--mauve); outline-offset: 2px; }
.esp .esp-pills { display: flex; flex-wrap: wrap; gap: 10px; }
.esp .esp-pill {
  font-family: var(--f-body); font-weight: 600; font-size: .92rem; color: var(--text); background: var(--surface);
  border: 2px solid var(--line); border-radius: 999px; padding: 10px 18px; cursor: pointer; min-height: 44px;
}
.esp .esp-pill:hover { border-color: var(--teal); }
.esp .esp-pill.is-active { background: var(--teal); color: var(--btn-text); border-color: var(--teal); }
.esp .esp-setup__foot { margin-top: 8px; }
.esp .esp-setup__foot .btn:disabled { opacity: .4; cursor: not-allowed; transform: none; box-shadow: 5px 5px 0 var(--shadow-col); }

/* Section / questions */
.esp .esp-progress { margin-bottom: 22px; }
.esp .esp-progress__meta { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
.esp .esp-progress__label { font-family: var(--f-display); text-transform: uppercase; font-size: .74rem; letter-spacing: .4px; color: var(--heading); }
.esp .esp-progress__count { font-family: var(--f-display); font-size: .74rem; color: var(--text-soft); }
.esp .esp-progress__segs { display: flex; gap: 6px; }
.esp .esp-seg { flex: 1; height: 8px; border-radius: 999px; background: var(--surface-2); border: 2px solid var(--line); }
.esp .esp-seg.is-done { background: var(--teal); border-color: var(--teal); }
.esp .esp-seg.is-current { background: var(--mauve); border-color: var(--mauve); }
.esp .esp-section__title { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: clamp(1.7rem, 5vw, 2.6rem); letter-spacing: -.5px; margin: 0 0 6px; }
.esp .esp-section__micro { color: var(--text-soft); font-size: 1.02rem; margin: 0 0 28px; }

.esp .esp-items { display: flex; flex-direction: column; gap: 22px; }
.esp .esp-item { border: 0; padding: 0; margin: 0; border-top: 3px solid var(--line); padding-top: 22px; }
.esp .esp-item:first-child { border-top: 0; padding-top: 0; }
.esp .esp-item__text { font-family: var(--f-head); color: var(--heading); font-size: 1.12rem; line-height: 1.35; padding: 0; margin: 0 0 16px; }
.esp .esp-item__text--child { font-size: 1.4rem; line-height: 1.3; }
.esp .esp-options { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.esp .esp-options--child { grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 460px; }
.esp .esp-opt {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; text-align: center;
  min-height: 60px; padding: 10px 8px; cursor: pointer; line-height: 1.25;
  background: var(--surface); border: 3px solid var(--line); border-radius: 14px; color: var(--text);
  font-family: var(--f-body); font-size: .84rem; font-weight: 600;
  box-shadow: 3px 3px 0 var(--shadow-col); transition: transform .1s ease, box-shadow .1s ease, background .1s ease, border-color .1s ease;
}
.esp .esp-opt:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--shadow-col); }
.esp .esp-opt.is-selected { background: color-mix(in srgb, var(--teal) 16%, var(--surface)); border-color: var(--teal); }
.esp .esp-opt:focus-visible { outline: 3px solid var(--mauve); outline-offset: 2px; }
.esp .esp-opt--child { min-height: 96px; font-size: 1.05rem; }
.esp .esp-opt__emoji { font-size: 2rem; line-height: 1; }
.esp .esp-opt--varies { grid-column: 1 / -1; flex-direction: row; min-height: 44px; font-weight: 500; font-size: .82rem; color: var(--text-soft); box-shadow: none; border-style: dashed; border-width: 2px; }
.esp .esp-opt--varies.is-selected { color: var(--text); }
.esp .esp-options--child .esp-opt--varies { grid-column: 1 / -1; }

.esp .esp-nav { display: flex; justify-content: space-between; align-items: center; gap: 14px; margin-top: 30px; }
.esp .esp-nav .esp-back { margin-bottom: 0; }
.esp .esp-section__skipnote { text-align: center; font-size: .8rem; color: var(--text-soft); margin: 14px 0 0; }

/* Calculating */
.esp .esp-calc { text-align: center; padding: 100px 0; }
.esp .esp-calc__ring { width: 54px; height: 54px; margin: 0 auto 20px; border-radius: 50%; border: 6px solid var(--surface-2); border-top-color: var(--teal); animation: espSpin 1s linear infinite; }
@keyframes espSpin { to { transform: rotate(360deg); } }
.esp .esp-calc__label { font-family: var(--f-display); text-transform: uppercase; letter-spacing: .5px; color: var(--heading); font-size: 1.05rem; }

/* Results */
.esp .esp-result-hero { text-align: center; padding: 14px 0 30px; }
.esp .esp-result-hero__name { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: clamp(1.9rem, 5.5vw, 3rem); letter-spacing: -.5px; line-height: 1.05; margin: 16px auto 16px; max-width: 18ch; }
.esp .esp-result-hero__summary { font-size: 1.14rem; color: var(--text); line-height: 1.7; max-width: 60ch; margin: 0 auto; }
.esp .esp-block { margin-bottom: 40px; }
.esp .esp-block__lead { color: var(--text-soft); margin: 0 0 18px; font-size: 1rem; }
.esp .esp-strengths { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.esp .esp-strength { display: flex; gap: 12px; background: var(--surface); border: 3px solid var(--line); border-radius: 16px; padding: 18px 20px; box-shadow: 4px 4px 0 var(--shadow-col); }
.esp .esp-strength__star { color: var(--teal); font-size: 1.1rem; flex: none; margin-top: 2px; }
.esp .esp-strength__title { font-family: var(--f-head); text-transform: uppercase; color: var(--heading); font-size: 1rem; margin-bottom: 6px; }
.esp .esp-strength__line { font-size: .92rem; color: var(--text-soft); line-height: 1.55; margin: 0; }

.esp .esp-scale-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.esp .esp-scale-card { background: var(--surface); border: 3px solid var(--line); border-top: 7px solid var(--sc); border-radius: 16px; padding: 22px; box-shadow: 5px 5px 0 var(--shadow-col); }
.esp .esp-scale-card__head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px; }
.esp .esp-scale-card__name { font-family: var(--f-head); text-transform: uppercase; color: var(--heading); font-size: 1.08rem; margin: 0; line-height: 1.15; }
.esp .esp-scale-card__band { align-self: flex-start; font-family: var(--f-display); font-size: .62rem; text-transform: uppercase; letter-spacing: .4px; color: var(--btn-text); background: var(--sc); border-radius: 999px; padding: 5px 11px; }
.esp .esp-scale-card__tag { font-size: .84rem; color: var(--text-soft); font-style: italic; margin: 0 0 12px; }
.esp .esp-scale-card__lead { font-size: .95rem; color: var(--text); line-height: 1.6; margin: 0 0 12px; }
.esp .esp-scale-card__adv { font-size: .9rem; color: var(--text-soft); line-height: 1.55; margin: 0 0 12px; }
.esp .esp-scale-card__adv strong { color: var(--sc); }
.esp .esp-scale-card__strats { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.esp .esp-scale-card__strats li { position: relative; padding-left: 22px; font-size: .9rem; color: var(--text-soft); line-height: 1.5; }
.esp .esp-scale-card__strats li::before { content: "→"; position: absolute; left: 0; color: var(--sc); font-weight: 700; }

.esp .esp-domainmap { display: flex; flex-direction: column; gap: 10px; }
.esp .esp-domain-row { display: flex; align-items: center; gap: 16px; }
.esp .esp-domain-label { flex: 0 0 128px; text-align: right; font-weight: 600; font-size: .9rem; color: var(--text); }
.esp .esp-domain-track { flex: 1; height: 16px; background: var(--surface-2); border: 2px solid var(--line); border-radius: 999px; overflow: hidden; }
.esp .esp-domain-fill { display: block; height: 100%; border-radius: 999px; min-width: 4px; }

/* Export */
.esp .esp-export { margin: 8px 0 40px; }
.esp .esp-export__inner { background: var(--surface); border: 3px solid var(--line); border-radius: 22px; box-shadow: 8px 8px 0 var(--shadow-col); padding: 30px 28px; }
.esp .esp-export__head { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: 1.3rem; margin: 0 0 8px; }
.esp .esp-export__sub { color: var(--text-soft); font-size: .96rem; line-height: 1.6; margin: 0 0 20px; max-width: 60ch; }
.esp .esp-export__btns { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
.esp .esp-textbtn { background: none; border: none; color: var(--text-soft); cursor: pointer; font-family: var(--f-body); font-size: .95rem; text-decoration: underline; }
.esp .esp-textbtn:hover { color: var(--mauve); }
.esp .esp-export__hint { font-size: .82rem; color: var(--text-soft); margin: 16px 0 0; }

/* CTA band */
.esp .esp-cta-band { background: var(--esp-grad); border-radius: 24px; padding: 6px; margin-bottom: 20px; }
.esp .esp-cta-box { background: var(--surface); border-radius: 20px; padding: 40px 32px; text-align: center; }
.esp .esp-cta-box h2 { font-family: var(--f-display); text-transform: uppercase; color: var(--heading); font-size: clamp(1.5rem, 4vw, 2.1rem); letter-spacing: -.5px; margin: 0 0 12px; }
.esp .esp-cta-box p { color: var(--text-soft); font-size: 1.02rem; line-height: 1.6; max-width: 52ch; margin: 0 auto 22px; }
.esp .esp-disclaimer { font-size: .82rem; color: var(--text-soft); line-height: 1.55; max-width: 62ch; margin: 22px auto 0; }

@media (max-width: 720px) {
  .esp .esp-versions, .esp .esp-about, .esp .esp-mode-cards, .esp .esp-strengths, .esp .esp-scale-grid { grid-template-columns: 1fr; }
  .esp .esp-options { grid-template-columns: 1fr 1fr; }
  .esp .esp-options--child { grid-template-columns: 1fr; }
  .esp .esp-opt--varies { grid-column: 1 / -1; }
  .esp .esp-comfort { top: auto; bottom: 76px; right: 12px; }
  .esp .esp-domain-label { flex-basis: 96px; }
}
`;
