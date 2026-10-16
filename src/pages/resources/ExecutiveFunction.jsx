import SEO, { breadcrumb } from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'

export default function ExecutiveFunction() {
  return (
    <>
      <SEO
        title="Executive Function & Chronic Illness | Estus Health"
        description="Managing POTS, hEDS, MCAS, ME/CFS, or chronic pain alongside neurodivergence? Here's why executive function takes the hit."
        path="/resources/executive-function-complex-health"
        type="article"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Free Resources', path: '/resources' },
          { name: 'Executive Function & Complex Health', path: '/resources/executive-function-complex-health' },
        ])}
      />

      <PageHero
        eyebrow="Learn · Executive Function · Chronic Illness"
        title="Executive Function & Chronic Illness"
        sub2="Managing life with POTS, hEDS, MCAS, ME/CFS and neurodivergence"
      />

      <section>
        <div className="wrap wrap--narrow">
          <p className="lead">
            When you're managing multiple conditions alongside autism or ADHD, everything
            competes for the same limited energy. The solution isn't "try harder." It's
            building systems that account for your actual capacity.
          </p>

          <div className="callout">
            <span className="badge badge--mauve">The short version</span>
            <p style={{ marginTop: 14, marginBottom: 0 }}>
              Executive function (your brain's ability to plan, start, and finish tasks) doesn't
              exist in isolation. When you're managing conditions like POTS, hEDS, MCAS, or ME/CFS
              alongside neurodivergence, everything competes for the same limited energy. The
              solution isn't "try harder." It's building systems that account for your actual capacity.
            </p>
          </div>

          <div className="prose" style={{ maxWidth: 'none' }}>
            <h2>What is Executive Function?</h2>
            <p>
              Executive function is your brain's control centre, the set of cognitive processes
              that help you plan, prioritise, start tasks, stay focused, and manage your time and
              emotions. It includes:
            </p>
            <ul>
              <li><strong>Working memory:</strong> holding information while you use it</li>
              <li><strong>Task initiation:</strong> actually starting things</li>
              <li><strong>Planning and prioritising:</strong> figuring out what to do and in what order</li>
              <li><strong>Cognitive flexibility:</strong> switching between tasks or adapting when plans change</li>
              <li><strong>Emotional regulation:</strong> managing feelings so they don't derail you</li>
            </ul>
            <p>
              For autistic and ADHD brains, executive function is often already harder. The
              prefrontal cortex, where much of this processing happens, works differently.
              This isn't a character flaw. It's neurology.
            </p>

            <h2>The Overlap: Why These Conditions Travel Together</h2>
            <p>
              If you're autistic or have ADHD and also have one or more of POTS, hEDS, MCAS,
              or ME/CFS, you're not imagining the connection. Research is increasingly showing
              that these conditions cluster together at rates far higher than chance.
            </p>
          </div>

          <div className="grid grid-2" style={{ marginTop: 24 }}>
            <article className="card">
              <h3>hEDS: Hypermobile Ehlers-Danlos Syndrome</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                A connective tissue disorder causing joint hypermobility, chronic pain, and fatigue.
                Studies show significantly higher rates of autism and ADHD in people with hEDS. The
                connective tissue differences may affect how the nervous system develops and functions.
              </p>
            </article>
            <article className="card">
              <h3>POTS: Postural Orthostatic Tachycardia Syndrome</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                A form of dysautonomia where your heart rate increases abnormally when you stand.
                This causes dizziness, brain fog, fatigue, and difficulty concentrating. POTS and
                autism share links through the autonomic nervous system, the same system involved
                in sensory processing differences.
              </p>
            </article>
            <article className="card">
              <h3>MCAS: Mast Cell Activation Syndrome</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                A condition where mast cells release too many chemical mediators, causing
                inflammation throughout the body. Symptoms include brain fog, fatigue, pain,
                and cognitive difficulties. The inflammation directly affects brain function
                and executive capacity.
              </p>
            </article>
            <article className="card">
              <h3>ME/CFS: Myalgic Encephalomyelitis / Chronic Fatigue Syndrome</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                A complex, chronic illness characterised by profound fatigue, post-exertional
                malaise (PEM), and cognitive dysfunction. ME/CFS doesn't just make you tired.
                It fundamentally limits how much cognitive and physical energy you have available.
              </p>
            </article>
          </div>

          <div className="prose" style={{ maxWidth: 'none' }}>
            <p style={{ marginTop: '1.6em' }}>
              The common thread? These conditions all affect the resources your brain needs to
              function, whether through dysautonomia, inflammation, energy production, or
              connective tissue differences. When you add neurodivergence to the mix, you're
              working with a system that was already running on different parameters.
            </p>

            <h2>What This Actually Looks Like Day-to-Day</h2>
            <h3>Knowing what to do but not being able to start</h3>
            <p>
              The task is clear. The steps are clear. Your body won't move. This isn't laziness.
              It's a disconnect between intention and initiation that's compounded by physical
              symptoms. When your heart rate spikes just from standing, starting anything feels
              like climbing a mountain.
            </p>
            <h3>Decision fatigue before you've made a single decision</h3>
            <p>
              When your baseline is already depleted by managing symptoms, monitoring how your
              body feels, and compensating for brain fog, there's nothing left for choosing
              what to eat or which email to answer first.
            </p>
            <h3>The "good day" trap</h3>
            <p>
              You feel better, so you do more. Then you crash. Then you rest. Then you feel
              better, so you do more. This boom-bust cycle is exhausting and demoralising,
              especially when people around you see your "good days" and assume that's your
              real capacity.
            </p>
            <h3>Medical admin as a part-time job</h3>
            <p>
              Managing multiple conditions means managing multiple specialists, medications,
              appointments, and endless forms. This coordination load uses up executive
              function that you don't have spare, often before you've even started on the
              things you actually want to do.
            </p>

            <h2>Why "Just Use a Planner" Doesn't Work</h2>
            <p>
              Most productivity advice is built for healthy neurotypical brains with consistent
              energy. When you have fluctuating capacity, the standard tools often make things worse:
            </p>
            <ul>
              <li><strong>Planners assume consistent capacity.</strong> They don't account for the day your POTS is flaring and you can't sit upright, or the MCAS reaction that wipes out your afternoon.</li>
              <li><strong>To-do lists can become shame lists.</strong> When you can't complete what you planned, the list becomes evidence of failure rather than a helpful tool.</li>
              <li><strong>Time management doesn't address the real problem.</strong> The issue isn't usually managing time. It's managing energy, symptoms, and the gap between intention and action.</li>
            </ul>
            <p>
              The graveyard of abandoned planners, apps, and systems isn't evidence that you're
              failing. It's evidence that those tools weren't built for your situation.
            </p>

            <h2>What Actually Helps</h2>
            <h3>Energy Accounting (Not Time Management)</h3>
            <p>
              Instead of planning by time, plan by energy. What do you have available today,
              not in an ideal world, but right now? This might mean categorising tasks by
              energy cost (low, medium, high) rather than by time required.
            </p>
            <p>
              Some people find spoon theory helpful. Others prefer thinking in terms of
              "energy budget" or "capacity units." The framework matters less than the
              principle: your energy is finite and fluctuating, and acknowledging that
              isn't giving up. It's being strategic.
            </p>
            <h3>Externalising Executive Function</h3>
            <p>If your brain can't hold onto things, don't ask it to. Move executive function outside your head:</p>
            <ul>
              <li><strong>Body doubling:</strong> having another person present (even virtually) while you work</li>
              <li><strong>Visual cues:</strong> putting things where you'll see them, not where they "belong"</li>
              <li><strong>Automation:</strong> recurring orders, automatic payments, scheduled reminders</li>
              <li><strong>Resistance Breaker support:</strong> someone to help bridge the gap between knowing and doing</li>
            </ul>
            <h3>Pacing Strategies That Respect PEM</h3>
            <p>
              Post-exertional malaise (PEM) means that overdoing it today creates a crash
              tomorrow, or in two days, or three. This delayed consequence makes it hard to
              learn pacing intuitively.
            </p>
            <p>
              Effective pacing often means stopping before you feel you need to. It means
              building in rest as a scheduled, non-negotiable part of your day, not as a
              reward for productivity. This is counterintuitive for most people, and
              especially hard when you've spent your life pushing through.
            </p>
            <h3>Reducing Decisions, Not Adding Tools</h3>
            <p>Every decision costs energy. The goal isn't to optimise decision-making. It's to make fewer decisions:</p>
            <ul>
              <li>Same breakfast every day (or rotating between 2 to 3 options)</li>
              <li>Clothes laid out the night before (or a capsule wardrobe)</li>
              <li>Default answers for common requests ("I'll get back to you" buys time)</li>
              <li>Pre-made decisions for bad days (what to eat, what to watch, who to text)</li>
            </ul>

            <h2>How We Support Executive Function at Estus Health</h2>
            <p>
              Our approach starts with understanding your whole picture, not just the neurodivergence,
              but the conditions that travel with it. We don't treat executive function in isolation.
            </p>
          </div>

          <div className="grid grid-3" style={{ marginTop: 24 }}>
            <article className="card">
              <h3>Functional Capacity Assessment</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                We assess what you can actually do, on good days, bad days, and everything in
                between. This isn't about diagnosis. It's about understanding your real capacity
                so we can build systems that work.
              </p>
            </article>
            <article className="card">
              <h3>Systems Built Around Fluctuating Capacity</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                We help you design routines, environments, and supports that flex with your
                energy. Not rigid systems that break when you have a flare, but adaptable ones
                that have "bad day" modes built in.
              </p>
            </article>
            <article className="card">
              <h3>Coordination With Your Other Providers</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Managing multiple conditions often means managing multiple practitioners. We
                communicate clearly with your other providers so everyone's working from the
                same page, and you're not stuck being the messenger.
              </p>
            </article>
          </div>

          <h2 className="sec-head" style={{ marginTop: 64, fontSize: '1.6rem' }}>Related Reading</h2>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            <article className="card">
              <h3>Understanding PDA</h3>
              <p style={{ color: 'var(--text-soft)' }}>Pathological Demand Avoidance and why traditional approaches often backfire.</p>
              <Btn to="/resources/understanding-pda" variant="btn--ghost">Read guide</Btn>
            </article>
            <article className="card">
              <h3>Late Autism Diagnosis</h3>
              <p style={{ color: 'var(--text-soft)' }}>Why autism gets missed and what late diagnosis means for understanding yourself.</p>
              <Btn to="/resources/late-autism-diagnosis" variant="btn--ghost">Read guide</Btn>
            </article>
          </div>
        </div>
      </section>

      <CTABand
        title="Need Support With Executive Function?"
        body="Whether you're managing multiple conditions or just finding that standard approaches don't work for your brain, we're here to help build something that does."
        buttons={<>
          <ReferralButton big />
          <Btn to="/services/occupational-therapy" variant="btn--alt" big>Learn About Our Support</Btn>
        </>}
      />
    </>
  )
}
