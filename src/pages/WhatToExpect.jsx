import { useLocation } from 'react-router-dom'
import SEO from '../components/SEO'
import { Btn } from '../components/Bits'
import { SecIntro } from './Home'
import { CLINICIANS, EMAIL, BOOKING_PAGE } from '../lib/site'

/*
  Linked from the booking confirmation, not the menus. Add ?with=nik or
  ?with=nam to the link in each clinician's booking page to show their photo.
*/
const BY_NAME = { nik: CLINICIANS.over, nam: CLINICIANS.under }

const STEPS = [
  { n: 1, tone: 'c-navy', top: 'top-navy', h: 'Join the link', p: 'Phone or computer. Camera off is fine.' },
  { n: 2, tone: 'c-blue', top: 'top-blue', h: "Tell us what's going on", p: 'No need to prepare. Say as much or as little as you like.' },
  { n: 3, tone: 'c-teal', top: 'top-teal', h: 'We explain how we work', p: 'What sessions look like, fees, funding and when you could start.' },
  { n: 4, tone: 'c-plum', top: 'top-plum', h: 'You decide', p: 'Book, think it over, or we point you to someone better suited.' },
]

const HANDY = [
  ['Funding', 'NDIS or private'],
  ['NDIS plan', 'If you have one'],
  ['Reports', 'Optional'],
  ['Questions', 'Jot a few down'],
]

export default function WhatToExpect() {
  const { search } = useLocation()
  const pick = BY_NAME[(new URLSearchParams(search).get('with') || '').toLowerCase()]
  const people = pick ? [pick] : [CLINICIANS.over, CLINICIANS.under]

  return (
    <>
      <SEO
        title="What to Expect on Your Free Call | Estus Health"
        description="You're booked in. Here's what happens on your free 15 minute welcome call with Estus Health, and what's handy to have."
        path="/what-to-expect"
      />

      <section className="hero" aria-labelledby="page-title">
        <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center' }}>
          <div style={{ flex: '1 1 460px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span className="eyebrow">You're booked in</span>
            <h1 id="page-title" style={{ margin: 0 }}>Here's what to expect on your free call.</h1>
            <div className="panel" style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px', padding: '14px 18px', borderRight: '1px solid var(--black)' }}>
                <span className="label" style={{ color: 'var(--text-soft)' }}>When</span>
                <div className="price" style={{ fontSize: '1.3rem' }}>In your confirmation email</div>
              </div>
              <div style={{ flex: '1 1 160px', padding: '14px 18px' }}>
                <span className="label" style={{ color: 'var(--text-soft)' }}>How long</span>
                <div className="price" style={{ fontSize: '1.3rem' }}>15 minutes</div>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: 0, maxWidth: 460, display: 'grid', gridTemplateColumns: `repeat(${people.length}, minmax(0, 1fr))`, gap: 16 }}>
            {people.map((p) => (
              <figure key={p.key} className="crew" style={{ margin: 0, boxShadow: '8px 8px 0 var(--teal-brand)' }}>
                <div className="pic"><img src={p.img} alt={`Portrait of ${p.full}`} width="400" height="420" style={{ filter: 'none' }} /></div>
                <figcaption className="body">
                  <span className={`label ${p.tone}`}>{p.tag}</span>
                  <span className="cell-title" style={{ fontSize: '1.4rem' }}>{pick ? `You'll talk to ${p.first}` : p.full}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="Step by step" title="The call" id="steps-title" />
          <div className="ruled" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {STEPS.map((s) => (
              <div key={s.n} className={s.top}>
                <span className={`step-n ${s.tone}`} aria-hidden="true">{s.n}</span>
                <b style={{ fontSize: '1.2rem' }}>{s.h}</b>
                <span className="cell-body">{s.p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Before the call" style={{ paddingBottom: 80 }}>
        <div className="wrap grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="panel">
            <div className="ph label">Handy to have, not required</div>
            <div className="pb">
              {HANDY.map(([k, v]) => (
                <div className="dots" key={k}><b>{k}</b><span className="fill"></span><span>{v}</span></div>
              ))}
            </div>
          </div>
          <div style={{ border: '2px solid var(--black)', background: 'var(--black)', color: 'var(--on-dark)', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.6rem', textTransform: 'uppercase', lineHeight: 1.1 }}>Need to change something?</span>
            <span style={{ color: 'var(--on-dark-soft)' }}>New time, or rather do it by chat? Use the link in your confirmation email, or email us and we'll sort it.</span>
            <Btn href={`mailto:${EMAIL}?subject=Change%20my%20welcome%20call`} variant="btn--teal">Email {EMAIL}</Btn>
            <a href={BOOKING_PAGE} style={{ color: 'var(--on-dark-accent)', fontWeight: 600 }}>Back to booking ▸</a>
          </div>
        </div>
      </section>
    </>
  )
}
