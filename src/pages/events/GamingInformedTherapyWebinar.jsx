import { useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO, { breadcrumb, videoObject } from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton, PlayIcon } from '../../components/Bits'
import { Confetti } from '../../components/Decor'
import { JumpNav, StickyJumpNav, useActiveSection, useScrolledPast } from '../../components/JumpNav'
import { webinarBySlug } from '../../lib/webinars'
import { PODCASTS } from '../../lib/site'

/* The Gaming-Informed Therapy workshop, as a free, navigable resource hub built
   around the recorded video. Content is drawn from Liam's live workshop; the
   hedged "can / may / this approach" language is deliberate, not efficacy
   claims. Australian spelling, no em-dashes, per the site copy rules. */

const WEBINAR = webinarBySlug('gaming-informed-therapy')
const YOUTUBE = 'https://www.youtube.com/@Estushealth'
const LINKEDIN = 'https://www.linkedin.com/company/estus-health'

// Jump-nav sections (label, anchor id), in page order.
const SECTIONS = [
  ['Watch', 'workshop'],
  ['What it is', 'what-it-is'],
  ['Rapport', 'rapport'],
  ['Session prep', 'session-prep'],
  ['Transitions', 'transitions'],
  ['Frameworks', 'frameworks'],
  ['Game library', 'game-library'],
  ['About', 'about'],
]

/* Chapter markers from the recording. The times come from the meeting
   transcript, which includes a few minutes of pre-session chat, so the
   published video may start at a different point. Spot-check two or three
   markers against the real video, then set CHAPTER_OFFSET (in seconds) to shift
   every marker at once. */
const CHAPTER_OFFSET = 0
const CHAPTERS = [
  ['0:05', 'Welcome and why this session'],
  ['6:00', "Liam's path: finance, libraries, sales, then OT"],
  ['10:00', 'Gaming as an occupation'],
  ['12:35', 'Rapport and connection'],
  ['19:25', 'The clinical frameworks'],
  ['20:56', 'The gaming profile and baseline drift'],
  ['23:52', 'Small hinges that swing big doors'],
  ['27:44', 'How to implement it'],
  ['32:47', 'Stakeholders and the in-between'],
  ['39:17', 'Games by platform'],
  ['47:45', 'Between sessions: Discord and Minecraft'],
  ['53:11', 'Live Q&A'],
]
const toSeconds = (t) => {
  const p = t.split(':').map(Number)
  const s = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]
  return Math.max(0, s + CHAPTER_OFFSET)
}

const STATS = [
  ['Practice experience', '~3,000', 'sessions delivered, solo and group'],
  ['Current load', '~200', 'sessions a month'],
  ['Who it reaches', 'Ages 6 to 59', 'mostly autistic, ADHD and PDA-profile clients'],
]

const RAPPORT = [
  ['Lead with your own gamer identity', 'Share your Steam profile, the games you have played, your achievements, what you are grinding right now. Telling a client you have platinum trophies in Elden Ring and Sekiro signals the same cultural background instantly. Most clients have never met a therapist like that.'],
  ['Sit shoulder to shoulder, not across the desk', 'Co-op play replaces "I am the therapist, here is what you will do next" with "I am another gamer, let us move forward together". Liam calls it power-levelling alongside the client.'],
  ['Let them be the expert', 'Ask the client to teach you their game: their best techniques, the hacks, the lore. Being coached by the client flips the usual power dynamic, and it is often better than picking their single favourite game.'],
  ['Use "beginner" as an advantage', 'Not a gamer yourself? Say so honestly: "I am a complete noob at this, but I have just started grinding it, show me how to get better." That invitation to teach builds rapport without any pretending.'],
  ['Be authentic, never fake it', 'Clients detect inauthenticity immediately, and cynical gamification can backfire badly. Genuine passion, even for completely different games, earns respect. Liam named the practice after the Estus Flask, the healing item in Dark Souls. That authenticity is the point.'],
  ['Meet them at their engagement level', 'Some clients start with typing only, join voice chat after four or five sessions, then video, then in person. Forcing eye contact early is exhausting and can end therapy before it starts. Side-by-side play removes that pressure.'],
  ['Reframe gaming for parents', 'Position gaming as connection, identity and a possible pathway, not time to be reduced. Supporting it rather than fighting it can lower household arguments and strengthen relationships.'],
  ['Use nostalgia with older clients and parents', 'Thirty years of gaming (Master System, Mega Drive, SNES, N64, PS1) gives you shared history to draw on. Retro co-op is a fast rapport builder across generations.'],
]

const FOUNDATIONS = [
  ['Sleep', 'Nothing else works well without it.'],
  ['Nutrition and hydration', 'Hungry or dehydrated undoes emotional and self-regulation.'],
  ['Rest and recovery', 'Genuine downtime, not just more screen.'],
  ['Ergonomic set-up', 'Chair, desk, posture, screen position.'],
  ['Sensory environment', 'Reduce visual clutter, manage sound and light.'],
  ['Transitions', 'A day fractured by dozens of micro-transitions leaves nothing in the tank for performance.'],
]

const LADDER = ['In-game', 'Voice chat', 'Video', 'Clinic', 'Community', 'School / Work']

const FRAMEWORKS = [
  ['PEO: Person, Environment, Occupation', 'The backbone for analysis and intervention. Assess the person (sensory sensitivities, communication needs), the environment, and the occupations that fit, then grade and adapt across all three.'],
  ["Michon's model (from driving OT)", 'Three altitudes of planning that map onto therapy: strategic (long-term goals and direction), tactical (how you set up the session), and operational (moment-to-moment choices in play).'],
  ['The gaming profile and baseline', 'Map the client\'s typical play style and volume, then watch for drift. A shift from high-energy competitive play to low-pressure games, or a drop in playtime, can be an early signal of burnout, low mood or anxiety, especially for clients who find it hard to name feelings (alexithymia) or read internal states (interoception).'],
  ['Motivational interviewing', 'Used heavily in session to help clients identify and move toward their own goals rather than imposed ones.'],
  ['ACT, with elements of CBT', 'Acceptance and Commitment Therapy underpins much of the psychological work.'],
  ['Sensory and executive-function profiles', "Formal profiling (sensory profiles, and executive-function profiles such as Brown's) sets the baseline and directly informs session set-up."],
  ['Boundaries versus rules', 'A boundary is something you protect for yourself: how you respond to a situation. A rule is something you impose on others. Teaching the difference, and how to communicate needs clearly, is one of the biggest levers for emotional regulation. Multiplayer servers are a live laboratory for it.'],
  ['Circle of control, and family systems', 'What sits inside a client\'s control, what sits in their influence, and what belongs to the wider system. Big factors in what you target and what you leave alone.'],
  ['Meta-goals and goal-laddering', 'Hold the long-term goals (social engagement, education, vocation, independent living) alongside the next three sessions\' work. Then use motivation like gravity: find the occupation the client actually wants, and let it pull the other tasks along beneath it. For many clients the barrier is not skill, it is priority.'],
]

const STAKEHOLDERS = [
  ['The client', 'Are they here willingly, or has therapy been imposed? Adults often name their own goals; many paediatric clients are sent. Who is driving the outcome changes how you communicate.'],
  ['Parents and family', 'The day-to-day environment. Run separate, offset parent and stakeholder meetings and term-based check-ins so goal-setting stays aligned.'],
  ['School', 'Or, for school refusal, staged community engagement that works back toward returning.'],
  ['The wider clinical team', 'Psychology, speech, physiotherapy, and especially exercise physiology. Clients who get EP alongside OT and speech fill the buckets (fitness, rest, nutrition, hydration) that everything else depends on.'],
  ['Funders and NDIS', 'And in return-to-work, the insurer, employer and treating medical team.'],
]

const WHY_COOP = [
  ['Shoulder to shoulder, low pressure', 'Shared focus removes the intensity of face-to-face and lets conversation happen naturally.'],
  ['Built-in conversation breaks', 'Co-op play creates natural pauses to weave in therapeutic talk or a goal-related topic.'],
  ['Endlessly gradable', 'Change the game, the difficulty, or the rate of progression to match skill and goals.'],
  ['Communication made visible', 'In Overcooked, the scoreboard literally shows the difference between communicating and not.'],
  ['It avoids the competitive shift', 'PvP instantly changes the tone. Liam keeps competitive play for between sessions.'],
]

// Curated picks. Clicking one filters the library below and scrolls to it.
const PICKS = [
  ['Best all-round, in person', 'Nintendo Switch is the gold standard: Overcooked, co-op Mario and Lego, Portal 2, Snipperclips.', { platform: 'Switch' }],
  ['Best fit for a one-hour session', 'Elden Ring Nightreign runs in roughly 40-minute co-op loops, with time left to debrief.', { query: 'Nightreign' }],
  ['Best for telehealth, any device', 'Roblox runs on phone, tablet, PC or console. The easiest entry for a telehealth client.', { platform: 'Roblox' }],
  ['Best two-player bonding', 'It Takes Two and Unravel Two are pure cooperation, designed for two.', { players: '2' }],
  ['Best for groups', 'Phasmophobia, Content Warning and RV There Yet? bring communication and a lot of laughter.', { players: 'Group (3+)' }],
  ['Best long shared journey', 'Elden Ring with the Seamless Co-op mod: a full playthrough across many sessions.', { query: 'Seamless' }],
  ['Best for low-energy days', 'Fisch and other cosy, chill titles for regulation days.', { focus: 'Emotional regulation' }],
]

/* The game library. `setting` is In-person | Online | Either; "Either" matches
   both the In-person and the Online/Telehealth filters. Facet values below must
   stay in sync with the filter option lists so every game stays reachable. */
const GAMES = [
  { name: 'Overcooked / Overcooked 2', platforms: ['Switch', 'PC', 'PlayStation', 'Xbox'], setting: 'Either', players: ['Group (3+)'], age: 'All ages', type: 'Chaotic co-op cooking', focus: ['Communication', 'Emotional regulation'], great: 'Communication under pressure and role allocation. The scoreboard shows the difference between talking and not.' },
  { name: 'Minecraft Dungeons', platforms: ['Switch', 'PC', 'PlayStation', 'Xbox'], setting: 'Either', players: ['Group (3+)'], age: 'All ages', type: 'Co-op dungeon crawler', focus: ['Communication', 'Problem-solving'], great: 'Teamwork and shared goals with a low reading load.' },
  { name: 'Super Mario co-op (Wonder, 3D World)', platforms: ['Switch'], setting: 'In-person', players: ['Group (3+)'], age: 'All ages', type: 'Platformer', focus: ['Emotional regulation', 'Rapport / connection'], great: 'Turn-taking, shared wins and an easy entry point for almost anyone.' },
  { name: 'Lego co-op titles (Skywalker Saga and more)', platforms: ['Switch', 'PC', 'PlayStation', 'Xbox'], setting: 'In-person', players: ['2'], age: 'All ages', type: 'Relaxed action co-op', focus: ['Rapport / connection', 'Emotional regulation'], great: 'Drop-in, drop-out play with low stakes and sustained engagement.' },
  { name: 'Portal 2 (Companion Collection)', platforms: ['Switch', 'PC', 'PlayStation', 'Xbox'], setting: 'Either', players: ['2'], age: 'All ages', type: 'Co-op puzzle', focus: ['Problem-solving', 'Communication'], great: 'Cooperative problem-solving that only works if you talk to each other.' },
  { name: 'Snipperclips', platforms: ['Switch'], setting: 'In-person', players: ['Group (3+)'], age: 'All ages', type: 'Puzzle', focus: ['Problem-solving', 'Communication'], great: 'Creative cooperation and flexible thinking.' },
  { name: 'PEAK', platforms: ['PC'], setting: 'Online', players: ['Group (3+)'], age: 'Teens+', type: 'Co-op climbing survival', focus: ['Communication', 'Emotional regulation'], great: 'Teamwork, communication and frustration tolerance.' },
  { name: 'Elden Ring (Seamless Co-op mod)', platforms: ['PC'], setting: 'Online', players: ['Group (3+)'], age: 'Mature', type: 'Action RPG', focus: ['Rapport / connection', 'Problem-solving'], great: 'A long shared journey, mastery and mentoring. Liam finished the base game and DLC with an interstate client across about 12 sessions.' },
  { name: 'Elden Ring Nightreign', platforms: ['PC', 'PlayStation', 'Xbox'], setting: 'Either', players: ['Group (3+)'], age: 'Mature', type: 'Co-op roguelike', focus: ['Communication', 'Emotional regulation'], great: 'Roughly 40-minute runs that fit a one-hour session, with clean stopping points to debrief.' },
  { name: 'RV There Yet?', platforms: ['PC'], setting: 'Online', players: ['Group (3+)'], age: 'Teens+', type: 'Physics co-op driving', focus: ['Communication', 'Problem-solving'], great: 'Communication, problem-solving and a lot of shared laughter.' },
  { name: 'Phasmophobia', platforms: ['PC', 'PlayStation', 'Xbox', 'VR'], setting: 'Online', players: ['Group (3+)'], age: 'Mature', type: 'Co-op horror investigation', focus: ['Communication', 'Problem-solving'], great: 'Communication, deduction and shared attention. Genuinely scary, so read the room first.' },
  { name: 'Schedule I', platforms: ['PC'], setting: 'Online', players: ['Group (3+)'], age: 'Mature', type: 'Co-op management sim', focus: ['Problem-solving', 'Executive function'], great: 'Planning and systems thinking for older clients. Mature drug-dealing theme.' },
  { name: 'Content Warning', platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], setting: 'Online', players: ['Group (3+)'], age: 'Teens+', type: 'Co-op horror-comedy', focus: ['Communication', 'Rapport / connection'], great: 'Teamwork, shared goals and humour. Crossplay across platforms suits group sessions.' },
  { name: 'Subnautica 2', platforms: ['PC', 'Xbox'], setting: 'Online', players: ['Group (3+)'], age: 'Teens+', type: 'Survival exploration', focus: ['Emotional regulation', 'Problem-solving'], great: 'Calm exploration, curiosity and cooperation. Early Access, so expect changes.' },
  { name: 'It Takes Two', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], setting: 'Either', players: ['2'], age: 'Teens+', type: 'Narrative co-op', focus: ['Rapport / connection', 'Communication'], great: 'Pure cooperation built for two. A gift for family or dyad bonding.' },
  { name: 'Unravel Two', platforms: ['PC', 'PlayStation', 'Xbox', 'Switch'], setting: 'Either', players: ['2'], age: 'All ages', type: 'Co-op puzzle-platformer', focus: ['Emotional regulation', 'Problem-solving'], great: 'Gentle cooperation and patience.' },
  { name: 'Dead Island 2', platforms: ['PlayStation', 'Xbox', 'PC'], setting: 'Online', players: ['Group (3+)'], age: 'Mature', type: 'Co-op zombie action', focus: ['Communication'], great: 'Teamwork for older clients. Console voice chat is fiddlier than PC or in person.' },
  { name: 'Doors', platforms: ['Roblox'], setting: 'Either', players: ['Group (3+)'], age: 'Teens+', type: 'Roblox horror', focus: ['Communication', 'Emotional regulation'], great: 'Communication and managing fear together. Mild horror.' },
  { name: 'Fisch', platforms: ['Roblox'], setting: 'Either', players: ['2'], age: 'All ages', type: 'Chill fishing', focus: ['Emotional regulation', 'Rapport / connection'], great: 'Low-energy regulation days and easy side-by-side chat.' },
  { name: 'Grow a Garden', platforms: ['Roblox'], setting: 'Either', players: ['Group (3+)'], age: 'All ages', type: 'Cosy idle', focus: ['Rapport / connection', 'Emotional regulation'], great: 'Low-pressure connection and huge shared community moments (it peaked at 20M-plus players at once).' },
  { name: 'Pilgrammed', platforms: ['Roblox'], setting: 'Either', players: ['Group (3+)'], age: 'All ages', type: 'Action RPG', focus: ['Problem-solving', 'Communication'], great: 'Questing and teamwork.' },
  { name: 'Color or Die', platforms: ['Roblox'], setting: 'Either', players: ['Group (3+)'], age: 'All ages', type: 'Puzzle', focus: ['Problem-solving'], great: 'Problem-solving and cooperation.' },
  { name: 'Natural Disaster Survival', platforms: ['Roblox'], setting: 'Either', players: ['Group (3+)'], age: 'All ages', type: 'Survival party', focus: ['Communication', 'Rapport / connection'], great: 'Light conversation and shared jeopardy.' },
  { name: 'Arctic Explorers', platforms: ['Roblox'], setting: 'Either', players: ['Group (3+)'], age: 'All ages', type: 'Exploration', focus: ['Communication', 'Problem-solving'], great: 'Teamwork and shared discovery.' },
  { name: 'Obby / obstacle games', platforms: ['Roblox'], setting: 'Either', players: ['Solo with therapist'], age: 'All ages', type: 'Platforming challenge', focus: ['Emotional regulation', 'Motor / sensory'], great: 'Frustration tolerance and persistence. An easy telehealth ice-breaker.' },
  { name: 'Beat Saber', platforms: ['VR'], setting: 'In-person', players: ['Solo with therapist'], age: 'All ages', type: 'VR rhythm', focus: ['Motor / sensory', 'Emotional regulation'], great: 'Motor timing and sensory-motor regulation in a high-reward activity.' },
  { name: 'Robo Recall', platforms: ['VR'], setting: 'In-person', players: ['Solo with therapist'], age: 'Teens+', type: 'VR shooter', focus: ['Motor / sensory'], great: 'Gross-motor movement and spatial skills.' },
  { name: 'Cave-exploration VR', platforms: ['VR'], setting: 'In-person', players: ['Solo with therapist'], age: 'Teens+', type: 'VR exploration', focus: ['Emotional regulation', 'Motor / sensory'], great: 'Graded exposure, curiosity and calm focus.' },
  { name: 'Emulated retro classics', platforms: ['Retro'], setting: 'In-person', players: ['2'], age: 'All ages', type: 'SNES, N64, Mega Drive and PS1 co-op', focus: ['Rapport / connection'], great: 'Cross-generation nostalgia rapport with parents and older clients. Many are naturally couch co-op.' },
]

const FACET_GROUPS = [
  ['Platform', 'platform', ['Switch', 'PC', 'PlayStation', 'Xbox', 'Roblox', 'VR', 'Retro']],
  ['Setting', 'setting', ['In-person', 'Online / Telehealth']],
  ['Players', 'players', ['2', 'Group (3+)', 'Solo with therapist']],
  ['Age', 'age', ['All ages', 'Teens+', 'Mature']],
  ['Focus', 'focus', ['Communication', 'Problem-solving', 'Emotional regulation', 'Executive function', 'Motor / sensory', 'Rapport / connection']],
]
const EMPTY_FILTERS = { platform: [], setting: [], players: [], age: [], focus: [] }

const settingLabel = (s) => (s === 'In-person' ? 'In person' : s === 'Online' ? 'Telehealth' : 'Any setting')
const ageBadgeClass = (age) => (age === 'Mature' ? 'badge badge--ghost' : age === 'Teens+' ? 'badge badge--mauve' : 'badge')

function matchesGame(g, f, q) {
  if (f.platform.length && !f.platform.some((p) => g.platforms.includes(p))) return false
  if (f.players.length && !f.players.some((p) => g.players.includes(p))) return false
  if (f.age.length && !f.age.includes(g.age)) return false
  if (f.focus.length && !f.focus.some((x) => g.focus.includes(x))) return false
  if (f.setting.length) {
    const ok = f.setting.some((s) =>
      s === 'In-person' ? g.setting === 'In-person' || g.setting === 'Either' : g.setting === 'Online' || g.setting === 'Either'
    )
    if (!ok) return false
  }
  if (q) {
    const hay = `${g.name} ${g.type} ${g.great} ${g.platforms.join(' ')}`.toLowerCase()
    if (!hay.includes(q)) return false
  }
  return true
}

// Responsive video embed with clickable chapter markers that seek the player.
function Workshop() {
  const [start, setStart] = useState(null)
  const base = `https://www.youtube-nocookie.com/embed/${WEBINAR.videoId}`
  const src = start == null ? `${base}?rel=0` : `${base}?start=${start}&autoplay=1&rel=0`
  return (
    <>
      <div className="video-embed">
        <iframe
          key={start ?? 'default'}
          src={src}
          title="Gaming-Informed Therapy, a live workshop with Liam Fagan"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p style={{ color: 'var(--text-soft)', fontSize: '.9rem', margin: '16px 0 0' }}>
        <strong style={{ color: 'var(--heading)' }}>Jump to a chapter.</strong> Tap any marker to start the video there.
      </p>
      <div className="chapters" role="group" aria-label="Video chapters">
        {CHAPTERS.map(([t, label]) => {
          const secs = toSeconds(t)
          return (
            <button key={t} className={`chapter-btn${start === secs ? ' is-active' : ''}`} onClick={() => setStart(secs)}>
              <span className="ct">{t}</span> {label}
            </button>
          )
        })}
      </div>
    </>
  )
}

// Shared expandable list for the rapport toolkit and the frameworks.
function Accordion({ items, color, numbered = false }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {items.map(([title, detail], i) => (
        <details key={title} className="card card--static" style={{ padding: '18px 22px', borderLeft: `8px solid ${color}` }}>
          <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--heading)', fontSize: '1.02rem' }}>
            {numbered && (
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '.78rem', color, marginRight: 10 }}>{String(i + 1).padStart(2, '0')}</span>
            )}
            {title}
          </summary>
          <p style={{ color: 'var(--text-soft)', margin: '12px 0 0' }}>{detail}</p>
        </details>
      ))}
    </div>
  )
}

// In-memory, printable-style checklist. Nothing is stored.
function Foundations() {
  const [done, setDone] = useState({})
  return (
    <div style={{ display: 'grid', gap: 10, marginTop: 22 }}>
      {FOUNDATIONS.map(([title, detail]) => {
        const on = !!done[title]
        return (
          <button
            key={title}
            onClick={() => setDone((d) => ({ ...d, [title]: !d[title] }))}
            aria-pressed={on}
            className="card card--static"
            style={{ textAlign: 'left', cursor: 'pointer', font: 'inherit', display: 'flex', gap: 14, alignItems: 'flex-start', padding: '15px 18px', borderLeft: `8px solid ${on ? 'var(--teal)' : 'var(--line)'}` }}
          >
            <span aria-hidden="true" style={{ flex: 'none', width: 26, height: 26, borderRadius: 8, border: '3px solid var(--line)', background: on ? 'var(--teal)' : 'transparent', color: '#07121a', display: 'grid', placeItems: 'center', fontWeight: 800, marginTop: 1 }}>{on ? '✓' : ''}</span>
            <span>
              <span style={{ display: 'block', fontWeight: 700, color: 'var(--heading)', textDecoration: on ? 'line-through' : 'none' }}>{title}</span>
              <span style={{ color: 'var(--text-soft)', fontSize: '.94rem' }}>{detail}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function GamingInformedTherapyWebinar() {
  const active = useActiveSection(SECTIONS)
  const sentinelRef = useRef(null)
  const showSticky = useScrolledPast(sentinelRef)

  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [query, setQuery] = useState('')
  const libRef = useRef(null)

  const toggleFacet = (group, value) =>
    setFilters((f) => {
      const has = f[group].includes(value)
      return { ...f, [group]: has ? f[group].filter((v) => v !== value) : [...f[group], value] }
    })
  const clearAll = () => { setFilters(EMPTY_FILTERS); setQuery('') }
  const applyPick = (pick) => {
    const next = { ...EMPTY_FILTERS }
    for (const k of ['platform', 'setting', 'players', 'age', 'focus']) if (pick[k]) next[k] = [pick[k]]
    setFilters(next)
    setQuery(pick.query || '')
    requestAnimationFrame(() => libRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const q = query.trim().toLowerCase()
  const visible = useMemo(() => GAMES.filter((g) => matchesGame(g, filters, q)), [filters, q])
  const activeCount = Object.values(filters).reduce((n, arr) => n + arr.length, 0) + (q ? 1 : 0)

  return (
    <>
      <SEO
        title="Gaming-Informed Therapy: the workshop | Estus Health"
        description="Watch occupational therapist Liam Fagan's full workshop on gaming-informed therapy. Chapter markers, a filterable library of therapist-tested co-op games, and the frameworks behind the play."
        path={WEBINAR.path}
        type="video.other"
        schema={[
          videoObject(WEBINAR),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Events & Webinars', path: '/events' },
            { name: WEBINAR.title, path: WEBINAR.path },
          ]),
        ].filter(Boolean)}
      />

      <PageHero
        eyebrow="Webinar" eyebrowClass="eyebrow--mauve" badge="Recorded workshop"
        title="Gaming-Informed Therapy"
        sub2={WEBINAR.subtitle}
        sub="Occupational therapist Liam Fagan shares how gaming, used with intention, becomes a bridge to communication, regulation and real-world goals for autistic, ADHD and PDA-profile clients. Watch the full workshop, then explore the toolkit."
      >
        <Btn href="#workshop"><PlayIcon size={18} /> Watch the workshop</Btn>
        <Btn href="#game-library" variant="btn--alt">Browse the game library</Btn>
      </PageHero>

      <div className="wrap" style={{ paddingBottom: 6 }}>
        <JumpNav sections={SECTIONS} active={active} />
      </div>
      <StickyJumpNav sections={SECTIONS} active={active} show={showSticky} />
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Watch the workshop */}
      <section id="workshop" className="jump-target" style={{ paddingTop: 28 }}>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Watch</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>The full workshop.</h2>
          <p className="lead" style={{ margin: '14px 0 26px' }}>
            A live session for clinicians, parents and allied-health peers on using gaming within therapy. Not as a reward, and not as a problem to reduce, but as a legitimate occupation and a way to deliver real therapeutic work. About {WEBINAR.duration.replace('~', '')} long.
          </p>
          <Workshop />
        </div>
      </section>

      {/* What it is */}
      <section id="what-it-is" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">What it is</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Gaming as the method, not the destination.</h2>
          <div className="prose" style={{ marginTop: 18 }}>
            <p>When a referral mentions gaming, the reflex is often "reduce screen time". Gaming-informed therapy starts from a different premise: for many people, gaming is a genuine occupation, with identity, community, mastery and connection attached to it. Treat it with that respect and it becomes something you can assess, grade and build on, rather than something to switch off.</p>
            <p>The clinical move is simple but powerful. Gaming becomes the delivery method, not the destination. Under the play sit the real goals: emotional regulation, communication, self-care, transitions, education, employment and independent living.</p>
          </div>
          <p className="pullquote">If we treat gaming with the respect of a real occupation, the level of analysis we can do to support it, and use it as a bridge to other occupations, becomes a genuine opportunity.</p>
          <div className="kv" style={{ marginTop: 8 }}>
            {STATS.map(([k, v, s]) => (
              <div key={k}>
                <div className="k">{k}</div>
                <div className="v">{v}</div>
                <div className="s">{s}</div>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-soft)', fontSize: '.86rem', marginTop: 16, fontStyle: 'italic' }}>Figures describe practice experience, not efficacy claims.</p>
        </div>
      </section>

      {/* Rapport */}
      <section id="rapport" className="jump-target">
        <Confetti kind="star" color="var(--teal)" size={36} anim="spin" style={{ top: 12, right: '5%' }} />
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Rapport toolkit</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Rapport is the whole game.</h2>
          <p className="lead" style={{ margin: '14px 0 28px' }}>We gravitate to those who are like us, or who we aspire to be. Build genuine connection and the client becomes receptive to goal-setting; miss it and every technique falls flat. With gamers, shared culture lets you build that connection remarkably fast. Tap a technique to open it.</p>
          <Accordion items={RAPPORT} color="var(--teal)" numbered />
          <div className="callout" style={{ marginTop: 24 }}>
            <strong style={{ color: 'var(--mauve)', textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '.5px', display: 'block', marginBottom: 6 }}>On content boundaries</strong>
            <span style={{ color: 'var(--text-soft)' }}>When a client plays something age-inappropriate, role-model rather than police it: "I do not play that one, it is too violent for me," or "it makes me motion sick. Here are the games I do play, which do you want to try?" Being clear and authentic about your own boundaries teaches more than a rule ever will.</span>
          </div>
        </div>
      </section>

      {/* Session prep: small hinges */}
      <section id="session-prep" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Session prep</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Small hinges swing big doors.</h2>
          <p className="lead" style={{ marginTop: 14 }}>A common misconception is that this work is "just playing video games with kids". In practice, the first thing on the table is everything around the play. In-game performance is a fast, visible window into the basics, and the basics carry across every domain of life. Sort these first (tap to tick them off).</p>
          <Foundations />
          <div className="prose" style={{ marginTop: 26 }}>
            <p><strong>Self-care is the on-ramp.</strong> Every step of preparing to play is a legitimate intervention target: showering regularly, wearing clean clothes the client actually wants to wear, having choice and control over that, doing their own washing, making their own meals. You are not adding self-care, you are removing the friction between the client and the thing they are motivated to do.</p>
            <p><strong>Treat the gamer like a knowledge worker, or an athlete.</strong> Elite performance in any focused activity depends on the run-up: nutrition, hydration, environment, a clean transition into deep concentration. Teach that set-up through gaming and the same skills transfer straight to schoolwork, study and office work.</p>
          </div>
          <p className="pullquote" style={{ marginBottom: 0 }}>There is no way you will study well if you have not slept. Sort the small hinges first, then everything else has a chance.</p>
        </div>
      </section>

      {/* Transitions */}
      <section id="transitions" className="jump-target">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Transitions</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Getting in, and getting out, without a fight.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Two of the hardest moments in any session are getting into the activity and getting out of it. For this client group, the transition itself is often the therapy.</p>
          <div className="prose" style={{ marginTop: 18 }}>
            <p><strong>Communicating during play.</strong> Side-by-side play is the low-pressure equivalent of walking-and-talking. Because attention is on a shared task, natural conversation breaks open up: space to raise a therapeutic topic, notice a reaction, or just let the client talk.</p>
            <p><strong>Ending without a fight.</strong> Pick games whose natural rhythm fits the session. Round-based and run-based games give you clean, low-drama stopping points. Elden Ring Nightreign runs in roughly 40-minute loops, near-perfect for a one-hour session with time to debrief and write notes. Let the loop, not a sudden "time's up", do the work.</p>
            <p><strong>Transitions as a skill you teach.</strong> Gaming is a graded on-ramp back to the world. Each rung below is a real goal. For a client who does not leave the house, coming to a clinic at all, with the car ride, the overhead lights, the noise and movement, is a major milestone.</p>
          </div>
          <div className="ladder" aria-label="Engagement ladder from in-game to school or work">
            {LADDER.map((r, i) => (
              <div className="rung" key={r}>
                <span className="step-n">Step {i + 1}</span>
                <span className="step-t">{r}</span>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-soft)', fontSize: '.9rem', marginTop: 14, fontStyle: 'italic' }}>An illustration, not a fixed sequence. Borrow the return-to-work playbook: a graded return with work-hardening periods, rather than "they are 12, they should be back at school this term".</p>
        </div>
      </section>

      {/* Frameworks */}
      <section id="frameworks" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Frameworks</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>What sits under the play.</h2>
          <p className="lead" style={{ margin: '14px 0 28px' }}>Gaming is the visible layer. Underneath sits standard, defensible OT and allied-health reasoning. Tap a framework to open it.</p>
          <Accordion items={FRAMEWORKS} color="var(--mauve)" />
        </div>
      </section>

      {/* Working as a team */}
      <section id="stakeholders" className="jump-target">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Working as a team</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Outcomes live in the in-between.</h2>
          <p className="lead" style={{ marginTop: 14 }}>In-game rapport is only part of the work. Outcomes are driven by everything that happens around the session, and that means engaging the whole system around the client.</p>
          <div style={{ display: 'grid', gap: 14, marginTop: 24 }}>
            {STAKEHOLDERS.map(([h, p]) => (
              <article className="card card--static" key={h}>
                <h3 style={{ color: 'var(--heading)', fontSize: '1rem', marginBottom: 6 }}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '.95rem' }}>{p}</p>
              </article>
            ))}
          </div>
          <div className="prose" style={{ marginTop: 26 }}>
            <p><strong>Be the client's translator and advocate.</strong> Clients often get a stream of negative feedback about their gaming. If you can translate what is genuinely happening in the game, the leadership, problem-solving, communication and persistence, into language other stakeholders understand, that itself becomes a rapport-builder and an advocacy tool.</p>
            <p><strong>Handling "screen time is evil".</strong> Meet it with curiosity, not defensiveness. Compared to what? If a client games a lot, ask what else is going on, and what changed over the last three months. High volume may be a symptom worth understanding rather than the problem itself.</p>
            <p><strong>The in-between community.</strong> Between sessions, Liam runs a Discord and Minecraft server where clients earn graded moderation roles. Putting a client who has never led into a leadership role, setting rules of engagement and handling a rule-break, creates real, transferable skill-building you can reflect on in session.</p>
          </div>
        </div>
      </section>

      {/* Why co-op + curated picks */}
      <section id="why-co-op" className="jump-target tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Why co-op</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Cooperative, not competitive.</h2>
          <div className="grid grid-2" style={{ marginTop: 28, alignItems: 'start' }}>
            <div style={{ display: 'grid', gap: 12 }}>
              {WHY_COOP.map(([h, p]) => (
                <article className="card card--static" key={h} style={{ padding: '16px 20px' }}>
                  <h3 style={{ color: 'var(--heading)', fontSize: '.98rem', marginBottom: 6 }}>{h}</h3>
                  <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '.94rem' }}>{p}</p>
                </article>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--f-display)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--text-soft)', margin: '0 0 12px' }}>Curated picks · tap to filter the library</p>
              <div style={{ display: 'grid', gap: 12 }}>
                {PICKS.map(([title, blurb, pick]) => (
                  <button
                    key={title}
                    onClick={() => applyPick(pick)}
                    className="card"
                    style={{ textAlign: 'left', cursor: 'pointer', font: 'inherit', display: 'flex', flexDirection: 'column', gap: 6, padding: '16px 20px' }}
                  >
                    <span style={{ fontFamily: 'var(--f-head)', fontSize: '.98rem', textTransform: 'uppercase', color: 'var(--heading)', letterSpacing: '-.3px' }}>{title}</span>
                    <span style={{ color: 'var(--text-soft)', fontSize: '.92rem' }}>{blurb}</span>
                    <span className="profile-link" aria-hidden="true">Filter the library ▸</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game library */}
      <section id="game-library" className="jump-target" ref={libRef}>
        <div className="wrap">
          <span className="eyebrow">Game library</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>A therapist-tested core.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Cooperative games Liam uses in practice, grouped by what they are good for. He demonstrates around 40 in the workshop; treat this as the expandable starting set. Filter by platform, setting, players, age or skill focus, or search by name.</p>

          <div className="callout" style={{ marginTop: 22 }}>
            <strong style={{ color: 'var(--mauve)', textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '.5px', display: 'block', marginBottom: 6 }}>A note on Roblox</strong>
            <span style={{ color: 'var(--text-soft)' }}>Liam is candid that Roblox carries real, warranted concerns: gambling-like mechanics and monetisation designed to hook players. He would not choose it in an ideal world. But because it runs on phones, tablets and low-end devices, it is often the easiest possible entry for telehealth, and a natural place to teach digital citizenship. Use with awareness. VR is powerful too, but the hardest to run reliably, so it is best with prior experience and a controlled space.</span>
          </div>

          {/* Filters */}
          <div className="facets" style={{ marginTop: 26 }}>
            {FACET_GROUPS.map(([label, group, opts]) => (
              <div className="facet" key={group}>
                <span className="facet__label">{label}</span>
                {opts.map((opt) => {
                  const on = filters[group].includes(opt)
                  return (
                    <button key={opt} className={`filter-chip${on ? ' is-active' : ''}`} aria-pressed={on} onClick={() => toggleFacet(group, opt)}>
                      {opt}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 16 }}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, type or platform..."
              aria-label="Search the game library"
              style={{ flex: '1 1 240px', font: 'inherit', padding: '12px 16px', borderRadius: 999, border: '3px solid var(--line)', background: 'var(--surface)', color: 'var(--text)', boxShadow: '4px 4px 0 var(--shadow-col)' }}
            />
            {activeCount > 0 && <button className="btn btn--ghost" onClick={clearAll}>Clear ({activeCount})</button>}
          </div>
          <p style={{ color: 'var(--text-soft)', fontSize: '.9rem', margin: '12px 2px 0' }} aria-live="polite">
            Showing {visible.length} of {GAMES.length} games
          </p>

          {/* Results */}
          {visible.length === 0 ? (
            <p style={{ color: 'var(--text-soft)', fontStyle: 'italic', textAlign: 'center', padding: '32px 0' }}>
              No games match those filters. <button className="profile-link" onClick={clearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'var(--teal)' }}>Clear the filters</button> to see everything.
            </p>
          ) : (
            <div className="game-grid" style={{ marginTop: 24 }}>
              {visible.map((g) => (
                <article className="card game-card" key={g.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
                    <h3 style={{ color: 'var(--heading)', fontSize: '1rem', textTransform: 'uppercase', margin: 0, letterSpacing: '-.3px' }}>{g.name}</h3>
                    <span className={ageBadgeClass(g.age)} style={{ flex: 'none' }}>{g.age}</span>
                  </div>
                  <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '.92rem' }}>
                    <strong style={{ color: 'var(--text)' }}>{g.type}.</strong> {g.great}
                  </p>
                  <div className="tags">
                    {g.platforms.map((p) => <span className="tag" key={p}>{p}</span>)}
                    <span className="tag">{settingLabel(g.setting)}</span>
                    {g.players.map((p) => <span className="tag" key={p}>{p}</span>)}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">About</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Liam Fagan and Estus Health.</h2>
          <div className="prose" style={{ marginTop: 18 }}>
            <p>Liam Fagan is an occupational therapist and the founder of Estus Health, named after the Estus Flask, the healing item in Dark Souls. His path to OT was anything but standard: accounting and finance, then roughly seven years in academic and reference libraries, then commercial sales, where the rapport-building, goal-setting and coaching translate directly into allied health. He retrained as an OT at 30.</p>
            <p>That practice has grown from solo to group and has now delivered on the order of 3,000 sessions, running around 200 a month, working mostly with autistic, ADHD and PDA-profile clients aged 6 to 59. He is currently completing advanced training in driving assessment and rehabilitation, whose models also inform his work.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
            <Btn href="#workshop" variant="btn--ghost"><PlayIcon size={16} /> Watch the workshop</Btn>
            <Btn href="#game-library" variant="btn--ghost">Explore the game library</Btn>
            <Btn href={PODCASTS.performanceLab.url} variant="btn--ghost">Performance Lab podcast ↗</Btn>
            <Btn href={YOUTUBE} variant="btn--ghost">YouTube ↗</Btn>
            <Btn href={LINKEDIN} variant="btn--ghost">LinkedIn ↗</Btn>
          </div>
          <div className="callout" style={{ marginTop: 26 }}>
            <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '.92rem' }}>This page is a free educational resource. It shares one occupational therapist's clinical approach and general information. It is not individual medical, psychological or therapeutic advice, and it is not a substitute for assessment by a qualified professional who knows the specific person. Game titles carry their own age ratings and content, so parental discretion is advised.</p>
          </div>
        </div>
      </section>

      <CTABand
        title="Curious whether this fits someone you support?"
        body="Our events and media are free and open to everyone. When you are ready for one-on-one support, we are here."
        buttons={<><ReferralButton big /><Btn to="/services/gaming-informed-therapy" variant="btn--alt" big>About the service</Btn></>}
      />
    </>
  )
}
