import SEO, { breadcrumb } from '../../components/SEO'
import { PageHero, CTABand, Btn } from '../../components/Bits'

export default function EdsHsd() {
  return (
    <>
      <SEO
        title="EDS & Hypermobility | Estus Health"
        description="Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder: what they are, how they overlap with neurodivergence, and what OT support actually looks like."
        path="/resources/eds-hsd"
        type="article"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Free Resources', path: '/resources' },
          { name: 'EDS & Hypermobility', path: '/resources/eds-hsd' },
        ])}
      />

      <PageHero
        eyebrow="Learn · EDS · HSD · Hypermobility"
        title="When Your Body Bends Further Than It Should"
        sub2="Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder affect far more than your joints. They shape how you move, think, rest, and get through each day."
      >
        <Btn to="/resources/eds-hsd-quiz" big>Take the EDS/HSD Quiz</Btn>
        <Btn to="/contact" variant="btn--alt" big>Refer a Client</Btn>
      </PageHero>

      <section>
        <div className="wrap wrap--narrow">
          <p className="lead">
            If you're neurodivergent and hypermobile, you're managing two complex systems at
            once. Your brain works differently. Your connective tissue works differently. And
            the interaction between the two rarely gets addressed. This page is for people who
            are tired of being told they're "just flexible" or "just anxious," and want to
            understand what's actually going on.
          </p>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap">
          <div className="kv" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div>
              <div className="v" style={{ fontSize: '2.4rem' }}>50%+</div>
              <div className="s">of neurodivergent adults show elevated hypermobility</div>
            </div>
            <div>
              <div className="v" style={{ fontSize: '2.4rem' }}>5.6x</div>
              <div className="s">higher ADHD rates in people with EDS</div>
            </div>
            <div>
              <div className="v" style={{ fontSize: '2.4rem' }}>7.4x</div>
              <div className="s">higher autism rates in people with EDS</div>
            </div>
            <div>
              <div className="v" style={{ fontSize: '2.4rem' }}>75%</div>
              <div className="s">of EDS patients report severe fatigue</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap wrap--narrow">
          <div className="prose" style={{ maxWidth: 'none' }}>
            <span className="eyebrow eyebrow--teal">What it actually is</span>
            <h2>In Plain Language</h2>
            <p>
              Ehlers-Danlos Syndromes (EDS) are a group of inherited conditions that affect your
              connective tissue, the structural material that holds your body together. Collagen,
              the most abundant protein in your body, doesn't work the way it's supposed to. This
              means your joints, skin, blood vessels, organs, and fascia are all affected to
              varying degrees.
            </p>
            <p>
              Hypermobility Spectrum Disorder (HSD) sits on the same spectrum. Your joints move
              beyond the typical range, and this causes symptoms: pain, fatigue, instability,
              subluxations, and problems with your autonomic nervous system (the part of your
              body that controls automatic functions like heart rate, digestion, and temperature
              regulation).
            </p>
            <p>
              What most people don't hear about is the overlap with neurodivergence. Research now
              shows that over half of autistic and ADHD adults have clinically significant
              hypermobility. This isn't a coincidence. There appear to be shared genetic and
              neurological pathways linking connective tissue differences and neurodevelopmental
              conditions.
            </p>
            <p>
              For people living at this intersection, the experience compounds. Executive function
              challenges make pacing strategies harder to implement. Interoception differences mean
              pain and fatigue signals arrive late or all at once. Sensory sensitivities can make
              recommended supports feel intolerable. And the cognitive load of managing a complex
              body on top of a neurodivergent brain in a world designed for neither is immense.
            </p>
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--teal">Signs and experiences</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>What You Might Notice</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            These experiences are common in people with EDS, HSD, and related hypermobility
            conditions, especially when neurodivergence is also in the picture.
          </p>
          <div className="grid grid-3" style={{ marginTop: 36 }}>
            <article className="card">
              <h3>Fatigue that rest doesn't fix</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                You sleep eight hours and wake up feeling like you've run a marathon. Your energy
                budget is smaller than other people's, and it depletes faster than you expect.
              </p>
            </article>
            <article className="card">
              <h3>Pain that moves and fluctuates</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Your pain shifts between joints, muscles, and areas of your body. Some days are
                manageable. Others make basic tasks feel enormous. People might have told you it's
                "just growing pains" or stress.
              </p>
            </article>
            <article className="card">
              <h3>Brain fog that derails your day</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                You lose words mid-sentence. You walk into rooms and forget why. Cognitive tasks
                that used to be straightforward now take twice the effort, especially when you're
                physically symptomatic.
              </p>
            </article>
            <article className="card">
              <h3>Temperature and autonomic weirdness</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                You overheat easily, get dizzy when standing, have a racing heart for no reason,
                or feel nauseous after meals. Your autonomic nervous system, the "autopilot"
                functions, doesn't regulate well.
              </p>
            </article>
            <article className="card">
              <h3>Joints that bend too far or give way</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Your fingers hyperextend. Your knees lock back. Your shoulders feel unstable. You
                might subluxate (partially dislocate) doing ordinary things like reaching for a
                shelf or rolling over in bed.
              </p>
            </article>
            <article className="card">
              <h3>Interoception gaps</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                You don't notice hunger, thirst, pain, or the need to use the bathroom until it's
                urgent. Your body sends signals, but they're delayed, muted, or arrive all at once
                in a wave of overwhelm.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow eyebrow--teal">The diagnostic gap</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Why It Gets Missed</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            The average time to an EDS diagnosis is over a decade. For neurodivergent people, it
            can take even longer. Here's why.
          </p>
          <div className="grid grid-2" style={{ marginTop: 36 }}>
            <article className="card">
              <h3>"You're too young for this"</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Hypermobility is often dismissed in young people as flexibility or growing pains.
                Symptoms that start in childhood get normalised because you've never known anything
                different.
              </p>
            </article>
            <article className="card">
              <h3>"It's just anxiety"</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Autonomic symptoms like racing heart, dizziness, and nausea are frequently
                misattributed to anxiety disorders. The physical cause gets overlooked, and the
                person is told it's psychological.
              </p>
            </article>
            <article className="card">
              <h3>Masking hides the impact</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Neurodivergent people are often skilled at pushing through pain and fatigue because
                they've learned to mask difficulties. By the time they seek help, the crash cycle
                is deeply entrenched.
              </p>
            </article>
            <article className="card">
              <h3>Body and brain get treated separately</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Most healthcare systems treat physical symptoms and neurodevelopmental conditions
                in separate silos. The interaction between them, which is where most of the
                functional impact lives, falls through the gap.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--teal">The intersection</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>The Neurodivergence Connection</h2>
          <div className="prose" style={{ maxWidth: 'none', marginTop: 24 }}>
            <p>
              This is the part most healthcare providers miss entirely. Neurodivergent people with
              hypermobility aren't just dealing with two separate conditions side by side. The two
              interact in ways that make both harder to manage.
            </p>
            <p>
              Proprioception (your sense of where your body is in space) is often affected in both
              autism and hypermobility. Interoception (your ability to sense internal body signals)
              is frequently different in neurodivergent people, which means you might not register
              pain, fatigue, or dehydration until it's already a crisis. Sensory sensitivities can
              make common EDS supports like compression garments, bracing, or specific exercise
              programs feel unbearable.
            </p>
            <p>
              And the executive function demands of managing a complex health condition, tracking
              symptoms, attending appointments, pacing energy, advocating to medical professionals,
              are enormous. When your brain already finds planning, sequencing, and task initiation
              challenging, the load of managing EDS or HSD on top of that can feel impossible
              without the right support structures.
            </p>
          </div>
          <div className="callout" style={{ marginTop: 24 }}>
            <span className="badge badge--mauve">Research Snapshot</span>
            <h3 style={{ margin: '14px 0 12px', color: 'var(--heading)', fontFamily: 'var(--f-head)', textTransform: 'uppercase', fontSize: '1.1rem' }}>Key findings</h3>
            <ul style={{ color: 'var(--text-soft)', margin: 0, paddingLeft: '1.2em' }}>
              <li>Over 50% of autistic, ADHD, and Tourette's adults show clinically significant hypermobility, versus roughly 20% of the general population</li>
              <li>People with EDS are 5.6 times more likely to have an ADHD diagnosis</li>
              <li>A Swedish registry study found people with EDS were 7.4 times more likely to be autistic</li>
              <li>Hypermobility mediates increased pain and dysautonomia in neurodivergent populations</li>
              <li>Shared genetic pathways between EDS/HSD and autism have been identified at the molecular level</li>
            </ul>
            <p style={{ fontSize: '.85rem', fontStyle: 'italic', color: 'var(--text-soft)', margin: '14px 0 0' }}>
              Sources: Csecs et al. (2022), Frontiers in Psychiatry; Casanova et al. (2020), Journal of Personalized Medicine; Swedish National Registry (2016)
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow eyebrow--teal">What support looks like</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>What OT Actually Looks Like for EDS and HSD</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            We don't treat your joints. We treat your daily life. That means looking at how
            hypermobility, fatigue, pain, and neurodivergence interact across everything you need
            and want to do.
          </p>
          <div className="grid grid-2" style={{ marginTop: 36 }}>
            <article className="card">
              <h3>Energy management and pacing</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Building a sustainable daily rhythm that accounts for both your physical energy
                limits and your executive function capacity. Not just "rest more" but a system
                that actually works with your brain.
              </p>
            </article>
            <article className="card">
              <h3>Routine and environmental design</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Designing your physical space, daily routines, and task sequences to reduce demand
                on your joints, your nervous system, and your cognitive load simultaneously.
              </p>
            </article>
            <article className="card">
              <h3>Sensory and autonomic support</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Finding sensory strategies, compression options, and environmental modifications
                that your neurodivergent brain can actually tolerate, not the generic
                recommendations that feel awful.
              </p>
            </article>
            <article className="card">
              <h3>Cognitive load reduction</h3>
              <p style={{ color: 'var(--text-soft)', marginBottom: 0 }}>
                Reducing the executive function tax of managing a complex body: simplifying medical
                appointment systems, medication routines, self-advocacy scripts, and flare
                management protocols.
              </p>
            </article>
          </div>
          <p className="lead" style={{ marginTop: 32, fontStyle: 'italic' }}>
            This isn't about learning to push through. It's about designing your days so that
            pushing through isn't the only option.
          </p>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--teal">FAQ</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Common Questions</h2>
          <div className="prose" style={{ maxWidth: 'none', marginTop: 24 }}>
            <h3>What is the difference between EDS and HSD?</h3>
            <p>
              Ehlers-Danlos Syndromes (EDS) are a group of inherited connective tissue conditions.
              There are 13 subtypes, the most common being hypermobile EDS (hEDS), which has
              specific diagnostic criteria. Hypermobility Spectrum Disorder (HSD) describes
              symptomatic hypermobility that doesn't meet full hEDS criteria. Importantly, HSD is
              not a lesser diagnosis. Both can significantly affect daily function, and both benefit
              from the same occupational therapy strategies.
            </p>
            <h3>Why does an OT work with EDS and HSD, not just a physio?</h3>
            <p>
              Physiotherapy focuses on strengthening and stabilising joints, which is important.
              Occupational therapy focuses on how you actually do your daily activities, your
              routines, your energy, your environment, and the cognitive and emotional load of
              managing a complex body. We work on the whole picture: from how you set up your
              morning routine to how you manage fatigue across a work day to how you communicate
              your needs to the people around you.
            </p>
            <h3>I think I might have EDS or HSD. Can you diagnose me?</h3>
            <p>
              OTs don't diagnose EDS or HSD. Diagnosis typically comes from a rheumatologist,
              geneticist, or a GP with expertise in hypermobility. What we can do is help you
              understand how your body is affecting your daily function right now, regardless of
              where you are in the diagnostic process. You don't need a formal diagnosis to start
              working with us.
            </p>
            <h3>What does a neurodivergent person with EDS/HSD actually need from OT?</h3>
            <p>
              When you're managing both a neurodivergent brain and a hypermobile body, the load
              compounds. Executive function challenges make pacing harder. Interoception
              differences mean you might not notice pain or fatigue signals until you crash.
              Sensory sensitivities can make recommended supports (compression garments, exercises)
              intolerable. We build strategies that account for all of these layers, not just one
              at a time.
            </p>
            <h3>Do I need a referral or an NDIS plan?</h3>
            <p>
              No referral is needed to see us. We work with NDIS participants (both plan-managed
              and self-managed) and private clients. Telehealth sessions are available
              Australia-wide.
            </p>
            <h3>How is this different from what I'd get at a standard OT clinic?</h3>
            <p>
              Most OT clinics approach EDS and HSD from a purely physical angle, or they don't have
              experience with hypermobility at all. We specialise in the intersection of
              neurodivergence and complex health. That means we understand masking, demand
              avoidance, shutdown, sensory overload, and how all of those interact with a body that
              subluxates, fatigues, and needs careful management. We don't treat your brain and
              your body as separate problems.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow eyebrow--teal">Further reading</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Reputable Resources</h2>
          <p className="lead" style={{ marginTop: 16 }}>
            Trusted sources for learning more about EDS, HSD, and the neurodivergence connection.
          </p>
          <div className="grid grid-3" style={{ marginTop: 36 }}>
            <article className="card">
              <h3>The Ehlers Danlos Society</h3>
              <p style={{ color: 'var(--text-soft)' }}>
                "Joint Hypermobility Links Neurodivergence to Dysautonomia and Pain" in Frontiers
                in Psychiatry. The landmark study on hypermobility and neurodevelopmental conditions.
              </p>
              <Btn href="https://www.ehlers-danlos.com" variant="btn--ghost">Visit site</Btn>
            </article>
            <article className="card">
              <h3>Csecs et al. (2022) Research Paper</h3>
              <p style={{ color: 'var(--text-soft)' }}>
                Comprehensive resource for all EDS subtypes, diagnostic criteria, and management
                strategies. Includes an occupational therapy guide.
              </p>
              <Btn href="https://www.frontiersin.org/articles/10.3389/fpsyt.2021.786916/full" variant="btn--ghost">Read paper</Btn>
            </article>
            <article className="card">
              <h3>Ehlers-Danlos Support UK</h3>
              <p style={{ color: 'var(--text-soft)' }}>
                Practical guidance on physiotherapy, pacing strategies, and self-management for
                hypermobility. Excellent patient-facing resources.
              </p>
              <Btn href="https://www.ehlers-danlos.org" variant="btn--ghost">Visit site</Btn>
            </article>
          </div>
        </div>
      </section>

      <CTABand
        title="Your Body and Your Brain Deserve the Same Team"
        body="No referral needed. NDIS and private clients welcome. Telehealth available across Australia."
        buttons={<>
          <Btn to="/resources/eds-hsd-quiz" big>Take the EDS/HSD Quiz</Btn>
          <Btn to="/contact" variant="btn--alt" big>Refer a Client</Btn>
        </>}
      />
    </>
  )
}
