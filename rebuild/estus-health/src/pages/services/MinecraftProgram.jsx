import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'

const CHIPS = ['PvP disabled', 'Whitelisted access', 'Infrastructure focus', 'Two servers available']

const BUILD = [
  ['Collaborative Builds', 'Shared infrastructure projects where participants contribute at their own pace. Railway networks, shared storage systems, town planning. Each build has natural decision points that practise negotiation, planning, and compromise.'],
  ['Engineering & Automation (Java)', 'The All of Create modpack gives participants access to mechanical systems, conveyor belts, trains, and processing chains. Designing a working factory is genuine problem-solving with visible outcomes.'],
  ['Resource & Project Management', 'Gathering, allocating, and managing resources across a shared project is executive function in action. Participants learn to plan ahead, coordinate with others, and adapt when things go wrong.'],
]

const WHO = [
  ['Young people who find face-to-face social settings overwhelming', 'The server provides a way to participate socially without the sensory and performance demands of in-person interaction. Conversations happen alongside shared activity, not as the main event.'],
  ['Participants who have had negative experiences in competitive gaming', 'PvP is off. Griefing is not tolerated. The server rules are clear, the moderation is active, and the culture is collaborative. This is a space where everyone builds, nobody destroys.'],
  ['Young people working on executive function, planning, or collaboration', 'Building projects require sequencing, resource management, and working alongside others. These skills transfer to real-world contexts because they are practised in a motivating, low-stakes environment.'],
  ['Clients already engaged in gaming-informed therapy at Estus Health', 'The server extends your OT sessions into a between-session space where skills can be practised in a natural context. Your clinician can observe progress over time and adjust therapy goals accordingly.'],
]

const STEPS = [
  ['Start with an OT session', 'The Minecraft Program is part of our gaming-informed therapy model. Your clinician will discuss whether it is a good fit during your initial sessions and help set goals that the server environment supports.'],
  ['Choose your server', 'If you play Java Edition on PC and want the modded experience, you will join the Java server running All of Create. If you play on console, tablet, mobile, or prefer vanilla Minecraft, you will join the Bedrock server.'],
  ['Get whitelisted', 'Both servers are private. Once your clinician confirms you are ready, we will add your gamertag to the whitelist. You will receive the server details, the rules, and a brief orientation.'],
  ['Build, connect, grow', 'Log on when you want. Join a build project. Start your own. The server is available between sessions as a space to practise skills and connect with others in the community.'],
]

const EXPECT = [
  ['Session integration', 'The server complements your OT sessions. Your clinician may set specific goals for server participation, observe your interactions, or use server activity as a starting point for session conversations.'],
  ['Moderation and safety', 'Both servers are whitelisted and monitored. We have clear rules around respectful communication, building etiquette, and server conduct. Breaches are addressed directly with the participant and their family.'],
  ['Technical setup', 'For the Java server, you will need to install the All of Create modpack via CurseForge. We provide step-by-step instructions. For the Bedrock server, no special setup is needed, just enter the server address.'],
  ['Funding', 'The Minecraft Program runs as part of your funded OT sessions through NDIS Improved Daily Living (Capacity Building). Server access itself does not have a separate fee.'],
]

const FAQ = [
  ['Does my child need their own Minecraft account?', 'Yes. For Java Edition, you need a Minecraft: Java Edition account (purchased through minecraft.net). For Bedrock Edition, you need the version for your platform (available through the Microsoft Store, PlayStation Store, Nintendo eShop, or App Store). We can help troubleshoot setup during a session.'],
  ['What is the All of Create modpack?', 'All of Create is a popular modpack built around the Create mod, which adds mechanical engineering, automation, trains, and factory-building tools to Minecraft. It includes over 50 addons and has been downloaded over a million times on CurseForge. It runs on Java Edition only.'],
  ['Why is PvP turned off?', 'Our servers focus on collaborative building. Turning off PvP removes the anxiety and conflict that competitive environments create. Participants can focus on building, planning, and connecting without worrying about being attacked. This is a deliberate clinical decision.'],
  ['Can my child play on the Bedrock server from their iPad or Switch?', 'Yes. The Bedrock server supports PC (Windows 10/11), Xbox, PlayStation, Nintendo Switch, and mobile devices (iOS and Android). That is the whole point of running a separate Bedrock server, to make sure no one is excluded because of their device.'],
  ['Is the server monitored?', 'Yes. Both servers are whitelisted (only approved participants can join) and clinician-moderated. We have server logs, clear rules, and an active moderation approach. This is a therapeutic environment, not a public server.'],
  ['Do we need to be existing Estus Health clients?', 'Yes. The Minecraft Program is part of our gaming-informed therapy model and requires active engagement with an Estus Health clinician. Server access is integrated into your therapy plan, not a standalone service.'],
]

export default function MinecraftProgram() {
  return (
    <>
      <SEO
        title="Minecraft Program | Estus Health"
        description="Clinician-facilitated Minecraft servers for neurodivergent young people. Java and Bedrock, whitelisted, PvP off. Executive function and collaboration through shared building."
        path="/services/minecraft-program"
      />
      <PageHero eyebrow="Services" title="Minecraft Program" badge="April 2026: New modpack, new Bedrock server"
        sub2="A space to build, connect, and just be yourself."
        sub="Our Minecraft servers are clinician-facilitated environments where neurodivergent young people practise executive function, collaboration, and communication through shared building projects. No PvP. No pressure. Just meaningful participation on your terms.">
        <ReferralButton big>Get Started ▸</ReferralButton>
        <Btn to="/services/gaming-informed-therapy" variant="btn--alt" big>Gaming-Informed Therapy</Btn>
      </PageHero>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <p className="sub sub--italic" style={{ color: 'var(--text-soft)' }}>Not a reward system. Not a bribe. A genuine community where gaming is the medium and growth happens naturally.</p>
          <div className="prose" style={{ marginTop: 20 }}>
            <h2>What the program is</h2>
            <p>We run two Minecraft servers as part of our gaming-informed therapy model. One runs Java Edition with a full modpack. The other runs Bedrock Edition for cross-platform access. Both are private, whitelisted, and clinician-moderated.</p>
            <p>This is not a social skills group dressed up as gaming. The server is a genuine digital third space where participants build, problem-solve, and connect at their own pace. Clinicians observe, scaffold, and facilitate, but the environment is participant-led. We structure the server around collaborative infrastructure builds, not competition. PvP is turned off. The focus is on creating something together.</p>
          </div>
          <p className="pullquote">He logs on to build with the group more than he talks to anyone at school. This is where his friendships actually happen. <span style={{ display: 'block', fontFamily: 'var(--f-body)', fontSize: '.9rem', fontWeight: 600, color: 'var(--text-soft)', marginTop: 8 }}>Parent of a participant, age 14</span></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {CHIPS.map((c) => <span className="badge" key={c}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* Two servers */}
      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Two servers</span>
          <p className="lead" style={{ marginTop: 16 }}>We run a Java Edition server for the full modded experience and a Bedrock Edition server for cross-platform access. Both are private, safe, and clinician-moderated.</p>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            <article className="card">
              <span className="badge">Modded</span>
              <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', margin: '12px 0 8px' }}>Java Edition Server</h3>
              <p style={{ color: 'var(--text-soft)' }}>Our primary server runs the All of Create modpack, a Create mod experience with 50+ addons focused on engineering, automation, and building. Participants design factories, transport systems, and collaborative infrastructure projects.</p>
              <ul className="prose" style={{ fontSize: '.9rem' }}>
                <li>Edition: Minecraft Java</li><li>Modpack: All of Create</li><li>Focus: Infrastructure builds</li><li>PvP: Disabled</li><li>Access: Whitelisted, private</li>
              </ul>
            </article>
            <article className="card">
              <span className="badge badge--mauve">Cross-Platform</span>
              <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', margin: '12px 0 8px' }}>Bedrock Edition Server</h3>
              <p style={{ color: 'var(--text-soft)' }}>Our Bedrock server is for participants who play on console, tablet, or mobile. No mods needed, no special setup. Just join and build. This makes the community accessible regardless of what device you play on.</p>
              <ul className="prose" style={{ fontSize: '.9rem' }}>
                <li>Edition: Minecraft Bedrock</li><li>Platforms: PC, Xbox, PS, Switch, Mobile</li><li>Modpack: Vanilla (no mods required)</li><li>PvP: Disabled</li><li>Access: Whitelisted, private</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section>
        <div className="wrap">
          <span className="eyebrow">What we build (current focus)</span>
          <p className="lead" style={{ marginTop: 16 }}>PvP is turned off across both servers. The focus right now is collaborative building. Here is what that looks like in practice.</p>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {BUILD.map(([h, p]) => (
              <article className="card" key={h}><h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Who this is for</span>
          <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
            {WHO.map(([h, p]) => (
              <article className="card card--static" key={h}><h3 style={{ color: 'var(--heading)', fontSize: '1rem', marginBottom: 8 }}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <div className="numgrid" style={{ marginTop: 32, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {STEPS.map(([h, p], i) => (
              <article className="card" key={h}><div className="num" aria-hidden="true">{i + 1}</div><h3>{h}</h3><p>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">What to expect</span>
          <div className="grid grid-4" style={{ marginTop: 32 }}>
            {EXPECT.map(([h, p]) => (
              <article className="card" key={h}><h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '.95rem', marginBottom: 8 }}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '.9rem' }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">FAQ</span>
          <div style={{ display: 'grid', gap: 12, marginTop: 24 }}>
            {FAQ.map(([q, a]) => (
              <details className="card card--static" key={q} style={{ padding: '16px 20px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--heading)' }}>{q}</summary>
                <p style={{ color: 'var(--text-soft)', margin: '10px 0 0' }}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to join the server?"
        body="The Minecraft Program is part of our gaming-informed occupational therapy. Get in touch to start your sessions and get whitelisted."
        buttons={<><ReferralButton big>Get Started ▸</ReferralButton><Btn to="/services/gaming-informed-therapy" variant="btn--alt" big>Gaming-Informed Therapy</Btn></>}
      />
    </>
  )
}
