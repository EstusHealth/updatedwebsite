import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Journey from '../components/Journey'
import { CLINICIANS, EMAIL, WHAT_TO_EXPECT } from '../lib/site'

/*
  Unlisted. Reached from the referral form's confirmation message and the
  email and SMS sequence sent after it, so people send a referral before
  they book with Nik or Nam. Not in the menus, the sitemap or llms.txt, and marked noindex. Anyone with the
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
            <span className="eyebrow">Step 3 of 4 · Referral received</span>
            <h1 id="page-title" style={{ margin: 0 }}>Thanks. Now pick a time.</h1>
            <p className="sub" style={{ margin: 0 }}>We've got your referral. Book a free 15 minute call with the OT you'd actually work with.</p>
            <div className="panel">
              <div className="ph label">Pick a time in three taps</div>
              <div className="panel-row"><span className="step-n c-navy" style={{ fontSize: '1.4rem', width: 30 }}>1</span><span><b>Who is the call for?</b> 16 and over goes to Nik, under 16 goes to Nam.</span></div>
              <div className="panel-row"><span className="step-n c-blue" style={{ fontSize: '1.4rem', width: 30 }}>2</span><span><b>Pick a time</b> in their calendar. It opens in a new tab.</span></div>
              <div className="panel-row"><span className="step-n c-teal" style={{ fontSize: '1.4rem', width: 30 }}>3</span><span><b>Check your inbox.</b> Google emails you the time and the video link.</span></div>
            </div>
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 0, maxWidth: 560 }}>
            <Booking />
            <p className="small" style={{ marginTop: 20 }}>No times that suit? Email <a href={`mailto:${EMAIL}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{EMAIL}</a> and we'll find one.</p>
          </div>
        </div>
      </section>

      <section aria-label="Where you are" style={{ paddingTop: 8, paddingBottom: 40 }}>
        <div className="wrap"><Journey current={3} eyebrow="Where you are" title="Nearly there" id="journey" /></div>
      </section>

      <section aria-labelledby="after-title" style={{ paddingTop: 0, paddingBottom: 80 }}>
        <div className="wrap">
          <div className="sec-intro">
            <span className="eyebrow">After you book</span>
            <h2 className="sec-head" id="after-title">What happens next</h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            <div className="panel">
              <div className="ph label">Before the call</div>
              <div className="pb">
                <div className="dots"><b>Confirmation</b><span className="fill"></span><span style={{ textAlign: 'right' }}>From Google, by email</span></div>
                <div className="dots"><b>Video link</b><span className="fill"></span><span style={{ textAlign: 'right' }}>In that email</span></div>
                <div className="dots"><b>To prepare</b><span className="fill"></span><span style={{ textAlign: 'right' }}>Nothing</span></div>
              </div>
            </div>
            <div className="panel">
              <div className="ph label">On the call</div>
              <div className="pb">
                <div className="dots"><b>Length</b><span className="fill"></span><span>15 minutes</span></div>
                <div className="dots"><b>Camera</b><span className="fill"></span><span>Optional</span></div>
                <div className="dots"><b>Cost</b><span className="fill"></span><span>Free</span></div>
              </div>
            </div>
            <div style={{ border: '2px solid var(--black)', background: 'var(--black)', color: 'var(--on-dark)', padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.4rem', textTransform: 'uppercase', lineHeight: 1.1 }}>After the call</span>
              <span style={{ color: 'var(--on-dark-soft)' }}>If you want to go ahead, we book your first session and send the service agreement to sign online. If not, no problem.</span>
              <Link to={WHAT_TO_EXPECT} style={{ color: 'var(--on-dark-accent)', fontWeight: 600 }}>Read what to expect ▸</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
