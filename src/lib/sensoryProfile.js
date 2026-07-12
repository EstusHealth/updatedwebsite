/* ==========================================================================
   ESTUS SENSORY PROFILE — scoring & results logic
   Deterministic, runtime-AI-free. Turns raw answers into scale means, bands,
   a domain map, strengths, and a personalised summary (see wireframe spec §8).

   Answer shape: answers[itemId] = number 1..5  |  "varies"  |  undefined(skipped)
   ========================================================================== */

import quiz from '../data/sensoryProfile.json';
import content from '../data/sensoryProfileContent.json';

export const SCALE_ORDER = content.scaleOrder;

// Map every item id -> its definition once, for fast lookup.
const ITEMS_BY_ID = Object.fromEntries(quiz.items.map((it) => [it.id, it]));

/* --- Bands ---------------------------------------------------------------- */
// avg < 2.5 occasional · 2.5–3.5 regular · > 3.5 strong (spec §5).
export function bandFor(mean) {
  if (mean == null) return null;
  if (mean < content.bands.occasional.max) return 'occasional';
  if (mean <= content.bands.regular.max) return 'regular';
  return 'strong';
}

// A numeric answer counts toward means; "varies" and skips do not.
function isScored(v) {
  return typeof v === 'number' && v >= 1 && v <= 5;
}

function meanOf(values) {
  if (!values.length) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/* --- Per-scale scores ----------------------------------------------------- */
function scaleScores(answers) {
  const out = {};
  for (const code of Object.keys(content.scales)) {
    const items = quiz.items.filter((it) => it.scale === code);
    const scored = items.map((it) => answers[it.id]).filter(isScored);
    const mean = meanOf(scored);
    out[code] = {
      code,
      name: content.scales[code].name,
      colour: content.scales[code].colour,
      tagline: content.scales[code].tagline,
      mean,
      band: bandFor(mean),
      answered: scored.length,
      total: items.length,
      lowData: items.length > 0 && scored.length / items.length < 0.5,
    };
  }
  return out;
}

/* --- Domain intensities (for the domain map only) ------------------------- */
function domainScores(answers) {
  return Object.keys(content.domains).map((key) => {
    const items = quiz.items.filter((it) => it.domain === key);
    const scored = items.map((it) => answers[it.id]).filter(isScored);
    const mean = meanOf(scored);
    return {
      key,
      label: content.domains[key].label,
      colour: content.domains[key].colour,
      mean,
      answered: scored.length,
      total: items.length,
      // 0..1 fill for the bar; a null (unanswered) domain reads as empty.
      fill: mean == null ? 0 : Math.max(0, Math.min(1, (mean - 1) / 4)),
    };
  });
}

/* --- Strengths ------------------------------------------------------------ */
// Strength-framed items (17, 20, 23, 30) answered "Often"/"Almost always"
// surface as named strengths; a strong SEEK pattern adds sensory zest.
const STRENGTH_ITEM_ORDER = [30, 20, 23, 17];
const STRENGTH_KEY = { 30: 'joy', 20: 'focus', 23: 'environment', 17: 'awareness' };

function strengthsFor(answers, scales) {
  const found = [];
  for (const id of STRENGTH_ITEM_ORDER) {
    const v = answers[id];
    if (isScored(v) && v >= 4) {
      found.push({ id: String(id), key: STRENGTH_KEY[id], ...content.strengths.items[String(id)] });
    }
  }
  if (scales.SEEK.band === 'strong') {
    found.push({ id: 'seek', key: 'seek', ...content.strengths.seek });
  }
  if (!found.length) {
    found.push({ id: 'fallback', key: 'fallback', ...content.strengths.fallback });
  }
  return found;
}

/* --- Summary generator ---------------------------------------------------- */
// Deterministic 3-sentence summary keyed on (top strength, top scale, energy).
function pick(entry, voice) {
  if (!entry) return null;
  return entry[voice] || entry.self;
}

function buildSummary(answers, scales, strengths, voice, name) {
  const sentences = [];

  // 1 — open on the strongest strength category present.
  const openerKey = strengths[0] ? strengths[0].key : 'fallback';
  const opener = content.summary.openers[openerKey] || content.summary.openers.fallback;
  sentences.push(pick(opener, voice));

  // 2 — the scale with the highest mean (ties resolved by display order),
  //     as long as it isn't the SEEK strength we may have just opened with.
  const ranked = Object.values(scales)
    .filter((s) => s.mean != null)
    .sort((a, b) => b.mean - a.mean || SCALE_ORDER.indexOf(a.code) - SCALE_ORDER.indexOf(b.code));
  let topScale = ranked[0];
  if (topScale && topScale.code === 'SEEK' && openerKey === 'joy' && ranked[1]) {
    topScale = ranked[1];
  }
  if (topScale) {
    sentences.push(pick(content.summary.scaleLine[topScale.code], voice));
  }

  // 3 — recovery note keyed on the ENERGY band (default to "regular" framing).
  const energyBand = scales.ENERGY.band || 'regular';
  sentences.push(pick(content.summary.energyLine[energyBand], voice));

  return sentences
    .filter(Boolean)
    .map((s) => s.replace(/\{Name\}/g, name))
    // Capitalise the first letter of each sentence so a lowercase fallback
    // subject ("your child") reads correctly when it lands sentence-initial.
    .map((s) => s.replace(/^([a-z])/, (m, c) => c.toUpperCase()))
    .join(' ');
}

/* --- Clinician appendix data --------------------------------------------- */
function appendixRows(answers, respondent) {
  const scaleTable = SCALE_ORDER.map((code) => {
    const s = quiz.items.filter((it) => it.scale === code);
    const scored = s.map((it) => answers[it.id]).filter(isScored);
    const mean = meanOf(scored);
    return {
      code,
      name: content.scales[code].name,
      answered: scored.length,
      total: s.length,
      mean: mean == null ? null : Number(mean.toFixed(2)),
      band: mean == null ? '—' : content.bands[bandFor(mean)].label,
    };
  });

  const itemTable = quiz.items.map((it) => {
    const raw = answers[it.id];
    let response = 'Skipped';
    if (raw === 'varies') response = 'Varies / not sure';
    else if (isScored(raw)) {
      const scale = respondent === 'K' ? quiz.responseScales.child : quiz.responseScales.standard;
      const match = scale.find((o) => o.value === raw);
      response = match ? `${raw} · ${match.label}` : String(raw);
    }
    // A short stem for the table: caregiver/child versions read best abbreviated.
    const stem = (it.wordings.A || '').replace(/\s+/g, ' ').trim();
    return {
      id: it.id,
      stem: stem.length > 66 ? stem.slice(0, 64).trimEnd() + '…' : stem,
      response,
      flagged: raw === 'varies' || !isScored(raw),
      scale: it.scale,
      domain: content.domains[it.domain].label,
    };
  });

  return { scaleTable, itemTable };
}

/* --- Public entry point --------------------------------------------------- */
export function computeProfile(answers, options = {}) {
  const { respondent = 'A', name = '' } = options;
  const voice = respondent === 'A' ? 'self' : 'observer';
  // Observer sentences fall back to a friendly noun when no name was given.
  const displayName = name && name.trim() ? name.trim() : voice === 'observer' ? 'Your child' : 'You';
  // Lowercase fallback so mid-sentence substitutions read naturally; sentence
  // starts are re-capitalised in buildSummary.
  const observerName = name && name.trim() ? name.trim() : 'your child';

  const scales = scaleScores(answers);
  const domains = domainScores(answers);
  const strengths = strengthsFor(answers, scales);
  const summary = buildSummary(answers, scales, strengths, voice, observerName);
  const appendix = appendixRows(answers, respondent);

  const answeredTotal = quiz.items.filter((it) => isScored(answers[it.id])).length;

  return {
    respondent,
    voice,
    name: name && name.trim() ? name.trim() : '',
    displayName,
    scales,
    scaleList: SCALE_ORDER.map((code) => scales[code]),
    domains,
    strengths,
    summary,
    appendix,
    answeredTotal,
    itemTotal: quiz.items.length,
  };
}

/* --- Small helpers reused by the UI & report ------------------------------ */
export function bandLabel(band) {
  return band ? content.bands[band].label : 'Not enough answers yet';
}

export function scaleContent(code) {
  return content.scales[code];
}

export { content as profileContent, quiz as profileQuiz, ITEMS_BY_ID };
