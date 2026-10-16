import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { track } from '@vercel/analytics';
import SEO, { breadcrumb } from '../../components/SEO';
import ShareSection from '../../components/ShareSection';
import quizData from '../../data/learnerDriverQuiz.json';
import resultsData from '../../data/learnerDriverResults.json';

/* ==========================================================================
   WHAT KIND OF LEARNER DRIVER ARE YOU?
   A fun, on-brand, three-section quiz (Defensive Driving · Executive Function
   · Sensory Style) that produces one blended driver type plus a three-part
   breakdown. All copy and scoring live in the JSON under src/data, so editing
   the JSON changes the quiz with no code edits.
   ========================================================================== */

const { meta, sections, questions } = quizData;
const { types, sectionBands, sensoryStyles, cta, disclaimer } = resultsData;

const TOTAL = questions.length;

// Section accent colours (fun labels -> brand hues). Used only for decorative
// borders/markers so text contrast always comes from the theme tokens.
const SECTION_ACCENT = { dd: '#344982', ef: '#2f6f9e', sensory: '#ab5c95' };

// Scoring priorities (see spec §6). argmax walks these in order and keeps the
// first key holding the max, so earlier entries win ties.
const TYPE_PRIORITY = ['SCOUT', 'PLAN', 'SENSOR', 'SPARK', 'CRUISE', 'ROOKIE'];
const STYLE_PRIORITY = ['Sensitive', 'Seeker', 'LowKey', 'Steady'];

function argmax(counts, priority) {
  let best = priority[0];
  let bestVal = -Infinity;
  for (const key of priority) {
    if ((counts[key] || 0) > bestVal) {
      bestVal = counts[key] || 0;
      best = key;
    }
  }
  return best;
}

// Deterministic scoring. Returns the full result payload described in spec §6.
function computeResult(answers) {
  const tally = { SCOUT: 0, PLAN: 0, CRUISE: 0, SPARK: 0, SENSOR: 0, ROOKIE: 0 };
  const styleTally = { Seeker: 0, Sensitive: 0, Steady: 0, LowKey: 0 };
  let ddPoints = 0;
  let efPoints = 0;

  questions.forEach((q) => {
    const optId = answers[q.id];
    if (optId == null) return;
    const opt = q.options.find((o) => o.id === optId);
    if (!opt) return;
    tally[opt.type] += 1;
    if (opt.sectionPoints != null) {
      if (q.section === 'dd') ddPoints += opt.sectionPoints;
      else if (q.section === 'ef') efPoints += opt.sectionPoints;
    }
    if (opt.sensoryStyle) styleTally[opt.sensoryStyle] += 1;
  });

  const ddBand = ddPoints >= 11 ? 'Road-Ready' : ddPoints >= 6 ? 'Getting There' : 'Keen Beginner';
  const efBand = efPoints >= 11 ? 'Sharp & Steady' : efPoints >= 6 ? 'Building Focus' : 'Keen Beginner';
  const sensoryStyle = argmax(styleTally, STYLE_PRIORITY);

  let type = argmax(tally, TYPE_PRIORITY);
  // Encouraging override: a brand-new driver on both pillars is a Rookie.
  if (ddBand === 'Keen Beginner' && efBand === 'Keen Beginner') type = 'ROOKIE';

  return { type, ddBand, efBand, sensoryStyle, scores: { tally, ddPoints, efPoints, styleTally } };
}

// Analytics is optional; never let a missing/blocked tool break the quiz.
function fireEvent(name, data) {
  try {
    track(name, data);
  } catch (e) {
    /* analytics unavailable: no-op */
  }
}

const STORE_KEY = 'ldq-progress';
function loadProgress() {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.index === 'number' && parsed.answers) return parsed;
  } catch (e) {
    /* storage unavailable */
  }
  return null;
}
function saveProgress(index, answers) {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify({ index, answers }));
  } catch (e) {
    /* storage unavailable: degrade gracefully */
  }
}
function clearProgress() {
  try {
    sessionStorage.removeItem(STORE_KEY);
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

/* --- Accessible answer group: radiogroup with arrow / number-key support --- */
function AnswerGroup({ question, legendId, selected, onSelect }) {
  const btnRefs = useRef([]);
  const initial = Math.max(0, question.options.findIndex((o) => o.id === selected));
  const [focusIdx, setFocusIdx] = useState(initial);

  const focusOption = (i) => {
    setFocusIdx(i);
    btnRefs.current[i]?.focus();
  };

  const onKeyDown = (e) => {
    const n = question.options.length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const ni = (focusIdx + 1) % n;
      focusOption(ni);
      onSelect(question.options[ni].id, false);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const ni = (focusIdx - 1 + n) % n;
      focusOption(ni);
      onSelect(question.options[ni].id, false);
    } else if (/^[1-9]$/.test(e.key)) {
      const i = parseInt(e.key, 10) - 1;
      if (i < n) {
        e.preventDefault();
        focusOption(i);
        onSelect(question.options[i].id, false);
      }
    }
  };

  return (
    <div className="ldq-options" role="radiogroup" aria-labelledby={legendId} onKeyDown={onKeyDown}>
      {question.options.map((o, i) => {
        const isSel = selected === o.id;
        return (
          <button
            key={o.id}
            ref={(el) => (btnRefs.current[i] = el)}
            type="button"
            role="radio"
            aria-checked={isSel}
            tabIndex={focusIdx === i ? 0 : -1}
            className={`ldq-option${isSel ? ' is-selected' : ''}`}
            onClick={() => onSelect(o.id, true)}
            onFocus={() => setFocusIdx(i)}
          >
            <span className="ldq-option__key" aria-hidden="true">{i + 1}</span>
            <span className="ldq-option__text">{o.text}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function LearnerDriverQuiz() {
  const [searchParams] = useSearchParams();
  const reduceMotion = usePrefersReducedMotion();

  const [screen, setScreen] = useState('intro'); // intro | question | interstitial | calculating | result
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [pendingIndex, setPendingIndex] = useState(null); // question to show after an interstitial
  const [result, setResult] = useState(null);
  const [isSharedView, setIsSharedView] = useState(false);

  const advanceTimer = useRef(null);
  const clearAdvance = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  // Mount: honour a shared ?result=TYPE deep link, else restore saved progress.
  useEffect(() => {
    const rParam = (searchParams.get('result') || '').toUpperCase();
    if (rParam && types[rParam]) {
      setResult({ type: rParam, ddBand: null, efBand: null, sensoryStyle: null, scores: null });
      setIsSharedView(true);
      setScreen('result');
      return;
    }
    const saved = loadProgress();
    if (saved && Object.keys(saved.answers).length > 0) {
      setAnswers(saved.answers);
      setIndex(Math.min(saved.index, TOTAL - 1));
      setScreen('question');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist progress while the user is working through the questions.
  useEffect(() => {
    if (isSharedView) return;
    if (screen === 'question' || screen === 'interstitial') saveProgress(index, answers);
  }, [screen, index, answers, isSharedView]);

  useEffect(() => () => clearAdvance(), []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion]);

  const finish = useCallback(
    (finalAnswers) => {
      const res = computeResult(finalAnswers);
      setResult(res);
      clearProgress();
      fireEvent('quiz_complete', {
        resultType: res.type,
        ddBand: res.ddBand,
        efBand: res.efBand,
        sensoryStyle: res.sensoryStyle,
      });
      if (reduceMotion) {
        setScreen('result');
        scrollTop();
      } else {
        setScreen('calculating');
        scrollTop();
        setTimeout(() => setScreen('result'), 1300);
      }
    },
    [reduceMotion, scrollTop]
  );

  const advanceFrom = useCallback(
    (fromIndex, snapshot) => {
      clearAdvance();
      if (fromIndex >= TOTAL - 1) {
        finish(snapshot);
        return;
      }
      const nextIndex = fromIndex + 1;
      const curSection = questions[fromIndex].section;
      const nextSection = questions[nextIndex].section;
      if (nextSection !== curSection) {
        fireEvent('quiz_section_complete', { id: curSection });
        setPendingIndex(nextIndex);
        setScreen('interstitial');
        scrollTop();
      } else {
        setIndex(nextIndex);
        scrollTop();
      }
    },
    [finish, scrollTop]
  );

  // Select an option. `advance` distinguishes a committed choice (pointer tap,
  // Enter/Space, Next) from a keyboard highlight (arrow / number keys).
  const handleSelect = useCallback(
    (optId, advance) => {
      const q = questions[index];
      const next = { ...answers, [q.id]: optId };
      setAnswers(next);
      fireEvent('quiz_question_answered', { qid: q.id, optionId: optId });
      if (advance) {
        clearAdvance();
        advanceTimer.current = setTimeout(() => advanceFrom(index, next), reduceMotion ? 120 : 260);
      }
    },
    [answers, index, advanceFrom, reduceMotion]
  );

  const handleBack = () => {
    if (index === 0) return;
    clearAdvance();
    setIndex(index - 1);
    setScreen('question');
    scrollTop();
  };

  const handleContinueInterstitial = () => {
    if (pendingIndex == null) return;
    setIndex(pendingIndex);
    setPendingIndex(null);
    setScreen('question');
    scrollTop();
  };

  const startQuiz = () => {
    clearProgress();
    setAnswers({});
    setIndex(0);
    setResult(null);
    setScreen('question');
    fireEvent('quiz_start', {});
    scrollTop();
  };

  const handleRetake = () => {
    clearAdvance();
    clearProgress();
    setAnswers({});
    setIndex(0);
    setResult(null);
    setIsSharedView(false);
    setPendingIndex(null);
    setScreen('intro');
    fireEvent('quiz_retake', {});
    scrollTop();
  };

  const takeItYourself = () => {
    setIsSharedView(false);
    startQuiz();
  };

  // Interstitials auto-advance (skipped for reduced motion, which shows the
  // Continue button instead).
  useEffect(() => {
    if (screen !== 'interstitial' || reduceMotion) return undefined;
    const t = setTimeout(() => {
      setIndex((prev) => (pendingIndex != null ? pendingIndex : prev));
      setPendingIndex(null);
      setScreen('question');
    }, 1400);
    return () => clearTimeout(t);
  }, [screen, pendingIndex, reduceMotion]);

  return (
    <>
      <SEO
        title={`${meta.title} | Estus Health`}
        description="A fun, neuroaffirming quiz for learner drivers. Three quick sections reveal your driver type, your Road Radar and focus, and your sensory style, plus tips to grow."
        path="/resources/learner-driver-quiz" schema={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Free Resources', path: '/resources' }, { name: 'Learner Driver Style Quiz', path: '/resources/learner-driver-quiz' }])}
      />
      <style>{STYLES}</style>

      <div className="ldq">
        {screen === 'intro' && <IntroScreen onStart={startQuiz} />}

        {screen === 'question' && (
          <QuestionScreen
            index={index}
            answers={answers}
            onSelect={handleSelect}
            onBack={handleBack}
            onNext={() => advanceFrom(index, answers)}
          />
        )}

        {screen === 'interstitial' && pendingIndex != null && (
          <SectionInterstitial section={questions[pendingIndex].section} onContinue={handleContinueInterstitial} reduceMotion={reduceMotion} />
        )}

        {screen === 'calculating' && <CalculatingScreen />}

        {screen === 'result' && result && (
          <ResultScreen result={result} isSharedView={isSharedView} onRetake={handleRetake} onTakeItYourself={takeItYourself} />
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ Intro */
function IntroScreen({ onStart }) {
  return (
    <section className="ldq-panel ldq-intro">
      <div className="ldq-wrap">
        <span className="eyebrow eyebrow--mauve">Quiz · ~3 min</span>
        <div className="ldq-intro__emoji" aria-hidden="true">🚗</div>
        <h1 className="ldq-intro__title">{meta.title}</h1>
        <p className="ldq-intro__hook">{meta.hook}</p>
        <p className="ldq-intro__meta">
          {meta.lengthLabel} · {meta.audience}
        </p>

        <ul className="ldq-intro__sections" aria-label="What this quiz covers">
          {sections.map((s) => (
            <li key={s.id} style={{ borderTopColor: SECTION_ACCENT[s.id] }}>
              <span className="ldq-intro__sec-emoji" aria-hidden="true">{s.emoji}</span>
              <span className="ldq-intro__sec-label">{s.label}</span>
              <span className="ldq-intro__sec-blurb">{s.blurb}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="btn btn--big" onClick={onStart}>
          Start the quiz ▸
        </button>

        <p className="ldq-disclaimer ldq-disclaimer--intro">{disclaimer}</p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Question */
function QuestionScreen({ index, answers, onSelect, onBack, onNext }) {
  const q = questions[index];
  const section = sections.find((s) => s.id === q.section);
  const sectionIdx = sections.findIndex((s) => s.id === q.section);
  const selected = answers[q.id];
  const progress = Math.round(((index + 1) / TOTAL) * 100);
  const legendId = `${q.id}-legend`;

  return (
    <section className="ldq-panel ldq-question" key={q.id}>
      <div className="ldq-wrap ldq-wrap--narrow">
        {/* Progress header */}
        <div className="ldq-progress-head">
          <div className="ldq-progress-meta">
            <span className="ldq-section-label" style={{ color: SECTION_ACCENT[q.section] }}>
              Section {sectionIdx + 1} of {sections.length} · {section.label}
            </span>
            <span className="ldq-counter">
              {index + 1} / {TOTAL}
            </span>
          </div>
          <div className="ldq-progress-track" role="presentation">
            <div className="ldq-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="ldq-sr-only" aria-live="polite">
            Question {index + 1} of {TOTAL}, Section {sectionIdx + 1}: {section.label}
          </p>
        </div>

        <fieldset className="ldq-fieldset">
          <legend id={legendId} className="ldq-question__text">
            {q.text}
          </legend>
          <AnswerGroup question={q} legendId={legendId} selected={selected} onSelect={onSelect} />
        </fieldset>

        <div className="ldq-nav">
          <button type="button" className="ldq-back" onClick={onBack} disabled={index === 0}>
            ← Back
          </button>
          {selected != null && (
            <button type="button" className="btn" onClick={onNext}>
              {index === TOTAL - 1 ? 'See my result ▸' : 'Next ▸'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Interstitial */
function SectionInterstitial({ section, onContinue, reduceMotion }) {
  const s = sections.find((sec) => sec.id === section);
  const idx = sections.findIndex((sec) => sec.id === section);
  return (
    <section className="ldq-panel ldq-interstitial" aria-live="polite">
      <div className="ldq-wrap ldq-wrap--narrow" style={{ textAlign: 'center' }}>
        <div className="ldq-interstitial__emoji" aria-hidden="true">{s.emoji}</div>
        <p className="ldq-interstitial__eyebrow" style={{ color: SECTION_ACCENT[section] }}>
          Section {idx + 1} of {sections.length}
        </p>
        <h2 className="ldq-interstitial__title">{s.label}</h2>
        <p className="ldq-interstitial__blurb">{s.blurb}</p>
        {reduceMotion && (
          <button type="button" className="btn" onClick={onContinue}>
            Continue ▸
          </button>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Calculating */
function CalculatingScreen() {
  return (
    <section className="ldq-panel ldq-calc" aria-live="polite">
      <div className="ldq-wrap ldq-wrap--narrow" style={{ textAlign: 'center' }}>
        <div className="ldq-calc__ring" aria-hidden="true" />
        <p className="ldq-calc__label">Reading the road…</p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Result */
function ResultScreen({ result, isSharedView, onRetake, onTakeItYourself }) {
  const type = types[result.type];
  const ddNote = result.ddBand ? sectionBands.dd[result.ddBand] : null;
  const efNote = result.efBand ? sectionBands.ef[result.efBand] : null;
  const style = result.sensoryStyle ? sensoryStyles[result.sensoryStyle] : null;

  const shareCaption = `I got ${type.name} ${type.emoji} on the "${meta.title}" quiz from Estus Health. ${type.tagline} Find your driver type: #LearnerDriver #Neuroaffirming #EstusHealth`;

  const breakdown = [
    style && { key: 'dd', label: sectionBands.dd.label, value: result.ddBand, note: ddNote },
    style && { key: 'ef', label: sectionBands.ef.label, value: result.efBand, note: efNote },
    style && { key: 'sensory', label: 'Sensory Style', value: style.label, note: style.note },
  ].filter(Boolean);

  const isInternal = cta.buttonHref && cta.buttonHref.startsWith('/');

  return (
    <>
      {isSharedView && (
        <div className="ldq-shared-banner">
          <span>You're viewing a shared result. Take the quiz yourself to find your driver type.</span>
          <button type="button" className="btn" onClick={onTakeItYourself}>
            Take the quiz ▸
          </button>
        </div>
      )}

      {/* Hero band */}
      <section className="ldq-result-hero">
        <div className="ldq-wrap ldq-wrap--narrow">
          <p className="ldq-result-hero__eyebrow">Your driver type</p>
          <div className="ldq-result-hero__emoji" aria-hidden="true">{type.emoji}</div>
          <h1 className="ldq-result-hero__name">{type.name}</h1>
          <p className="ldq-result-hero__tagline">{type.tagline}</p>
        </div>
      </section>

      {/* You in a nutshell */}
      <section className="ldq-panel">
        <div className="ldq-wrap ldq-wrap--narrow">
          <div className="ldq-nutshell">
            <h2 className="ldq-h2">You in a nutshell</h2>
            <p>{type.blurb}</p>
          </div>

          {/* Breakdown chips (only for a live result, not a shared link) */}
          {breakdown.length > 0 && (
            <div className="ldq-breakdown">
              <h2 className="ldq-h2">Your breakdown</h2>
              <div className="ldq-breakdown__grid">
                {breakdown.map((b) => (
                  <div className="ldq-chip" key={b.key} style={{ borderTopColor: SECTION_ACCENT[b.key] }}>
                    <span className="ldq-chip__label">{b.label}</span>
                    <span className="ldq-chip__value">{b.value}</span>
                    <span className="ldq-chip__note">{b.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Superpowers */}
          <div className="ldq-cols">
            <div className="ldq-card">
              <h2 className="ldq-h2">Your superpowers</h2>
              <ul className="ldq-list ldq-list--super">
                {type.superpowers.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="ldq-card">
              <h2 className="ldq-h2">Your growth road</h2>
              <ul className="ldq-list ldq-list--grow">
                {type.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA card */}
      <section className="ldq-cta-band">
        <div className="ldq-wrap ldq-wrap--narrow">
          <div className="ldq-cta-box">
            <h2 className="ldq-cta-box__head">{cta.headline}</h2>
            <p className="ldq-cta-box__body">{cta.body}</p>
            {isInternal ? (
              <Link className="btn btn--big" to={cta.buttonHref} onClick={() => fireEvent('quiz_cta_click', { resultType: result.type })}>
                {cta.buttonLabel}
              </Link>
            ) : (
              <a
                className="btn btn--big"
                href={cta.buttonHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fireEvent('quiz_cta_click', { resultType: result.type })}
              >
                {cta.buttonLabel}
              </a>
            )}
            <p className="ldq-disclaimer">{disclaimer}</p>
          </div>
        </div>
      </section>

      {/* Share */}
      <section className="ldq-panel ldq-share-wrap">
        <div className="ldq-wrap ldq-wrap--narrow">
          <ShareSection
            quizName={meta.title}
            quizSlug="learner-driver-quiz"
            archetypeName={type.name}
            archetypeSlug={result.type}
            archetypeEmoji={type.emoji}
            archetypeSubtitle={type.tagline}
            shareCaption={shareCaption}
          />
        </div>
      </section>

      {/* Retake */}
      <section className="ldq-retake">
        <button type="button" className="ldq-retake__btn" onClick={onRetake}>
          Retake the quiz
        </button>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ Styles */
const STYLES = `
.ldq { --dd:#344982; --ef:#2f6f9e; --sensory:#ab5c95;
  --ldq-grad: linear-gradient(120deg,#344982 0%,#2f6f9e 45%,#ab5c95 100%); }
.ldq .ldq-wrap { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
.ldq .ldq-wrap--narrow { max-width: 720px; }
.ldq .ldq-panel { padding: 56px 0; }
.ldq .ldq-sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0; }

/* Entrance animation (respecting reduced motion) */
@keyframes ldqIn { from { opacity:0; transform: translateY(14px); } to { opacity:1; transform:none; } }
.ldq .ldq-question, .ldq .ldq-interstitial, .ldq .ldq-intro { animation: ldqIn .4s ease both; }
@media (prefers-reduced-motion: reduce) { .ldq * { animation: none !important; transition: none !important; } }

/* Intro */
.ldq .ldq-intro { text-align:center; padding-top: 64px; }
.ldq .ldq-intro .eyebrow { margin-bottom: 22px; }
.ldq .ldq-intro__emoji { font-size: 4rem; line-height:1; margin: 14px 0 10px; }
.ldq .ldq-intro__title { font-family: var(--f-display); text-transform: uppercase; color: var(--heading);
  font-size: clamp(2rem, 5.5vw, 3.4rem); letter-spacing:-1px; line-height:1.05; margin: 0 auto 14px; max-width: 14ch; }
.ldq .ldq-intro__hook { font-size: 1.2rem; font-weight:600; color: var(--text); max-width: 34ch; margin: 0 auto 8px; }
.ldq .ldq-intro__meta { font-family: var(--f-display); font-size:.72rem; letter-spacing:.5px; text-transform:uppercase; color: var(--text-soft); margin: 0 auto 30px; }
.ldq .ldq-intro__sections { list-style:none; padding:0; margin: 0 auto 34px; display:grid; grid-template-columns: repeat(3,1fr); gap:16px; max-width:760px; text-align:left; }
.ldq .ldq-intro__sections li { background: var(--surface); border: 3px solid var(--line); border-top-width:6px; border-radius: 16px; padding: 18px; box-shadow: 5px 5px 0 var(--shadow-col); }
.ldq .ldq-intro__sec-emoji { font-size: 1.8rem; display:block; margin-bottom: 8px; }
.ldq .ldq-intro__sec-label { display:block; font-family: var(--f-head); text-transform:uppercase; color: var(--heading); font-size:1rem; margin-bottom: 6px; }
.ldq .ldq-intro__sec-blurb { display:block; font-size:.9rem; color: var(--text-soft); line-height:1.5; }

/* Progress header */
.ldq .ldq-progress-head { margin-bottom: 28px; }
.ldq .ldq-progress-meta { display:flex; justify-content:space-between; align-items:baseline; gap:12px; margin-bottom: 10px; }
.ldq .ldq-section-label { font-family: var(--f-display); font-size:.72rem; letter-spacing:.4px; text-transform:uppercase; }
.ldq .ldq-counter { font-family: var(--f-display); font-size:.8rem; color: var(--text-soft); flex:none; }
.ldq .ldq-progress-track { height: 10px; border-radius: 999px; background: var(--surface-2); border: 2px solid var(--line); overflow:hidden; }
.ldq .ldq-progress-fill { height:100%; border-radius:999px; background: var(--ldq-grad); transition: width .35s ease; }

/* Question */
.ldq .ldq-fieldset { border:0; padding:0; margin: 0 0 8px; }
.ldq .ldq-question__text { font-family: var(--f-head); color: var(--heading); font-size: clamp(1.3rem, 3.5vw, 1.75rem); line-height:1.25; padding:0; margin: 0 0 22px; }
.ldq .ldq-options { display:flex; flex-direction:column; gap: 12px; }
.ldq .ldq-option { display:flex; align-items:center; gap: 14px; width:100%; text-align:left; cursor:pointer;
  background: var(--surface); border: 3px solid var(--line); border-radius: 14px; padding: 16px 18px;
  font-family: var(--f-body); font-size: 1rem; color: var(--text); line-height:1.45; min-height: 44px;
  box-shadow: 4px 4px 0 var(--shadow-col); transition: transform .12s ease, box-shadow .12s ease, background .12s ease, border-color .12s ease; }
.ldq .ldq-option:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--shadow-col); }
.ldq .ldq-option.is-selected { border-color: var(--teal); background: color-mix(in srgb, var(--teal) 12%, var(--surface)); }
.ldq .ldq-option:focus-visible { outline: 3px solid var(--mauve); outline-offset: 3px; }
.ldq .ldq-option__key { flex:none; width: 28px; height: 28px; border-radius: 8px; display:grid; place-items:center;
  font-family: var(--f-display); font-size:.8rem; color: var(--btn-text); background: var(--navy); border: 2px solid var(--line); }
.ldq .ldq-option.is-selected .ldq-option__key { background: var(--teal); color: var(--btn-text); }
.ldq .ldq-option__text { flex:1; }

.ldq .ldq-nav { display:flex; justify-content:space-between; align-items:center; gap: 14px; margin-top: 26px; }
.ldq .ldq-back { background: transparent; border: 3px solid var(--line); color: var(--text); border-radius: 999px;
  font-family: var(--f-display); text-transform:uppercase; font-size:.8rem; letter-spacing:.4px; padding: 12px 20px; cursor:pointer;
  transition: background .12s ease, color .12s ease; }
.ldq .ldq-back:hover:not(:disabled) { background: var(--surface-2); }
.ldq .ldq-back:disabled { opacity:.4; cursor:not-allowed; }

/* Interstitial */
.ldq .ldq-interstitial { padding: 84px 0; }
.ldq .ldq-interstitial__emoji { font-size: 4.5rem; line-height:1; margin-bottom: 14px; }
.ldq .ldq-interstitial__eyebrow { font-family: var(--f-display); text-transform:uppercase; font-size:.75rem; letter-spacing:.5px; margin: 0 0 8px; }
.ldq .ldq-interstitial__title { font-family: var(--f-display); text-transform:uppercase; color: var(--heading); font-size: clamp(1.8rem, 5vw, 3rem); letter-spacing:-1px; margin: 0 0 12px; }
.ldq .ldq-interstitial__blurb { font-size: 1.1rem; color: var(--text-soft); max-width: 34ch; margin: 0 auto 26px; }

/* Calculating */
.ldq .ldq-calc { padding: 110px 0; }
.ldq .ldq-calc__ring { width: 58px; height: 58px; margin: 0 auto 22px; border-radius: 50%;
  border: 6px solid var(--surface-2); border-top-color: var(--teal); animation: ldqSpin 1s linear infinite; }
@keyframes ldqSpin { to { transform: rotate(360deg); } }
.ldq .ldq-calc__label { font-family: var(--f-display); text-transform:uppercase; letter-spacing:.5px; color: var(--heading); font-size: 1.1rem; }

/* Shared-view banner */
.ldq .ldq-shared-banner { display:flex; flex-wrap:wrap; gap: 14px; align-items:center; justify-content:center;
  background: var(--surface-2); border-bottom: 3px solid var(--line); padding: 14px 24px; text-align:center; font-size:.92rem; color: var(--text); }
.ldq .ldq-shared-banner .btn { padding: 10px 18px; font-size:.72rem; }

/* Result hero */
.ldq .ldq-result-hero { background: var(--ldq-grad); border-top: 3px solid var(--navy); border-bottom: 3px solid var(--navy);
  padding: 64px 0; text-align:center; }
.ldq .ldq-result-hero__eyebrow { font-family: var(--f-display); text-transform:uppercase; letter-spacing:.15em; font-size:.72rem; color:#fff; opacity:.75; margin: 0 0 14px; }
.ldq .ldq-result-hero__emoji { font-size: 76px; line-height:1; margin-bottom: 12px; }
.ldq .ldq-result-hero__name { font-family: var(--f-display); text-transform:uppercase; color:#fff; font-size: clamp(2.2rem, 6.5vw, 4rem); letter-spacing:-1px; line-height:1.05; margin: 0 0 10px; text-shadow: 0 2px 8px rgba(0,0,0,.28); }
.ldq .ldq-result-hero__tagline { font-family: var(--f-head); font-style:italic; color:#fff; opacity:.92; font-size: 1.2rem; margin:0; }

/* Result body */
.ldq .ldq-h2 { font-family: var(--f-display); text-transform:uppercase; color: var(--heading); font-size: 1.25rem; letter-spacing:.02em; margin: 0 0 14px; }
.ldq .ldq-nutshell { background: var(--surface); border: 3px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 26px; margin-bottom: 30px; }
.ldq .ldq-nutshell p { color: var(--text-soft); font-size: 1.08rem; line-height:1.7; margin:0; }

.ldq .ldq-breakdown { margin-bottom: 30px; }
.ldq .ldq-breakdown__grid { display:grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
.ldq .ldq-chip { background: var(--surface); border: 3px solid var(--line); border-top-width: 6px; border-radius: 16px; padding: 18px; box-shadow: 5px 5px 0 var(--shadow-col); display:flex; flex-direction:column; gap: 6px; }
.ldq .ldq-chip__label { font-family: var(--f-display); text-transform:uppercase; font-size:.66rem; letter-spacing:.5px; color: var(--text-soft); }
.ldq .ldq-chip__value { font-family: var(--f-head); text-transform:uppercase; color: var(--heading); font-size: 1.05rem; line-height:1.15; }
.ldq .ldq-chip__note { font-size:.88rem; color: var(--text-soft); line-height:1.5; }

.ldq .ldq-cols { display:grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.ldq .ldq-card { background: var(--surface); border: 3px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); padding: 26px; }
.ldq .ldq-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap: 12px; }
.ldq .ldq-list li { position:relative; padding-left: 30px; color: var(--text-soft); font-size:.98rem; line-height:1.55; }
.ldq .ldq-list--super li::before { content:"★"; position:absolute; left:0; top:0; color: var(--teal); }
.ldq .ldq-list--grow li::before { content:"→"; position:absolute; left:0; top:0; color: var(--mauve); font-weight:700; }

/* CTA */
.ldq .ldq-cta-band { background: linear-gradient(135deg, var(--teal), var(--mauve)); border-top: 3px solid var(--navy); border-bottom: 3px solid var(--navy); padding: 56px 0; }
.ldq .ldq-cta-box { background: var(--surface); border: 4px solid var(--line); border-radius: 26px; box-shadow: 12px 12px 0 var(--shadow-col); padding: 40px 32px; text-align:center; }
.ldq .ldq-cta-box__head { font-family: var(--f-display); text-transform:uppercase; color: var(--heading); font-size: clamp(1.5rem, 4vw, 2.2rem); letter-spacing:-.5px; margin: 0 0 12px; }
.ldq .ldq-cta-box__body { color: var(--text-soft); font-size: 1.05rem; line-height:1.6; max-width: 48ch; margin: 0 auto 24px; }
.ldq .ldq-disclaimer { font-size:.82rem; color: var(--text-soft); line-height:1.55; max-width: 60ch; margin: 22px auto 0; }
.ldq .ldq-disclaimer--intro { margin-top: 30px; }

/* Share + retake */
.ldq .ldq-share-wrap { padding-top: 20px; padding-bottom: 8px; }
.ldq .ldq-retake { text-align:center; padding: 8px 0 56px; }
.ldq .ldq-retake__btn { background:none; border:none; color: var(--text-soft); cursor:pointer; font-family: var(--f-body); font-size:.95rem; text-decoration: underline; }
.ldq .ldq-retake__btn:hover { color: var(--mauve); }

@media (max-width: 720px) {
  .ldq .ldq-intro__sections { grid-template-columns: 1fr; }
  .ldq .ldq-breakdown__grid { grid-template-columns: 1fr; }
  .ldq .ldq-cols { grid-template-columns: 1fr; }
}
`;
