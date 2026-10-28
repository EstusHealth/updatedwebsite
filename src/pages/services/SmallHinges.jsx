import { useState } from 'react'
import SEO, { breadcrumb, service } from '../../components/SEO'
import { PageHero, Btn, CTABand, BookButton } from '../../components/Bits'
import { SecIntro } from '../Home'

/* Small Hinges: six single-session OT hinges. Each hinge is one session.
   People pick one, a few or all six, so a program is 1 to 6 sessions.
   "Small hinges swing big doors." */
const HINGES = [
  { id: 'sleep', top: 'var(--navy)', tone: 'c-navy', h: 'Sleep', p: 'A wind-down that suits your brain and a sleep window you can actually keep.', out: 'A wind-down routine and a set bedtime window' },
  { id: 'morning', top: 'var(--blue)', tone: 'c-blue', h: 'Mornings', p: 'Up and out the door without burning your energy before the day starts.', out: 'A morning sequence with the decisions taken out' },
  { id: 'energy', top: 'var(--teal-brand)', tone: 'c-teal', h: 'Energy', p: 'Spend energy on purpose, with rest built in rather than earned.', out: 'A weekly energy budget' },
  { id: 'load', top: 'var(--plum-brand)', tone: 'c-plum', h: 'Mental load', p: 'Fewer things held in your head, so the important ones get done.', out: 'One place for everything, and a way to empty your head' },
  { id: 'transitions', top: 'var(--navy)', tone: 'c-navy', h: 'Transitions', p: 'Easier switches between tasks, places and parts of the day.', out: 'A switch routine for your hardest change of the day' },
  { id: 'shutdown', top: 'var(--blue)', tone: 'c-blue', h: 'Shutdown', p: 'A clear end to the work day, so your brain can clock off.', out: 'A five minute end-of-day ritual' },
]

const DESC = 'Single-session OT on the small things that make everything else easier: sleep, mornings, energy, mental load, transitions and switching off. Pick one or several, up to six sessions.'

function Picker() {
  const [picked, setPicked] = useState(['sleep', 'morning'])
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const plan = HINGES.filter((h) => picked.includes(h.id))
  const n = plan.length

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 560px', minWidth: 0 }}>
        <div className="svc-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {HINGES.map((h) => {
            const on = picked.includes(h.id)
            return (
              <button
                key={h.id} type="button" aria-pressed={on} onClick={() => toggle(h.id)}
                className="svc"
                style={{ borderTopColor: h.top, textAlign: 'left', cursor: 'pointer', font: 'inherit', background: on ? 'var(--black)' : undefined, color: on ? '#fff' : undefined }}
              >
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <span className={`label ${on ? '' : h.tone}`} style={on ? { color: 'var(--on-dark-accent)' } : undefined}>1 session</span>
                  <span aria-hidden="true" style={{ width: 26, height: 26, border: `2px solid ${on ? '#fff' : 'var(--black)'}`, display: 'grid', placeItems: 'center', fontWeight: 700, background: on ? 'var(--teal-brand)' : 'transparent', color: 'var(--black)' }}>{on ? '✓' : ''}</span>
                </span>
                <span className="cell-title" style={{ fontSize: '1.6rem', color: 'inherit' }}>{h.h}</span>
                <span className="cell-body" style={{ color: on ? 'var(--on-dark-soft)' : undefined }}>{h.p}</span>
                <span className="small" style={{ color: on ? '#fff' : 'var(--black)' }}><b>You leave with:</b> {h.out}</span>
              </button>
            )
          })}
        </div>
      </div>

      <aside className="book" style={{ flex: '1 1 300px', minWidth: 0, maxWidth: 420, position: 'sticky', top: 92 }} aria-live="polite">
        <div className="book-head">
          <span className="t">Your hinges</span>
          <span className="label">{n} of 6</span>
        </div>
        <div className="book-body">
          {n === 0 ? (
            <span className="small">Tap the hinges you want to work on. Pick one, a few or all six.</span>
          ) : (
            <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {plan.map((h, i) => (
                <li key={h.id} className="dots" style={{ borderBottomStyle: 'solid', borderBottomColor: 'var(--hair)' }}>
                  <span className={`step-n ${h.tone}`} style={{ fontSize: '1.3rem', width: 26 }}>{i + 1}</span>
                  <b>{h.h}</b>
                </li>
              ))}
            </ol>
          )}
          <div className="dots" style={{ borderBottom: 0, paddingTop: 0 }}>
            <b>Total</b><span className="fill"></span>
            <span className="price">{n} {n === 1 ? 'session' : 'sessions'}</span>
          </div>
          <BookButton big variant="btn--teal" />
          <span className="small">Not sure which ones? Bring your best guess to the free call and we'll sort the order together.</span>
        </div>
      </aside>
    </div>
  )
}

export default function SmallHinges() {
  return (
    <>
      <SEO
        title="Small Hinges Programs | Estus Health"
        description={DESC}
        path="/services/small-hinges"
        schema={[
          service({ name: 'Small Hinges Programs', description: DESC, path: '/services/small-hinges' }),
          breadcrumb([{ name: 'Home', path: '/' }, { name: 'Small Hinges Programs', path: '/services/small-hinges' }]),
        ]}
      />
      <PageHero
        eyebrow="Services · one session per hinge"
        title="Small hinges swing"
        accent="big doors."
        sub="Six small things that make everything else easier. Each one is a single session. Pick the ones you want, from one to all six."
      >
        <Btn href="#pick" big>Pick your hinges ▸</Btn>
        <Btn to="/services/occupational-therapy" variant="btn--ghost">Need ongoing OT instead?</Btn>
      </PageHero>

      <section id="pick" className="jump-target" aria-labelledby="pick-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SecIntro eyebrow="Build your own" title="Pick your hinges" id="pick-title" />
          <Picker />
        </div>
      </section>

      <section className="tint-section" aria-labelledby="how-title">
        <div className="wrap">
          <SecIntro eyebrow="How it runs" title="Short on purpose" id="how-title" />
          <div className="ruled">
            <div><span className="step-n c-navy" aria-hidden="true">1</span><b style={{ fontSize: '1.2rem' }}>Free call</b><span className="cell-body">Tell us which hinges you picked. We check the fit and the order.</span></div>
            <div><span className="step-n c-blue" aria-hidden="true">2</span><b style={{ fontSize: '1.2rem' }}>One session per hinge</b><span className="cell-body">Telehealth. Each session tackles one hinge and ends with something you use that week.</span></div>
            <div><span className="step-n c-teal" aria-hidden="true">3</span><b style={{ fontSize: '1.2rem' }}>Stop or add</b><span className="cell-body">After each one, keep going, add another hinge, or stop. Six is the most.</span></div>
            <div><span className="step-n c-plum" aria-hidden="true">4</span><b style={{ fontSize: '1.2rem' }}>A clear finish</b><span className="cell-body">You leave with a plan for each hinge. Ongoing OT is there if you want it.</span></div>
          </div>
        </div>
      </section>

      <CTABand
        title="Got your hinges?"
        body="Book the free call and bring your picks. 15 minutes, camera optional, no pressure to book."
        buttons={<BookButton big variant="btn--teal" />}
      />
    </>
  )
}
