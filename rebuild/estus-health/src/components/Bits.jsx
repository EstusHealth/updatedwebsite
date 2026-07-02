import { Link } from 'react-router-dom'
import { Confetti, SynthwaveSun } from './Decor'
import { BOOKING, REFERRAL_FORM } from '../lib/site'

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
      {decor && (
        <>
          <SynthwaveSun />
          <Confetti kind="ring" color="var(--teal)" size={48} anim="float" style={{ top: 34, right: '7%' }} />
          <Confetti kind="dot" color="var(--mauve)" size={24} anim="float2" style={{ top: 140, right: '2%' }} />
          <Confetti kind="star" color="var(--mauve)" size={40} anim="spin" style={{ top: 12, left: '46%' }} />
        </>
      )}
      <div className="wrap" style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        {eyebrow && <span className={`eyebrow ${eyebrowClass}`}>{eyebrow}</span>}
        {badge && <div style={{ marginTop: 16 }}><span className="badge badge--mauve">{badge}</span></div>}
        <h1 id="page-title" style={{ marginTop: 18 }}>
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
      <Confetti kind="tri" color="var(--white)" size={30} anim="float" r="-8deg" style={{ top: 26, left: '8%' }} />
      <Confetti kind="dot" color="var(--white)" size={28} anim="float2" style={{ bottom: 26, right: '9%' }} />
      <Confetti kind="star" color="#fff" size={42} anim="spin" style={{ top: 40, right: '16%' }} />
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

// Convenience: the primary referral button, used all over the site.
export function ReferralButton({ children = 'Make a Referral', big, variant }) {
  return <Btn href={REFERRAL_FORM} big={big} variant={variant}>{children}</Btn>
}
