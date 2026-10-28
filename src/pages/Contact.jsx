import SEO, { breadcrumb } from '../components/SEO'
import { Btn } from '../components/Bits'
import { FactStrip, SecIntro, Crew } from './Home'
import Journey from '../components/Journey'
import { REFERRAL_FORM, EMAIL, DRIVING_WAITLIST } from '../lib/site'

const RATE = '$193.99'

const FUNDING = [
  { label: 'NDIS self-managed', yes: true },
  { label: 'NDIS plan-managed', yes: true },
  { label: 'Private, pay as you go', yes: true },
  { label: 'NDIS agency-managed', yes: false },
  { label: 'Medicare plans', yes: false },
]

const FAQ = [
  { q: 'Why a form before the call?', a: 'So the OT you talk to already knows a bit about you. The 15 minutes is spent on you and your goals, not on paperwork. It takes about 5 minutes, and we email you a booking link as soon as you submit.' },
  { q: 'Do I need a GP referral?', a: 'No. You can refer yourself or a family member. Reports from a GP or other professional help, but they are optional.' },
  { q: 'How much does it cost?', a: `Occupational therapy is ${RATE} per hour, in line with the NDIS price guide. Private clients pay the same rate. The welcome call is free.` },
  { q: 'Are you taking new clients?', a: 'Yes, in limited numbers. We have a small number of Term 4 places for ongoing therapy, offered in the order people get in touch. We will give you a start date on the call.' },
  { q: 'Who will I see?', a: 'Nik works with teens 16+ and adults. Nam works with kids under 16 and their families. Driving assessments with Liam are coming soon.' },
  { q: 'What happens on the welcome call?', a: '15 minutes. We ask what is going on and what you would like to change, explain how we work and our fees, and answer your questions. Then you decide.' },
  { q: 'Do I need my camera on?', a: 'No. Camera off is fine, for the call and for sessions.' },
  { q: 'Phone calls are hard for me. Can we do this another way?', a: 'Yes. Say so in the referral form or the booking notes, or email us. We can use text, email or chat, and we will stick to it.' },
  { q: 'Do you work with PDA profiles?', a: 'Yes. We keep demands low, offer choices and adjust how sessions run so they feel safe.' },
  { q: 'Is it all telehealth?', a: 'Most therapy is by telehealth, Australia-wide. Driving assessments are coming soon and will be in person in Perth.' },
  { q: 'What if we are not the right fit?', a: 'We will say so honestly and help you find someone who is.' },
]

// The first step for every new client: the PracSuite referral form. On
// submit, an email sequence sends the /book-your-call link.
function StartReferral() {
  return (
    <div className="book" id="start">
      <div className="book-head">
        <span className="t">Step 1: the referral form</span>
        <span className="label">About 5 minutes</span>
      </div>
      <div className="book-body">
        <span className="label" style={{ color: 'var(--text-soft)' }}>What we'll ask</span>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {['Who the referral is for, and how to reach you', 'Funding: NDIS self-managed, plan-managed or private', "What's going on, and what you'd like to change", 'How you like to communicate'].map((t) => (
            <li key={t} className="dots" style={{ borderBottomStyle: 'solid', borderBottomColor: 'var(--hair)', alignItems: 'flex-start' }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="square" style={{ flex: 'none', marginTop: 4 }}><path d="M4 12l5 5L20 6" /></svg>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <a className="btn go" href={REFERRAL_FORM} target="_blank" rel="noopener">Start the referral form <span aria-hidden="true">▸</span></a>
        <div className="panel" style={{ background: 'var(--mist)', borderColor: 'var(--mist)' }}>
          <div className="pb" style={{ padding: '12px 14px' }}>
            <b>Then check your email.</b> Your link to book the free call arrives as soon as you submit.
          </div>
        </div>
        <span className="small">Forms hard? Email <a href={`mailto:${EMAIL}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{EMAIL}</a> and we'll fill it in with you.</span>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <>
      <SEO
        title="Get Started & Referrals | Estus Health"
        description="Send a short referral form, then book a free 15 minute call with the OT you would work with. Self-referrals welcome, no GP referral needed. Neuroaffirming OT in Perth and telehealth Australia-wide."
        path="/contact"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Get started', path: '/contact' },
        ])}
      />

      {/* HERO + BOOKING */}
      <section className="hero" aria-labelledby="page-title">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 440px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span className="eyebrow">Referrals · Perth + telehealth Australia-wide</span>
            <h1 id="page-title" style={{ margin: 0 }}>Start with a short referral form.</h1>
            <p className="sub" style={{ margin: 0 }}>Then book a free 15 minute call with the OT you'd actually work with.</p>
            <div className="panel">
              <div className="ph label">What the free call looks like</div>
              <div className="panel-row"><span className="step-n c-navy" style={{ fontSize: '1.4rem', width: 30 }}>01</span><span><b>15 minutes</b>, by video or phone</span></div>
              <div className="panel-row"><span className="step-n c-blue" style={{ fontSize: '1.4rem', width: 30 }}>02</span><span><b>Camera off</b> is fine</span></div>
              <div className="panel-row"><span className="step-n c-plum" style={{ fontSize: '1.4rem', width: 30 }}>03</span><span><b>No pressure</b> to book anything after</span></div>
            </div>
          </div>
          <div style={{ flex: '1 1 420px', minWidth: 0, maxWidth: 560 }}>
            <StartReferral />
          </div>
        </div>
      </section>

      <section aria-label="The whole process" style={{ paddingTop: 8, paddingBottom: 56 }}>
        <div className="wrap"><Journey current={1} /></div>
      </section>

      <FactStrip third={{ b: 'Telehealth, Australia-wide', s: 'Driving OT in Perth, coming soon' }} />

      {/* LANES */}
      <section aria-labelledby="lanes-title" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="Pick your path" title="Who's getting in touch?" id="lanes-title" />
          <div className="ruled">
            <a href={REFERRAL_FORM} target="_blank" rel="noopener" className="top-navy">
              <span className="label c-navy">01 · Most people</span>
              <span className="cell-title">Me or my family</span>
              <span className="cell-body">Send the referral form, then book the free call. We'll work out the right fit together.</span>
              <span className="cell-link c-navy">Start the form ▸</span>
            </a>
            <a href="#pros" className="top-blue">
              <span className="label c-blue">02 · Professionals</span>
              <span className="cell-title">GP, psych or coordinator</span>
              <span className="cell-body">How to refer, what to include and what you get back.</span>
              <span className="cell-link c-blue">How to refer ▸</span>
            </a>
            <a href={DRIVING_WAITLIST} className="top-plum">
              <span className="label c-plum">03 · In person, Perth<span className="soon">Coming soon</span></span>
              <span className="cell-title">Driving assessment</span>
              <span className="cell-body">Learner drivers and fitness to drive. Opening soon. Get on the waitlist now.</span>
              <span className="cell-link c-plum">Join the waitlist ▸</span>
            </a>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section aria-labelledby="team-title" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="Real people, not a call centre" title="Meet the team" id="team-title" />
          <Crew />
        </div>
      </section>

      {/* FEES + FUNDING */}
      <section id="fees" className="jump-target" aria-labelledby="fees-title">
        <div className="wrap">
          <SecIntro eyebrow="Straight answers" title="Fees and funding" id="fees-title" />
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="panel">
              <div className="ph label">Fees</div>
              <div className="pb">
                <div className="dots"><span>Welcome call</span><span className="fill"></span><span className="price c-teal">FREE</span></div>
                <div className="dots"><span>Occupational therapy, per hour</span><span className="fill"></span><span className="price">{RATE}</span></div>
                <div className="dots"><span>Driving assessment</span><span className="fill"></span><span className="price c-plum" style={{ fontSize: '1.1rem' }}>COMING SOON</span></div>
                <p className="small" style={{ margin: '12px 0 0' }}>In line with the NDIS price guide. Private clients pay the same rate.</p>
              </div>
            </div>
            <div className="panel">
              <div className="ph label">Funding we accept</div>
              <div className="pb" style={{ paddingTop: 6, paddingBottom: 6 }}>
                {FUNDING.map((f) => (
                  <div key={f.label} className="dots" style={{ borderBottomStyle: 'solid', borderBottomColor: 'var(--hair)' }}>
                    {f.yes
                      ? <svg role="img" aria-label="Accepted" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="square"><path d="M4 12l5 5L20 6" /></svg>
                      : <svg role="img" aria-label="Not accepted" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--mauve)" strokeWidth="3" strokeLinecap="square"><path d="M6 6l12 12M18 6L6 18" /></svg>}
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONALS */}
      <section id="pros" className="tint-section jump-target" aria-labelledby="pros-title">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow c-navy">For GPs, psychologists and support coordinators</span>
            <h2 className="sec-head" id="pros-title">Referring a client</h2>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Send it however suits your practice. A letter is fine. We take it from there and keep you in the loop.</p>
            <div className="hero-cta" style={{ marginTop: 0 }}>
              <Btn href={REFERRAL_FORM}>Refer online ▸</Btn>
              <Btn href={`mailto:${EMAIL}?subject=Referral`} variant="btn--ghost">Email a referral</Btn>
            </div>
            <p style={{ margin: 0 }}><b>Email</b> <a href={`mailto:${EMAIL}`} style={{ color: 'var(--navy)', fontWeight: 600 }}>{EMAIL}</a></p>
          </div>
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16, alignContent: 'start' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: 8 }}>Please include</h3>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li>Client name and contact</li><li>Reason for referral</li><li>Funding: private or NDIS</li><li>Relevant reports, if any</li>
              </ul>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: 8 }}>What you get back</h3>
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <li>Receipt confirmed in 1 business day</li><li>Updates, with client consent</li><li>Reports once assessment or therapy is done</li><li>A direct line to the treating OT</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="jump-target" aria-labelledby="faq-title">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <SecIntro eyebrow="Questions people ask us" title="FAQ" id="faq-title" />
          <div className="faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="plus" aria-hidden="true">+</span></summary>
                <div className="ans">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section aria-labelledby="final-title" style={{ paddingTop: 8, paddingBottom: 80 }}>
        <div className="wrap">
          <div className="split">
            <div className="l">
              <h2 id="final-title">Ready when you are.</h2>
              <p>About 5 minutes for the form. Then we email you a link to book your free call.</p>
            </div>
            <div className="r">
              <Btn href={REFERRAL_FORM} big>Start the referral form</Btn>
              <a href={`mailto:${EMAIL}`}>Rather email? {EMAIL}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
