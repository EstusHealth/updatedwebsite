import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { CLINICIANS, EMAIL, WHAT_TO_EXPECT } from '../lib/site'

/*
  Unlisted. Reached from the PracSuite referral form's confirmation message
  only, so people send a referral before they book with Nik or Nam. Not in
  the menus, the sitemap or llms.txt, and marked noindex. Anyone with the
  link can still open it: this keeps the calendars off the public site, it
  is not a lock.
*/
const LANES = ['over', 'under']

export function Booking() {
  const [lane, setLane] = useState('over')
  const who = CLINICIANS[lane]
  return (
    <div className="book" id="book">
      <div className="book-head">
        <span className="t">Book your free call</span>
        <span className="label">15 minutes · free</span>
      </div>
      <div className="book-body">
        <span className="label" id="lane-label">Who is the call for?</span>
        <div className="seg" role="group" aria-labelledby="lane-label" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          {LANES.map((k) => (
            <button key={k} type="button" aria-pressed={k === lane} onClick={() => setLane(k)}>{CLINICIANS[k].label}</button>
          ))}
        </div>
        <div className="who" aria-live="polite">
          <img src={who.img} alt={`Portrait of ${who.full}`} width="132" height="150" />
          <div className="txt">
            <span className={`label ${who.tone}`}>{who.tag}</span>
            <span className="nm">You'll talk to {who.first}</span>
            <span className="ln">{who.line}</span>
          </div>
        </div>
        <a className="btn go" href={who.href} target="_blank" rel="noopener">
          {who.cta} <span aria-hidden="true">▸</span>
        </a>
        <span className="small">Phone calls hard? Book anyway and say so in the notes. We can do it by chat or text instead.</span>
      </div>
    </div>
  )
}

export default function BookYourCall() {
  return (
    <>
      <SEO
        title="Book Your Free Call | Estus Health"
        description="Thanks for your referral. Book your free 15 minute welcome call."
        path="/book-your-call"
        noindex
      />
      <section className="hero" aria-labelledby="page-title">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span className="eyebrow">Referral received</span>
            <h1 id="page-title" style={{ margin: 0 }}>Thanks. Now pick a time.</h1>
            <p className="sub" style={{ margin: 0 }}>Book a free 15 minute call with the OT you'd actually work with. Then you decide.</p>
            <div className="panel">
              <div className="ph label">What the free call looks like</div>
              <div className="panel-row"><span className="step-n c-navy" style={{ fontSize: '1.4rem', width: 30 }}>01</span><span><b>15 minutes</b>, by video or phone</span></div>
              <div className="panel-row"><span className="step-n c-blue" style={{ fontSize: '1.4rem', width: 30 }}>02</span><span><b>Camera off</b> is fine</span></div>
              <div className="panel-row"><span className="step-n c-plum" style={{ fontSize: '1.4rem', width: 30 }}>03</span><span><b>No pressure</b> to book anything after</span></div>
            </div>
            <Link to={WHAT_TO_EXPECT} style={{ fontWeight: 600, color: 'var(--navy)', textDecoration: 'underline', textUnderlineOffset: 3 }}>More on what to expect</Link>
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 0, maxWidth: 560 }}>
            <Booking />
            <p className="small" style={{ marginTop: 20 }}>No times that suit? Email <a href={`mailto:${EMAIL}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{EMAIL}</a> and we'll find one.</p>
          </div>
        </div>
      </section>
    </>
  )
}
