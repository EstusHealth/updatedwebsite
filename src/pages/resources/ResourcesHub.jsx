import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'
import { Confetti } from '../../components/Decor'
import { JumpNav, StickyJumpNav, useActiveSection, useScrolledPast } from '../../components/JumpNav'
import { COMMCARD_APP } from '../../lib/site'

// Sections users can jump to, in page order. [label, anchor id].
const SECTIONS = [
  ['Quizzes', 'quizzes'],
  ['Guides', 'guides'],
  ['Tools', 'tools'],
  ['Events & Media', 'events'],
]

const QUIZZES = [
  ['PDA Profile Quiz', '/resources/pda-quiz', 'Autism', 'Discover your PDA archetype and get personalised strategies for navigating demands.'],
  ['Chronotype Quiz', '/resources/chronotype-quiz', 'Sleep', "Find out whether you're a Lion, Bear, Wolf, or Dolphin sleeper, and learn how to align your schedule to your biology."],
  ['Energy & Executive Function Quiz', '/resources/energy-quiz', 'Executive Function', 'Map your energy patterns and executive function profile to understand when and why tasks feel impossible, and what actually helps.'],
  ['Autistic Burnout Quiz', '/resources/burnout-quiz', 'Burnout', 'Assess where you are on the burnout spectrum and get a clearer picture of what your nervous system needs right now.'],
  ['Gaming & Wellbeing Quiz', '/resources/gaming-quiz', 'Gaming', 'Explore the relationship between your gaming habits and your mental health, focus, and emotional regulation.'],
  ['RPG Character Build Quiz', '/resources/rpg-character-quiz', 'Gaming', 'Build your neurodivergent character sheet. Find out your stat distribution, class archetype, and innate abilities.'],
  ['EDS/HSD Management Style Quiz', '/resources/eds-hsd-quiz', 'EDS / HSD', 'Discover how you naturally manage hypermobility, fatigue, and pain. Four archetypes, practical tips, and strategies that actually fit a neurodivergent brain.'],
  ['Learner Driver Style Quiz', '/resources/learner-driver-quiz', 'Driving', 'Three quick sections reveal your driver type, your hazard radar and focus, and your sensory style on the road, plus practical tips to grow.'],
]

const GUIDES = [
  ['Understanding PDA', '/resources/understanding-pda', 'PDA', '8 min read', 'Pathological Demand Avoidance explained: what it is, how it shows up across different ages, and why traditional approaches often backfire.'],
  ['Late Autism Diagnosis', '/resources/late-autism-diagnosis', 'Autism', '7 min read', 'Why autism gets missed in adults, what the late-diagnosis experience is actually like, and how to move forward with self-understanding.'],
  ['Executive Function & Complex Health', '/resources/executive-function-complex-health', 'Executive Function', '10 min read', "Managing POTS, hEDS, MCAS, ME/CFS, or chronic pain alongside neurodivergence? Here's why executive function takes the hit."],
  ['EDS & Hypermobility', '/resources/eds-hsd', 'EDS / HSD', '9 min read', 'Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder: what they are, how they overlap with neurodivergence, and what OT support actually looks like.'],
]

const TOOLS = [
  { name: 'CommCard', tag: 'Augmented Communication App', desc: 'Ready-made phrases and custom cards for moments when speaking is hard. No signup, no data collected.', primary: { href: COMMCARD_APP, label: 'Open CommCard ↗' }, secondary: { to: '/resources/commcard', label: 'Learn more' } },
  { name: 'The Shared Lexicon', tag: 'Interactive Glossary', desc: 'A family-friendly, neuroaffirming glossary across OT, neurodivergence, LGBTQIA+, gaming and Gen Z slang. Search any term, or expand a domain to explore.', primary: { to: '/resources/lexicon', label: 'Open the lexicon ▸' } },
  { name: 'Open Loops', tag: 'Journaling Tool', desc: 'A private journaling tool for the unfinished threads your brain keeps running. Park them, give them a tiny next step, or close them.', primary: { to: '/resources/open-loops', label: 'Open the tool ▸' } },
  { name: 'Second Brain Setup', tag: 'Free Guide', desc: 'Build a private second brain in Discord, so your actual brain can stop holding it all. A step-by-step setup you already have the app for.', primary: { to: '/resources/second-brain', label: 'Set it up ▸' } },
]

export default function ResourcesHub() {
  const active = useActiveSection(SECTIONS)
  const sentinelRef = useRef(null)
  const showSticky = useScrolledPast(sentinelRef)
  return (
    <>
      <SEO
        title="Free Resources | Estus Health"
        description="Free interactive quizzes and in-depth guides on PDA, autism, sleep, executive function, burnout, and gaming. Know your brain. Build your life."
        path="/resources"
      />
      <PageHero eyebrow="Learn & Explore" title="Know your brain." accent="Build your life."
        sub2="Understanding your neurotype is the first step toward support that actually sticks."
        sub="Explore our free quizzes and guides, written for people navigating these experiences, not about them. No jargon, no clinical distance.">
        <JumpNav sections={SECTIONS} active={active} />
      </PageHero>

      {/* Sticky mini-nav: slides in once the hero scrolls out of view. */}
      <StickyJumpNav sections={SECTIONS} active={active} show={showSticky} />
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Quizzes */}
      <section id="quizzes" className="jump-target" style={{ paddingTop: 0 }}>
        <Confetti kind="star" color="var(--teal)" size={38} anim="spin" style={{ top: 10, right: '5%' }} />
        <div className="wrap">
          <span className="eyebrow">Quizzes</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Find your type.</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {QUIZZES.map(([name, to, badge, desc]) => (
              <Link className="card" to={to} key={to} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span className="badge badge--mauve" style={{ alignSelf: 'flex-start' }}>{badge}</span>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.1rem' }}>{name}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0, flex: 1 }}>{desc}</p>
                <span className="profile-link">Take the quiz ▸</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section id="guides" className="jump-target tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Guides</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Read up.</h2>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {GUIDES.map(([name, to, badge, mins, desc]) => (
              <Link className="card" to={to} key={to} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="badge" style={{ alignSelf: 'flex-start' }}>{badge}</span>
                  <span className="badge badge--ghost">{mins}</span>
                </div>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.1rem' }}>{name}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0, flex: 1 }}>{desc}</p>
                <span className="profile-link">Read guide ▸</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="tools" className="jump-target">
        <div className="wrap">
          <span className="eyebrow">Tools</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Free tools you can keep.</h2>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {TOOLS.map((t) => (
              <article className="card" key={t.name} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="badge" style={{ alignSelf: 'flex-start' }}>{t.tag}</span>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.1rem' }}>{t.name}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0, flex: 1 }}>{t.desc}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Btn to={t.primary.to} href={t.primary.href}>{t.primary.label}</Btn>
                  {t.secondary && <Btn to={t.secondary.to} variant="btn--ghost">{t.secondary.label}</Btn>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Media */}
      <section id="events" className="jump-target tint-section">
        <div className="wrap wrap--narrow" style={{ textAlign: 'center' }}>
          <span className="eyebrow eyebrow--mauve">Events & Media</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Come along, or catch up.</h2>
          <p className="lead" style={{ margin: '14px auto 0' }}>Live events, a growing archive of recordings, our podcasts, and the weekly Journal Club on Instagram.</p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <Btn to="/events" big>Events & Media ▸</Btn>
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to take the next step?"
        body="Quizzes and guides are a starting point. If you want personalised support, we're here."
        buttons={<><ReferralButton big /><Btn to="/team" variant="btn--alt" big>Meet the Team</Btn></>}
      />
    </>
  )
}
