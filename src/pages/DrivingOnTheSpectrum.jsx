import { Link } from 'react-router-dom'
import SEO, { breadcrumb, service } from '../components/SEO'
import { PageHero, CTABand, Btn } from '../components/Bits'
import { Confetti } from '../components/Decor'
import { DRIVING_WAITLIST, GIVEWAY_APP } from '../lib/site'

/* ==========================================================================
   Driving On The Spectrum: Estus Health's driving occupational therapy
   service, in person across Perth and Esperance, WA. Two assessments (medical
   fitness to drive, potential to drive), what the on-road assessment covers,
   the learner driver pathway, then the free driving tools that used to live
   at /resources/driving-ot (now a 308 to this page).
   ========================================================================== */

const AREAS = ['Perth', 'Esperance']

const SERVICES = [
  {
    id: 'medical-fitness-to-drive',
    name: 'Medical fitness to drive',
    for: 'For licensed drivers, or people returning to driving, where a diagnosis, injury or health change might affect driving. Your doctor or the Department of Transport may have asked for one.',
    steps: [
      'An off-road assessment: your health and driving history, vision, physical abilities, thinking skills, and how you take in a busy scene.',
      'An on-road assessment in a dual-control car with a driving instructor, on roads you would actually drive.',
      'A written report with clear recommendations, for you and, with your consent, your doctor or the Department of Transport.',
    ],
    outcome: 'Recommendations might be to keep driving as you are, to drive with conditions, to do some lessons first, or to stop driving for now.',
  },
  {
    id: 'potential-to-drive',
    name: 'Potential to drive',
    for: 'For learners, or people about to start, who want to know whether they can learn to drive and what support it will take. Common for autistic and ADHD learners and people with an intellectual, learning or physical disability.',
    steps: [
      'A pre-drive assessment, off-road: your goals and driving history, hearing and communication, vision, physical abilities, and screening of the thinking skills driving draws on, including attention, planning, visual perception and road rules.',
      'Once you have your learner\'s permit, an on-road assessment in a dual-control car, with a driving instructor in the passenger seat and the OT observing. It starts on quiet streets, builds up only when you are ready, and doubles as your first driving lesson.',
      'A written report with a learning plan: how many specialised lessons we recommend, strategies for your instructor and supervising driver, and when to check your progress on the road again.',
    ],
    outcome: 'You leave knowing whether you have the potential to learn to drive, and exactly what support will get you there.',
  },
]

const WHO = [
  'Autistic and ADHD drivers and learners',
  'People with a physical, sensory or intellectual disability',
  'Drivers after a stroke, brain injury, or other health change',
  'Learners who have stalled, failed a test, or found lessons overwhelming',
  'Families, GPs, support coordinators and NDIS planners making a referral',
]

const STEPS = [
  ['Join the waitlist', 'Fill in the waitlist form for yourself or someone you support. Families, GPs, specialists and support coordinators can fill it in too. Tell us which assessment you need, or that you are not sure.'],
  ['Do the assessment', 'We meet you in Perth or Esperance. Both assessments include time on the road in a dual-control car with a driving instructor. For learners, that happens once you have your learner\'s permit.'],
  ['Get your report', 'We talk you through the results, then send a written report with recommendations and next steps.'],
]

// What the on-road assessment looks at, for both assessments.
const ON_ROAD = [
  ['Physical control', 'Setting up the seat and mirrors, the pedals, steering, and indicators, and using the controls without taking your attention off the road.'],
  ['Vehicle positioning', 'Lane position, turns, roundabouts, changing lanes and merging, and parking and other manoeuvres.'],
  ['Speed control', 'Keeping to the limit through school zones and changing speed zones, and adjusting your speed to the traffic and conditions.'],
  ['Observation', 'Scanning near and far, mirrors and blind spots, signs and signals, and staying on task when something distracting happens.'],
  ['Planning and judgement', 'Following directions, choosing safe gaps, working out right of way at intersections, and responding to hazards like pedestrians.'],
  ['How you learn', 'How you take in instructions and feedback, and what happens to your driving as the load goes up. For a learner, this matters more than polish.'],
]

// The learner driver pathway, start to licence. Potential to drive covers
// stages 2 and 4; the OT stays involved through stage 6.
const PATHWAY = [
  ['Medical clearance', 'You need to be at least 16. Your doctor completes a medical certificate clearing you for a driving assessment. The pre-drive assessment can come first if it helps that conversation.'],
  ['Pre-drive assessment', 'The off-road part of potential to drive. We can also do passenger activities with you and help you prepare for the learner\'s theory test.'],
  ['Learner\'s permit', 'You sit the theory test with the Department of Transport and get your learner\'s permit.'],
  ['On-road assessment', 'Your first lesson, with the OT and a driving instructor in a dual-control car. The instructor starts teaching you, with any aids, modifications or learning strategies you need.'],
  ['Lessons and practice', 'Lessons with an instructor experienced with neurodivergent learners, with progress checks on the road along the way. When you are ready, family can supervise practice to build your hours.'],
  ['Ready for your licence', 'An on-road re-assessment checks you are ready for your driving test. Your doctor completes a final medical certificate, with licence conditions if needed, and you go for your licence.'],
]

const WHY = [
  ['It is a whole-brain task', 'Driving asks you to scan, predict, decide, and move at the same time, while the scene keeps changing. Executive function, sensory processing, and motor planning all show up at once.'],
  ['Knowing the rule is not the skill', 'Plenty of learners can recite the give way rules and still freeze at a live intersection. Reading a page is nothing like reading a road.'],
  ['The load is invisible', 'Glare, engine noise, a talking passenger, an instructor watching. For a lot of neurodivergent drivers the sensory cost is the hard part, not the steering.'],
  ['It is a freedom task', 'A licence changes what work, study, and friendship look like. That is why it is worth practising properly, and why giving up on it costs so much.'],
]

const cardHead = { color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }

export default function DrivingOnTheSpectrum() {
  return (
    <>
      <SEO
        title="Driving On The Spectrum | Driving OT in Perth & Esperance | Estus Health"
        description="Driving occupational therapy in Perth and Esperance, WA. Medical fitness to drive and potential to drive assessments for neurodivergent drivers and learners, plus free driving tools."
        path="/driving-on-the-spectrum"
        schema={[
          ...SERVICES.map((s) => service({
            name: `${s.name} assessment`,
            description: s.for,
            path: `/driving-on-the-spectrum#${s.id}`,
            cities: AREAS,
            channel: 'In person in Perth and Esperance, Western Australia',
            telehealth: false,
          })),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Driving On The Spectrum', path: '/driving-on-the-spectrum' },
          ]),
        ]}
      />
      <PageHero eyebrow="Driving On The Spectrum" title="Driving is an occupation." accent="Train it like one."
        sub2="Driving occupational therapy across Perth and Esperance, WA."
        sub="Medical fitness to drive assessments for people who already drive, and potential to drive assessments for people getting ready to learn. Neuroaffirming, practical, and built around how you actually take in the road.">
        <Btn href={DRIVING_WAITLIST} big>Join the Waitlist ▸</Btn>
        <Btn to="/driving-on-the-spectrum#free-tools" variant="btn--alt" big>Free driving tools</Btn>
      </PageHero>

      {/* The two assessments */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">Assessments</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Two questions, two assessments.</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Am I safe to keep driving? Am I ready to start learning? Each has its own assessment.
          </p>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {SERVICES.map((s) => (
              <article className="card card--static jump-target" id={s.id} key={s.id}>
                <h3 style={cardHead}>{s.name}</h3>
                <p style={{ margin: 0 }}>{s.for}</p>
                <ul style={{ color: 'var(--text-soft)', paddingLeft: 20, margin: '16px 0', display: 'grid', gap: 8 }}>
                  {s.steps.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <p style={{ margin: 0, fontWeight: 600 }}>{s.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* On the road */}
      <section id="on-road" className="jump-target tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">On the road</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>What we look at on the road.</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            The on-road assessment shows how you actually drive in traffic, not just what you know. A driving
            instructor sits in the passenger seat with a dual brake and gives the directions, so the car stays safe
            while the OT watches how you handle real roads. It starts somewhere quiet and moves to busier traffic
            only when you are ready.
          </p>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {ON_ROAD.map(([h, p]) => (
              <article className="card card--static" key={h}>
                <h3 style={cardHead}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p>
              </article>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 32 }}>
            <p style={{ margin: 0 }}>
              <strong>Being new is expected.</strong> For a learner, the on-road assessment is not a test you pass or
              fail. It shows what you can already do, what needs teaching, and how you learn best, so your lessons
              start in the right place.
            </p>
          </div>
        </div>
      </section>

      {/* Learner driver pathway */}
      <section id="learner-pathway" className="jump-target">
        <div className="wrap">
          <span className="eyebrow">For learners</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>From learner to licence.</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Potential to drive is the start of a longer road. Here is the usual path, and where we fit in.
          </p>
          <div className="numgrid">
            {PATHWAY.map(([h, p], i) => (
              <article className="card" key={h}><div className="num" aria-hidden="true">{i + 1}</div><h3>{h}</h3><p>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Who this is for</span>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 22, display: 'grid', gap: 12 }}>
            {WHO.map((w) => (
              <li key={w} className="card card--static" style={{ padding: '16px 20px', color: 'var(--text-soft)' }}>{w}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Waitlist to report.</h2>
          <div className="numgrid">
            {STEPS.map(([h, p], i) => (
              <article className="card" key={h}><div className="num" aria-hidden="true">{i + 1}</div><h3>{h}</h3><p>{p}</p></article>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 32 }}>
            <p style={{ margin: 0 }}>
              <strong>Where we work:</strong> in person across the Perth metro area and in Esperance. Driving
              assessments are not available by telehealth. NDIS self-managed, plan-managed and private clients
              are welcome. <Link to="/contact">Contact us</Link> for current fees and Esperance dates.
            </p>
          </div>
        </div>
      </section>

      {/* Why driving is an OT thing */}
      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Why an OT cares about driving</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>It is not just a car thing.</h2>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {WHY.map(([h, p]) => (
              <article className="card" key={h}>
                <h3 style={cardHead}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Free tools, formerly the Driving OT resources page */}
      <section id="free-tools" className="jump-target">
        <Confetti kind="star" color="var(--teal)" size={38} anim="spin" style={{ top: 10, right: '5%' }} />
        <div className="wrap">
          <span className="eyebrow">Free driving tools</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Practise the thinking before the car.</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            Two free tools for learners, supervising drivers, and the OTs and instructors who teach them.
            No signup and nothing stored.
          </p>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            <article className="card card--static">
              <h3 style={cardHead}>Give Way! WA road rules arcade</h3>
              <p style={{ color: 'var(--text-soft)' }}>
                112 scenarios across give way rules, roundabouts, lights, signs, railway crossings, parking and more.
                Every scenario shows a top-down map and the view from your seat, and every answer is referenced back
                to Drive Safe, the Western Australian road users handbook. Hazard rounds ask you to find the danger first.
              </p>
              <Btn href={GIVEWAY_APP}>Play Give Way! ▸</Btn>
            </article>
            <article className="card card--static">
              <h3 style={cardHead}>What kind of learner driver are you?</h3>
              <p style={{ color: 'var(--text-soft)' }}>
                Three quick sections reveal your driver type, your hazard radar and focus, and your sensory style on
                the road, with practical tips to grow. The quiz shows where your attention goes. The arcade gives it
                something to practise on.
              </p>
              <Btn to="/resources/learner-driver-quiz">Take the quiz ▸</Btn>
            </article>
          </div>
          <p style={{ color: 'var(--text-soft)', marginTop: 24 }}>
            These are learning tools, not an assessment, and not legal advice. If you want to know whether you are
            ready or safe to drive, that is what the assessments above are for. Rules and page references come from
            Drive Safe (Department of Transport and Major Infrastructure). Always check the current handbook and the
            Road Traffic Code 2000.
          </p>
        </div>
      </section>

      <CTABand
        title="Ready to talk about driving?"
        body="Join the waitlist and tell us which assessment you are after. If you are not sure which one fits, say so and we will work it out with you. We will be in touch as places open."
        buttons={<><Btn href={DRIVING_WAITLIST} big>Join the Waitlist ▸</Btn><Btn to="/contact" variant="btn--alt" big>Contact Us</Btn></>}
      />
    </>
  )
}
