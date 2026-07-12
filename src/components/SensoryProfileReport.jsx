import { createPortal } from 'react-dom';
import { profileContent, bandLabel } from '../lib/sensoryProfile';

/* ==========================================================================
   ESTUS SENSORY PROFILE — printable report ("Estus report style")

   A print-only A4 document rendered into <body> via a portal. It is hidden on
   screen (display:none) and revealed only inside @media print, where the live
   app (#root) is hidden. The visual language is the NEW Estus clinical brand —
   Oswald / Barlow, the four-band colour bar, warm-white paper, black footer
   band — deliberately distinct from the site's neon system.

   "Download PDF" simply calls window.print(); the browser's Save-as-PDF turns
   this into a shareable, keepable document. Nothing is sent anywhere.
   ========================================================================== */

const BAND_GRADIENT = 'linear-gradient(90deg,#344982 0%,#2f6f9e 34%,#2ca5b8 66%,#ab5c95 100%)';

function BandBar({ width = '44mm', height = '2.4mm', gap = '3px' }) {
  const seg = { flex: 1, height };
  return (
    <div style={{ display: 'flex', gap, width }} aria-hidden="true">
      <span style={{ ...seg, background: '#344982' }} />
      <span style={{ ...seg, background: '#2f6f9e' }} />
      <span style={{ ...seg, background: '#2ca5b8' }} />
      <span style={{ ...seg, background: '#ab5c95' }} />
    </div>
  );
}

function Wordmark({ colour = '#111', size = 28 }) {
  return (
    <div
      className="esr-wordmark"
      style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: size, lineHeight: 0.9, color: colour, whiteSpace: 'nowrap' }}
    >
      ESTUS <span style={{ fontWeight: 500, letterSpacing: '0.12em' }}>HEALTH</span>
    </div>
  );
}

function PageHeader({ subtitle }) {
  return (
    <header className="esr-head">
      <div>
        <BandBar />
        <Wordmark size={26} />
      </div>
      <div className="esr-head__meta">
        <div className="esr-head__title">Sensory Profile</div>
        {subtitle && <div className="esr-head__sub">{subtitle}</div>}
      </div>
    </header>
  );
}

function PageFooter({ page, total }) {
  return (
    <footer className="esr-foot">
      <span className="esr-foot__bar" aria-hidden="true">
        <span style={{ flex: 1, background: '#344982' }} />
        <span style={{ flex: 1, background: '#2f6f9e' }} />
        <span style={{ flex: 1, background: '#2ca5b8' }} />
        <span style={{ flex: 1, background: '#ab5c95' }} />
      </span>
      <span className="esr-foot__mark">ESTUS HEALTH</span>
      <span className="esr-foot__contact">estushealth.com&nbsp;&nbsp;·&nbsp;&nbsp;Neuroaffirming Occupational Therapy</span>
      <span className="esr-foot__page">
        {page} / {total}
      </span>
    </footer>
  );
}

function Page({ children, header = true, subtitle, page, total, cover = false }) {
  return (
    <section className={`esr-page${cover ? ' esr-page--cover' : ''}`}>
      {header && !cover && <PageHeader subtitle={subtitle} />}
      <div className="esr-page__body">{children}</div>
      {!cover && <PageFooter page={page} total={total} />}
    </section>
  );
}

/* ---- Individual content blocks ------------------------------------------ */

function PatternCard({ scale }) {
  const c = profileContent.scales[scale.code];
  const band = scale.band;
  const lead = band ? c.lead[band] : null;
  const strategies = band ? c.strategies[band] : [];
  return (
    <article className="esr-card" style={{ '--sc': c.colour }}>
      <div className="esr-card__head">
        <div className="esr-card__title-wrap">
          <span className="esr-card__dot" style={{ background: c.colour }} aria-hidden="true" />
          <h3 className="esr-card__title">{c.name}</h3>
        </div>
        <span className="esr-card__band" style={{ borderColor: c.colour, color: c.colour }}>
          {bandLabel(band)}
        </span>
      </div>
      <p className="esr-card__tagline">{c.tagline}</p>
      {lead ? (
        <p className="esr-card__lead">{lead}</p>
      ) : (
        <p className="esr-card__lead esr-muted">Not enough answers in this area to describe a pattern.</p>
      )}
      <p className="esr-card__meaning">{c.meaning}</p>
      {band && (
        <div className="esr-card__adv">
          <span className="esr-card__adv-label">What it gives you</span>
          <span>{c.advantage}</span>
        </div>
      )}
      {strategies.length > 0 && (
        <ul className="esr-card__strats">
          {strategies.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

function DomainMap({ domains, observer, name }) {
  const note = observer
    ? profileContent.domainMap.observerNote.replace(/\{Name\}/g, name || 'your child')
    : profileContent.domainMap.note;
  return (
    <div className="esr-domainmap">
      <h2 className="esr-h2">{profileContent.domainMap.title}</h2>
      <div className="esr-domain-rows">
        {domains.map((d) => (
          <div className="esr-domain-row" key={d.key}>
            <span className="esr-domain-label">{d.label}</span>
            <span className="esr-domain-track">
              <span
                className="esr-domain-fill"
                style={{ width: `${Math.round(d.fill * 100)}%`, background: d.colour }}
              />
            </span>
          </div>
        ))}
      </div>
      <p className="esr-note">{note}</p>
    </div>
  );
}

function ItemTable({ rows }) {
  return (
    <table className="esr-table esr-table--items">
      <thead>
        <tr>
          <th className="esr-num">#</th>
          <th>Item (abbreviated)</th>
          <th>Response</th>
          <th>Scale</th>
          <th>Domain</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className={r.flagged ? 'esr-flagged' : ''}>
            <td className="esr-num">{r.id}</td>
            <td>{r.stem}</td>
            <td>{r.response}</td>
            <td>{r.scale}</td>
            <td>{r.domain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function SensoryProfileReport({ profile, versionLabel, contexts = [], dateLabel }) {
  if (!profile) return null;
  const observer = profile.voice === 'observer';
  const heading = profile.name
    ? `${profile.name}'s Sensory Profile`
    : observer
      ? 'A Sensory Profile'
      : 'Your Sensory Profile';

  const contextLabels = contexts.map((c) => {
    const m = { home: 'Home', school: 'School', work: 'Work', out: 'Out & about' };
    return m[c] || c;
  });

  const cards = profile.scaleList;
  const TOTAL = 7;
  const itemRows = profile.appendix.itemTable;
  const itemsA = itemRows.slice(0, 15);
  const itemsB = itemRows.slice(15);

  const report = (
    <div className="esr-print-root" role="document" aria-label="Estus Sensory Profile report">
      <style>{REPORT_CSS}</style>

      {/* ---- PAGE 1 · COVER ---- */}
      <section className="esr-page esr-page--cover">
        <div className="esr-cover__top">
          <BandBar width="70mm" height="4mm" gap="4px" />
          <Wordmark size={40} />
          <div className="esr-cover__ot">Neuroaffirming Occupational Therapy</div>
        </div>

        <div className="esr-cover__mid">
          <div className="esr-cover__eyebrow">Sensory Self-Discovery Profile</div>
          <h1 className="esr-cover__title">{heading}</h1>
          <p className="esr-cover__promise">
            A descriptive snapshot of how {observer ? (profile.name || 'this child') : 'you'} take
            {observer ? 's' : ''} in and respond{observer ? 's' : ''} to the sensory world — strengths first.
          </p>

          <dl className="esr-cover__facts">
            <div>
              <dt>Prepared for</dt>
              <dd>{profile.name || (observer ? 'Child (unnamed)' : 'You')}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{dateLabel}</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>{versionLabel}</dd>
            </div>
            {contextLabels.length > 0 && (
              <div>
                <dt>Answered thinking about</dt>
                <dd>{contextLabels.join(' · ')}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="esr-cover__disclaimer">
          <strong>A doorway, not a diagnosis.</strong> {profileContent.disclaimer}
        </div>

        <div className="esr-cover__footband">
          <span className="esr-foot__bar" aria-hidden="true">
            <span style={{ flex: 1, background: '#344982' }} />
            <span style={{ flex: 1, background: '#2f6f9e' }} />
            <span style={{ flex: 1, background: '#2ca5b8' }} />
            <span style={{ flex: 1, background: '#ab5c95' }} />
          </span>
          <span className="esr-foot__mark">ESTUS HEALTH</span>
          <span className="esr-foot__contact">estushealth.com</span>
        </div>
      </section>

      {/* ---- PAGE 2 · SUMMARY + STRENGTHS + DOMAIN MAP ---- */}
      <Page subtitle={heading} page={2} total={TOTAL}>
        <div className="esr-summary">
          <h2 className="esr-h2">In a nutshell</h2>
          <p className="esr-summary__text">{profile.summary}</p>
        </div>

        <div className="esr-strengths">
          <h2 className="esr-h2">Sensory joys &amp; strengths</h2>
          <p className="esr-note esr-note--lead">{profileContent.strengths.intro}</p>
          <div className="esr-strength-grid">
            {profile.strengths.map((s) => (
              <div className="esr-strength" key={s.id}>
                <div className="esr-strength__title">
                  <span className="esr-strength__star" aria-hidden="true">
                    ★
                  </span>
                  {s.title}
                </div>
                <p className="esr-strength__line">{s.line}</p>
              </div>
            ))}
          </div>
        </div>

        <DomainMap domains={profile.domains} observer={observer} name={profile.name} />
      </Page>

      {/* ---- PAGE 3 · PATTERN CARDS 1–2 ---- */}
      <Page subtitle="Your six sensory patterns" page={3} total={TOTAL}>
        <h2 className="esr-h2 esr-h2--section">Your sensory patterns</h2>
        <div className="esr-cards">
          {cards.slice(0, 2).map((s) => (
            <PatternCard key={s.code} scale={s} />
          ))}
        </div>
      </Page>

      {/* ---- PAGE 4 · PATTERN CARDS 3–4 ---- */}
      <Page subtitle="Your six sensory patterns" page={4} total={TOTAL}>
        <div className="esr-cards">
          {cards.slice(2, 4).map((s) => (
            <PatternCard key={s.code} scale={s} />
          ))}
        </div>
      </Page>

      {/* ---- PAGE 5 · PATTERN CARDS 5–6 + WHAT NEXT ---- */}
      <Page subtitle="Your six sensory patterns" page={5} total={TOTAL}>
        <div className="esr-cards">
          {cards.slice(4, 6).map((s) => (
            <PatternCard key={s.code} scale={s} />
          ))}
        </div>

        <div className="esr-whatnext">
          <h2 className="esr-h2" style={{ color: '#fff' }}>
            {profileContent.cta.headline}
          </h2>
          <p>{profileContent.cta.body}</p>
          <div className="esr-whatnext__cta">estushealth.com&nbsp;&nbsp;·&nbsp;&nbsp;Book a first conversation</div>
        </div>
      </Page>

      {/* ---- PAGE 6 · CLINICIAN APPENDIX (scale summary + items 1–15) ---- */}
      <Page subtitle="For therapists & educators" page={6} total={TOTAL}>
        <div className="esr-appendix-banner">{profileContent.appendix.header}</div>
        <h2 className="esr-h2 esr-h2--section">Scale summary</h2>
        <table className="esr-table">
          <thead>
            <tr>
              <th>Scale</th>
              <th className="esr-num">Answered</th>
              <th className="esr-num">Mean</th>
              <th>Descriptive band</th>
            </tr>
          </thead>
          <tbody>
            {profile.appendix.scaleTable.map((r) => (
              <tr key={r.code}>
                <td>
                  <span className="esr-code">{r.code}</span> {r.name}
                </td>
                <td className="esr-num">
                  {r.answered}/{r.total}
                </td>
                <td className="esr-num">{r.mean == null ? '—' : r.mean.toFixed(2)}</td>
                <td>{r.band}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="esr-h2 esr-h2--section">Item-level responses</h2>
        <ItemTable rows={itemsA} />
      </Page>

      {/* ---- PAGE 7 · CLINICIAN APPENDIX (items 16–30 + orientation) ---- */}
      <Page subtitle="For therapists & educators" page={7} total={TOTAL}>
        <h2 className="esr-h2 esr-h2--section">Item-level responses (continued)</h2>
        <ItemTable rows={itemsB} />
        <p className="esr-note">{profileContent.appendix.dunnMapping}</p>
        <p className="esr-note esr-note--foot">{profileContent.appendix.footer}</p>
      </Page>
    </div>
  );

  return createPortal(report, document.body);
}

/* ------------------------------------------------------------------ Styles */
const REPORT_CSS = `
/* Hidden on screen; revealed only for print. */
.esr-print-root { display: none; }

@media print {
  @page { size: A4; margin: 0; }
  html, body {
    margin: 0 !important; padding: 0 !important;
    background: #fff !important; background-image: none !important;
  }
  /* Hide the live app; show only the report. */
  #root { display: none !important; }
  .esr-print-root { display: block !important; }
}

/* Screen preview support (used by the on-screen "preview" affordance): when a
   parent opts in with .esr-show, render the pages as a scaled stack. */
.esr-show .esr-print-root { display: block; }

.esr-print-root {
  --ink: #16151a;
  --muted: #55534e;
  --faint: #8a8880;
  --line: #e6e4df;
  --line-strong: #d6d4cf;
  --paper: #ffffff;
  --cream: #fbfaf8;
  font-family: 'Barlow', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--ink);
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.esr-print-root *, .esr-print-root *::before, .esr-print-root *::after { box-sizing: border-box; }

.esr-page {
  width: 210mm; min-height: 297mm; height: 297mm;
  background: var(--paper);
  padding: 15mm 18mm 22mm; /* bottom padding reserves space for the absolute footer */
  display: flex; flex-direction: column;
  position: relative; overflow: hidden;
  page-break-after: always; break-after: page;
}
.esr-page:last-child { page-break-after: auto; break-after: auto; }
.esr-page__body { flex: 1; display: flex; flex-direction: column; gap: 7mm; min-height: 0; }

/* ---- Running header ---- */
.esr-head {
  display: flex; align-items: flex-start; justify-content: space-between;
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 5mm; margin-bottom: 7mm;
}
.esr-head__meta { text-align: right; padding-top: 1mm; }
.esr-head__title {
  font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 13px;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink);
}
.esr-head__sub { font-size: 10.5px; color: var(--faint); margin-top: 2px; }

/* ---- Running footer ---- */
.esr-foot {
  position: absolute; left: 18mm; right: 18mm; bottom: 9mm;
  display: flex; align-items: center; gap: 10px;
  font-family: 'Barlow Semi Condensed', sans-serif;
  border-top: 1px solid var(--line); padding-top: 3mm;
}
.esr-foot__bar { display: flex; width: 16mm; height: 2mm; gap: 2px; flex: none; }
.esr-foot__mark {
  font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 10px;
  letter-spacing: 0.22em; color: var(--ink);
}
.esr-foot__contact { font-size: 10px; color: var(--faint); letter-spacing: 0.02em; }
.esr-foot__page { margin-left: auto; font-size: 10px; color: var(--faint); font-weight: 600; }

/* ---- Headings ---- */
.esr-h2 {
  font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 15px;
  letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink); margin: 0 0 3mm;
}
.esr-h2--section { margin-bottom: 5mm; }
.esr-note { font-size: 10px; color: var(--faint); line-height: 1.55; margin: 3mm 0 0; }
.esr-note--lead { margin: 0 0 4mm; font-size: 11px; color: var(--muted); }
.esr-note--foot { border-top: 1px solid var(--line); padding-top: 3mm; font-style: italic; }
.esr-muted { color: var(--faint); }

/* ---- COVER ---- */
.esr-page--cover {
  padding: 0; justify-content: space-between;
  background:
    radial-gradient(120% 60% at 85% -10%, rgba(44,165,184,0.08), transparent 60%),
    radial-gradient(80% 50% at 0% 8%, rgba(171,92,149,0.07), transparent 55%),
    var(--cream);
}
.esr-cover__top { padding: 26mm 22mm 0; }
.esr-cover__top .esr-wordmark { margin-top: 6mm; }
.esr-cover__ot {
  font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 600;
  font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
  color: #5a5346; margin-top: 4mm;
}
.esr-cover__mid { padding: 0 22mm; }
.esr-cover__eyebrow {
  font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 600;
  font-size: 13px; letter-spacing: 0.24em; text-transform: uppercase;
  color: #2ca5b8; margin-bottom: 6mm;
}
.esr-cover__title {
  font-family: 'Oswald', sans-serif; font-weight: 700;
  font-size: 46px; line-height: 1.02; letter-spacing: 0.005em;
  color: var(--ink); margin: 0 0 6mm; max-width: 150mm;
}
.esr-cover__promise {
  font-size: 15px; line-height: 1.6; color: var(--muted);
  max-width: 140mm; margin: 0 0 12mm;
}
.esr-cover__facts {
  display: grid; grid-template-columns: 1fr 1fr; gap: 7mm 14mm;
  margin: 0; max-width: 150mm;
  border-top: 1px solid var(--line-strong); padding-top: 8mm;
}
.esr-cover__facts dt {
  font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 600;
  font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--faint); margin-bottom: 2mm;
}
.esr-cover__facts dd {
  margin: 0; font-family: 'Oswald', sans-serif; font-weight: 600;
  font-size: 16px; color: var(--ink);
}
.esr-cover__disclaimer {
  margin: 0 22mm; padding: 6mm 7mm; background: #fff;
  border: 1px solid var(--line-strong); border-left: 3px solid #ab5c95;
  border-radius: 2mm; font-size: 11px; line-height: 1.6; color: var(--muted);
}
.esr-cover__disclaimer strong { color: var(--ink); }
.esr-cover__footband {
  height: 16mm; background: #090909; margin-top: 10mm;
  display: flex; align-items: center; gap: 12px; padding: 0 22mm; position: relative;
}
.esr-cover__footband .esr-foot__bar { position: absolute; top: 0; left: 0; right: 0; width: auto; height: 3px; gap: 0; }
.esr-cover__footband .esr-foot__mark { color: #fff; letter-spacing: 0.28em; font-size: 11px; }
.esr-cover__footband .esr-foot__contact { color: #cfd6e2; margin-left: auto; font-family: 'Barlow Semi Condensed', sans-serif; }

/* ---- Summary ---- */
.esr-summary__text { font-size: 13.5px; line-height: 1.75; color: var(--ink); margin: 0; max-width: 165mm; }

/* ---- Strengths ---- */
.esr-strength-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm 8mm; }
.esr-strength {
  border: 1px solid var(--line); border-radius: 2mm; padding: 4mm 5mm; background: var(--cream);
}
.esr-strength__title {
  font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 13px;
  color: var(--ink); margin-bottom: 2mm; display: flex; align-items: baseline; gap: 6px;
}
.esr-strength__star { color: #2ca5b8; font-size: 12px; }
.esr-strength__line { font-size: 11px; line-height: 1.55; color: var(--muted); margin: 0; }

/* ---- Domain map ---- */
.esr-domain-rows { display: flex; flex-direction: column; gap: 2.6mm; }
.esr-domain-row { display: flex; align-items: center; gap: 5mm; }
.esr-domain-label {
  flex: 0 0 42mm; font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 600;
  font-size: 11.5px; letter-spacing: 0.04em; color: var(--ink); text-align: right;
}
.esr-domain-track { flex: 1; height: 5mm; background: #efedea; border-radius: 3mm; overflow: hidden; }
.esr-domain-fill { display: block; height: 100%; border-radius: 3mm; min-width: 1.5mm; }

/* ---- Pattern cards ---- */
.esr-cards { display: flex; flex-direction: column; gap: 5mm; }
.esr-card {
  border: 1px solid var(--line-strong); border-radius: 2.5mm;
  border-left: 3px solid var(--sc); padding: 5mm 6mm; background: #fff;
  break-inside: avoid; page-break-inside: avoid;
}
.esr-card__head { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.esr-card__title-wrap { display: flex; align-items: center; gap: 6px; }
.esr-card__dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.esr-card__title {
  font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 15px;
  letter-spacing: 0.04em; color: var(--ink); margin: 0;
}
.esr-card__band {
  font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 600;
  font-size: 9.5px; letter-spacing: 0.08em; text-transform: uppercase;
  border: 1px solid; border-radius: 20px; padding: 2px 9px; white-space: nowrap; flex: none;
}
.esr-card__tagline { font-size: 10.5px; color: var(--faint); font-style: italic; margin: 1.5mm 0 2.5mm; }
.esr-card__lead { font-size: 11.5px; line-height: 1.55; color: var(--ink); font-weight: 500; margin: 0 0 2mm; }
.esr-card__meaning { font-size: 10.5px; line-height: 1.55; color: var(--muted); margin: 0 0 3mm; }
.esr-card__adv {
  display: flex; gap: 6px; align-items: baseline; font-size: 10.5px; line-height: 1.5;
  color: var(--ink); background: var(--cream); border-radius: 1.5mm; padding: 2.5mm 3mm; margin-bottom: 3mm;
}
.esr-card__adv-label {
  font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 700;
  font-size: 8.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--sc); white-space: nowrap; flex: none;
}
.esr-card__strats { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 1.6mm; }
.esr-card__strats li { position: relative; padding-left: 6mm; font-size: 10.5px; line-height: 1.5; color: var(--muted); }
.esr-card__strats li::before { content: "→"; position: absolute; left: 0; top: 0; color: var(--sc); font-weight: 700; }

/* ---- What next ---- */
.esr-whatnext {
  margin-top: auto; background: #090909; color: #e9e7e4; border-radius: 2.5mm;
  padding: 6mm 7mm; position: relative; overflow: hidden;
}
.esr-whatnext::before {
  content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: ${BAND_GRADIENT};
}
.esr-whatnext p { font-size: 11px; line-height: 1.6; margin: 0 0 3mm; color: #cfd0cd; max-width: 150mm; }
.esr-whatnext__cta {
  font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 600;
  font-size: 12px; letter-spacing: 0.06em; color: #7fd0dd;
}

/* ---- Appendix ---- */
.esr-appendix-banner {
  background: var(--cream); border: 1px solid var(--line-strong); border-radius: 2mm;
  padding: 3.5mm 4mm; font-size: 10.5px; color: var(--muted); font-weight: 500; margin-bottom: 2mm;
}
.esr-table { width: 100%; border-collapse: collapse; font-size: 10px; margin-bottom: 2mm; }
.esr-table th {
  text-align: left; font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 700;
  font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint);
  border-bottom: 1.5px solid var(--line-strong); padding: 2mm 2.5mm;
}
.esr-table td { padding: 1.8mm 2.5mm; border-bottom: 1px solid var(--line); color: var(--ink); vertical-align: top; line-height: 1.4; }
.esr-table .esr-num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
.esr-table th.esr-num { text-align: right; }
.esr-table--items td { font-size: 9px; padding: 1.5mm 2.5mm; }
.esr-table--items th { padding-top: 1mm; padding-bottom: 1.5mm; }
.esr-code {
  font-family: 'Barlow Semi Condensed', sans-serif; font-weight: 700; font-size: 8.5px;
  letter-spacing: 0.06em; color: #2ca5b8; margin-right: 2px;
}
.esr-flagged td { color: var(--faint); background: #faf7f2; }
`;
