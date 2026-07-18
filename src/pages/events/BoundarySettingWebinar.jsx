import { useState, useRef, useMemo } from 'react'
import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton, PlayIcon } from '../../components/Bits'
import { Confetti } from '../../components/Decor'
import { JumpNav, StickyJumpNav, useActiveSection, useScrolledPast } from '../../components/JumpNav'
import { webinarBySlug } from '../../lib/webinars'
import { PODCASTS } from '../../lib/site'

/* Saying No: Boundary Setting for Neurodivergent Brains, as a free, navigable
   resource hub built from Liam Fagan and Nick Voican's live webinar. The
   recording is not published yet (WEBINAR.videoId is null), so the Watch
   section shows a "coming soon" state and a static outline until it is.

   Content is drawn from the live session. Australian spelling, no em-dashes,
   second person, per the site copy rules. This is general education, not
   individual clinical advice. */

const WEBINAR = webinarBySlug('boundary-setting')
const YOUTUBE = 'https://www.youtube.com/@Estushealth'
const LINKEDIN = 'https://www.linkedin.com/company/estus-health'

// Jump-nav sections (label, anchor id), in page order.
const SECTIONS = [
  ['Watch', 'watch'],
  ['What it is', 'what-it-is'],
  ['Sort it', 'sort'],
  ['Your style', 'style'],
  ['Your domains', 'domains'],
  ['The 6 steps', 'establish'],
  ['Scripts', 'scripts'],
  ['Troubleshooting', 'troubleshooting'],
  ['About', 'about'],
]

/* Chapter markers for the recording. The times below are taken from the
   meeting transcript, whose clock starts before the on-camera recording did, so
   the published video is offset from those times. CHAPTER_OFFSET shifts every
   marker at once: spot-check two or three against the real video, then set the
   one number (in seconds, negative to pull markers earlier). */
const CHAPTER_OFFSET = -466
const CHAPTERS = [
  ['11:55', 'Welcome and why this session'],
  ['13:53', 'What a boundary actually is'],
  ['15:00', 'The four look-alikes'],
  ['18:27', 'Why bother: the goals'],
  ['27:49', 'Porous, healthy and rigid'],
  ['31:25', 'Having something to protect'],
  ['33:22', 'A need, not a diagnosis'],
  ['40:12', 'The six steps'],
  ['43:20', 'The eight domains'],
  ['58:40', 'Live Q&A'],
]
const toSeconds = (t) => {
  const p = t.split(':').map(Number)
  const s = p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]
  return Math.max(0, s + CHAPTER_OFFSET)
}
// Format seconds back to m:ss for the marker label, so what the button shows
// matches where it actually seeks to.
const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

/* Fallback outline, shown only if the video is ever unavailable. */
const OUTLINE = [
  ['What a boundary actually is', 'The definition, and why it is about what you do, not what you make others do.'],
  ['The four look-alikes', 'Values, rules, preferences and requests, and how to tell them apart from a real boundary.'],
  ['Why bother', 'Less resentment, protected energy, burnout prevention, and relationships that get healthier, not worse.'],
  ['Porous, healthy and rigid', 'The spectrum every boundary sits on, and where yours tend to land.'],
  ['Having something to protect', 'Why a clear thing to protect makes saying no almost effortless.'],
  ['The six steps', 'A repeatable way to notice, decide, state and hold a boundary.'],
  ['The eight domains', 'Physical, relational, emotional, time, identity, intellectual, devices and money.'],
  ['Communicating without disclosing', 'Naming a need through a boundary instead of a diagnosis.'],
  ['Handling push-back', 'What to do when you state a boundary and get kicked back.'],
  ['Live Q&A', 'Real boundary problems, worked through on the call.'],
]

/* ---- Feature 3 data: boundary vs its look-alikes ---------------------- */
const TYPES = {
  boundary: { label: 'Boundary', color: 'var(--teal)' },
  rule: { label: 'Rule', color: 'var(--mauve)' },
  preference: { label: 'Preference', color: 'var(--navy)' },
  request: { label: 'Request', color: 'var(--navy)' },
  value: { label: 'Value', color: 'var(--navy)' },
}
const TYPE_ORDER = ['boundary', 'rule', 'request', 'preference', 'value']

const LOOKALIKES = [
  ['Value', 'the why underneath', 'The enduring principle you live by (health, honesty, family). Boundaries protect values, but a value on its own is not a boundary. A weak value makes a weak boundary.'],
  ['Rule', 'controls other people', '"You may not do that." An attempt to control someone else, which takes away their autonomy. It is about their behaviour, not your response, so it is not a boundary.'],
  ['Preference', 'low stakes, tradeable', '"I would prefer Thai tonight." Nice to have, easy to flex on. If you can happily let it go, it is a preference, not a boundary.'],
  ['Request', 'asks them to act', '"Can you pick me up from the airport?" You are asking someone else for a behaviour, and they get to say no. Perfectly fine to make, still not a boundary.'],
]

const SORT_ITEMS = [
  { line: 'If you start yelling at me, I will leave and go home.', answer: 'boundary', why: 'If X, then I will Y. You define the limit and your own response. That is the shape of a real boundary.' },
  { line: 'You are not allowed to raise your voice around me.', answer: 'rule', why: 'This tries to control what someone else does. Flip it to your response: "If the shouting starts, I will step out."' },
  { line: 'I would prefer we got Thai tonight.', answer: 'preference', why: 'Low stakes and tradeable. You can let it go without it costing you anything, so it is a preference.' },
  { line: 'Can you pick me up from the airport on Friday?', answer: 'request', why: 'You are asking someone else to do something, and they can say no. A request, not a boundary.' },
  { line: 'Being honest matters more to me than being liked.', answer: 'value', why: 'This is a principle you live by. It can power a boundary, but on its own it is a value.' },
  { line: 'I do not take work calls after 6pm. I will reply in the morning.', answer: 'boundary', why: 'A limit on your own availability plus what you will do instead. Classic time boundary.' },
  { line: 'My boundary is that they stop texting me so much.', answer: 'rule', why: 'You cannot control how often someone texts. Your boundary is your response: "I check messages once a day and reply then."' },
  { line: 'I do not lend money, but I am happy to help another way.', answer: 'boundary', why: 'A clear limit you hold plus your own alternative action. A money boundary.' },
  { line: 'Family time is one of the most important things in my life.', answer: 'value', why: 'A guiding principle. The boundary that protects it might be "I finish work at 4:30 to pick up the kids."' },
  { line: 'Could you keep the noise down a bit?', answer: 'request', why: 'You are asking for a change in their behaviour. They can agree or not, so it is a request.' },
]

/* ---- Feature 1 data: boundary-setting style quiz --------------------- */
const STYLE_Q = [
  {
    q: 'Someone asks you for something you do not really want to do. What usually happens?',
    a: [
      ['I say yes, then quietly resent it later', 'porous'],
      ['I say "let me check and get back to you", then decide', 'healthy'],
      ['An instant no, almost before they finish', 'rigid'],
    ],
  },
  {
    q: 'You state a need and get push-back ("why do you even need that?"). You tend to...',
    a: [
      ['Back down and apologise for asking', 'porous'],
      ['Restate it calmly, and look for a middle ground if there is one', 'healthy'],
      ['Shut the conversation down, or walk away', 'rigid'],
    ],
  },
  {
    q: 'Across your life, your boundaries are mostly...',
    a: [
      ['Bendy. I flex them for almost anyone', 'porous'],
      ['Firm, but I can adjust them when it makes sense', 'healthy'],
      ['Fixed. Once set, they do not move', 'rigid'],
    ],
  },
  {
    q: 'When you say no, guilt shows up as...',
    a: [
      ['A wave big enough that I often cave', 'porous'],
      ['A twinge that passes once I remember why', 'healthy'],
      ['Not really a factor. No is no', 'rigid'],
    ],
  },
  {
    q: 'People who know you well would say you...',
    a: [
      ['Are easy to push around, a bit of a yes-person', 'porous'],
      ['Are clear and consistent about where you stand', 'healthy'],
      ['Keep almost everyone at arm’s length', 'rigid'],
    ],
  },
  {
    q: 'You tend to decide your boundaries...',
    a: [
      ['In the heat of the moment, often too late', 'porous'],
      ['In advance, with a bit of room to adapt', 'healthy'],
      ['In advance, as hard rules with no exceptions', 'rigid'],
    ],
  },
  {
    q: 'How often do you say yes to things that drain you?',
    a: [
      ['Often. I struggle to turn things down', 'porous'],
      ['Rarely. I know what I am protecting', 'healthy'],
      ['Almost never. I decline most things by default', 'rigid'],
    ],
  },
]

const STYLE_RESULT = {
  porous: {
    name: 'Porous',
    emoji: '\u{1F30A}',
    tagline: 'You bend to keep the peace',
    body: 'Your boundaries flex easily, sometimes too easily. You say yes to things that do not protect what you value, over-explain, and let limits get crossed again and again. It is rarely because other people are being malicious. People get used to treating you a certain way because it has been allowed. The cost shows up later as resentment and burnout.',
    edge: 'Your growth edge is toward healthy. Start with one line that buys you time: "Let me check and get back to you." That single pause is often all you need to choose on purpose instead of on reflex.',
  },
  healthy: {
    name: 'Healthy',
    emoji: '\u{1F333}',
    tagline: 'Firm roots, room to bend',
    body: 'You set clear expectations, protect what you value, and stay assertive and consistent, but you can still flex when the situation genuinely calls for it. Think of the parent whose rule is "chocolate after dinner", who can make an exception on a hard day without the rule collapsing. Strong, firm, and still flexible.',
    edge: 'Your edge is maintenance, not overhaul. Keep deciding boundaries in advance, keep restating them without heat when you get push-back, and notice which relationships flourish under them and which ones only ever pushed against them.',
  },
  rigid: {
    name: 'Rigid',
    emoji: '\u{1F9F1}',
    tagline: 'Walls up, everyone at arm’s length',
    body: 'Your boundaries are strong, which is a real asset, but when every one of them is fixed and non-negotiable it can tip into keeping people out. Saying no to almost everything can protect your energy and also cost you connection. Some rigid boundaries are completely healthy to keep. The trouble is when all of them are.',
    edge: 'Your growth edge is also toward healthy, from the other direction. Pick one or two boundaries where a little flex would not cost you much, and practise negotiating a middle ground instead of a flat no.',
  },
}

/* ---- Feature 2 data: the eight domains ------------------------------- */
const DOMAINS = [
  { key: 'physical', emoji: '\u{1F9CD}', name: 'Physical', blurb: 'Your space, your body, touch, and the environments you move through.', example: '"I am not a hugger, but a wave works for me." Ordering groceries for delivery, the gym at off-peak, a big gap from the car in front.', tip: 'Decide your limit and your response before you are in the moment. A fist bump ready at goodbye beats a startled hug.' },
  { key: 'relational', emoji: '\u{1F91D}', name: 'Relational', blurb: 'How much you let people-pleasing, or being too rigid, run your relationships.', example: '"Let me check and get back to you." Taking the time you need before deciding yes or no.', tip: 'People get used to treating you the way you allow. Naming the limit early beats resenting it later.' },
  { key: 'emotional', emoji: '❤️', name: 'Emotional', blurb: 'Feeling responsible for other people’s feelings and fixing their problems.', example: '"I care about how you feel, and I cannot fix this for you." Offering support without taking on the whole load.', tip: 'Ask what they actually want: "Would it help more if I just listened, or if we problem-solved together?"' },
  { key: 'time', emoji: '⏰', name: 'Time', blurb: 'Availability, work hours, and protecting energy from time debt and burnout.', example: '"I do not take work calls after 6pm. I will reply in the morning." An online booking link instead of calls on the fly.', tip: 'Give every slot in your week an intention. When people know when you are available, the back-and-forth disappears.' },
  { key: 'identity', emoji: '\u{1FAA9}', name: 'Identity', blurb: 'Who you are, what you will and will not do, and dropping the mask.', example: '"That does not work for me anymore." Letting go of a role you played to meet others’ expectations.', tip: 'This is often the hardest one, especially after a late diagnosis. Expect some kickback, and some grief, as you reclaim it.' },
  { key: 'intellectual', emoji: '\u{1F9E0}', name: 'Intellectual', blurb: 'Your views, your right to disagree, and what you let into your feed.', example: '"We see this differently, and I am going to leave it there." A deliberate cleanse of a feed that has turned negative.', tip: 'You would be surprised how much your feed shapes your outlook. Curating who you follow is a real boundary.' },
  { key: 'devices', emoji: '\u{1F4F1}', name: 'Devices & availability', blurb: 'Screens, notifications, and how quickly people expect a reply.', example: '"I protect my sleep by keeping screens off at night." Setting the expectation that replies take a day or two.', tip: 'Set response-time expectations out loud. "My website says one to two days" saves a lot of urgency that was never really there.' },
  { key: 'money', emoji: '\u{1F4B0}', name: 'Money & obligation', blurb: 'Lending, working for free, charging your worth, and financial pressure.', example: '"I do not lend money, but I am happy to help another way." "I do not work for free. If I am delivering value, I charge for it."', tip: 'If you do lend, take security. And push back on being expected to work for free, which is especially common in the disability community.' },
]

/* ---- Feature 4 data: the six steps ----------------------------------- */
const STEPS = [
  ['Awareness', 'Notice what you actually need and what you are trying to protect. Sensory needs, energy, time, values. You cannot set a boundary around something you have not named yet. This is slow work, and it is the foundation for everything after it.'],
  ['Decide in advance', 'Good boundaries are decided before the moment, not after it. Trying to set one after the fact is like putting the genie back in the bottle. Have a preset response ready: "If this happens, I will do that."'],
  ['State it clearly', 'Say it plainly and kindly. Confrontational in a very nice way. You are not asking permission, you are stating what you will do. Naming a need through a boundary ("I need noise-cancelling headphones at loud parties") beats explaining yourself through a diagnosis.'],
  ['Do it consistently', 'A boundary you enforce once is a suggestion, and people treat suggestions like suggestions. Restate it as many times as it takes. Consistency is what turns a one-off into a known limit, and it is where porous boundaries usually fall down.'],
  ['Stay adaptable', 'Firm does not mean brittle. Look for the middle ground where one exists: "I will come for two hours, and I will wear my headphones." Negotiating a workable version is often better than a flat no, and it keeps healthy relationships intact.'],
  ['Manage the guilt', 'If you are coming from people-pleasing, expect guilt and the fear of rejection. That is the real work, not the wording. It fades with practice. You are not doing this to upset anyone. You are doing it so resentment and burnout do not build quietly in the background.'],
]

/* ---- Feature 5 data: copy-ready scripts ------------------------------ */
const SCRIPTS = [
  ['physical', 'Not a hugger', '"I am not a hugger, but a wave works for me."'],
  ['physical', 'Need a quieter setting', '"Could we sit outside? It is easier for me to hear you there."'],
  ['relational', 'Buy yourself time', '"Let me check and get back to you."'],
  ['relational', 'A firm but warm no', '"Thanks for thinking of me. That is not something I can take on right now."'],
  ['emotional', 'Care without fixing', '"I care about how you feel, and I cannot fix this for you."'],
  ['emotional', 'Offer the right support', '"Would it help more if I just listened, or if we problem-solved together?"'],
  ['time', 'Protect your evenings', '"I do not take work calls after 6pm. I will reply in the morning."'],
  ['time', 'Redirect to a booking', '"I am not available for phone calls. Please book a time on my website and we will chat."'],
  ['identity', 'This no longer fits', '"That does not work for me anymore."'],
  ['intellectual', 'Agree to differ', '"We see this differently, and I am going to leave it there."'],
  ['intellectual', 'Let a difference sit', '"I do not mind if we see things differently."'],
  ['devices', 'Protect your sleep', '"I keep screens off at night, so I will get back to you tomorrow."'],
  ['money', 'Not a lender', '"I do not lend money, but I am happy to help another way."'],
  ['money', 'Charge your worth', '"I do not work for free. If I am delivering value, I charge for it."'],
  ['identity', 'Hold your ground on a rule', '"I understand that you do not want this. I am going to do it anyway."'],
]
const SCRIPT_FILTERS = [
  ['all', 'All'],
  ['physical', 'Physical'],
  ['relational', 'Relational'],
  ['emotional', 'Emotional'],
  ['time', 'Time'],
  ['identity', 'Identity'],
  ['intellectual', 'Intellectual'],
  ['devices', 'Devices'],
  ['money', 'Money'],
]
const DOMAIN_LABEL = Object.fromEntries(DOMAINS.map((d) => [d.key, d.name]))

/* ---- Feature 6 data: troubleshooting --------------------------------- */
const TROUBLE = [
  ['"Why do you even need to do that?"', 'You state a need and get kickback, especially from people who have known you a long time. That is not a sign you are wrong. Keep it need-based, not diagnosis-based: "This is what helps me stay regulated in this situation." You are not obliged to hand over your whole medical history to justify a reasonable request.'],
  ['They ignore it, or the plan quietly changes', 'A boundary stated once and then dropped teaches people it was optional. Restate it, calmly and consistently, as many times as it takes. If a request keeps coming after a clear no, the boundary is your response, not their behaviour: "I check messages once a day and reply then."'],
  ['The right people vs the wrong people', 'When you communicate a boundary, the right people are usually happy to meet you there. The wrong people push back. That kickback is information. It exposes which relationships are healthy (they flourish) and which were only ever unhealthy (they strain). Then you get a choice about how, and whether, you spend time with them.'],
  ['Someone imposes their rule on you', 'Sometimes the hard part is not setting a boundary, it is someone trying to impose a rule on you. You do not have to win the argument. A complete response can be: "I understand that you do not want this. I am going to do it anyway." Your boundary is what you do, not their agreement.'],
  ['The guilt is overwhelming', 'If you come from a people-pleasing background, guilt and the fear of rejection can be the whole barrier. This eases with practice. Remember the reframe: you are not doing this to hurt anyone. You are doing it so resentment does not build and you do not burn out. That protects the relationship, it does not damage it.'],
  ['You only thought of the boundary afterwards', 'Setting a boundary after the fact is genuinely tricky. Where you can, decide in advance and keep a few preset responses ready for situations you can see coming. When you do get caught out, that is useful data for next time, not a failure.'],
]

/* ---------- Small helpers ---------- */

function CopyBtn({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600) }
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(done)
    else done()
  }
  return (
    <button className={`bw-copy${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={`Copy: ${text}`}>
      {copied ? 'Copied ✓' : label}
    </button>
  )
}

// Shared expandable list (six steps and troubleshooting).
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

// The video with clickable chapter markers, or a fallback outline if the
// recording is ever unavailable.
function Watch() {
  const [start, setStart] = useState(null)
  if (!WEBINAR.videoId) {
    return (
      <>
        <div className="video-embed" style={{ paddingTop: 0 }}>
          <div style={{ minHeight: 220, display: 'grid', placeItems: 'center', textAlign: 'center', padding: '40px 24px', background: 'var(--surface-2)' }}>
            <div>
              <span className="badge badge--mauve">Recording coming soon</span>
              <p style={{ color: 'var(--text)', fontWeight: 700, margin: '16px 0 4px', fontFamily: 'var(--f-head)', textTransform: 'uppercase', fontSize: '1.1rem' }}>The video is on its way.</p>
              <p style={{ color: 'var(--text-soft)', margin: 0, maxWidth: '46ch' }}>Everything below is interactive and ready to use today.</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
          {OUTLINE.map(([h, p], i) => (
            <div key={h} className="card card--static" style={{ padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span aria-hidden="true" style={{ flex: 'none', fontFamily: 'var(--f-display)', fontSize: '.8rem', color: 'var(--mauve)', marginTop: 2 }}>{String(i + 1).padStart(2, '0')}</span>
              <span>
                <span style={{ display: 'block', fontWeight: 700, color: 'var(--heading)' }}>{h}</span>
                <span style={{ color: 'var(--text-soft)', fontSize: '.94rem' }}>{p}</span>
              </span>
            </div>
          ))}
        </div>
      </>
    )
  }
  const base = `https://www.youtube-nocookie.com/embed/${WEBINAR.videoId}`
  const src = start == null ? `${base}?rel=0` : `${base}?start=${start}&autoplay=1&rel=0`
  return (
    <>
      <div className="video-embed">
        <iframe
          key={start ?? 'default'}
          src={src}
          title="Saying No: Boundary Setting for Neurodivergent Brains"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p style={{ color: 'var(--text-soft)', fontSize: '.9rem', margin: '20px 0 0' }}>
        <strong style={{ color: 'var(--heading)' }}>Jump to a chapter.</strong> Tap any marker to start the video there.
      </p>
      <div className="chapters" role="group" aria-label="Video chapters">
        {CHAPTERS.map(([t, label]) => {
          const secs = toSeconds(t)
          return (
            <button key={label} className={`chapter-btn${start === secs ? ' is-active' : ''}`} onClick={() => setStart(secs)}>
              <span className="ct">{fmtTime(secs)}</span> {label}
            </button>
          )
        })}
      </div>
    </>
  )
}

// Feature 3: is it a boundary, or one of its look-alikes?
function SortGame() {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const item = SORT_ITEMS[i]
  const correct = picked === item.answer

  const choose = (t) => {
    if (picked) return
    setPicked(t)
    if (t === item.answer) setScore((s) => s + 1)
  }
  const next = () => {
    if (i + 1 >= SORT_ITEMS.length) { setDone(true); return }
    setI((n) => n + 1); setPicked(null)
  }
  const restart = () => { setI(0); setPicked(null); setScore(0); setDone(false) }

  if (done) {
    return (
      <div className="card bw-panel" style={{ textAlign: 'center' }}>
        <span className="badge badge--mauve">Round complete</span>
        <p style={{ fontFamily: 'var(--f-head)', fontSize: '1.6rem', color: 'var(--heading)', textTransform: 'uppercase', margin: '16px 0 6px' }}>You got {score} of {SORT_ITEMS.length}</p>
        <p style={{ color: 'var(--text-soft)', maxWidth: '48ch', margin: '0 auto 20px' }}>
          The tell is always the same: a real boundary describes what <strong style={{ color: 'var(--text)' }}>you</strong> will do. Everything else is about someone else’s behaviour, or is a nice-to-have you can trade away.
        </p>
        <button className="btn btn--ghost" onClick={restart}>Play again</button>
      </div>
    )
  }

  return (
    <div className="card bw-panel">
      <div className="bw-panel-top">
        <span className="bw-count">{i + 1} / {SORT_ITEMS.length}</span>
        <span className="bw-count">Score {score}</span>
      </div>
      <p className="bw-sort-line">{'“'}{item.line}{'”'}</p>
      <div className="bw-type-row">
        {TYPE_ORDER.map((t) => {
          const isAns = t === item.answer
          const isPick = t === picked
          let cls = 'bw-type'
          if (picked) {
            if (isAns) cls += ' is-right'
            else if (isPick) cls += ' is-wrong'
            else cls += ' is-dim'
          }
          return (
            <button key={t} className={cls} onClick={() => choose(t)} disabled={!!picked}>
              {TYPES[t].label}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className={`bw-feedback${correct ? ' is-right' : ' is-wrong'}`}>
          <strong>{correct ? 'Correct.' : `Not quite, that is a ${TYPES[item.answer].label.toLowerCase()}.`}</strong> {item.why}
          <div style={{ marginTop: 14 }}>
            <button className="btn" onClick={next}>{i + 1 >= SORT_ITEMS.length ? 'See your score' : 'Next ▸'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Feature 1: what is your boundary-setting style?
function StyleQuiz() {
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const answered = Object.keys(answers).length
  const allDone = answered === STYLE_Q.length

  const pick = (qi, style) => setAnswers((a) => ({ ...a, [qi]: style }))
  const reset = () => { setAnswers({}); setShowResult(false) }

  const result = useMemo(() => {
    const tally = { porous: 0, healthy: 0, rigid: 0 }
    Object.values(answers).forEach((s) => { tally[s] += 1 })
    const order = ['porous', 'healthy', 'rigid']
    let best = 'healthy', bestN = -1
    order.forEach((k) => { if (tally[k] > bestN) { best = k; bestN = tally[k] } })
    return { key: best, tally }
  }, [answers])

  if (showResult && allDone) {
    const r = STYLE_RESULT[result.key]
    return (
      <div className="card bw-panel">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', lineHeight: 1 }} aria-hidden="true">{r.emoji}</div>
          <span className="badge badge--mauve" style={{ marginTop: 12 }}>Your leaning</span>
          <h3 style={{ fontFamily: 'var(--f-head)', fontSize: '2rem', color: 'var(--heading)', textTransform: 'uppercase', margin: '10px 0 2px' }}>{r.name}</h3>
          <p style={{ color: 'var(--mauve)', fontWeight: 700, margin: 0 }}>{r.tagline}</p>
        </div>
        <div className="bw-spectrum" aria-hidden="true">
          {['porous', 'healthy', 'rigid'].map((k) => (
            <div key={k} className={`bw-spectrum-seg${result.key === k ? ' is-on' : ''}`}>
              <span>{STYLE_RESULT[k].name}</span>
              <b>{result.tally[k]}</b>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--text-soft)', marginTop: 18 }}>{r.body}</p>
        <div className="callout" style={{ margin: '18px 0 0' }}>
          <strong style={{ color: 'var(--mauve)', textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '.5px', display: 'block', marginBottom: 6 }}>Your growth edge</strong>
          <span style={{ color: 'var(--text-soft)' }}>{r.edge}</span>
        </div>
        <p style={{ color: 'var(--text-soft)', fontSize: '.82rem', fontStyle: 'italic', margin: '16px 0 0' }}>
          Almost everyone shows a mix, and your style can differ by domain and by who you are with. This is a reflection prompt, not a label.
        </p>
        <div style={{ marginTop: 18 }}>
          <button className="btn btn--ghost" onClick={reset}>Retake</button>
        </div>
      </div>
    )
  }

  return (
    <div className="card bw-panel">
      <div className="bw-panel-top">
        <span className="bw-count">Answered {answered} / {STYLE_Q.length}</span>
      </div>
      <div style={{ display: 'grid', gap: 20 }}>
        {STYLE_Q.map((item, qi) => (
          <div key={qi}>
            <p className="bw-q">{item.q}</p>
            <div style={{ display: 'grid', gap: 8 }}>
              {item.a.map(([label, style]) => (
                <button
                  key={label}
                  className={`bw-opt${answers[qi] === style ? ' is-sel' : ''}`}
                  onClick={() => pick(qi, style)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 22 }}>
        <button className="btn" onClick={() => setShowResult(true)} disabled={!allDone}>
          {allDone ? 'See your style ▸' : `Answer all ${STYLE_Q.length} to see your style`}
        </button>
      </div>
    </div>
  )
}

// Feature 2: which domains hold your strongest boundaries?
function DomainProfiler() {
  const [ratings, setRatings] = useState({})
  const set = (key, val) => setRatings((r) => ({ ...r, [key]: val }))
  const reset = () => setRatings({})

  const ratedCount = Object.keys(ratings).length
  const allRated = ratedCount === DOMAINS.length

  const sorted = useMemo(
    () => [...DOMAINS].sort((a, b) => (ratings[b.key] || 0) - (ratings[a.key] || 0)),
    [ratings]
  )
  const strongest = allRated ? sorted[0] : null
  const growth = allRated ? sorted[sorted.length - 1] : null

  return (
    <div>
      <div className="card bw-panel">
        <div className="bw-panel-top">
          <span className="bw-count">Rated {ratedCount} / {DOMAINS.length}</span>
          {ratedCount > 0 && <button className="bw-copy" onClick={reset}>Reset</button>}
        </div>
        <p style={{ color: 'var(--text-soft)', margin: '0 0 18px', fontSize: '.95rem' }}>
          Rate how solid your boundaries feel in each area, from 1 (porous, easily crossed) to 5 (clear and consistent). Your profile builds as you go.
        </p>
        <div style={{ display: 'grid', gap: 14 }}>
          {DOMAINS.map((d) => {
            const val = ratings[d.key] || 0
            return (
              <div key={d.key} className="bw-domain-row">
                <div className="bw-domain-head">
                  <span className="bw-domain-name"><span aria-hidden="true">{d.emoji}</span> {d.name}</span>
                  <div className="bw-scale" role="group" aria-label={`Rate your ${d.name} boundaries`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        className={`bw-dot${val >= n ? ' is-on' : ''}`}
                        aria-pressed={val === n}
                        aria-label={`${n} out of 5`}
                        onClick={() => set(d.key, n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bw-bar"><i style={{ width: `${(val / 5) * 100}%` }} /></div>
              </div>
            )
          })}
        </div>
      </div>

      {allRated && (
        <div className="card bw-panel" style={{ marginTop: 20 }}>
          <span className="badge badge--mauve">Your boundary profile</span>
          <div className="grid grid-2" style={{ marginTop: 18, gap: 16 }}>
            <div className="bw-hi bw-hi--strong">
              <span className="bw-hi-lab">Strongest</span>
              <span className="bw-hi-name"><span aria-hidden="true">{strongest.emoji}</span> {strongest.name}</span>
              <p>{strongest.tip}</p>
            </div>
            <div className="bw-hi bw-hi--growth">
              <span className="bw-hi-lab">Growth area</span>
              <span className="bw-hi-name"><span aria-hidden="true">{growth.emoji}</span> {growth.name}</span>
              <p>{growth.tip}</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-soft)', fontSize: '.9rem', margin: '18px 0 0' }}>
            Ranked strongest to weakest:
          </p>
          <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
            {sorted.map((d) => (
              <div key={d.key} className="bw-rank-row">
                <span className="bw-rank-name"><span aria-hidden="true">{d.emoji}</span> {d.name}</span>
                <div className="bw-bar bw-bar--sm"><i style={{ width: `${((ratings[d.key] || 0) / 5) * 100}%` }} /></div>
                <span className="bw-rank-num">{ratings[d.key]}/5</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Feature 5: copy-ready scripts, filterable by domain.
function Scripts() {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? SCRIPTS : SCRIPTS.filter(([d]) => d === filter)
  return (
    <div>
      <div className="facet" style={{ marginBottom: 18 }}>
        {SCRIPT_FILTERS.map(([key, label]) => (
          <button
            key={key}
            className={`filter-chip${filter === key ? ' is-active' : ''}`}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {visible.map(([domain, cap, line]) => (
          <div key={cap} className="card card--static bw-script">
            <div className="bw-script-txt">
              <span className="bw-script-cap">{DOMAIN_LABEL[domain]} {'·'} {cap}</span>
              <p className="bw-script-line">{line}</p>
            </div>
            <CopyBtn text={line.replace(/[“”]/g, '')} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BoundarySettingWebinar() {
  const active = useActiveSection(SECTIONS)
  const sentinelRef = useRef(null)
  const showSticky = useScrolledPast(sentinelRef)

  return (
    <>
      <SEO
        title="Saying No: Boundary Setting for Neurodivergent Brains | Estus Health"
        description="A free, interactive companion to Liam Fagan and Nick Voican's boundary-setting webinar. Find your boundary style, map your strongest domains, tell a boundary from a rule, and get copy-ready scripts and troubleshooting."
        path={WEBINAR.path}
        type="video.other"
      />

      <style>{BW_CSS}</style>

      <PageHero
        eyebrow="Webinar" eyebrowClass="eyebrow--mauve" badge="Interactive resource hub"
        title="Saying No"
        sub2={WEBINAR.subtitle}
        sub="Occupational therapists Liam Fagan and Nick Voican on boundaries for neurodivergent brains: what they really are, why they feel so hard, and how to set them without burning out. Work through the interactive tools, then take the scripts with you."
      >
        <Btn href="#style">Find your boundary style</Btn>
        <Btn href="#scripts" variant="btn--alt">Jump to the scripts</Btn>
      </PageHero>

      <div className="wrap" style={{ paddingBottom: 6 }}>
        <JumpNav sections={SECTIONS} active={active} />
      </div>
      <StickyJumpNav sections={SECTIONS} active={active} show={showSticky} />
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Watch */}
      <section id="watch" className="jump-target" style={{ paddingTop: 28 }}>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Watch</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>The full session.</h2>
          <p className="lead" style={{ margin: '14px 0 26px' }}>
            A live conversation for neurodivergent adults, clinicians and anyone who finds saying no hard. Both Liam and Nick are autistic occupational therapists, so this comes from a lived and a clinical lens at once. About {WEBINAR.duration.replace('~', '')} long.
          </p>
          <Watch />
        </div>
      </section>

      {/* What it is */}
      <section id="what-it-is" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">What it is</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>A boundary is about what you do.</h2>
          <div className="prose" style={{ marginTop: 18 }}>
            <p>Here is the working definition: a boundary is a <strong>self-defined limit that protects your core needs and values, across every domain of your life.</strong> It is a fairly modern term, common only in the last twenty to twenty-five years, but the idea is old.</p>
            <p>The single biggest misconception is that a boundary is about what you want other people to do. It is not. A boundary is about <strong>what you do.</strong> The shape of it is always the same: <strong>if this happens, then I will do that.</strong> That one reframe is the whole session in a sentence.</p>
          </div>
          <p className="pullquote">"If you start yelling at me, I will leave and go home." You define the limit, and you define your own response to it.</p>

          <h3 style={{ fontFamily: 'var(--f-head)', textTransform: 'uppercase', color: 'var(--heading)', fontSize: '1.15rem', margin: '28px 0 4px' }}>The four things people mistake for a boundary</h3>
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            {LOOKALIKES.map(([k, tag, body]) => (
              <div key={k} className="card card--static" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <strong style={{ color: 'var(--heading)', fontFamily: 'var(--f-head)', textTransform: 'uppercase', fontSize: '1rem' }}>{k}</strong>
                  <span style={{ fontFamily: 'var(--f-display)', fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.5px', color: 'var(--mauve)' }}>{tag}</span>
                </div>
                <p style={{ color: 'var(--text-soft)', margin: '6px 0 0', fontSize: '.95rem' }}>{body}</p>
              </div>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 22 }}>
            <span style={{ color: 'var(--text-soft)' }}>Making a request or holding a preference is completely fine. The point is not that rules and requests are bad, it is that only one of these actually protects you when the moment comes, because only one of them depends entirely on you.</span>
          </div>
        </div>
      </section>

      {/* Sort it */}
      <section id="sort" className="jump-target">
        <Confetti kind="star" color="var(--teal)" size={36} anim="spin" style={{ top: 12, right: '5%' }} />
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Try it</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Boundary, or look-alike?</h2>
          <p className="lead" style={{ margin: '14px 0 26px' }}>The fastest way to feel the difference is to sort a few live. Read each line and decide what it really is. You will start to hear the tell.</p>
          <SortGame />
        </div>
      </section>

      {/* Your style */}
      <section id="style" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Interactive</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>What is your boundary style?</h2>
          <p className="lead" style={{ margin: '14px 0 20px' }}>Every boundary sits on a spectrum from porous to rigid, with healthy in the middle. Answer seven quick questions to see where you tend to land, and which direction your growth edge points.</p>
          <div className="bw-mini-legend">
            <span><b style={{ color: 'var(--teal)' }}>Porous</b> too flexible, crossed often</span>
            <span><b style={{ color: 'var(--heading)' }}>Healthy</b> firm, but adaptable</span>
            <span><b style={{ color: 'var(--mauve)' }}>Rigid</b> fixed, everyone at arm's length</span>
          </div>
          <StyleQuiz />
        </div>
      </section>

      {/* Your domains */}
      <section id="domains" className="jump-target">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Interactive</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Where are your strongest boundaries?</h2>
          <p className="lead" style={{ margin: '14px 0 26px' }}>Boundaries show up across eight domains of life. Rate each one to build a quick profile of where you are solid and where there is room to grow. Every domain below also carries an example and a starter tip.</p>
          <DomainProfiler />

          <h3 style={{ fontFamily: 'var(--f-head)', textTransform: 'uppercase', color: 'var(--heading)', fontSize: '1.15rem', margin: '34px 0 4px' }}>The eight domains, up close</h3>
          <p className="lead" style={{ margin: '6px 0 20px' }}>Tap any domain to see what a boundary can look like there.</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {DOMAINS.map((d) => (
              <details key={d.key} className="card card--static" style={{ padding: '16px 20px', borderLeft: '8px solid var(--teal)' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--heading)', fontSize: '1.02rem' }}>
                  <span aria-hidden="true" style={{ marginRight: 8 }}>{d.emoji}</span>{d.name}
                </summary>
                <p style={{ color: 'var(--text-soft)', margin: '12px 0 0' }}>{d.blurb}</p>
                <p style={{ color: 'var(--text)', margin: '10px 0 0', fontSize: '.94rem' }}><strong>For example:</strong> {d.example}</p>
                <p style={{ color: 'var(--text-soft)', margin: '10px 0 0', fontSize: '.94rem', fontStyle: 'italic' }}>{d.tip}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Establishing: the six steps */}
      <section id="establish" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">The method</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Establishing a boundary, in six steps.</h2>
          <p className="lead" style={{ margin: '14px 0 20px' }}>This is a long-term practice, not a one-off. Nick and Liam use these six steps with clients over months, not minutes. Tap each step to open it.</p>
          <Accordion items={STEPS} color="var(--mauve)" numbered />
          <div className="callout" style={{ marginTop: 24 }}>
            <strong style={{ color: 'var(--mauve)', textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '.5px', display: 'block', marginBottom: 6 }}>The shortcut: have something to protect</strong>
            <span style={{ color: 'var(--text-soft)' }}>Saying no gets dramatically easier when there is a clear thing on the other side of it. The friend training for a marathon never had to argue: "Can't, training for a marathon" ended every invitation, and everyone respected it. Get clear on what you are protecting towards, and the no writes itself.</span>
          </div>
        </div>
      </section>

      {/* Scripts */}
      <section id="scripts" className="jump-target">
        <Confetti kind="dot" color="var(--mauve)" size={26} anim="float2" style={{ top: 20, right: '4%' }} />
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Take these with you</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Scripts for setting a boundary.</h2>
          <p className="lead" style={{ margin: '14px 0 24px' }}>Ready-made lines you can borrow, grouped by domain. Aim for need-based, not diagnosis-based: you rarely have to explain your whole history to make a reasonable ask. Filter, then copy the ones that fit.</p>
          <Scripts />
        </div>
      </section>

      {/* Troubleshooting */}
      <section id="troubleshooting" className="jump-target tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">When it gets hard</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Troubleshooting the push-back.</h2>
          <p className="lead" style={{ margin: '14px 0 20px' }}>Stating a boundary and getting kickback is one of the hardest parts, and one of the most normal. Here is how to think about the situations that come up most. Tap to open each.</p>
          <Accordion items={TROUBLE} color="var(--teal)" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="jump-target">
        <div className="wrap wrap--narrow">
          <span className="eyebrow">About</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Liam Fagan and Nick Voican.</h2>
          <div className="prose" style={{ marginTop: 18 }}>
            <p><strong>Liam Fagan</strong> is an occupational therapist and the founder of Estus Health in Perth, working with autistic, ADHD and PDA-profile clients from paediatrics through to adults, in person and via telehealth. <strong>Nick Voican</strong> is an occupational therapist who runs Kintsugi OT, working mostly with autistic adults, largely by telehealth. Both are autistic, and both build their own practices around protecting sensory and energy needs, which is a boundary in itself.</p>
            <p>They ran this session because so much of their work comes back to the same thing: helping people protect their space, time and relationships in a way that keeps the healthy relationships flourishing. Their take is deliberately practical and neuroaffirming, focused on how you actually implement this, day to day, from a neurodivergent lens.</p>
          </div>
          <div className="callout" style={{ marginTop: 22 }}>
            <strong style={{ color: 'var(--mauve)', textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '.5px', display: 'block', marginBottom: 6 }}>Go deeper</strong>
            <span style={{ color: 'var(--text-soft)' }}>Both hosts recommend Mark Manson's long-form deep dive on boundaries (it runs about four hours) for the history and philosophy behind the idea. This page is the neurodivergent, put-it-into-practice companion to that.</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
            <Btn href={PODCASTS.performanceLab.url} variant="btn--ghost">Performance Lab podcast ↗</Btn>
            <Btn href={PODCASTS.otAndYap.url} variant="btn--ghost">OT and Yap podcast ↗</Btn>
            <Btn href={YOUTUBE} variant="btn--ghost">YouTube ↗</Btn>
            <Btn href={LINKEDIN} variant="btn--ghost">LinkedIn ↗</Btn>
          </div>
          <div className="callout" style={{ marginTop: 26 }}>
            <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '.92rem' }}>This page is a free educational resource. It shares two occupational therapists' general approach to boundaries. It is not individual medical, psychological or therapeutic advice, and it is not a substitute for assessment by a qualified professional who knows the specific person. If money, safety or a relationship feels unsafe, please reach out to a professional directly.</p>
          </div>
        </div>
      </section>

      <CTABand
        title="Want support putting this into practice?"
        body="Our events and resources are free and open to everyone. When you are ready for one-on-one support, we are here."
        buttons={<><ReferralButton big /><Btn to="/events" variant="btn--alt" big>More events ▸</Btn></>}
      />
    </>
  )
}

/* Page-scoped styles for the interactive widgets. Everything references the
   design-system tokens so both themes are covered automatically. */
const BW_CSS = `
  .bw-panel { padding: 22px 24px; }
  .bw-panel-top { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:14px; }
  .bw-count { font-family: var(--f-display); font-size:.66rem; text-transform:uppercase; letter-spacing:.5px; color: var(--text-soft); }

  .bw-sort-line { font-family: var(--f-head); font-size: clamp(1.15rem, 3.4vw, 1.5rem); color: var(--heading); line-height:1.25; letter-spacing:-.3px; margin: 4px 0 18px; }
  .bw-type-row { display:flex; flex-wrap:wrap; gap:8px; }
  .bw-type {
    font-family: var(--f-body); font-weight:600; font-size:.9rem;
    color: var(--text); background: var(--surface);
    border: 2px solid var(--line); border-radius:999px;
    padding: 9px 16px; cursor:pointer;
    transition: transform .12s ease, background .12s ease, color .12s ease;
  }
  .bw-type:hover:not(:disabled) { transform: translateY(-1px); background: var(--surface-2); }
  .bw-type:disabled { cursor: default; }
  .bw-type.is-right { background: var(--teal); color: var(--btn-text); border-color: var(--teal); }
  .bw-type.is-wrong { background: var(--mauve); color: var(--btn-text); border-color: var(--mauve); }
  .bw-type.is-dim { opacity:.45; }
  .bw-feedback { margin-top:18px; padding:14px 16px; border-radius:14px; font-size:.95rem; color: var(--text-soft); border:2px solid var(--line); background: var(--surface-2); }
  .bw-feedback strong { color: var(--heading); }
  .bw-feedback.is-right { border-color: var(--teal); }
  .bw-feedback.is-wrong { border-color: var(--mauve); }

  .bw-q { font-weight:600; color: var(--text); margin: 0 0 10px; }
  .bw-opt {
    display:block; width:100%; text-align:left;
    font-family: var(--f-body); font-size:.95rem; color: var(--text);
    background: var(--surface); border:2px solid var(--line); border-radius:12px;
    padding: 12px 16px; cursor:pointer;
    transition: transform .12s ease, background .12s ease, border-color .12s ease;
  }
  .bw-opt:hover { transform: translateX(3px); background: var(--surface-2); }
  .bw-opt.is-sel { border-color: var(--teal); background: var(--surface-2); font-weight:600; box-shadow: inset 4px 0 0 var(--teal); }

  .bw-spectrum { display:grid; grid-template-columns: repeat(3,1fr); gap:10px; margin-top:20px; }
  .bw-spectrum-seg { text-align:center; border:2px solid var(--line); border-radius:12px; padding:12px 8px; background: var(--surface); }
  .bw-spectrum-seg span { display:block; font-family: var(--f-display); font-size:.62rem; text-transform:uppercase; letter-spacing:.5px; color: var(--text-soft); }
  .bw-spectrum-seg b { font-family: var(--f-head); font-size:1.5rem; color: var(--heading); }
  .bw-spectrum-seg.is-on { border-color: var(--mauve); background: var(--surface-2); }
  .bw-spectrum-seg.is-on b { color: var(--mauve); }

  .bw-mini-legend { display:flex; flex-wrap:wrap; gap:8px 20px; margin: 0 0 20px; font-size:.86rem; color: var(--text-soft); }
  .bw-mini-legend b { text-transform:uppercase; font-family: var(--f-display); font-size:.68rem; letter-spacing:.5px; margin-right:5px; }

  .bw-domain-row { }
  .bw-domain-head { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:8px; }
  .bw-domain-name { font-weight:700; color: var(--heading); font-size:.98rem; }
  .bw-scale { display:flex; gap:6px; }
  .bw-dot {
    width:34px; height:34px; border-radius:9px; cursor:pointer;
    font-family: var(--f-display); font-size:.8rem; color: var(--text-soft);
    background: var(--surface); border:2px solid var(--line);
    transition: background .12s ease, color .12s ease, transform .1s ease;
  }
  .bw-dot:hover { transform: translateY(-1px); }
  .bw-dot.is-on { background: var(--teal); color: var(--btn-text); border-color: var(--teal); }
  .bw-bar { height:10px; border-radius:999px; background: var(--surface-2); border:2px solid var(--line); overflow:hidden; }
  .bw-bar > i { display:block; height:100%; background: linear-gradient(90deg, var(--teal), var(--mauve)); transition: width .3s ease; }
  .bw-bar--sm { height:8px; }

  .bw-hi { border:3px solid var(--line); border-radius: var(--radius); padding:18px 20px; background: var(--surface); }
  .bw-hi--strong { box-shadow: 6px 6px 0 var(--teal); }
  .bw-hi--growth { box-shadow: 6px 6px 0 var(--mauve); }
  .bw-hi-lab { font-family: var(--f-display); font-size:.62rem; text-transform:uppercase; letter-spacing:.5px; color: var(--text-soft); }
  .bw-hi-name { display:block; font-family: var(--f-head); font-size:1.3rem; text-transform:uppercase; color: var(--heading); margin:6px 0 8px; }
  .bw-hi p { margin:0; color: var(--text-soft); font-size:.92rem; }

  .bw-rank-row { display:flex; align-items:center; gap:12px; }
  .bw-rank-name { flex: 0 0 42%; font-weight:600; color: var(--text); font-size:.9rem; }
  .bw-rank-row .bw-bar { flex:1; }
  .bw-rank-num { flex:none; font-family: var(--f-display); font-size:.66rem; color: var(--text-soft); width:34px; text-align:right; }

  .bw-script { display:flex; gap:14px; align-items:center; padding:16px 18px; }
  .bw-script-txt { flex:1; min-width:0; }
  .bw-script-cap { font-family: var(--f-display); font-size:.6rem; text-transform:uppercase; letter-spacing:.5px; color: var(--mauve); }
  .bw-script-line { font-size:1.02rem; color: var(--heading); font-weight:600; margin:5px 0 0; }
  .bw-copy {
    flex:none; font-family: var(--f-display); font-size:.66rem; text-transform:uppercase; letter-spacing:.5px;
    color: var(--text); background: var(--surface); border:2px solid var(--line); border-radius:999px;
    padding:8px 14px; cursor:pointer; transition: background .12s ease, color .12s ease;
  }
  .bw-copy:hover { background: var(--teal); color: var(--btn-text); border-color: var(--teal); }
  .bw-copy.is-copied { background: var(--teal); color: var(--btn-text); border-color: var(--teal); }

  @media (max-width: 560px) {
    .bw-rank-name { flex-basis: 50%; }
    .bw-script { flex-direction:column; align-items:flex-start; }
    .bw-spectrum-seg b { font-size:1.2rem; }
  }
`
