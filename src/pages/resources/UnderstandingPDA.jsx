import SEO, { breadcrumb } from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'

export default function UnderstandingPDA() {
  return (
    <>
      <SEO
        title="Understanding PDA | Estus Health"
        description="Pathological Demand Avoidance explained: what it is, how it shows up across different ages, and why traditional approaches often backfire."
        path="/resources/understanding-pda"
        type="article"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Free Resources', path: '/resources' },
          { name: 'Understanding PDA', path: '/resources/understanding-pda' },
        ])}
      />

      <PageHero
        eyebrow="Learn · PDA · Autism"
        title="Understanding PDA"
        sub2="Pathological Demand Avoidance: what it is, how it shows up, and what actually helps"
      />

      <section>
        <div className="wrap wrap--narrow">
          <p className="lead">
            PDA is a profile of autism where the nervous system perceives everyday demands as
            threats. It's not defiance or "bad behaviour." It's a survival response. And what
            helps isn't more structure. It's less pressure.
          </p>

          <div className="callout">
            <span className="badge badge--mauve">The short version</span>
            <p style={{ marginTop: 14, marginBottom: 0 }}>
              PDA (Pathological Demand Avoidance) is a profile of autism where the nervous
              system perceives everyday demands as threats. It's not defiance or "bad behaviour."
              It's a survival response. What helps isn't more structure. It's less pressure.
            </p>
          </div>

          <div className="prose" style={{ maxWidth: 'none' }}>
            <h2>What is PDA?</h2>
            <p>
              Pathological Demand Avoidance (PDA) is a profile of autism first described by
              Elizabeth Newson in the 1980s. The core feature is an anxiety-driven need to
              avoid demands, not out of defiance or laziness, but because demands feel
              genuinely threatening to the nervous system.
            </p>
            <p>
              The word "pathological" is contested. Many in the PDA community prefer terms
              like "Pervasive Drive for Autonomy" or simply "PDA profile." Whatever you call
              it, the experience is the same: ordinary expectations that most people navigate
              easily can feel impossible, overwhelming, or even dangerous.
            </p>
            <p>
              This isn't about being "oppositional." People with PDA often want to do the
              thing. They just can't, not when it's framed as a demand. The demand itself
              triggers a threat response.
            </p>

            <h2>How PDA Shows Up</h2>
            <h3>In Children</h3>
            <ul>
              <li><strong>School refusal</strong>: not "won't go" but genuinely can't. The demand of school attendance triggers overwhelm.</li>
              <li><strong>Meltdowns over "easy" tasks</strong>: brushing teeth, getting dressed, homework that they clearly know how to do.</li>
              <li><strong>Social masking</strong>: appearing to cope in public, then falling apart at home where it feels safe.</li>
              <li><strong>Role play and fantasy</strong>: using imaginative play to process demands or create control.</li>
            </ul>
            <h3>In Adults</h3>
            <ul>
              <li><strong>Burnout cycles</strong>: periods of pushing through followed by complete collapse.</li>
              <li><strong>Employment difficulties</strong>: struggling with workplace demands even when the work itself is enjoyable.</li>
              <li><strong>Avoiding even things you want to do</strong>: the demand itself is the problem, not the activity.</li>
              <li><strong>Difficulty with self-care</strong>: eating, showering, medical appointments become demands too.</li>
            </ul>

            <h2>PDA vs Other Presentations</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 0 24px' }}>
              <thead>
                <tr style={{ borderBottom: '3px solid var(--line)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 12px 12px 0', color: 'var(--heading)' }}>Feature</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--heading)' }}>PDA</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--heading)' }}>ODD</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 12px 12px 0', color: 'var(--text)', fontWeight: 700 }}>Root cause</td>
                  <td style={{ padding: 12, color: 'var(--text-soft)' }}>Anxiety / threat response</td>
                  <td style={{ padding: 12, color: 'var(--text-soft)' }}>Often trauma or conduct issues</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 12px 12px 0', color: 'var(--text)', fontWeight: 700 }}>Response to demands</td>
                  <td style={{ padding: 12, color: 'var(--text-soft)' }}>Avoidance driven by overwhelm</td>
                  <td style={{ padding: 12, color: 'var(--text-soft)' }}>Active defiance</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 12px 12px 0', color: 'var(--text)', fontWeight: 700 }}>What helps</td>
                  <td style={{ padding: 12, color: 'var(--text-soft)' }}>Reducing demands, autonomy</td>
                  <td style={{ padding: 12, color: 'var(--text-soft)' }}>Boundaries, consistency</td>
                </tr>
              </tbody>
            </table>
            <div className="callout">
              <p style={{ margin: 0 }}>
                <strong>Why this matters:</strong> PDA is frequently misdiagnosed as ODD, leading
                to interventions that make things worse.
              </p>
            </div>

            <h2>What Helps</h2>
            <h3>Low-Demand Approaches</h3>
            <p>This doesn't mean "no expectations." It means reducing unnecessary demands:</p>
            <ul>
              <li>Does this actually need to happen right now?</li>
              <li>Does it need to happen this way, or is there flexibility?</li>
              <li>What's the cost of not doing this vs forcing it?</li>
            </ul>
            <h3>Autonomy Over Compliance</h3>
            <ul>
              <li>Offering genuine choices (not "do this or else")</li>
              <li>Indirect language: "I wonder if..." instead of "You need to..."</li>
              <li>Letting the person set the pace where possible</li>
            </ul>
            <h3>What Backfires</h3>
            <ul>
              <li><strong>Reward charts</strong>: turn activities into demands with performance pressure</li>
              <li><strong>Consequences</strong>: escalate anxiety without addressing the root cause</li>
              <li><strong>Countdowns and timers</strong>: create urgency that increases threat response</li>
              <li><strong>Praise</strong>: can feel like pressure to repeat performance</li>
            </ul>

            <h2>How We Work With PDA at Estus Health</h2>
          </div>

          <div className="grid grid-3" style={{ marginTop: 24 }}>
            <article className="card">
              <h3>Low-Demand Therapy</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Our philosophy isn't about compliance. It's about reducing pressure until
                the next step feels possible, however long that takes.
              </p>
            </article>
            <article className="card">
              <h3>Gaming-Informed Approaches</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Traditional therapy is full of demands. Gaming-informed therapy meets people
                in a space that already feels safe.
              </p>
            </article>
            <article className="card">
              <h3>Lived Experience</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Our team have lived experience with Autism and PDA. We understand from the
                inside, not just from textbooks.
              </p>
            </article>
          </div>

          <h2 className="sec-head" style={{ marginTop: 64, fontSize: '1.6rem' }}>Related Reading</h2>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            <article className="card">
              <h3>Late Autism Diagnosis</h3>
              <p style={{ color: 'var(--text-soft)' }}>Why autism gets missed and what late diagnosis means.</p>
              <Btn to="/resources/late-autism-diagnosis" variant="btn--ghost">Read guide</Btn>
            </article>
            <article className="card">
              <h3>Executive Function &amp; Complex Health</h3>
              <p style={{ color: 'var(--text-soft)' }}>Managing POTS, hEDS, MCAS, or ME/CFS alongside neurodivergence.</p>
              <Btn to="/resources/executive-function-complex-health" variant="btn--ghost">Read guide</Btn>
            </article>
          </div>
        </div>
      </section>

      <CTABand
        title="Looking for PDA-Informed Support?"
        body="We understand why traditional approaches haven't worked. Our team specialises in support that actually helps."
        buttons={<>
          <ReferralButton big />
          <Btn to="/services/gaming-informed-therapy" variant="btn--alt" big>Gaming-Informed Therapy</Btn>
        </>}
      />
    </>
  )
}
