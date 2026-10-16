/* ==========================================================================
   Halloween decorations for the home page skin (see isHalloween in
   lib/site.js). All aria-hidden and purely visual. Motion runs only when
   prefers-reduced-motion allows it (section 17 of tokens.css).
   ========================================================================== */

// A single decoration, positioned like Confetti. `kind` = bat | pumpkin | ghost | spider | web.
// `drop` is the spider's thread length in px.
export function Spooky({ kind = 'bat', size = 40, style, anim, drop = 90, color }) {
  const cls = `confetti spooky spooky--${kind}${anim ? ' ' + anim : ''}`
  let inner
  if (kind === 'pumpkin') inner = <Pumpkin size={size} />
  else if (kind === 'ghost') inner = (
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48">
      <path d="M4 22 C4 9 12 2 20 2 C28 2 36 9 36 22 L36 46 L30 41 L25 46 L20 41 L15 46 L10 41 L4 46 Z" fill="var(--ghost)" stroke="var(--ghost-edge)" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="14.5" cy="20" rx="2.6" ry="3.6" fill="#1a0d2b" />
      <ellipse cx="25.5" cy="20" rx="2.6" ry="3.6" fill="#1a0d2b" />
      <ellipse cx="20" cy="29" rx="3" ry="2.2" fill="#1a0d2b" />
    </svg>
  )
  else if (kind === 'spider') inner = (
    <div className="spider-drop" style={{ '--drop': `${drop}px` }}>
      <span className="thread" />
      <svg width={size} height={size} viewBox="0 0 40 40">
        <g stroke="var(--spider)" strokeWidth="2.2" fill="none" strokeLinecap="round">
          <path d="M14 18 L4 10 M14 21 L2 21 M14 24 L4 32 M15 27 L9 37" />
          <path d="M26 18 L36 10 M26 21 L38 21 M26 24 L36 32 M25 27 L31 37" />
        </g>
        <ellipse cx="20" cy="23" rx="8" ry="9" fill="var(--spider)" />
        <circle cx="20" cy="13" r="5" fill="var(--spider)" />
        <circle cx="18" cy="12.5" r="1.3" fill="#ff8a1f" /><circle cx="22" cy="12.5" r="1.3" fill="#ff8a1f" />
      </svg>
    </div>
  )
  else if (kind === 'web') inner = (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g stroke="var(--web)" strokeWidth="1.4" fill="none">
        <path d="M0 0 L100 100 M0 0 L100 40 M0 0 L40 100 M0 0 L100 0 M0 0 L0 100" />
        <path d="M30 0 Q 24 12 30 30 Q 12 24 0 30" /><path d="M58 0 Q 46 24 58 58 Q 24 46 0 58" />
        <path d="M86 0 Q 70 34 86 86 Q 34 70 0 86" />
      </g>
    </svg>
  )
  else inner = <Bat size={size} color={color} />
  return <div className={cls} style={style} aria-hidden="true">{inner}</div>
}

export function Bat({ size = 40, color = 'var(--bat)' }) {
  return (
    <svg className="bat" width={size} height={size * 0.45} viewBox="0 0 64 29">
      <path fill={color} d="M32 9 C30 5 28 4 27 6 C25 3 18 1 10 4 C14 6 15 10 13 13 C9 11 4 12 0 16 C6 16 10 19 12 23 C15 19 20 18 24 21 C25 18 28 17 32 22 C36 17 39 18 40 21 C44 18 49 19 52 23 C54 19 58 16 64 16 C60 12 55 11 51 13 C49 10 50 6 54 4 C46 1 39 3 37 6 C36 4 34 5 32 9 Z" />
    </svg>
  )
}

export function Pumpkin({ size = 60 }) {
  return (
    <svg className="pumpkin" width={size} height={size} viewBox="0 0 64 60">
      <path d="M32 12 C31 6 33 3 37 1" stroke="#3f8f3a" strokeWidth="4" strokeLinecap="round" fill="none" />
      <ellipse cx="18" cy="35" rx="15" ry="21" fill="#e2650c" />
      <ellipse cx="46" cy="35" rx="15" ry="21" fill="#e2650c" />
      <ellipse cx="32" cy="35" rx="16" ry="23" fill="#ff8a1f" />
      <path d="M18 28 L25 28 L21.5 21 Z M39 28 L46 28 L42.5 21 Z" fill="#ffd84d" stroke="#3a1606" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 38 Q32 52 48 38 L43 40 L41 44 L37 41 L32 46 L27 41 L23 44 L21 40 Z" fill="#ffd84d" stroke="#3a1606" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

// Replaces the synthwave sun: a striped harvest moon with a few bats across it.
export function HarvestMoon() {
  return (
    <div className="moon" aria-hidden="true">
      <svg viewBox="0 0 200 210">
        <defs>
          <linearGradient id="moon-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe08a" /><stop offset=".5" stopColor="#ff8a1f" /><stop offset="1" stopColor="#8b3fd9" />
          </linearGradient>
          <mask id="moon-mask">
            <rect width="200" height="210" fill="#000" /><circle cx="100" cy="94" r="82" fill="#fff" />
            <rect x="0" y="112" width="200" height="5" fill="#000" /><rect x="0" y="124" width="200" height="6" fill="#000" />
            <rect x="0" y="138" width="200" height="8" fill="#000" /><rect x="0" y="154" width="200" height="11" fill="#000" />
            <rect x="0" y="172" width="200" height="16" fill="#000" />
          </mask>
        </defs>
        <rect width="200" height="210" fill="url(#moon-grad)" mask="url(#moon-mask)" />
        <circle cx="70" cy="58" r="11" fill="#000" opacity=".08" /><circle cx="128" cy="44" r="7" fill="#000" opacity=".07" />
        <circle cx="118" cy="86" r="14" fill="#000" opacity=".06" />
      </svg>
      <span className="moon-bat moon-bat--1"><Bat size={58} /></span>
      <span className="moon-bat moon-bat--2"><Bat size={38} /></span>
      <span className="moon-bat moon-bat--3"><Bat size={28} /></span>
    </div>
  )
}
