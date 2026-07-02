import { useState, useMemo, useCallback } from 'react'
import SEO from '../../components/SEO'
import { PageHero, Btn } from '../../components/Bits'
import { EMAIL } from '../../lib/site'

/* Open Loops: a private, domain-based journaling tool. Ported from the
   standalone HTML tool, reskinned to the design system, functionality and copy
   preserved. Stores nothing: all state is in-memory only. */

const CATS = [
  { id: 'health', label: 'Health', c: 'var(--teal)' },
  { id: 'sleep', label: 'Sleep', c: 'var(--navy)' },
  { id: 'school', label: 'School or Work', c: 'var(--mauve)' },
  { id: 'identity', label: 'Identity', c: 'var(--teal)' },
  { id: 'relationships', label: 'Relationships', c: 'var(--mauve)' },
  { id: 'energy', label: 'Energy', c: 'var(--teal)' },
  { id: 'admin', label: 'Life admin', c: 'var(--navy)' },
  { id: 'reflect', label: 'Reflect', c: 'var(--mauve)' },
]

const ITEMS = {
  health: [
    'There is an appointment I keep putting off booking',
    'My body has been asking for something I keep ignoring',
    'There is a health thing I am a bit scared to look into',
    'I have not been taking care of the basics: water, food, movement',
  ],
  sleep: [
    'My sleep and wake times have drifted',
    'Something keeps pulling me out of sleep',
    'I am scrolling instead of winding down',
    'I am exhausted but I cannot make myself go to bed',
  ],
  school: [
    'There is an unfinished task quietly nagging at me',
    'I owe someone a piece of work or a reply',
    'I am behind on something and avoiding how behind',
    'A deadline is coming and I have not started',
  ],
  identity: [
    'I avoided something today and I am not sure why',
    'I have been masking and it is wearing me down',
    'I am holding a feeling I have not named yet',
    'I am being hard on myself for how today went',
  ],
  relationships: [
    'I owe someone a message',
    'There is a conversation I am dreading',
    'I let someone down and I feel bad about it',
    'I want to reach out but I have no energy for it',
  ],
  energy: [
    'Something drained me today that I did not see coming',
    'I said yes to more than I had room for',
    'I have no buffer left and tomorrow is full',
    'I keep pushing past empty',
  ],
  admin: [
    'A form or email has been open far too long',
    'There is mail or messages I am avoiding opening',
    'Money admin I keep putting off',
    'Small tasks have piled into one big dread',
  ],
  reflect: [
    'One thing my brain actually did well today',
    'One loop still open in my head right now',
    'If tomorrow had room for one thing, what would it be',
  ],
}

const cmap = (id) => CATS.find((c) => c.id === id) || CATS[0]
const keyFor = (cat, text) => cat + '::' + text

function toExport(loops) {
  const lines = ['MY OPEN LOOPS', new Date().toLocaleDateString(), '']
  CATS.forEach((cat) => {
    const inC = loops.filter((l) => l.domain === cat.id)
    if (!inC.length) return
    lines.push(cat.label.toUpperCase())
    inC.forEach((l) => {
      const m = l.state === 'close' ? '[closed] ' : l.state === 'park' ? '[parked] ' : ''
      lines.push('  - ' + m + l.text)
      if (l.state === 'step' && l.step) lines.push('      next step: ' + l.step)
    })
    lines.push('')
  })
  lines.push('From the Open Loops tool by Estus Health, www.estushealth.com')
  return lines.join('\n')
}

function toMarkdown(loops) {
  const d = new Date().toISOString().slice(0, 10)
  const out = ['# Open Loops Journal Entry', '', 'Date: ' + d, '',
    '> An open loop is anything unfinished your brain keeps running in the background.',
    '> Add a tiny next step and any notes. Park what is not for now. Close what is done.', '']
  CATS.forEach((cat) => {
    const inC = loops.filter((l) => l.domain === cat.id)
    if (!inC.length) return
    out.push('## ' + cat.label, '')
    inC.forEach((l) => {
      out.push('### ' + l.text)
      if (cat.id === 'reflect') {
        out.push('- Response: ' + (l.step || ''))
      } else {
        out.push('- [' + (l.state === 'close' ? 'x' : ' ') + '] Done')
        out.push('- Next step: ' + (l.state === 'step' && l.step ? l.step : ''))
        out.push('- Status: ' + (l.state === 'park' ? 'parked' : l.state === 'close' ? 'closed' : 'open'))
        out.push('- Notes: ')
      }
      out.push('')
    })
  })
  out.push('---', '', 'Made with the Open Loops tool by Estus Health, www.estushealth.com')
  return out.join('\n')
}

export default function OpenLoops() {
  const [loops, setLoops] = useState([])
  const [nextId, setNextId] = useState(1)
  const [custom, setCustom] = useState('')
  const [customCat, setCustomCat] = useState('health')
  const [stepDrafts, setStepDrafts] = useState({})
  const [toast, setToast] = useState('')

  const showToast = useCallback((m) => {
    setToast(m)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 1600)
  }, [])

  const selectedKeys = useMemo(() => new Set(loops.map((l) => l.key).filter(Boolean)), [loops])

  const toggleItem = (catId, text) => {
    const k = keyFor(catId, text)
    setLoops((prev) => {
      if (prev.some((l) => l.key === k)) return prev.filter((l) => l.key !== k)
      const id = nextId
      setNextId((n) => n + 1)
      return [...prev, { id, key: k, text, domain: catId, state: null, step: '' }]
    })
  }

  const addCustom = () => {
    const t = custom.trim()
    if (!t) return
    const id = nextId
    setNextId((n) => n + 1)
    setLoops((prev) => [...prev, { id, key: null, text: t, domain: customCat, state: null, step: '' }])
    setCustom('')
    showToast('Added to your entry')
  }

  const setState = (id, state) => setLoops((prev) => prev.map((l) => {
    if (l.id !== id) return l
    const next = l.state === state ? null : state
    return { ...l, state: next, step: next === 'step' ? l.step : '' }
  }))
  const saveStep = (id) => setLoops((prev) => prev.map((l) => l.id === id ? { ...l, step: (stepDrafts[id] || '').trim() } : l))
  const removeLoop = (id) => setLoops((prev) => prev.filter((l) => l.id !== id))

  const doCopy = (text, msg) => {
    if (!loops.length) { showToast('Nothing to copy yet'); return }
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showToast(msg), () => showToast('Could not copy'))
    else showToast('Could not copy')
  }
  const doDownload = () => {
    if (!loops.length) { showToast('Nothing to save yet'); return }
    const b = new Blob([toMarkdown(loops)], { type: 'text/markdown' })
    const u = URL.createObjectURL(b)
    const a = document.createElement('a'); a.href = u; a.download = 'open-loops-journal.md'
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(u)
    showToast('Saved .md')
  }

  const closed = loops.filter((l) => l.state === 'close').length

  return (
    <>
      <SEO
        title="Open Loops | Estus Health"
        description="A free, private journaling tool for the unfinished threads your brain keeps running. Park them, give them a tiny next step, or close them. Nothing is saved or sent."
        path="/resources/open-loops"
      />
      <PageHero eyebrow="Free Tool" title="Open Loops"
        sub="Your brain is holding too many windows open. Let's get them onto one screen." decor={false} />

      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <div className="callout">
            <p style={{ color: 'var(--text-soft)', marginTop: 0 }}>An open loop is anything unfinished your brain keeps quietly running in the background. A text you have not sent. A form you have not filled. A feeling you have not named. Hold enough of them and everything feels loud.</p>
            <p style={{ fontWeight: 700, color: 'var(--heading)', margin: '0 0 6px' }}>How this works:</p>
            <ol className="prose" style={{ margin: 0 }}>
              <li>Tick the loops below that feel true today. You do not have to type a thing. Recognising is easier than remembering.</li>
              <li>Add your own at the bottom of the list if something is missing.</li>
              <li>For each one in your entry, pick a tiny next step, park it for later, or close it. All three count.</li>
              <li>Copy or save your entry, or just screenshot it. Then let your brain put it down.</li>
            </ol>
            <p style={{ marginTop: 12, marginBottom: 0 }}><span className="badge">Nothing here is saved or sent anywhere. It lives on your screen only.</span></p>
          </div>
        </div>
      </section>

      {/* Step 1: picker */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Step 1 · Tick what feels true today</span>
          <p className="lead" style={{ marginTop: 12 }}>Click any line to add it to your entry. Click again to remove it.</p>
          <div style={{ marginTop: 20, display: 'grid', gap: 18 }}>
            {CATS.map((cat) => (
              <div key={cat.id}>
                <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '.75rem', textTransform: 'uppercase', color: cat.c, letterSpacing: '.5px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 12, height: 12, background: cat.c, borderRadius: 3, display: 'inline-block' }} aria-hidden="true" />{cat.label}
                </h3>
                <div style={{ display: 'grid', gap: 6 }}>
                  {ITEMS[cat.id].map((text) => {
                    const sel = selectedKeys.has(keyFor(cat.id, text))
                    return (
                      <button key={text} onClick={() => toggleItem(cat.id, text)} aria-pressed={sel}
                        style={{ textAlign: 'left', cursor: 'pointer', font: 'inherit', padding: '10px 14px', borderRadius: 12,
                          border: '3px solid var(--line)', background: sel ? cat.c : 'var(--surface)',
                          color: sel ? '#07121a' : 'var(--text)', fontWeight: sel ? 600 : 400 }}>
                        {sel ? '✓ ' : ''}{text}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <input type="text" value={custom} onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addCustom() }}
              placeholder="Add your own loop, then choose where it belongs"
              style={{ flex: '1 1 240px', font: 'inherit', padding: '12px 14px', borderRadius: 12, border: '3px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} />
            <select value={customCat} onChange={(e) => setCustomCat(e.target.value)}
              style={{ font: 'inherit', padding: '12px 14px', borderRadius: 12, border: '3px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }}>
              {CATS.filter((c) => c.id !== 'reflect').map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <button className="btn" onClick={addCustom} disabled={!custom.trim()}>Add</button>
          </div>
        </div>
      </section>

      {/* Step 2: entry */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">Step 2 · Your journal entry</span>
          <p className="lead" style={{ marginTop: 12 }}>This is your one page for today. Decide one small thing for each loop.</p>
          <div style={{ marginTop: 20, display: 'grid', gap: 14 }}>
            {loops.length === 0 && (
              <p style={{ color: 'var(--text-soft)', fontStyle: 'italic', textAlign: 'center', padding: '24px 0' }}>Nothing in your entry yet. Tick a few loops above. An empty page is a fine place to start.</p>
            )}
            {loops.map((l) => {
              const c = cmap(l.domain)
              return (
                <article key={l.id} className="card card--static" style={{ borderLeft: `6px solid ${c.c}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--f-display)', fontSize: '.62rem', textTransform: 'uppercase', color: c.c, letterSpacing: '.5px' }}>{c.label}</div>
                      <div style={{ marginTop: 4, color: 'var(--text)', textDecoration: l.state === 'close' ? 'line-through' : 'none', opacity: l.state === 'close' ? 0.6 : 1 }}>{l.text}</div>
                    </div>
                    <button onClick={() => removeLoop(l.id)} aria-label="Remove" className="badge badge--ghost" style={{ cursor: 'pointer', border: '2px solid var(--line)' }}>✕</button>
                  </div>

                  {l.state === 'park' && <p style={{ fontStyle: 'italic', color: 'var(--text-soft)', margin: '10px 0 0' }}>Parked. Acknowledged, not now. That counts.</p>}
                  {l.state === 'step' && l.step && <p style={{ margin: '10px 0 0', color: 'var(--text)' }}><strong style={{ color: 'var(--mauve)' }}>Tiny next step:</strong> {l.step}</p>}
                  {l.state === 'step' && !l.step && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                      <input type="text" autoFocus placeholder="One tiny step, smaller than feels worth it"
                        value={stepDrafts[l.id] || ''} onChange={(e) => setStepDrafts((s) => ({ ...s, [l.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === 'Enter') saveStep(l.id) }}
                        style={{ flex: '1 1 200px', font: 'inherit', padding: '10px 12px', borderRadius: 10, border: '3px solid var(--line)', background: 'var(--surface)', color: 'var(--text)' }} />
                      <button className="btn btn--ghost" onClick={() => saveStep(l.id)}>Save</button>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                    {[['park', 'Park it'], ['step', 'Tiny next step'], ['close', 'Close it']].map(([a, label]) => (
                      <button key={a} onClick={() => setState(l.id, a)}
                        className={`badge${l.state === a ? '' : ' badge--ghost'}`}
                        style={{ cursor: 'pointer', border: '2px solid var(--line)' }}>{label}</button>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 18, color: 'var(--text-soft)', fontSize: '.9rem' }}>
            <span>{loops.length} {loops.length === 1 ? 'loop' : 'loops'} in your entry</span>
            <span>·</span>
            <span>{closed} closed</span>
          </div>
        </div>
      </section>

      {/* Step 3: put it down */}
      <section>
        <div className="wrap wrap--narrow">
          <span className="eyebrow">Step 3 · Put it down</span>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
            <button className="btn" onClick={() => doCopy(toExport(loops), 'List copied')}>Copy list</button>
            <button className="btn btn--alt" onClick={() => doCopy(toMarkdown(loops), 'Markdown template copied')}>Copy as template (Markdown)</button>
            <button className="btn btn--ghost" onClick={doDownload}>Save .md</button>
          </div>
          <p className="lead" style={{ marginTop: 16 }}>The Markdown template drops into Obsidian, Notion, or any notes app with blank fields to fill in, so your loops become a real journal entry you can keep working on.</p>
          <p style={{ color: 'var(--text-soft)', fontStyle: 'italic', marginTop: 12 }}>No streaks here. No guilt. Do this once a month or once a year and it still works. The point is the unload, not the habit.</p>
          <div className="callout" style={{ marginTop: 24 }}>
            <p style={{ fontStyle: 'italic', color: 'var(--text)', marginTop: 0 }}>If your brain works like this, you are not disorganised. You are running a lot of windows with no native close button. That is what we help with.</p>
            <p style={{ margin: 0 }}><Btn to="/contact" variant="btn--ghost">Work with us ▸</Btn></p>
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
