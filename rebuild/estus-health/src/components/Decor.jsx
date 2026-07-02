/* ==========================================================================
   Decorative pieces: confetti shapes, synthwave suns, ticker band.
   All aria-hidden and purely visual. Motion is gated by prefers-reduced-motion
   in tokens.css (the .float/.spin/.ticker animations only run when motion is
   allowed), so these are safe to render everywhere.
   ========================================================================== */

// A single confetti shape. `kind` = ring | dot | tri | sq | star.
export function Confetti({ kind = 'dot', color = 'var(--teal)', size = 24, style, anim, r }) {
  const cls = `confetti${anim ? ' ' + anim : ''}`
  const wrapStyle = { ...style, ...(r ? { '--r': r } : {}) }
  let inner
  if (kind === 'ring') inner = <div className="ring" style={{ width: size, height: size, border: `${Math.max(6, size / 7)}px solid ${color}` }} />
  else if (kind === 'tri') inner = <div className="tri" style={{ borderBottom: `${size}px solid ${color}` }} />
  else if (kind === 'sq') inner = <div className="sq" style={{ width: size, height: size, background: color, transform: 'rotate(18deg)' }} />
  else if (kind === 'star') inner = (
    <svg width={size} height={size} viewBox="0 0 46 46" aria-hidden="true">
      <path d="M23 2 L27 19 L44 23 L27 27 L23 44 L19 27 L2 23 L19 19 Z" fill={color} />
    </svg>
  )
  else inner = <div className="dot-shape" style={{ width: size, height: size, background: color }} />
  return <div className={cls} style={wrapStyle} aria-hidden="true">{inner}</div>
}

// Both synthwave suns; CSS shows only the one matching the active theme.
export function SynthwaveSun() {
  return (
    <>
      <svg className="sun sun--night" viewBox="0 0 200 210" aria-hidden="true">
        <defs>
          <linearGradient id="sun-night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe14d" /><stop offset=".5" stopColor="#ff2e9a" /><stop offset="1" stopColor="#9d4edd" />
          </linearGradient>
          <mask id="sun-night-mask">
            <rect width="200" height="210" fill="#000" /><circle cx="100" cy="94" r="82" fill="#fff" />
            <rect x="0" y="112" width="200" height="5" fill="#000" /><rect x="0" y="124" width="200" height="6" fill="#000" />
            <rect x="0" y="138" width="200" height="8" fill="#000" /><rect x="0" y="154" width="200" height="11" fill="#000" />
            <rect x="0" y="172" width="200" height="16" fill="#000" />
          </mask>
        </defs>
        <rect width="200" height="210" fill="url(#sun-night)" mask="url(#sun-night-mask)" />
      </svg>
      <svg className="sun sun--day" viewBox="0 0 200 210" aria-hidden="true">
        <defs>
          <linearGradient id="sun-day" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2ca5b8" /><stop offset=".5" stopColor="#ab5c95" /><stop offset="1" stopColor="#344982" />
          </linearGradient>
          <mask id="sun-day-mask">
            <rect width="200" height="210" fill="#000" /><circle cx="100" cy="94" r="82" fill="#fff" />
            <rect x="0" y="112" width="200" height="5" fill="#000" /><rect x="0" y="124" width="200" height="6" fill="#000" />
            <rect x="0" y="138" width="200" height="8" fill="#000" /><rect x="0" y="154" width="200" height="11" fill="#000" />
            <rect x="0" y="172" width="200" height="16" fill="#000" />
          </mask>
        </defs>
        <rect width="200" height="210" fill="url(#sun-day)" mask="url(#sun-day-mask)" />
      </svg>
    </>
  )
}

// The squiggle underline used under the hero wordmark.
export function Squiggle() {
  return (
    <svg className="under" viewBox="0 0 460 60" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path d="M8 26 C 44 14, 80 14, 116 26 S 188 38, 224 26 S 296 14, 332 26 S 416 38, 452 26" stroke="#2ca5b8" strokeWidth="9" strokeLinecap="round" />
      <path d="M8 40 C 44 28, 80 28, 116 40 S 188 52, 224 40 S 296 28, 332 40 S 416 52, 452 40" stroke="#ab5c95" strokeWidth="6" strokeLinecap="round" opacity=".9" />
    </svg>
  )
}

// Seamless scrolling ticker band. Pass an array of label strings.
export function Ticker({ items }) {
  const run = (
    <>
      {items.map((t, i) => (
        <span key={i}>{t} <b>◆</b></span>
      ))}
    </>
  )
  return (
    <div className="ticker" aria-hidden="true">
      <div className="track">{run}{run}</div>
    </div>
  )
}
