import SEO, { breadcrumb, service } from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'

const WHO = [
  'Autistic adults and teens seeking neuroaffirming support',
  "People with PDA profiles where traditional approaches haven't worked",
  'Anyone struggling with executive function, daily routines, or self-care',
  'People navigating late diagnosis and understanding their needs',
  'Those managing chronic conditions alongside neurodivergence',
]

const WORK = [
  ['Daily Living Skills', 'Morning routines, meal preparation, household management, and personal care. Building systems that work for your brain.'],
  ['Executive Function', 'Task initiation, planning, prioritising, time management, and bridging the gap between knowing and doing.'],
  ['Sensory Regulation', 'Understanding your sensory profile, identifying triggers, and building environments and routines that support regulation.'],
  ['Work & Study Support', 'Accommodations, workspace setup, managing workload, and strategies for sustainable productivity.'],
  ['Emotional Regulation', 'Understanding emotional responses, building coping strategies, and creating conditions that support stability.'],
  ['Life Transitions', 'Moving out, starting work, navigating diagnosis, or any major change. Support through transitions.'],
]

export default function OccupationalTherapy() {
  return (
    <>
      <SEO
        title="Occupational Therapy | Estus Health"
        description="Neuroaffirming occupational therapy in Perth and telehealth Australia-wide. Executive function, sensory regulation, daily living, and work support that works with your brain."
        path="/services/occupational-therapy"
        schema={[
          service({
            name: 'Occupational Therapy',
            description: 'Neuroaffirming occupational therapy for autistic adults and teens, PDA profiles, and ADHD. Executive function, sensory regulation, daily living skills, and work or study support.',
            path: '/services/occupational-therapy',
          }),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Occupational Therapy', path: '/services/occupational-therapy' },
          ]),
        ]}
      />
      <PageHero eyebrow="Services" title="Occupational Therapy" sub2="Functional support that respects who you are"
        sub="Occupational therapy is about helping people do the things they need and want to do in their daily lives. For neurodivergent people, that means therapy that works with your brain, not against it.">
        <ReferralButton big />
      </PageHero>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <div className="prose">
            <h2>What is OT?</h2>
            <p>Occupational therapy (OT) focuses on function: your ability to do the activities that matter to you, from self-care and household tasks to work, study, and leisure. "Occupation" in this context means anything that occupies your time and has meaning to you.</p>
            <p>For autistic people and those with other neurodivergent profiles, OT can address challenges with sensory processing, executive function, daily routines, emotional regulation, and participation in life activities, all while respecting who you are.</p>
          </div>
        </div>
      </section>

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

      <section>
        <div className="wrap">
          <span className="eyebrow">What we can work on together</span>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {WORK.map(([h, p]) => (
              <article className="card" key={h}><h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Funding & Fees</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Occupational Therapy: $193.99/hr</h2>
          <div className="prose" style={{ marginTop: 14 }}>
            <p>This rate applies to NDIS participants (Capacity Building: Improved Daily Living), self-managed, and private pay clients.</p>
            <p>Sessions are typically 1 hour. We offer both in-person sessions (Perth metro) and telehealth Australia-wide.</p>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to get started?"
        body="We'd love to hear from you. Whether you're self-referring or coming through a support coordinator, the first step is the same."
        buttons={<><ReferralButton big /><Btn to="/contact" variant="btn--alt" big>For Support Coordinators</Btn></>}
      />
    </>
  )
}
