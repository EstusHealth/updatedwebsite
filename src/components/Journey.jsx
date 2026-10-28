/*
  The new-client journey, start to finish, with a "You are here" marker.
  Shown on /contact (step 1) and /book-your-call (step 3) so people always
  know what has happened and what comes next.
*/
export const JOURNEY = [
  { tone: 'c-navy', top: 'top-navy', when: 'About 5 minutes', h: 'Send the referral form', p: "Who it's for, how you'll fund it, and what you'd like to change." },
  { tone: 'c-blue', top: 'top-blue', when: 'Straight away', h: 'Get your booking link', p: 'We email and text it to you as soon as you submit. Check your spam if it is not there in 10 minutes.' },
  { tone: 'c-teal', top: 'top-teal', when: 'When it suits you', h: 'Book your free call', p: 'Pick a time with Nik (16 and over) or Nam (under 16). Google emails you a confirmation.' },
  { tone: 'c-plum', top: 'top-plum', when: 'Free, 15 minutes', h: 'Talk, then decide', p: 'Video or phone, camera optional. If you want to go ahead, we book your first session.' },
]

export default function Journey({ current = 1, title = 'The whole process', eyebrow = 'Four steps, no surprises', id = 'journey' }) {
  return (
    <div className="journey">
      <div className="sec-intro">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="sec-head" id={`${id}-title`}>{title}</h2>
      </div>
      <ol className="ruled journey-steps" aria-labelledby={`${id}-title`}>
        {JOURNEY.map((s, i) => {
          const n = i + 1
          const state = n < current ? 'done' : n === current ? 'now' : 'next'
          return (
            <li key={s.h} className={`${s.top} is-${state}`} aria-current={state === 'now' ? 'step' : undefined}>
              <span className="journey-top">
                <span className={`step-n ${s.tone}`} aria-hidden="true">{n}</span>
                <span className={`journey-chip chip-${state}`}>
                  {state === 'done' ? 'Done ✓' : state === 'now' ? 'You are here' : 'Next'}
                </span>
              </span>
              <b className="journey-h">{s.h}</b>
              <span className="label" style={{ color: 'var(--text-soft)' }}>{s.when}</span>
              <span className="cell-body">{s.p}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
