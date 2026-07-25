import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'
import { Confetti } from '../../components/Decor'
import { GIVEWAY_APP } from '../../lib/site'

/* ==========================================================================
   Driving OT: the free driving resources hub. Scope note for future edits:
   this page is about learning and preparation only. Formal fitness-to-drive
   and occupational therapy driver assessments require a credentialled OT
   driver assessor, so nothing here should imply Estus performs them.
   ========================================================================== */

const WHY = [
  ['It is a whole-brain task', 'Driving asks you to scan, predict, decide, and move at the same time, while the scene keeps changing. Executive function, sensory processing, and motor planning all show up at once.'],
  ['Knowing the rule is not the skill', 'Plenty of learners can recite the give way rules and still freeze at a live intersection. Reading a page is nothing like reading a road.'],
  ['The load is invisible', 'Glare, engine noise, a talking passenger, an instructor watching. For a lot of neurodivergent drivers the sensory cost is the hard part, not the steering.'],
  ['It is a freedom task', 'A licence changes what work, study, and friendship look like. That is why it is worth practising properly, and why giving up on it costs so much.'],
]

const STEPS = [
  ['See the scene', 'Every scenario is drawn twice: a top-down map of who is where, and the view from your seat. You get the picture before you get the question.'],
  ['Spot the hazard', 'On hazard rounds you click the danger in the driver\'s view before you answer. That is the scanning habit that transfers to the car.'],
  ['Learn the rule', 'Answer, then read why. Each explanation names the rule and the Drive Safe page it comes from, so you can go check it yourself.'],
]

const WHO = [
  'Learner drivers working toward the WA theory test or a driving assessment',
  'Autistic and ADHD learners who want to rehearse the thinking before rehearsing the car',
  'Adults returning to driving after a break, a burnout, or a health change',
  'Parents and supervising drivers who want something to talk through together',
  'OTs, driving instructors, and support workers looking for a free teaching tool',
]

export default function DrivingOT() {
  return (
    <>
      <SEO
        title="Driving OT | Free Driving Resources | Estus Health"
        description="Driving is one of the most complex everyday occupations there is. Free WA road rules arcade, learner driver quiz, and neuroaffirming driving resources from Estus Health."
        path="/resources/driving-ot"
      />
      <PageHero eyebrow="Driving OT" title="Driving is an occupation." accent="Train it like one."
        sub2="Free driving resources, built by occupational therapists in Perth."
        sub="Reading a handbook and reading a road are two different skills. These tools work on the second one: seeing the scene, spotting the hazard, and choosing the safe move before you are doing it at 60km/h.">
        <Btn href={GIVEWAY_APP} big>Play Give Way! ▸</Btn>
        <Btn to="/resources/learner-driver-quiz" variant="btn--alt" big>Learner Driver Quiz</Btn>
      </PageHero>

      {/* The arcade */}
      <section id="give-way" className="jump-target" style={{ paddingTop: 0 }}>
        <Confetti kind="star" color="var(--teal)" size={38} anim="spin" style={{ top: 10, right: '5%' }} />
        <div className="wrap">
          <span className="eyebrow">The Arcade</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Give Way!</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            A free WA road rules arcade. 112 scenarios across give way rules, roundabouts, lights, signs and lines,
            sharing the road, speed, railway crossings, parking, overtaking, emergencies, and defensive driving.
            Every rule is referenced back to Drive Safe, the Western Australian road users handbook.
          </p>
          <div className="callout" style={{ marginTop: 26 }}>
            <p style={{ marginTop: 0 }}>
              You get two views of every scenario: a top-down map showing who is where and where they want to go,
              and the view from your own windscreen. Pick your answer, then read the rule behind it. Hazard rounds
              ask you to find the danger in the driver's view first.
            </p>
            <p style={{ marginBottom: 0, color: 'var(--text-soft)' }}>
              Free, no signup, nothing stored. Works on a phone, a tablet, or a laptop.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20 }}>
              <Btn href={GIVEWAY_APP} big>Play Give Way! ▸</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">How it works</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Three moves per scenario.</h2>
          <div className="numgrid" style={{ marginTop: 32 }}>
            {STEPS.map(([h, p], i) => (
              <article className="card" key={h}><div className="num" aria-hidden="true">{i + 1}</div><h3>{h}</h3><p>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* Why driving is an OT thing */}
      <section>
        <div className="wrap">
          <span className="eyebrow">Why an OT cares about driving</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>It is not just a car thing.</h2>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {WHY.map(([h, p]) => (
              <article className="card" key={h}>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Who these are for</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Anyone learning the road.</h2>
          <ul className="prose" style={{ marginTop: 20 }}>
            {WHO.map((w) => <li key={w}>{w}</li>)}
          </ul>
          <div className="callout">
            <p style={{ margin: 0 }}>
              These are learning tools, not an assessment. They will not tell you whether you are safe to drive,
              and they are not legal advice. A formal fitness-to-drive or on-road assessment is done by a
              credentialled occupational therapy driver assessor. If you are not sure whether you need one,
              ask us and we will point you in the right direction.
            </p>
          </div>
          <p style={{ color: 'var(--text-soft)' }}>
            Rules and page references come from Drive Safe, a handbook for Western Australian road users
            (Department of Transport and Major Infrastructure). Always check the current handbook and the
            Road Traffic Code 2000.
          </p>
        </div>
      </section>

      {/* Pair it with the quiz */}
      <section>
        <div className="wrap wrap--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow">Start with your style</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>What kind of learner driver are you?</h2>
          <p className="lead" style={{ margin: '14px auto 0' }}>
            Three quick sections reveal your driver type, your hazard radar and focus, and your sensory style on the
            road, plus practical tips to grow. It pairs well with the arcade: the quiz tells you where your attention
            goes, the arcade gives it something to do.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <Btn to="/resources/learner-driver-quiz" big>Take the quiz ▸</Btn>
          </div>
        </div>
      </section>

      <CTABand
        title="Driving is one piece of a bigger picture."
        body="If getting on the road is part of a larger goal, independence, work, study, or just getting to the things you care about, that is occupational therapy work. We are here for it."
        buttons={<><ReferralButton big /><Btn to="/services/occupational-therapy" variant="btn--alt" big>Our OT Services</Btn></>}
      />
    </>
  )
}
