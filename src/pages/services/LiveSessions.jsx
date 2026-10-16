import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import { PageHero, CTABand, Btn, ReferralButton } from '../../components/Bits'

/* ==========================================================================
   Live Sessions: the scheduled, done-with-you blocks that run on our Discord
   between therapy sessions. Two formats, Performance Gaming and The Daily
   Grind, both free to current clients.

   Service-first framing on purpose. The sessions are the product; the person
   facilitating is credited, not the headline. Non-clinical throughout: this is
   a community activity, not treatment, and the copy stays hedged accordingly.

   Australian spelling, no em-dashes, second person, per the site copy rules.
   ========================================================================== */

const CHIPS = ['Free', 'No talking required', 'Camera optional', 'Drop in, drop out', 'Same time each week']

// The two formats. Rendered as the side-by-side spec cards.
const FORMATS = [
  {
    badge: 'Gaming',
    badgeClass: 'badge',
    name: 'Performance Gaming',
    blurb: 'A competitive practice block, streamed to the server with running commentary. You see what improving at a game actually looks like from the inside, including the parts nobody posts.',
    specs: ['Day: Friday or Saturday', 'Length: About 90 minutes', 'Format: Screen share, live commentary', 'You need: Discord, that is it', 'Cost: Free'],
  },
  {
    badge: 'Executive function',
    badgeClass: 'badge badge--mauve',
    name: 'The Daily Grind',
    blurb: 'A body-doubling block for the work that is not gaming. Study, admin, planning your week, clearing the desk. Everyone works on their own thing, at the same time, in the same channel.',
    specs: ['Day: Wednesday', 'Length: About 90 minutes', 'Format: Voice channel, no screen share', 'You need: Discord and one task', 'Cost: Free'],
  },
]

// What the gaming block covers. Deliberately includes the boring parts.
const GAMING = [
  ['The warm-up', 'What the first fifteen minutes look like before any serious play starts. Routine, settings, sensitivity, a plan for the session.'],
  ['Reps and mechanics', 'Drills run at the pace they are actually run at. Not a highlight reel. The same thing, again, until it stops needing thought.'],
  ['Watching it back', 'Reviewing a loss and naming one specific thing to change next game. This is the habit that separates plateauing from improving.'],
  ['Tilt and mentality', 'What happens after a bad game, and how to stop it costing you the next three. Getting angry makes you play worse. That is a skill you can practise.'],
  ['The boring middle', 'Every game you want to be good at has a grind in it. Loving a game and enjoying every minute of improving at it are two different things.'],
  ['Transfer', 'The improvement loop is close to identical across games. Learn it once in the game you care about and you can point it at anything.'],
]

// Non-competitive versions, so the block is not only for Fortnite players.
const OTHER_RUNS = [
  ['Speedrun practice', 'Route learning, segment drilling, resetting on a bad start.'],
  ['No-hit and challenge runs', 'Learning a boss pattern properly instead of hoping.'],
  ['Completionist runs', 'Grinding a platinum or a full clear, one checklist at a time.'],
]

// What gets posted in the channel at the top of a Daily Grind block.
const GRIND_POSTS = [
  ['What I am doing this hour', 'One line. Specific enough that you would know if you had done it.'],
  ['Motivation out of ten', 'Said out loud, honestly. A two is allowed. Naming it is the point.'],
  ['The sensory setup', 'Noise-cancelling headphones on, oil diffuser going, lamp instead of overhead. Whatever makes the hour survivable.'],
  ['Timer and breaks', 'A visual timer set for the block, or Pomodoro if the task has a hard start. Everyone can see the clock.'],
  ['The playlist', 'What is going on in the background, so you can steal it.'],
  ['What actually got done', 'Posted at the end, including the sessions where the answer is not much.'],
]

const WHO = [
  ['You can do the work, you just cannot start it', 'Starting is the expensive part. When someone else is visibly starting at the same time, the cost drops. Nothing else about the task changes, but you begin, and beginning was the whole problem.'],
  ['Instructions shut you down, invitations do not', 'Nobody is told to attend, nobody is chased for not attending, and nobody is asked what they got done. The session is open at a set time. You use it or you do not.'],
  ['You want to get better at your game, without being coached at', 'This is not a coaching session and nobody reviews your gameplay. You watch someone work, take what is useful, and ignore the rest.'],
  ['Your study backlog is quietly ruining your gaming', 'Unfinished work does not stay in the background. It sits there while you play and takes the edge off both. Closing the loop is often the fastest way to enjoy the game again.'],
]

// Schedule for the September trial. Times are not locked in yet; update these
// three entries once the trial dates are confirmed.
const SCHEDULE = [
  { k: 'Wednesdays', v: 'The Daily Grind', s: 'About 90 minutes. Time to be confirmed.' },
  { k: 'Friday or Saturday', v: 'Performance Gaming', s: 'About 90 minutes. Day and time to be confirmed.' },
  { k: 'September 2026', v: 'Trial period', s: 'Running to the end of Term 3, 25 September.' },
]

const FAQ = [
  ['Do I have to talk?', 'No. Plenty of people sit in the channel muted for the whole block and that is a completely normal way to use it. Text in the channel is there if you want it. Nobody will call on you.'],
  ['Do I need my camera on?', 'No. Cameras are off by default in both formats. In Performance Gaming you are watching a screen share, not a face.'],
  ['Do I need to play Fortnite?', 'No. Fortnite is what the facilitator competes in, so it is what gets shown, but the session is about how you improve at a game rather than which game it is. Speedrunners, challenge runners and completionists get the same thing out of it.'],
  ['Is The Daily Grind tutoring?', 'No. Nobody teaches you the content, checks your work, or asks what mark you got. It is company while you do your own work. If you need actual tutoring, this is not that.'],
  ['Do I have to stay the whole time?', 'No. Come for twenty minutes, come for the whole block, leave when you are done. Turning up late is fine too.'],
  ['Is it supervised?', 'Sessions run in our moderated Discord under the same server rules as everything else. The facilitator is a staff member, not a clinician, and does not give clinical advice.'],
  ['Does it cost extra?', 'No. Live Sessions are part of the in-between community for current clients. There is no separate fee and nothing is billed against your funding for attending.'],
  ['Can parents sit in?', 'Yes. Parents are welcome to watch, and a few have found the setup and planning parts useful for themselves. We would ask that you let your young person drive their own participation.'],
  ['What if I miss one?', 'Nothing happens. There is no streak, no catch-up, and no one follows up. The next one runs at the same time next week.'],
]

export default function LiveSessions() {
  return (
    <>
      <SEO
        title="Live Sessions | Estus Health"
        description="Free weekly done-with-you sessions on our Discord. Performance Gaming for competitive practice, and The Daily Grind for body doubling on study, admin and planning. Part of our in-between community."
        path="/services/live-sessions"
      />
      <PageHero
        eyebrow="Services"
        title="Live Sessions."
        accent="Do the thing, together."
        badge="September 2026 trial"
        sub2="Turning up is easier when someone else already has."
        sub="Free weekly blocks on our Discord where the work happens live. Performance Gaming shows what improving at a game actually takes. The Daily Grind gives you company while you do the study, admin and planning you have been avoiding. Both run on a set schedule, so you can plan around them."
      >
        <Btn href="#gaming" variant="btn--alt">Performance Gaming ▾</Btn>
        <Btn href="#grind" variant="btn--ghost">The Daily Grind ▾</Btn>
      </PageHero>

      {/* Why this exists */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <p className="sub sub--italic" style={{ color: 'var(--text-soft)' }}>Not a class. Not a streaming channel. A set time when the work is already happening and you can join it.</p>
          <div className="prose" style={{ marginTop: 20 }}>
            <h2>Why we run these</h2>
            <p>Therapy is where you work out the underlying skill. The hard part is the week in between, when you are alone in the room where all your interesting things live, and the assignment is still open in a tab behind the game.</p>
            <p>Live Sessions are the in-between. A dedicated block, away from the distraction, aimed at whatever you are actually building towards. You sacrifice a short-term hour for the long-term thing. Then you get your weekend back.</p>
            <p>They also make a point we keep coming back to. Sleep, movement, a cleared backlog and a plan for the week are not separate from performance, they are what performance sits on. Nobody gets to be excellent at one thing while everything else falls over, at least not for long.</p>
          </div>
          <p className="pullquote">Study in the background is distracting your gaming. Close the loop and both get better.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {CHIPS.map((c) => <span className="badge" key={c}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* The two formats */}
      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">Two formats</span>
          <p className="lead" style={{ marginTop: 16 }}>One is about getting better at a game. One is about clearing everything that stops you enjoying it. They are the same idea pointed in two directions.</p>
          <div className="grid grid-2" style={{ marginTop: 32 }}>
            {FORMATS.map((f) => (
              <article className="card" key={f.name}>
                <span className={f.badgeClass}>{f.badge}</span>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', margin: '12px 0 8px' }}>{f.name}</h3>
                <p style={{ color: 'var(--text-soft)' }}>{f.blurb}</p>
                <ul className="prose" style={{ fontSize: '.9rem' }}>
                  {f.specs.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Gaming */}
      <section id="gaming" aria-labelledby="gaming-title">
        <div className="wrap">
          <span className="eyebrow">Performance Gaming</span>
          <h2 className="sec-head" id="gaming-title" style={{ marginTop: 16 }}>Watch the grind, not the highlights.</h2>
          <p className="lead" style={{ marginTop: 14 }}>A competitive practice block, shared live. The commentary covers what is being done and why, including the parts that are genuinely dull. Improving at anything has a boring middle, and pretending otherwise is why people quit at it.</p>
          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {GAMING.map(([h, p]) => (
              <article className="card" key={h}>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.1rem' }}>Not competitive? Same block.</h3>
            <p style={{ color: 'var(--text-soft)', maxWidth: '60ch' }}>Ranked play is one version of this. Plenty of people are chasing something that has nothing to do with beating anybody. It looks the same from the outside and it takes the same reps.</p>
            <div className="grid grid-3" style={{ marginTop: 24 }}>
              {OTHER_RUNS.map(([h, p]) => (
                <article className="card card--static" key={h}>
                  <h4 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '.95rem', margin: '0 0 6px' }}>{h}</h4>
                  <p style={{ color: 'var(--text-soft)', margin: 0, fontSize: '.9rem' }}>{p}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Daily Grind */}
      <section id="grind" className="tint-section" aria-labelledby="grind-title">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">The Daily Grind</span>
          <h2 className="sec-head" id="grind-title" style={{ marginTop: 16 }}>Body doubling, on a schedule.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Everyone turns up, says what they are working on, and works. That is the whole format. It sounds too simple to matter, and it is one of the most reliable things we know of for getting a hard task started.</p>

          <div className="grid grid-3" style={{ marginTop: 32 }}>
            {GRIND_POSTS.map(([h, p]) => (
              <article className="card" key={h}>
                <h3 style={{ color: 'var(--heading)', textTransform: 'uppercase', fontSize: '1.05rem', marginBottom: 8 }}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <div className="prose">
              <h3>Bring anything</h3>
              <p>An assignment. The subject that got away from you three weeks ago. Emails you have been ignoring. Planning the week so the weekend is actually free. Tidying the desk you are sitting at. If it has been sitting open in the back of your mind, it counts.</p>
              <p>Two of our free tools pair with this block directly. <Link to="/resources/open-loops">Open Loops</Link> is for getting the unfinished things out of your head and onto a page. <Link to="/resources/second-brain">Build a Second Brain in Discord</Link> gives them somewhere to live. The Daily Grind is the done-with-you version of both.</p>
              <p><strong>What it is not.</strong> It is not tutoring. Nobody teaches the content, checks your work, or asks what you got. There is no attendance, no streak, and no follow-up if you skip one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Who this is for</span>
          <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
            {WHO.map(([h, p]) => (
              <article className="card card--static" key={h}>
                <h3 style={{ color: 'var(--heading)', fontSize: '1rem', marginBottom: 8 }}>{h}</h3>
                <p style={{ color: 'var(--text-soft)', margin: 0 }}>{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="tint-section">
        <div className="wrap">
          <span className="eyebrow eyebrow--mauve">The schedule</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Same time, every week.</h2>
          <p className="lead" style={{ marginTop: 14 }}>A set schedule is the point. If you know it is on, you can move things around to be there. We are starting with a trial so we can find out what works before locking it in.</p>
          <div className="kv">
            {SCHEDULE.map((row) => (
              <div key={row.v}>
                <div className="k">{row.k}</div>
                <div className="v">{row.v}</div>
                <div className="s">{row.s}</div>
              </div>
            ))}
          </div>
          <div className="callout" style={{ marginTop: 36 }}>
            <p style={{ margin: 0, color: 'var(--text-soft)' }}>
              <strong style={{ color: 'var(--heading)' }}>Times are not locked in yet.</strong> Confirmed dates and times go up on the Discord server and our Instagram before the trial starts. The format will change based on what people actually turn up for.
            </p>
          </div>
        </div>
      </section>

      {/* Who runs them */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Who runs them</span>
          <h2 className="sec-head" style={{ marginTop: 16 }}>Jamie.</h2>
          <div className="prose" style={{ marginTop: 18 }}>
            <p>Jamie competes in Fortnite at a top 250 Oceania level and is still actively competing. He is at university, and he handles accounts and admin at Estus Health. Both formats are built around what he is already doing, which is the reason they hold up week to week.</p>
            <p>He also knows the other side of it. Getting started on something you have been told to do is much harder than getting started on something you chose, and he has found that being the person other people are working alongside is what makes a hard start possible. That is the whole mechanism behind these sessions, tested on himself first.</p>
            <p><strong>Jamie is not a clinician.</strong> He does not give therapeutic advice and these sessions are not therapy. If something comes up in a session that needs clinical input, it goes to your OT.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">FAQ</span>
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

      {/* Disclaimer */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <div className="callout">
            <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '.94rem' }}>
              Live Sessions are a free community activity, not individual clinical advice. They run alongside occupational therapy rather than replacing any part of it. If you want support that is tailored to you, start with a referral.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Want in?"
        body="Live Sessions run on our Discord, which is part of the in-between community for current Estus Health clients. Start with a referral and we will get you set up."
        buttons={<><ReferralButton big>Get Started ▸</ReferralButton><Btn to="/services/gaming-informed-therapy" variant="btn--alt" big>Gaming-Informed Therapy</Btn></>}
        note="Already with us? Ask your clinician for Discord access."
      />
    </>
  )
}
