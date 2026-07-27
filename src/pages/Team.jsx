import SEO, { breadcrumb, ORG_ID } from '../components/SEO'
import { PageHero, CTABand, Btn } from '../components/Bits'
import { Confetti } from '../components/Decor'
import { PODCASTS } from '../lib/site'

const PRINCIPLES = [
  { h: 'Lived Experience Matters', p: 'Several members of our team are neurodivergent ourselves. We understand this work from the inside: the struggles, the strengths, and what actually helps.' },
  { h: 'Strengths-Based', p: "We start with what's working, what brings joy, what you're already good at. Deficits-focused approaches miss the full picture of who someone is." },
  { h: 'Neuroaffirming, Not Normalising', p: "We don't try to make autistic people act less autistic. Stimming, special interests, and different communication styles aren't problems to fix. They're valid ways of being in the world." },
  { h: 'Safety First', p: 'Therapeutic progress requires feeling safe. We prioritise building trust and connection before asking anyone to do hard things. Regulation before expectation.' },
]

const DONT = [
  ['ABA or compliance-based approaches', "we don't use methods designed to extinguish autistic behaviours or prioritise obedience."],
  ['Masking as a goal', "we don't teach people to hide who they are. If someone chooses to mask in certain contexts for safety, we support that choice, but it's never our therapeutic goal."],
  ['Pathologising difference', "being autistic isn't a disorder to be cured. The challenges come from living in a world not designed for neurodivergent brains."],
  ['Pushing through at any cost', 'we don\'t believe in "no pain, no gain" approaches. Sustainable progress respects capacity limits.'],
]

const BIOS = [
  {
    id: 'liam', name: 'Liam Fagan', img: '/team-liam.jpg', archetype: 'Systems & structure',
    role: 'Founder · Clinical Supervisor · Driving assessor',
    status: 'Limited availability · clinical supervision & driving assessments', statusClosed: true,
    opening: "The kind of person who gamifies his own laundry. If it can be tracked or turned into a system, Liam's tried it on himself first.",
    approach: 'Came to OT through accounting, finance, and university librarianship before realising he wanted to help people build systems that work for their brains. Sessions are direct, practical, and built around real life, not textbook goals.',
    interests: "Outside the clinic, Liam's interests run to lawn care, storm chasing, spreadsheets and engineering documentaries. He spends his downtime reading nutrition labels. Also holds a top-four world record speedrun in Tony Hawk's Pro Skater, and named the company after the healing item in Dark Souls.",
    works: ['PDA profiles', 'Gaming-informed therapy', 'Driving OT', 'Executive function', 'Late diagnosis', 'Complex health', 'Autism'],
    podcast: PODCASTS.performanceLab,
  },
  {
    id: 'nam', name: 'Nam Lang', img: '/team-nam.jpg', archetype: 'Storyteller',
    role: 'Occupational Therapist · Clinical Lead, Gaming & Anime-Informed Therapy',
    status: 'Accepting new clients', statusClosed: false,
    opening: "Nam meets people through the story they're already inside of: anime, a game, a build. He works from there.",
    approach: "Specialises in autistic youth and young adults through the things they already care about. Anime, gaming, and storytelling aren't rewards in his sessions, they're the medium. Interests are windows into how someone thinks, what they value, and where they feel most themselves.",
    interests: 'Uses anime storylines as therapeutic tools. Keen sportsperson: football, gym, always training for something. PC and Xbox gamer (Minecraft, Roblox, Sea of Thieves, Repo), always open to co-op. Currently building a PC with a wood-grain CPU cooler. Speaks multiple languages, and brings a multicultural lens to his clinical work.',
    works: ['Anime-informed therapy', 'Gaming-informed therapy', 'Youth & young adults', 'Screen & gaming transitions', 'Daily living independence', 'Minecraft Program', 'Paediatrics'],
    podcast: null,
  },
  {
    id: 'nik', name: 'Nik Peshwani', img: '/team-nik.jpg', archetype: 'Experimenter',
    role: 'Occupational Therapist · Clinical Lead, Executive Function',
    status: 'Accepting new clients', statusClosed: false,
    opening: "Nik tests it on himself before he'll ever suggest it to you, and he'll tell you straight when something isn't working.",
    approach: "Turned down a place in medical school, realising he wanted to improve quality of life, not just treat illness. Brings a gaming-informed, identity-respecting lens, particularly for high-masking people who've spent years being told they're fine. Leads with curiosity instead of labels.",
    interests: 'Currently deep into The Finals. Plays Minecraft, Dead by Daylight, and Rocket League ("badly," by his own admission, but his clients love teaching him). Catan is his all-time favourite board game. Big into fitness, macros, nutrition, and supplements. A lifelong learner who experiments on himself before recommending anything to clients. Speaks Hindi, Gujarati, English, and Sindhi.',
    works: ['Executive function', 'ADHD', 'Adolescents & adults', 'Sleep', 'Sensory profiles', 'Hypermobility & pain', 'Late diagnosis'],
    podcast: PODCASTS.otAndYap,
  },
]

function Bio({ b }) {
  return (
    <article className="card card--static" id={b.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,220px) 1fr', gap: 24, alignItems: 'start' }}>
      <img src={b.img} alt={`Portrait of ${b.name}`} width="400" height="400" loading="lazy"
        style={{ borderRadius: 16, border: '3px solid var(--line)', aspectRatio: '1/1', objectFit: 'cover' }} />
      <div>
        <span className="badge badge--mauve">{b.archetype}</span>
        <h3 style={{ fontSize: '1.6rem', color: 'var(--heading)', textTransform: 'uppercase', margin: '12px 0 4px' }}>{b.name}</h3>
        <p className="role" style={{ margin: 0 }}>{b.role}</p>
        <p className={`status${b.statusClosed ? ' status--closed' : ''}`} style={{ marginTop: 6 }}>{b.status}</p>
        <p style={{ color: 'var(--text)', fontWeight: 600, margin: '14px 0 0' }}>{b.opening}</p>

        <details style={{ marginTop: 14 }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--teal)', fontFamily: 'var(--f-body)' }}>
            Read more about {b.name.split(' ')[0]}
          </summary>
          <div style={{ marginTop: 12 }}>
            <h4 style={{ fontFamily: 'var(--f-display)', fontSize: '.72rem', textTransform: 'uppercase', color: 'var(--teal)', letterSpacing: '.5px', margin: '0 0 6px' }}>Approach</h4>
            <p style={{ color: 'var(--text-soft)', margin: '0 0 14px' }}>{b.approach}</p>
            <h4 style={{ fontFamily: 'var(--f-display)', fontSize: '.72rem', textTransform: 'uppercase', color: 'var(--teal)', letterSpacing: '.5px', margin: '0 0 6px' }}>Personal interests</h4>
            <p style={{ color: 'var(--text-soft)', margin: '0 0 14px' }}>{b.interests}</p>
            <h4 style={{ fontFamily: 'var(--f-display)', fontSize: '.72rem', textTransform: 'uppercase', color: 'var(--teal)', letterSpacing: '.5px', margin: '0 0 8px' }}>Works with</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {b.works.map((w) => <span className="badge badge--ghost" key={w}>{w}</span>)}
            </div>
            {b.podcast && (
              <p style={{ marginTop: 16 }}>
                <Btn href={b.podcast.url} variant="btn--ghost">{b.podcast.name} ↗</Btn>
              </p>
            )}
          </div>
        </details>
      </div>
    </article>
  )
}

export default function Team() {
  return (
    <>
      <SEO
        title="Meet the Team | Estus Health"
        description="Three neurodivergent occupational therapists in Perth. We don't fix people, we fix the environment. Neuroaffirming, strengths-based OT for autistic adults, PDA profiles, and complex health."
        path="/team"
        schema={[
          ...BIOS.map((b) => ({
            '@type': 'Person',
            name: b.name,
            // `role` is a display string joining several titles with "·".
            jobTitle: b.role.split('·').map((t) => t.trim()),
            image: `https://www.estushealth.com${b.img}`,
            description: b.opening,
            knowsAbout: b.works,
            worksFor: { '@id': ORG_ID },
            url: `https://www.estushealth.com/team#${b.id}`,
          })),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Meet the Team', path: '/team' },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Our Philosophy"
        title="We don't fix people."
        sub="Traditional therapy often asks neurodivergent people to change who they are. We take a different view: when the environment is right, people thrive."
      >
        <Btn href="#bios" variant="btn--alt">Meet the crew ▾</Btn>
      </PageHero>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <p className="pullquote">We don't force change. We walk alongside until the next step feels possible.</p>
          <h2 className="sec-head" style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', marginTop: 40 }}>What we believe.</h2>
          <div className="grid grid-2" style={{ marginTop: 28 }}>
            {PRINCIPLES.map((c) => (
              <article className="card" key={c.h}><h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.1rem', marginBottom: 8 }}>{c.h}</h3><p style={{ color: 'var(--text-soft)', margin: 0 }}>{c.p}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">What We Don't Do</span>
          <p className="lead" style={{ marginTop: 16 }}>Being clear about what we don't do is just as important as what we offer:</p>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, display: 'grid', gap: 14 }}>
            {DONT.map(([h, p]) => (
              <li key={h} className="card card--static" style={{ padding: '18px 22px' }}>
                <strong style={{ color: 'var(--heading)' }}>{h}: </strong>
                <span style={{ color: 'var(--text-soft)' }}>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BIOS */}
      <section id="bios" aria-labelledby="bios-title">
        <Confetti kind="star" color="var(--teal)" size={40} anim="spin" style={{ top: 30, right: '5%' }} />
        <div className="wrap wrap--narrow">
          <span className="eyebrow">The Crew</span>
          <h2 className="sec-head" id="bios-title" style={{ marginTop: 16 }}>Three OTs. Three very different brains.</h2>
          <p className="lead" style={{ marginTop: 14 }}>
            All three of us are qualified occupational therapists. What's different is who we are as people, and that's what actually determines whether we're the right fit for you.
          </p>
          <div style={{ display: 'grid', gap: 24, marginTop: 36 }}>
            {BIOS.map((b) => <Bio key={b.id} b={b} />)}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to work with us?"
        body="Whether you're self-referring, a parent, or a support coordinator, we're here to help find the right fit."
        buttons={<Btn to="/contact" big>Make a Referral ▸</Btn>}
      />
    </>
  )
}
