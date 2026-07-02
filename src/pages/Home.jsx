import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import { Btn, CTABand, ReferralButton } from '../components/Bits'
import { Confetti, SynthwaveSun, Squiggle, Ticker } from '../components/Decor'
import { EMAIL } from '../lib/site'

const TICKER = ['PDA profiles', 'Late diagnosis', 'Executive function', 'Gaming-informed', 'ADHD', 'NDIS welcome', 'Telehealth AU-wide']

// Home team teaser. Hooks marked [DRAFT] in CONTENT-HANDOVER.md (working copy,
// pending Liam's sign-off).
const TEASERS = [
  { name: 'Liam Fagan', hook: 'Systems-and-structure energy. Late-diagnosed, PDA profile, gamifies his own life.', img: '/team-liam.jpg' },
  { name: 'Nam Lang', hook: 'Storyteller energy. Meets you through the game or story you already love.', img: '/team-nam.jpg' },
  { name: 'Nik Peshwani', hook: 'Experimenter energy. Tries it on himself before he suggests it to you.', img: '/team-nik.jpg' },
]

const WHO = [
  'Autistic adults & teens', 'PDA profiles', 'ADHD', 'Late-diagnosed adults', 'Executive function',
  'Chronic health & fatigue', 'EDS · POTS · fibro', 'Sensory differences', 'Hypermobility & pain', 'Kids & school routines',
]

const LD_JSON = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Estus Health',
  description: 'Neuroaffirming occupational therapy for autistic adults, teens, and PDA profiles. Gaming-informed therapy, executive function support, NDIS and private clients.',
  url: 'https://www.estushealth.com/',
  email: 'hello@estushealth.com',
  image: 'https://www.estushealth.com/team-photo.jpeg',
  address: { '@type': 'PostalAddress', addressLocality: 'Perth', addressRegion: 'WA', addressCountry: 'AU' },
  areaServed: 'Australia',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '08:00', closes: '19:00',
  },
}

export default function Home() {
  return (
    <>
      <SEO
        title="Estus Health | Neuroaffirming Occupational Therapy Perth"
        description="A small team of neurodivergent occupational therapists in Perth, with telehealth Australia-wide. Working with autistic adults, PDA profiles, ADHD, and complex health."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(LD_JSON)}</script>
      </Helmet>

      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <Confetti kind="ring" color="var(--teal)" size={54} anim="float" style={{ top: 40, right: '8%' }} r="0deg" />
        <Confetti kind="dot" color="var(--mauve)" size={26} anim="float2" style={{ top: 150, right: '2%' }} />
        <Confetti kind="tri" color="var(--line)" size={30} anim="float" r="12deg" style={{ bottom: 60, left: '44%' }} />
        <Confetti kind="star" color="var(--mauve)" size={46} anim="spin" style={{ top: 12, left: '48%' }} />
        <Confetti kind="sq" color="var(--teal)" size={24} anim="float2" style={{ bottom: 20, left: '2%' }} />
        <SynthwaveSun />
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">◆ Neuroaffirming OT · Perth + Telehealth ◆</span>
            <h1 id="hero-title">Estus <span className="accent">Health</span></h1>
            <Squiggle />
            <p className="sub">A small team of neurodivergent clinicians who build sessions around how your brain actually works.</p>
            <div className="hero-cta">
              <Btn to="/contact" big>Get Started ▸</Btn>
              <Btn to="/team" variant="btn--alt" big>Meet the Team</Btn>
            </div>
          </div>
          <div>
            <div className="photo-card">
              <img src="/team-photo.jpeg" alt="The Estus Health team, Liam, Nam, and Nik" width="600" height="600" loading="eager" />
              <span className="photo-tag">Liam · Nam · Nik</span>
            </div>
          </div>
        </div>
      </section>

      <Ticker items={TICKER} />

      {/* TEAM TEASER */}
      <section aria-labelledby="team-title">
        <Confetti kind="dot" color="var(--teal)" size={20} style={{ top: 40, right: '5%' }} />
        <Confetti kind="tri" color="var(--mauve)" size={26} style={{ top: 80, left: '2%' }} />
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Your clinicians</span>
          <h2 className="sec-head" id="team-title" style={{ marginTop: 16 }}>Meet the people,<br />not the service menu.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Every clinician here chose this work because it matters to them. Most of us have been on the other side of that conversation.</p>

          <div className="team" style={{ marginTop: 40 }}>
            {TEASERS.map((t) => (
              <article className="card" key={t.name}>
                <div className="pic"><img src={t.img} alt={`Portrait of ${t.name}`} width="400" height="400" loading="lazy" /></div>
                <div className="body">
                  <h3>{t.name}</h3>
                  <p>{t.hook}</p>
                  <Link className="profile-link" to="/team">Meet {t.name.split(' ')[0]} ▸</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="team-foot">
            <Btn to="/team" variant="btn--ghost">Meet the team ▸</Btn>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="band" aria-labelledby="who-title">
        <Confetti kind="star" color="var(--teal)" size={40} anim="spin" style={{ top: 30, right: '6%' }} />
        <Confetti kind="ring" color="var(--mauve)" size={40} style={{ bottom: 30, left: '4%' }} />
        <div className="wrap">
          <span className="eyebrow eyebrow--teal">Who We Work With</span>
          <h2 className="sec-head" id="who-title" style={{ marginTop: 16 }}>Brains we build around.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Honest, specific, and no jargon gatekeeping. If you see yourself here, you are in the right place.</p>
          <ul className="pills">
            {WHO.map((w) => <li className="pill" key={w}>{w}</li>)}
          </ul>
        </div>
      </section>

      {/* FEES */}
      <section aria-labelledby="pay-title">
        <Confetti kind="sq" color="var(--mauve)" size={22} style={{ top: 50, right: '4%' }} />
        <div className="wrap">
          <span className="eyebrow">How To Pay</span>
          <h2 className="sec-head" id="pay-title" style={{ marginTop: 16 }}>Three ways in. No gap fees.</h2>
          <div className="numgrid">
            <article className="card"><div className="num" aria-hidden="true">1</div><h3>NDIS plan-managed</h3><p>Your plan manager pays us directly. No gap fees, no out-of-pocket surprises.</p></article>
            <article className="card"><div className="num" aria-hidden="true">2</div><h3>NDIS self-managed</h3><p>You manage your own funding and claim our invoices against your plan.</p></article>
            <article className="card"><div className="num" aria-hidden="true">3</div><h3>Private</h3><p>Pay per session. No referral needed. No funding body required.</p></article>
          </div>
        </div>
      </section>

      {/* PRACTICAL */}
      <section className="tint-section" aria-labelledby="practical-title">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve" id="practical-title">The Practical Stuff</span>
          <div className="kv">
            <article className="card"><div className="k">Hours</div><div className="v">Mon – Sat</div><div className="s">8am to 7pm AWST</div></article>
            <article className="card"><div className="k">Location</div><div className="v">Perth, WA</div><div className="s">Telehealth Australia-wide</div></article>
            <article className="card"><div className="k">Referrals</div><div className="v">Not needed</div><div className="s">Self-refer, parent-refer, or clinician-refer</div></article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABand
        title="Send us a referral."
        body="For yourself, your child, or your client. No GP referral required. Takes about two minutes, and we will be in touch within one business day."
        buttons={<ReferralButton big>Open Referral Form ▸</ReferralButton>}
        note={<>Or email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a></>}
      />
    </>
  )
}
