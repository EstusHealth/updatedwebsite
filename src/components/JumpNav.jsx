import { useState, useEffect } from 'react'

/* ==========================================================================
   Shared in-page navigation: a row of anchor "chips" plus a sticky version
   that slides in once the hero scrolls away, with the current section
   highlighted. Used by any long page that wants easy section jumping.

   `sections` is an array of [label, id] pairs, in page order. Pass a stable
   (module-level) array so the observer effect does not re-run every render.
   Each target section needs the matching id and the `jump-target` class (which
   offsets its scroll position so the sticky bars do not cover the heading).
   ========================================================================== */

// Tracks which section is currently in view, for nav highlighting.
export function useActiveSection(sections) {
  const [active, setActive] = useState(sections[0]?.[1])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach(([, id]) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [sections])
  return active
}

// True once the page has scrolled past the given sentinel element.
export function useScrolledPast(ref) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return past
}

// A row of jump-link chips. `variant` styles the hero vs. sticky version.
export function JumpNav({ sections, active, variant = '', label = 'Jump to' }) {
  return (
    <nav className={`jump-nav ${variant}`} aria-label="Jump to section">
      {variant !== 'jump-nav--sticky' && label && <span className="jump-nav__label">{label}</span>}
      {sections.map(([text, id]) => (
        <a
          className={`jump-chip${active === id ? ' is-active' : ''}`}
          href={`#${id}`}
          key={id}
          aria-current={active === id ? 'true' : undefined}
        >
          {text}
        </a>
      ))}
    </nav>
  )
}

// The sticky mini-nav bar. Render it right after the hero; it stays hidden
// (and inert) until `show` is true.
export function StickyJumpNav({ sections, active, show }) {
  return (
    <div className={`jump-sticky${show ? ' is-visible' : ''}`} aria-hidden={!show}>
      <div className="wrap">
        <JumpNav sections={sections} active={active} variant="jump-nav--sticky" />
      </div>
    </div>
  )
}
