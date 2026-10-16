import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO, { breadcrumb } from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'
import { Confetti } from '../../components/Decor'
import { JumpNav, StickyJumpNav, useActiveSection, useScrolledPast } from '../../components/JumpNav'
import { GIVEWAY_APP, RESOURCE_TOPICS } from '../../lib/site'

/* ==========================================================================
   Free Resources, grouped by topic rather than by format, so each guide sits
   next to its quiz and tools. The topic list (ids + labels) is shared with the
   header and footer via RESOURCE_TOPICS in lib/site.js; this file adds each
   topic's headline, intro, resources, and the related paid service.
   ========================================================================== */

// Sections users can jump to, in page order. [label, anchor id].
const SECTIONS = RESOURCE_TOPICS.map((t) => [t.label, t.id])

// `href` (instead of `to`) marks a standalone static page outside the SPA.
const TOPICS = {
  pda: {
    head: 'Demands, decoded.',
    intro: 'What Pathological Demand Avoidance is, how it shows up, and which strategies fit your profile.',
    items: [
      { kind: 'Guide', name: 'Understanding PDA', to: '/resources/understanding-pda', meta: '8 min read', desc: 'Pathological Demand Avoidance explained: what it is, how it shows up across different ages, and why traditional approaches often backfire.' },
      { kind: 'Quiz', name: 'PDA Profile Quiz', to: '/resources/pda-quiz', desc: 'Discover your PDA archetype and get personalised strategies for navigating demands.' },
    ],
    related: { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
  },
  'late-diagnosis': {
    head: 'Making sense of it, later in life.',
    intro: 'For adults who found out they were autistic later than they should have, and the burnout that often comes first.',
    items: [
      { kind: 'Guide', name: 'Late Autism Diagnosis', to: '/resources/late-autism-diagnosis', meta: '7 min read', desc: 'Why autism gets missed in adults, what the late-diagnosis experience is actually like, and how to move forward with self-understanding.' },
      { kind: 'Quiz', name: 'Autistic Burnout Quiz', to: '/resources/burnout-quiz', desc: 'Assess where you are on the burnout spectrum and get a clearer picture of what your nervous system needs right now.' },
      { kind: 'Quiz', name: 'The Estus Sensory Profile', to: '/resources/sensory-profile', desc: 'Map your sensory strengths and patterns in about 7 minutes. Free, private, and yours to keep as a PDF report. Kids and teen/adult versions.' },
    ],
    related: { to: '/services/assessments-reports', label: 'Assessments & Reports' },
  },
  'executive-function': {
    head: 'Knowing what to do, and doing it.',
    intro: 'Energy, sleep timing, and the tools that hold things so your brain does not have to.',
    items: [
      { kind: 'Guide', name: 'Executive Function & Complex Health', to: '/resources/executive-function-complex-health', meta: '10 min read', desc: "Managing POTS, hEDS, MCAS, ME/CFS, or chronic pain alongside neurodivergence? Here's why executive function takes the hit." },
      { kind: 'Quiz', name: 'Energy & Executive Function Quiz', to: '/resources/energy-quiz', desc: 'Map your energy patterns and executive function profile to understand when and why tasks feel impossible, and what actually helps.' },
      { kind: 'Quiz', name: 'Chronotype Quiz', to: '/resources/chronotype-quiz', desc: "Find out whether you're a Lion, Bear, Wolf, or Dolphin sleeper, and learn how to align your schedule to your biology." },
      { kind: 'Tool', name: 'Open Loops', to: '/resources/open-loops', desc: 'A private journaling tool for the unfinished threads your brain keeps running. Park them, give them a tiny next step, or close them.' },
      { kind: 'Guide', name: 'Second Brain Setup', to: '/resources/second-brain', desc: 'Build a private second brain in Discord, so your actual brain can stop holding it all. A step-by-step setup you already have the app for.' },
    ],
    related: { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
  },
  eds: {
    head: 'When your body is part of the picture.',
    intro: 'Ehlers-Danlos syndromes and hypermobility, and how they overlap with neurodivergence.',
    items: [
      { kind: 'Guide', name: 'EDS & Hypermobility', to: '/resources/eds-hsd', meta: '9 min read', desc: 'Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder: what they are, how they overlap with neurodivergence, and what OT support actually looks like.' },
      { kind: 'Quiz', name: 'EDS/HSD Management Style Quiz', to: '/resources/eds-hsd-quiz', desc: 'Discover how you naturally manage hypermobility, fatigue, and pain. Four archetypes, practical tips, and strategies that fit a neurodivergent brain.' },
    ],
    related: { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
  },
  communication: {
    head: 'Words, when you need them.',
    intro: 'Tools for the moments speaking is hard, and a shared language for everyone else.',
    items: [
      { kind: 'App', name: 'CommCard', to: '/resources/commcard', desc: 'Ready-made phrases and custom cards for moments when speaking is hard. Tap to speak or show. No signup, no data collected.' },
      { kind: 'Tool', name: 'The Shared Lexicon', to: '/resources/lexicon', desc: 'A family-friendly, neuroaffirming glossary across OT, neurodivergence, LGBTQIA+, gaming and Gen Z slang. Search any term, or explore a domain.' },
    ],
  },
  boundaries: {
    head: 'Saying no, and meaning it.',
    intro: 'Find your boundary style, then watch the full workshop on setting boundaries as a neurodivergent adult.',
    items: [
      { kind: 'Quiz', name: 'Boundary Style Quiz', to: '/resources/boundary-style-quiz', desc: 'Are your boundaries porous, healthy or rigid? Find your boundary-setting style and the direction your growth edge points, with practical next steps.' },
      { kind: 'Workshop', name: 'Saying No: Boundary Setting', to: '/events/boundary-setting', desc: 'The full workshop recording, with chapters and the tools from the session.' },
    ],
  },
  gaming: {
    head: 'What your games say about you.',
    intro: 'Two quizzes for gamers, from the team behind our gaming-informed therapy.',
    items: [
      { kind: 'Quiz', name: 'Gaming & Wellbeing Quiz', to: '/resources/gaming-quiz', desc: 'Explore the relationship between your gaming habits and your mental health, focus, and emotional regulation.' },
      { kind: 'Quiz', name: 'RPG Character Build Quiz', to: '/resources/rpg-character-quiz', desc: 'Build your neurodivergent character sheet. Find out your stat distribution, class archetype, and innate abilities.' },
      { kind: 'Workshop', name: 'Gaming-Informed Therapy workshop', to: '/events/gaming-informed-therapy', desc: 'The full workshop recording, plus a filterable library of therapist-tested co-op games.' },
    ],
    related: { to: '/services/gaming-informed-therapy', label: 'Gaming-Informed Therapy' },
  },
  driving: {
    head: 'Learn the road.',
    intro: 'Driving is one of the most complex everyday occupations there is. Free tools for learning it, built by OTs in WA.',
    items: [
      { kind: 'Arcade', name: 'Give Way!', href: GIVEWAY_APP, desc: "A free arcade with 112 WA road scenarios. See the intersection from above and from the driver's seat, spot the hazard, then pick the safe move." },
      { kind: 'Quiz', name: 'Learner Driver Style Quiz', to: '/resources/learner-driver-quiz', desc: 'Three quick sections reveal your driver type, your hazard radar and focus, and your sensory style on the road, plus practical tips to grow.' },
    ],
    related: { to: '/driving-on-the-spectrum', label: 'Driving On The Spectrum' },
  },
}

const CTA = { Guide: 'Read guide ▸', Quiz: 'Take the quiz ▸', Tool: 'Open the tool ▸', App: 'See CommCard ▸', Workshop: 'Watch ▸', Arcade: 'Play ▸' }

function ResourceCard({ kind, name, to, href, meta, desc }) {
  const body = (
    <>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className={`badge${kind === 'Quiz' ? ' badge--mauve' : ''}`}>{kind}</span>
        {meta && <span className="badge badge--ghost">{meta}</span>}
      </div>
      <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.1rem' }}>{name}</h3>
      <p style={{ color: 'var(--text-soft)', margin: 0, flex: 1 }}>{desc}</p>
      <span className="profile-link">{CTA[kind]}</span>
    </>
  )
  const style = { display: 'flex', flexDirection: 'column', gap: 10 }
  return to
    ? <Link className="card" to={to} style={style}>{body}</Link>
    : <a className="card" href={href} style={style}>{body}</a>
}

export default function ResourcesHub() {
  const active = useActiveSection(SECTIONS)
  const sentinelRef = useRef(null)
  const showSticky = useScrolledPast(sentinelRef)
  return (
    <>
      <SEO
        title="Free Resources | Estus Health"
        description="Free guides, quizzes and tools on PDA, late autism diagnosis, burnout, executive function, EDS, communication, boundaries, gaming and driving. Know your brain. Build your life."
        path="/resources"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Free Resources', path: '/resources' },
        ])}
      />
      <PageHero eyebrow="Learn & Explore" title="Know your brain." accent="Build your life."
        sub2="Understanding your neurotype is the first step toward support that actually sticks."
        sub="Free guides, quizzes and tools, grouped by topic and written for people navigating these experiences, not about them. No jargon, no clinical distance.">
        <JumpNav sections={SECTIONS} active={active} />
      </PageHero>

      {/* Sticky mini-nav: slides in once the hero scrolls out of view. */}
      <StickyJumpNav sections={SECTIONS} active={active} show={showSticky} />
      <div ref={sentinelRef} aria-hidden="true" />

      {RESOURCE_TOPICS.map((t, i) => {
        const topic = TOPICS[t.id]
        const tint = i % 2 === 1
        return (
          <section id={t.id} key={t.id} className={`jump-target${tint ? ' tint-section' : ''}`} style={i === 0 ? { paddingTop: 0 } : undefined}>
            {i === 0 && <Confetti kind="star" color="var(--teal)" size={38} anim="spin" style={{ top: 10, right: '5%' }} />}
            <div className="wrap">
              <span className={`eyebrow${tint ? ' eyebrow--mauve' : ''}`}>{t.label}</span>
              <h2 className="sec-head" style={{ marginTop: 16 }}>{topic.head}</h2>
              <p className="lead" style={{ marginTop: 14 }}>{topic.intro}</p>
              <div className={`grid ${topic.items.length % 2 === 0 ? 'grid-2' : 'grid-3'}`} style={{ marginTop: 32 }}>
                {topic.items.map((r) => <ResourceCard key={r.name} {...r} />)}
              </div>
              {topic.related && (
                <p style={{ marginTop: 24, color: 'var(--text-soft)' }}>
                  Want support with this? <Link to={topic.related.to} style={{ fontWeight: 600 }}>{topic.related.label} ▸</Link>
                </p>
              )}
            </div>
          </section>
        )
      })}

      {/* Events & Media lives on its own page; one line here instead of a copy of it. */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow" style={{ textAlign: 'center' }}>
          <p className="lead" style={{ margin: '0 auto' }}>
            Prefer to watch or listen? Workshop recordings, podcasts and Journal Club live on{' '}
            <Link to="/events" style={{ fontWeight: 600 }}>Events &amp; Media ▸</Link>
          </p>
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
