# Design contract for the Estus Health rebuild

This file is the shared contract for anyone building page files in this app.
Follow it exactly so every page reads as one design system.

## Where things live
- App: `rebuild/estus-health/` (Vite + React 18 + react-router-dom v6).
- Global design system: `src/styles/tokens.css` (already imported once in `main.jsx`). Do NOT import it again.
- Old site (read-only source of copy to port): `rebuild/estus-health-website-main/src/...`
- Content source of truth: `rebuild/CONTENT-HANDOVER.md`. Design language: `rebuild/index.html`.

## Hard rules (brand)
- NO em-dashes anywhere in copy. Use "to" for ranges, or a comma/period. (En-dashes inside the design tokens like "Mon – Sat" are pre-existing in the mock and OK; do not add new ones to prose.)
- "Neuroaffirming", never "neurodivergent-friendly".
- Second person, short sentences, active voice.
- Respect `prefers-reduced-motion` (handled globally in tokens.css; just use the `.float/.float2/.spin` classes, never inline JS animation).
- Never hardcode a hex colour or font-family in a page. Only reference the CSS custom properties / class names from tokens.css. If you need a colour, use `var(--teal)`, `var(--mauve)`, `var(--navy)`, `var(--heading)`, `var(--text)`, `var(--text-soft)`, `var(--surface)`, `var(--line)`, etc.

## Shared components you MUST use (import from these paths)
```jsx
import SEO from '../components/SEO'                // or ../../components/SEO from deeper folders
import { Btn, PageHero, CTABand, BookingButtonPair, ReferralButton } from '../components/Bits'
import { Confetti, Ticker, Squiggle, SynthwaveSun } from '../components/Decor'
import { REFERRAL_FORM, EMAIL, SPOTIFY_SHOW, COMMCARD_APP, BOOKING } from '../lib/site'
```
- `<SEO title="..." description="..." path="/route" />` — render once per page, first thing.
- `<Btn to="/internal">` for internal links, `<Btn href="https://...">` for external (auto target=_blank). Variants: `variant="btn--alt"` (mauve), `variant="btn--ghost"`. `big` prop for large.
- `<PageHero eyebrow="Services" title="Occupational" accent="Therapy" sub="..." sub2="italic subline" badge="April 2026: ...">{buttons}</PageHero>` — the standard content-page hero. Only the homepage uses a custom hero.
- `<CTABand title="..." body="..." buttons={<>...</>} note={...} />` — the closing CTA band.
- `ReferralButton` renders the canonical referral button (href = REFERRAL_FORM).

## Canonical links (from lib/site.js) — never hardcode these
- Referral / contact form: `REFERRAL_FORM` (every "Make a Referral" / "Open referral form" / "Open Contact Form" CTA).
- Email: `EMAIL` = hello@estushealth.com.
- Podcast: `SPOTIFY_SHOW`.
- CommCard app: `COMMCARD_APP` = `/commcard/` (bundled standalone PWA).

## Layout primitives (class names in tokens.css)
- `.wrap` (max 1200) / `.wrap--narrow` (820) centered container. `<section>` has default vertical padding.
- Headings: `.sec-head` (uppercase section heading). Eyebrow chip: `.eyebrow` (+ `.eyebrow--teal` / `.eyebrow--mauve`).
- Body lead: `.lead`. Long-form article body: wrap it in `<div className="prose">` (styles h2/h3/p/ul/li/a/strong for you).
- Cards: `.card`. Grids: `.grid .grid-2|grid-3|grid-4` (auto-collapse on mobile).
- Numbered cards (fees / steps): `<div className="numgrid"><article className="card"><div className="num">1</div>...</article></div>`.
- Dark band section: `<section className="band">` (white heading, coloured pills via `.pills > .pill`).
- Tinted band: `<section className="tint-section">` with `.kv` key/value grid inside.
- Badges/tags: `.badge` (+ `--mauve` / `--ghost`). Callout box: `.callout`. Pull quote: `.pullquote`.

## Example page skeleton
```jsx
import SEO from '../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../components/Bits'

export default function ExamplePage() {
  return (
    <>
      <SEO title="Title | Estus Health" description="..." path="/route" />
      <PageHero eyebrow="Services" title="Occupational" accent="Therapy" sub2="Functional support that respects who you are">
        <ReferralButton big />
      </PageHero>
      <section>
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Section eyebrow</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Heading</h2>
          <div className="grid grid-3" style={{ marginTop: 36 }}>
            <article className="card"><h3>...</h3><p>...</p></article>
          </div>
        </div>
      </section>
      <CTABand title="Ready to get started?" body="..." buttons={<><ReferralButton big /><Btn to="/services/occupational-therapy" variant="btn--alt" big>Our services</Btn></>} />
    </>
  )
}
```

## Default export
Every page file has a single default-exported React component named to match its import in `src/App.jsx`. Do not add routes yourself; `App.jsx` already wires every path.
