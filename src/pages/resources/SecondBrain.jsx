import { useState, useCallback } from 'react'
import SEO, { breadcrumb } from '../../components/SEO'
import { PageHero, Btn } from '../../components/Bits'

/* Second Brain Setup: a guided Discord second-brain setup. Ported from the
   standalone HTML tool, reskinned, copy and interactivity preserved. */

const STEPS = [
  { b: 'Create a free Discord server', s: 'Open Discord, hit the plus, choose Create My Own, then For me and my friends. It can be just you.' },
  { b: 'Make it yours and keep it private', s: 'Name it something that feels like home base. You HQ, Brain, Base, whatever lands. Do not invite anyone.' },
  { b: 'Add the categories and channels', s: 'Use the structure in Step 2 below. Recreate the whole thing or just the parts you want.' },
  { b: 'Mute the server', s: 'Right click the server, Notification Settings, mute. This is storage, not social. It should never ping you.' },
  { b: 'Pin your one rule', s: 'Post the message in Step 3 into #brain-dump and pin it, so foggy-day you knows what to do.' },
  { b: 'Put it on your phone', s: 'Install Discord on your phone and drag this server to the top, so capturing is one tap from anywhere.' },
  { b: 'Try it for a week, capture only', s: 'No rules except dropping nagging thoughts into #brain-dump. See how it feels before you add anything fancy.' },
]

const CHANNELS = [
  { cat: 'capture', items: [['brain-dump', 'anything at all, unsorted. your single capture point'], ['open-loops', 'unfinished things that are quietly nagging you']] },
  { cat: 'life', items: [['health', 'appointments, body stuff, meds, the basics'], ['sleep', 'what is affecting your sleep right now'], ['school-or-work', 'tasks, deadlines, the thing you are avoiding'], ['feelings-and-identity', 'what you are feeling, masking, or noticing'], ['relationships', 'messages owed, conversations you are dreading'], ['energy', 'what drains you, what you said yes to'], ['life-admin', 'forms, mail, money, small dreaded tasks']] },
  { cat: 'thinking', items: [['wins', 'one thing your brain did well. proof for the bad days'], ['ideas', 'sparks you do not want to lose'], ['journal', 'daily or whenever reflection']] },
  { cat: 'storage', items: [['links-and-resources', 'things to read or keep for later'], ['future-me', 'notes to yourself, for later you'], ['done', 'drag closed loops here. your evidence']] },
]

const PIN = [
  'This server is my second brain. It is just for me.', '',
  'The one rule: if something is nagging me, it goes in #brain-dump. That is the whole habit.', '',
  'I capture first and tidy later, or never.',
  'I pin the few things that matter this week.',
  'When a loop is finished, I drag it to #done.',
  'Missing days does not break anything. I just pick it back up.',
].join('\n')

const USE = [
  ['Capture first, sort later or never.', 'A thought arrives, you drop it in #brain-dump and keep moving. Tidying is optional.'],
  ['Recognise, do not remember.', 'When your head feels loud, skim #open-loops. Seeing the list is easier than holding it.'],
  ['Pin what matters.', 'Three things, maximum, for this week. Unpin them when they are done.'],
  ['Close loops in #done.', 'Drag finished things there. It feels good, and it is proof you do follow through.'],
  ['Let search be your memory.', 'Do not try to keep it all in your head. The search bar holds it for you.'],
  ['Skim weekly, not daily.', 'No streaks. No guilt. Miss a week or a month and nothing breaks.'],
]

const WHY = [
  ['One place, always with you.', 'Your brain can let go of a thing once it trusts the thing is written down somewhere it will look.'],
  ['Capturing beats organising.', 'The bar is almost nothing, so you actually do it. Most systems fail because they ask for tidiness you do not have spare capacity for.'],
  ['The channels do the sorting.', 'You do not have to hold the categories in working memory. They are already on the screen.'],
  ['It is forgiving.', 'A second brain that punishes missed days is just another thing to fail at. This one does not keep score.'],
]

function channelsText() {
  const out = []
  CHANNELS.forEach((c) => {
    out.push(c.cat.toUpperCase())
    c.items.forEach((it) => out.push('  # ' + it[0]))
    out.push('')
  })
  return out.join('\n').trim()
}

export default function SecondBrain() {
  const [done, setDone] = useState({})
  const [toast, setToast] = useState('')
  const doneCount = Object.values(done).filter(Boolean).length

  const showToast = useCallback((m) => {
    setToast(m)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 1600)
  }, [])

  const copy = (text, msg) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showToast(msg), () => showToast('Could not copy'))
    else showToast('Could not copy')
  }

  return (
    <>
      <SEO
        title="Build a Second Brain in Discord | Estus Health"
        description="A free, step-by-step guide to building a private second brain in Discord, so your actual brain can stop holding it all. Neuroaffirming, forgiving, no streaks."
        path="/resources/second-brain"
        schema={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Free Resources', path: '/resources' },
          { name: 'Second Brain', path: '/resources/second-brain' },
        ])}
      />
      <PageHero eyebrow="Free Guide" title="Build a Second Brain in Discord"
        sub="A private place to put everything down, so your actual brain can stop holding it all." decor={false} />

      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <div className="callout">
            <p style={{ color: 'var(--text-soft)', marginTop: 0 }}>You probably already have Discord open. That is exactly why it works. A second brain only helps if it is somewhere you already are, on every device, one tap away.</p>
            <p style={{ color: 'var(--text-soft)' }}>This is a private server with one member: you. No friends, no pings, no performance. Just a quiet place to capture the loops your brain keeps running, sorted into channels so you do not have to hold the categories in your head.</p>
            <p style={{ margin: 0 }}><strong style={{ color: 'var(--mauve)' }}>The one rule:</strong> if something is nagging you, it goes in #brain-dump. That is the whole habit. Everything else is optional.</p>
          </div>
        </div>
      </section>

      {/* Step 1: checklist */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Step 1 · Set it up</span>
          <p className="lead" style={{ marginTop: 12 }}>Tick these off as you go. There is no wrong order and no time limit.</p>
          <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
            {STEPS.map((st, i) => {
              const on = !!done[i]
              return (
                <button key={i} onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))} aria-pressed={on}
                  className="card card--static" style={{ textAlign: 'left', cursor: 'pointer', font: 'inherit', display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px 20px' }}>
                  <span aria-hidden="true" style={{ width: 22, height: 22, flex: '0 0 auto', borderRadius: 6, border: '3px solid var(--line)', background: on ? 'var(--teal)' : 'transparent', color: '#07121a', display: 'grid', placeItems: 'center', fontWeight: 700 }}>{on ? '✓' : ''}</span>
                  <span>
                    <strong style={{ color: 'var(--heading)', textDecoration: on ? 'line-through' : 'none' }}>{st.b}</strong>
                    <span style={{ display: 'block', color: 'var(--text-soft)', fontSize: '.92rem', marginTop: 2 }}>{st.s}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <p style={{ marginTop: 14 }}><span className="badge badge--mauve">{doneCount} of {STEPS.length} steps done</span></p>
        </div>
      </section>

      {/* Step 2: channels */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Step 2 · Build your channels</span>
          <p className="lead" style={{ marginTop: 12 }}>Here is a starting structure. Copy the list and recreate it in Discord, or just make the ones that feel useful. You can always add or delete later.</p>
          <div className="card card--static" style={{ marginTop: 20 }}>
            {CHANNELS.map((c) => (
              <div key={c.cat} style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: 'var(--f-display)', fontSize: '.66rem', textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--teal)', borderBottom: '1px solid var(--line)', paddingBottom: 4, marginBottom: 6 }}>{c.cat}</div>
                {c.items.map((it) => (
                  <div key={it[0]} style={{ display: 'flex', gap: 10, padding: '3px 0 3px 8px', flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--mauve)', fontWeight: 700 }}># {it[0]}</span>
                    <span style={{ color: 'var(--text-soft)', fontSize: '.9rem' }}>{it[1]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16 }}><button className="btn" onClick={() => copy(channelsText(), 'Channel list copied')}>Copy channel list</button></p>
        </div>
      </section>

      {/* Step 3: pin */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Step 3 · Pin your one rule</span>
          <p className="lead" style={{ marginTop: 12 }}>Post this in #brain-dump and pin it. It is your instructions to future you, for the days your brain is foggy.</p>
          <pre className="card card--static" style={{ marginTop: 18, whiteSpace: 'pre-wrap', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: '.9rem', color: 'var(--text)' }}>{PIN}</pre>
          <p style={{ marginTop: 14 }}><button className="btn btn--alt" onClick={() => copy(PIN, 'Pinned message copied')}>Copy pinned message</button></p>
        </div>
      </section>

      {/* How to use + why it works */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">How to use it, day to day</span>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, display: 'grid', gap: 12 }}>
            {USE.map(([h, p]) => <li key={h} className="card card--static" style={{ padding: '16px 20px' }}><strong style={{ color: 'var(--heading)' }}>{h}</strong> <span style={{ color: 'var(--text-soft)' }}>{p}</span></li>)}
          </ul>
          <h2 className="sec-head" style={{ fontSize: 'clamp(1.5rem,4vw,2.2rem)', marginTop: 44 }}>Why this works for your brain</h2>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 20, display: 'grid', gap: 12 }}>
            {WHY.map(([h, p]) => <li key={h} className="card card--static" style={{ padding: '16px 20px' }}><strong style={{ color: 'var(--heading)' }}>{h}</strong> <span style={{ color: 'var(--text-soft)' }}>{p}</span></li>)}
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap wrap--narrow">
          <div className="callout">
            <p style={{ fontStyle: 'italic', color: 'var(--text)', marginTop: 0 }}>If your brain works like this, you are not disorganised. You are running a lot of windows with no native close button. A second brain gives you somewhere to put them down. That is what we help with.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Btn to="/resources/open-loops" variant="btn--ghost">Try Open Loops ▸</Btn>
              <Btn to="/contact" variant="btn--ghost">Work with us ▸</Btn>
            </div>
          </div>
        </div>
      </section>

      {toast && (
        <div role="status" aria-live="polite" style={{ position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 90,
          background: 'var(--surface)', color: 'var(--text)', border: '3px solid var(--line)', borderRadius: 999, padding: '10px 20px',
          fontWeight: 700, boxShadow: '5px 5px 0 var(--shadow-col)' }}>{toast}</div>
      )}
    </>
  )
}
