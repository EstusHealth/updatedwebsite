import { Link } from 'react-router-dom'
import SEO, { breadcrumb, service } from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton, PlayIcon } from '../../components/Bits'
import { webinarBySlug, ytThumb } from '../../lib/webinars'
import { SecIntro } from '../Home'

const WORKSHOP = webinarBySlug('gaming-informed-therapy')

const WHO = [
  'Autistic youth and adults who already love gaming',
  'People with PDA profiles who find traditional therapy too demanding',
  'Anyone whose interests have been dismissed or pathologised',
  'People who struggle to engage in talk-based therapy',
  'Young people transitioning to adult services',
]

const HOW = [
  ['Building Connection & Trust', 'Playing together creates genuine connection without the pressure of face-to-face conversation. For PDA profiles especially, this parallel engagement feels safer than direct demands.'],
  ['Practicing Problem-Solving', 'Games present problems to solve with immediate feedback. We can observe how someone approaches challenges, where they get stuck, and what strategies help, then translate this to real-world situations.'],
  ['Emotional Regulation', 'Games can be regulating (Stardew Valley, Minecraft creative mode) or challenging (competitive games, harder difficulty levels). We use this range intentionally to practice managing different emotional states.'],
  ['Social Skills in Context', 'Multiplayer games provide natural opportunities to practice communication, cooperation, and conflict resolution. These are skills that can feel artificial when taught through worksheets.'],
]

// The Minecraft server, folded in from the old Minecraft Program page.
// One server now: Bedrock Edition only (October 2026).
const SERVER_FACTS = [
  ['Edition', 'Minecraft Bedrock'],
  ['Plays on', 'PC, Xbox, PlayStation, Switch, iPad, phone'],
  ['Setup', 'None. Vanilla, no mods'],
  ['PvP', 'Off'],
  ['Access', 'Private, whitelisted, clinician-moderated'],
  ['Cost', 'No separate fee'],
]

const SERVER_STEPS = [
  { n: 1, tone: 'c-navy', h: 'Start with an OT session', p: 'Your clinician checks the server is a good fit and sets goals it can support.' },
  { n: 2, tone: 'c-blue', h: 'Get whitelisted', p: 'We add your gamertag and send the server address, the rules and a short orientation.' },
  { n: 3, tone: 'c-teal', h: 'Build between sessions', p: 'Log on when you want. Join a group build or start your own.' },
]

const SERVER_FAQ = [
  ['Do we need to be Estus clients?', 'Yes. The server is part of gaming-informed therapy with an Estus clinician, not a standalone service.'],
  ['What do we need to play?', 'Minecraft Bedrock Edition on any supported device: Windows PC, Xbox, PlayStation, Nintendo Switch, iPad, iPhone or Android. Then just enter the server address.'],
  ['Why is PvP off?', 'The server is about building together. Turning PvP off removes the conflict and anxiety competitive play can bring. It is a deliberate clinical choice.'],
  ['Is it monitored?', 'Yes. Only approved players can join, clinicians moderate it, and the rules are clear. Anything that breaks them is raised with the player and their family.'],
  ['How is it funded?', 'It runs as part of your funded OT sessions (NDIS Capacity Building: Improved Daily Living, or private). Server access has no separate fee.'],
]

const SESSIONS = [
  'Playing Minecraft together while talking through a challenge they\'re facing',
  'Using a story-driven game to explore emotions and perspectives',
  'Practicing frustration tolerance through progressively challenging games',
  'Co-op games to work on communication and turn-taking',
  'VR experiences for exposure therapy or sensory exploration',
  'Discussing their existing gaming interests as a way to understand their values and strengths',
]

export default function GamingInformedTherapy() {
  return (
    <>
      <SEO
        title="Gaming-Informed Therapy | Estus Health"
        description="Gaming-informed occupational therapy for neurodivergent people in Perth and telehealth Australia-wide. Games as a genuine therapeutic tool, plus a private, clinician-moderated Minecraft Bedrock server for clients."
        path="/services/gaming-informed-therapy"
        schema={[
          service({
            name: 'Gaming-Informed Therapy',
            description: 'Occupational therapy that uses games as a genuine clinical medium for autistic, ADHD, and PDA-profile clients, building connection, problem-solving, emotional regulation, and social skills in context.',
            path: '/services/gaming-informed-therapy',
          }),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Gaming-Informed Therapy', path: '/services/gaming-informed-therapy' },
          ]),
        ]}
      />
      <PageHero eyebrow="Services" title="Gaming-Informed Therapy" sub2="Therapy through a channel that actually works"
        sub="For many neurodivergent people, gaming isn't just a hobby. It's a space where they feel competent, connected, and regulated. We meet people there, using games as a genuine therapeutic tool rather than treating them as something to overcome.">
        <ReferralButton big />
        <Btn to={WORKSHOP.path} variant="btn--alt" big>Watch the workshop ▸</Btn>
        <Btn href="#minecraft" variant="btn--ghost" big>Our Minecraft server</Btn>
      </PageHero>

      {/* Featured workshop recording */}
      <section className="tint-section">
        <div className="wrap">
          <div className="two-col">
            <div>
              <span className="eyebrow">Free workshop</span>
              <h2 className="sec-head" style={{ marginTop: 16 }}>See it in action.</h2>
              <p className="lead" style={{ marginTop: 14 }}>Liam ran a full workshop on gaming-informed therapy for clinicians, parents and peers. Watch the recording, jump to any chapter, and browse a filterable library of therapist-tested co-op games with the frameworks behind them.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
                <Btn to={WORKSHOP.path}>Watch the workshop ▸</Btn>
                <Btn to={`${WORKSHOP.path}#game-library`} variant="btn--ghost">Browse the game library</Btn>
              </div>
            </div>
            <Link to={WORKSHOP.path} className="card media-card" aria-label={`Watch: ${WORKSHOP.title}`} style={{ alignSelf: 'start' }}>
              <div className="media-thumb">
                <img
                  src={ytThumb(WORKSHOP.videoId)}
                  alt={`${WORKSHOP.title} workshop`}
                  loading="lazy"
                  width="1280" height="720"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fallback) {
                      e.currentTarget.dataset.fallback = '1'
                      e.currentTarget.src = ytThumb(WORKSHOP.videoId, 'hqdefault')
                    }
                  }}
                />
                <span className="play-badge"><PlayIcon /></span>
              </div>
              <div className="media-body">
                <span className="badge badge--mauve" style={{ alignSelf: 'flex-start' }}>{WORKSHOP.tag}</span>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', margin: '2px 0 0', letterSpacing: '-.3px' }}>{WORKSHOP.subtitle}</h3>
                <div className="media-meta">
                  <span>{WORKSHOP.dateLabel}</span><span aria-hidden="true">·</span><span>{WORKSHOP.duration}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap wrap--narrow">
          <div className="prose">
            <h2>What is it?</h2>
            <p>Gaming-informed therapy uses video games as a medium for therapeutic work. This isn't about using games as a reward or treating gaming as problematic. It's about recognising that games create genuine opportunities for skill development, emotional processing, and connection.</p>
            <p>Games provide a lower-stakes environment to practice skills that feel overwhelming in real life. They offer immediate feedback, clear rules, and controllable challenge levels, all things that can be difficult to find in everyday situations.</p>
          </div>
          <div className="callout">
            <strong style={{ color: 'var(--heading)' }}>A note on evidence: </strong>
            <span style={{ color: 'var(--text-soft)' }}>Gaming-informed therapy is an emerging area of practice. We draw on established principles of play therapy, occupational therapy, and neuroaffirming practice.</span>
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Who this is for</span>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 22, display: 'grid', gap: 12 }}>
            {WHO.map((w) => <li key={w} className="card card--static" style={{ padding: '16px 20px', color: 'var(--text-soft)' }}>{w}</li>)}
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">How we use gaming in sessions</span>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {HOW.map(([h, p]) => (
              <article className="card" key={h}><h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p></article>
            ))}
          </div>
        </div>
      </section>

      {/* Minecraft server (was the Minecraft Program page) */}
      <section id="minecraft" className="jump-target" aria-labelledby="minecraft-title">
        <div className="wrap">
          <SecIntro eyebrow="Between sessions" title="Our Minecraft server" id="minecraft-title" />
          <div className="two-col">
            <div className="prose">
              <p>Clients can join our private Minecraft server between sessions. It is a calm, shared space to build, plan and connect at their own pace, with clinicians in the background rather than running the show.</p>
              <p>Group builds like railways, towns and shared storage have natural decision points, so planning, negotiating and adapting when things go wrong get practised in a setting people actually want to be in. Your clinician can use what happens on the server as a starting point in sessions.</p>
              <p>We run one server on Bedrock Edition, so it works on almost any device, with nothing to install beyond the game.</p>
            </div>
            <div className="panel">
              <div className="ph label">The server</div>
              <div className="pb">
                {SERVER_FACTS.map(([k, v]) => (
                  <div className="dots" key={k}><b>{k}</b><span className="fill"></span><span style={{ textAlign: 'right' }}>{v}</span></div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="label" style={{ margin: '40px 0 14px', color: 'var(--blue)' }}>How to join</h3>
          <div className="ruled">
            {SERVER_STEPS.map((st) => (
              <div key={st.n}>
                <span className={`step-n ${st.tone}`} aria-hidden="true">{st.n}</span>
                <b style={{ fontSize: '1.2rem' }}>{st.h}</b>
                <span className="cell-body">{st.p}</span>
              </div>
            ))}
          </div>

          <h3 className="label" style={{ margin: '40px 0 4px', color: 'var(--blue)' }}>Server questions</h3>
          <div className="faq" style={{ maxWidth: 900 }}>
            {SERVER_FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}<span className="plus" aria-hidden="true">+</span></summary>
                <div className="ans">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">What sessions look like</span>
          <p className="lead" style={{ marginTop: 16 }}>Sessions vary based on the person and their goals. They might include:</p>
          <ul className="prose" style={{ marginTop: 14 }}>
            {SESSIONS.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </section>

      <CTABand
        title="Interested in gaming-informed therapy?"
        body="If you or someone you support might benefit from this approach, we'd love to chat about whether it's a good fit."
        buttons={<><ReferralButton big /><Btn to="/services/occupational-therapy" variant="btn--alt" big>Our Other Services</Btn></>}
      />
    </>
  )
}
