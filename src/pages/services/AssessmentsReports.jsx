import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'

const OFFER = [
  ['Functional Capacity Assessments', 'Comprehensive assessment of your ability to perform daily activities, manage self-care, participate in work or study, and engage in community life. We assess what you can actually do on good days, bad days, and everything in between.', 'Often requested for NDIS applications, plan reviews, or other funding bodies.'],
  ['NDIS Reports', 'Reports written specifically for NDIS purposes, using the language and evidence base that reviewers need to see. We understand what the NDIA looks for and how to present information effectively.', 'For access requests, plan reviews, or supporting specific funding items.'],
  ['OT Progress Reports', 'Documentation of ongoing therapy: goals, progress, barriers, and recommendations. Useful for NDIS reporting, sharing with other providers, or just having a clear record of the work.', null],
  ['Home & Environment Assessments', 'Assessment of physical and sensory environments, identifying barriers, modifications, and supports that could improve daily functioning. Particularly useful for sensory profiles and executive function challenges.', null],
]

const APPROACH = [
  ['Low-demand process', 'We structure assessments to minimise overwhelm. No marathon sessions or unnecessary questioning.'],
  ['Accurate capacity representation', "We don't just assess you on a good day. We explore the full range of your capacity, including what happens when you're depleted or flaring."],
  ['Strengths alongside challenges', "Our reports include what's working, not just what's difficult. A full picture leads to better recommendations."],
  ['Practical recommendations', 'Every report ends with clear, actionable recommendations. Not generic suggestions, but specific next steps tailored to your situation.'],
]

const STEPS = [
  ['Initial Conversation', 'We discuss what you need the assessment for, gather background information, and plan how to structure sessions to work for you.'],
  ['Assessment Sessions', 'Usually 2 to 3 sessions depending on complexity. We combine conversation, observation, and standardised tools as appropriate. Breaks are always okay.'],
  ['Report Writing', 'We compile findings into a clear, professional report. Turnaround is typically 2 to 3 weeks depending on current workload.'],
  ['Feedback Session', "We talk through the report with you before finalising. You can ask questions, request clarifications, or flag anything that doesn't feel accurate."],
]

export default function AssessmentsReports() {
  return (
    <>
      <SEO
        title="Assessments & Reports | Estus Health"
        description="Functional capacity assessments, NDIS reports, and OT documentation from neuroaffirming occupational therapists in Perth. Clear, practical, and actionable."
        path="/services/assessments-reports"
      />
      <PageHero eyebrow="Services" title="Assessments & Reports" sub2="Documentation that translates into action"
        sub="Whether you need a functional capacity assessment, NDIS report, or documentation for another purpose, we create clear, practical reports that capture the full picture and translate into meaningful recommendations.">
        <ReferralButton big />
      </PageHero>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">What we offer</span>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {OFFER.map(([h, p, note]) => (
              <article className="card" key={h}>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p>
                {note && <p style={{ marginTop: 12, marginBottom: 0 }}><span className="badge badge--ghost">{note}</span></p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Our approach to assessments</span>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {APPROACH.map(([h, p]) => (
              <article className="card" key={h}><h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1rem', marginBottom: 8 }}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">What to expect</span>
          <div className="numgrid" style={{ marginTop: 32, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {STEPS.map(([h, p], i) => (
              <article className="card" key={h}><div className="num" aria-hidden="true">{i + 1}</div><h3>{h}</h3><p>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Need an assessment?"
        body="Get in touch to discuss what you need and we'll let you know how we can help."
        buttons={<><ReferralButton big /><Btn to="/contact" variant="btn--alt" big>For Support Coordinators</Btn></>}
      />
    </>
  )
}
