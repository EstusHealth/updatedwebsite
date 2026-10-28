import { Link } from 'react-router-dom'
import { BOOKING, CAPACITY, REFERRAL_FORM, BOOK_PATH } from '../lib/site'

/* ==========================================================================
   Small shared building blocks used across content pages.
   ========================================================================== */

// Smart link: internal paths use <Link>, external (http / mailto) use <a>.
export function Btn({ to, href, children, variant = '', big, external, ...rest }) {
  const cls = `btn${variant ? ' ' + variant : ''}${big ? ' btn--big' : ''}`
  if (to) return <Link className={cls} to={to} {...rest}>{children}</Link>
  const ext = external || (href && /^(https?:|mailto:)/.test(href))
  return (
    <a className={cls} href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
      {children}
    </a>
  )
}

// Standard content-page hero. `eyebrowClass` lets a page tweak the chip colour.
export function PageHero({ eyebrow, eyebrowClass = '', title, accent, sub, sub2, badge, children, decor = true }) {
  return (
    <section className="hero hero--page" aria-labelledby="page-title">
      <div className="wrap" style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        {eyebrow && <span className={`eyebrow ${eyebrowClass}`}>{eyebrow}</span>}
        {badge && <div style={{ marginTop: 14 }}><span className="badge badge--mauve">{badge}</span></div>}
        <h1 id="page-title" style={{ marginTop: 14 }}>
          {title}{accent && <> <span className="accent">{accent}</span></>}
        </h1>
        {sub && <p className="sub" style={{ marginTop: 20 }}>{sub}</p>}
        {sub2 && <p className="sub sub--italic" style={{ marginTop: 12 }}>{sub2}</p>}
        {children && <div className="hero-cta">{children}</div>}
      </div>
    </section>
  )
}

// The single conversion CTA band, reused at the foot of most pages.
export function CTABand({ title, body, buttons, note }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta-box">
          <h2 id="cta-title">{title}</h2>
          {body && <p>{body}</p>}
          <div className="hero-cta">{buttons}</div>
          {note && <p className="cta-note">{note}</p>}
        </div>
      </div>
    </section>
  )
}

// Discovery-call booking pair (Contact + Minecraft). Two clinicians.
export function BookingButtonPair() {
  return (
    <div className="hero-cta">
      {BOOKING.map((b) => (
        <Btn key={b.name} href={b.url} variant={b.name === 'Nam' ? 'btn--alt' : ''}>
          {b.label} · Book with {b.name}
        </Btn>
      ))}
    </div>
  )
}

// Current intake capacity. Shown on the home page, the contact / referral
// page, and the team page. Copy lives in lib/site.js so all three stay in sync.
// `compact` drops the CTA for spots that already sit next to a referral button.
export function CapacityNotice({ compact, style }) {
  return (
    <div className="callout callout--notice" role="status" style={style}>
      <span className="badge badge--mauve">{CAPACITY.badge}</span>
      <h2 className="capacity-head">{CAPACITY.heading}</h2>
      <p className="capacity-body">{CAPACITY.body}</p>
      {!compact && (
        <p style={{ margin: '16px 0 0' }}>
          <Btn to={BOOK_PATH} variant="btn--alt">{CAPACITY.cta} ▸</Btn>
        </p>
      )}
    </div>
  )
}

// The primary call to action used all over the site. Since the October 2026
// rebrand it books the free welcome call; the referral form sits on that page.
export function ReferralButton({ children = 'Book a free call', big, variant }) {
  return <Btn to={BOOK_PATH} big={big} variant={variant}>{children}</Btn>
}

// Simple play triangle, used on video thumbnails and "watch" buttons.
export function PlayIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginLeft: 3 }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

// The site-wide primary action: the free 15 minute welcome call.
export function BookButton({ children = 'Book a free call', big, variant }) {
  return <Btn to={BOOK_PATH} big={big} variant={variant}>{children}</Btn>
}
