import SEO, { breadcrumb, service } from '../../components/SEO'
import { PageHero, Btn, CTABand, BookButton } from '../../components/Bits'
import { SecIntro } from '../Home'

/* Small Hinges Series: short OT programs, six sessions or less, each on one
   high-leverage area. "Small hinges swing big doors." */
const PROGRAMS = [
  { top: 'var(--navy)', tone: 'c-navy', h: 'Sleep Architecture', p: 'A wind-down that works for your brain, and a sleep window you can actually keep.' },
  { top: 'var(--blue)', tone: 'c-blue', h: 'Morning Architecture', p: 'Getting up and out the door without burning your energy before the day starts.' },
  { top: 'var(--teal-brand)', tone: 'c-teal', h: 'Energy Management', p: 'Spend energy on purpose, with rest built in rather than earned.' },
  { top: 'var(--plum-brand)', tone: 'c-plum', h: 'Cognitive Load Reduction', p: 'Fewer things to hold in your head, so the important ones get done.' },
  { top: 'var(--navy)', tone: 'c-navy', h: 'Transition Scaffolding', p: 'Easier switches between tasks, places and parts of the day.' },
  { top: 'var(--blue)', tone: 'c-blue', h: 'Shutdown Ritual', p: 'A clear end to the work day, so your brain can actually clock off.' },
]

const DESC = 'Short occupational therapy programs, six sessions or less, each on one area that unlocks the rest: sleep, mornings, energy, load, transitions and switching off.'

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
        eyebrow="Services · 6 sessions or less"
        title="Small hinges swing"
        accent="big doors."
        sub="Short, focused OT on one thing that makes everything else easier. A clear start, a clear end, and something you can feel at the end of it."
      >
        <BookButton big />
        <Btn to="/services/occupational-therapy" variant="btn--ghost">Need ongoing OT instead?</Btn>
      </PageHero>

      <section aria-labelledby="programs-title">
        <div className="wrap">
          <SecIntro eyebrow="The programs" title="Pick one hinge" id="programs-title" />
          <div className="svc-grid">
            {PROGRAMS.map((p) => (
              <article key={p.h} className="svc" style={{ borderTopColor: p.top }}>
                <span className={`label ${p.tone}`}>Up to 6 sessions</span>
                <h3 className="cell-title" style={{ fontSize: '1.5rem' }}>{p.h}</h3>
                <p className="cell-body" style={{ margin: 0 }}>{p.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-section" aria-labelledby="how-title">
        <div className="wrap">
          <SecIntro eyebrow="How it runs" title="Short on purpose" id="how-title" />
          <div className="ruled">
            <div><span className="step-n c-navy" aria-hidden="true">1</span><b style={{ fontSize: '1.2rem' }}>Free call</b><span className="cell-body">We work out which hinge matters most for you right now.</span></div>
            <div><span className="step-n c-blue" aria-hidden="true">2</span><b style={{ fontSize: '1.2rem' }}>Up to six sessions</b><span className="cell-body">Telehealth, one area, built around how your brain works.</span></div>
            <div><span className="step-n c-plum" aria-hidden="true">3</span><b style={{ fontSize: '1.2rem' }}>A clear finish</b><span className="cell-body">You leave with a plan you use. Ongoing OT is there if you want it.</span></div>
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure which one?"
        body="That's what the free call is for. 15 minutes, camera optional, no pressure to book."
        buttons={<BookButton big variant="btn--teal" />}
      />
    </>
  )
}
