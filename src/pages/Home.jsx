import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { Btn } from '../components/Bits'
import { BOOK_PATH, CAPACITY, DRIVING_WAITLIST } from '../lib/site'

const AUDIENCES = [
  { h: 'Adults, often diagnosed late', p: "You've been holding it together for years. Now you want daily life to cost less." },
  { h: 'Teens and young adults', p: 'School, work, gaming, getting started on things. We meet you where you already are.' },
  { h: 'Kids and their families', p: 'PDA-friendly, low-demand support, often through the games and stories your child loves.' },
]

const SERVICE_CARDS = [
  { to: '/services/occupational-therapy', top: 'var(--navy)', tag: 'Telehealth · ongoing', tone: 'c-navy', h: 'Ongoing OT', p: 'Regular sessions on routines, energy, sensory needs and getting things started.', link: 'Find out more' },
  { to: '/services/small-hinges', top: 'var(--blue)', tag: '6 sessions or less', tone: 'c-blue', h: 'Small Hinges programs', p: 'Short, focused work on one thing: sleep, mornings, energy or switching off after work.', link: 'See the programs' },
  { to: '/services/gaming-informed-therapy', top: 'var(--teal-brand)', tag: 'Gaming-informed', tone: 'c-teal', h: 'Therapy through games', p: 'Minecraft and other games as a way in, plus our moderated community server.', link: 'Find out more' },
  { href: DRIVING_WAITLIST, top: 'var(--plum-brand)', tag: 'In person, Perth', tone: 'c-plum', soon: true, h: 'Driving OT', p: 'Learner drivers and fitness to drive. Opening soon.', link: 'Join the waitlist' },
]

const STEPS = [
  { n: 1, tone: 'c-navy', h: 'Book a time', p: 'Pick a slot that suits. Takes about a minute.' },
  { n: 2, tone: 'c-blue', h: 'Get a confirmation', p: 'An email with the time, the link and what to expect.' },
  { n: 3, tone: 'c-teal', h: '15 minute call', p: 'Your goals, fees, funding and fit. Ask anything.' },
  { n: 4, tone: 'c-plum', h: 'First session', p: 'Sign the service agreement online, then we start.' },
]

export const TEAM = [
  { name: 'Nik Peshwani', who: 'Teens 16+ and adults', tone: 'c-blue', blurb: 'Experimenter energy. Tries it on himself before he suggests it to you.', img: '/team-nik.jpg' },
  { name: 'Nam Lang', who: 'Kids under 16', tone: 'c-plum', blurb: 'Storyteller energy. Meets you through the game or story you already love.', img: '/team-nam.jpg' },
  { name: 'Liam Fagan', who: 'Founder · Driving OT', tone: 'c-navy', blurb: "Systems-and-structure energy. If it can be tracked or turned into a system, Liam's tried it on himself first.", img: '/team-liam.jpg' },
]

export function FactStrip({ third = { b: 'Telehealth, Australia-wide', s: 'From home, camera optional' } }) {
  return (
    <section className="facts" aria-label="Key facts">
      <div className="wrap facts-grid">
        <div className="fact"><b>No GP referral needed</b><span>Refer yourself or a family member</span></div>
        <div className="fact"><b>NDIS + private</b><span>Self-managed, plan-managed or private</span></div>
        <div className="fact"><b>{third.b}</b><span>{third.s}</span></div>
        <div className="fact"><b>{CAPACITY.badge}</b><span>Limited places, offered in order</span></div>
      </div>
    </section>
  )
}

export function SecIntro({ eyebrow, title, id }) {
  return (
    <div className="sec-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="sec-head" id={id}>{title}</h2>
    </div>
  )
}

export function Crew() {
  return (
    <div className="crew-grid">
      {TEAM.map((t) => (
        <article className="crew" key={t.name}>
          <div className="pic">
            <img src={t.img} alt={`Portrait of ${t.name}`} width="500" height="525" loading="lazy" />
            <span className="name">{t.name}</span>
          </div>
          <div className="body">
            <span className={`label ${t.tone}`}>{t.who}</span>
            <span className="small" style={{ fontSize: '1.02rem' }}>{t.blurb}</span>
          </div>
        </article>
      ))}
    </div>
  )
}

export function Steps({ steps = STEPS }) {
  return (
    <div className="ruled" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
      {steps.map((s) => (
        <div key={s.n}>
          <span className={`step-n ${s.tone}`} aria-hidden="true">{s.n}</span>
          <b style={{ fontSize: '1.2rem' }}>{s.h}</b>
          <span className="cell-body">{s.p}</span>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title="Estus Health | Neuroaffirming Occupational Therapy Perth"
        description="A small team of neurodivergent occupational therapists in Perth, with telehealth Australia-wide. Working with autistic adults, PDA profiles, ADHD, and complex health."
        path="/"
      />

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title" style={{ paddingBottom: 72 }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 48px', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 560px', minWidth: 0 }}>
              <span className="eyebrow">Neuroaffirming OT · Perth + telehealth Australia-wide</span>
              <h1 id="hero-title">Therapy built around how your brain <span className="accent">actually works.</span></h1>
            </div>
            <div style={{ flex: '1 1 320px', minWidth: 0, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <p className="sub" style={{ margin: 0 }}>A small team of neurodivergent OTs. Start with a free 15 minute call. Camera off is fine.</p>
              <div className="hero-cta" style={{ marginTop: 0 }}>
                <Btn to={BOOK_PATH} big>Book a free call</Btn>
                <a href="#services" style={{ fontWeight: 600, color: 'var(--navy)', textDecoration: 'underline', textUnderlineOffset: 3 }}>See what we do</a>
              </div>
            </div>
          </div>

          <figure className="photo-card" style={{ margin: 0 }}>
            <img src="/team-photo.jpeg" alt="The Estus Health team, Liam, Nam and Nik" width="994" height="454" loading="eager" style={{ aspectRatio: '994 / 454', height: 'auto' }} />
            <figcaption style={{ background: 'var(--black)', color: '#fff', padding: '12px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px 20px', borderTop: '2px solid var(--black)' }}>
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>Liam, Nam and Nik</span>
              <span className="label" style={{ color: 'var(--on-dark-accent)' }}>The OTs you'll actually talk to</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <FactStrip />

      {/* WHO */}
      <section aria-labelledby="who-title" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="Who we work with" title="Is this you?" id="who-title" />
          <div className="ruled">
            {AUDIENCES.map((a) => (
              <div key={a.h}>
                <span className="cell-title">{a.h}</span>
                <span className="cell-body">{a.p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="jump-target" aria-labelledby="services-title" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="Services" title="Ways we can work together" id="services-title" />
          <div className="svc-grid">
            {SERVICE_CARDS.map((s) => {
              const inner = (
                <>
                  <span className={`label ${s.tone}`}>{s.tag}{s.soon && <span className="soon">Coming soon</span>}</span>
                  <span className="cell-title" style={{ fontSize: '1.5rem' }}>{s.h}</span>
                  <span className="cell-body">{s.p}</span>
                  <span className={`cell-link ${s.tone}`}>{s.link} ▸</span>
                </>
              )
              return s.to
                ? <Link key={s.h} to={s.to} className="svc" style={{ borderTopColor: s.top }}>{inner}</Link>
                : <a key={s.h} href={s.href} className="svc" style={{ borderTopColor: s.top }}>{inner}</a>
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="how-title" style={{ paddingBottom: 24 }}>
        <div className="wrap">
          <SecIntro eyebrow="No surprises" title="How it works" id="how-title" />
          <Steps />
        </div>
      </section>

      {/* TEAM */}
      <section aria-labelledby="team-title">
        <div className="wrap">
          <SecIntro eyebrow="Real people, not a call centre" title="Meet the team" id="team-title" />
          <Crew />
          <div className="team-foot"><Btn to="/team" variant="btn--ghost">Full bios ▸</Btn></div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-labelledby="final-title" style={{ paddingTop: 8, paddingBottom: 80 }}>
        <div className="wrap">
          <div className="split">
            <div className="l">
              <h2 id="final-title">Start with a free 15 minute call.</h2>
              <p>Talk to the OT you'd actually work with. Fees, funding and FAQ are all on the booking page.</p>
            </div>
            <div className="r">
              <Btn to={BOOK_PATH} big>Book a free call</Btn>
              <Link to={`${BOOK_PATH}#pros`}>I'm a professional referring ▸</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
