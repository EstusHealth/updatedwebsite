import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Instagram, Facebook, Linkedin, Youtube, Sun, Moon } from 'lucide-react'
import { SERVICES, DRIVING, NAV_ABOUT, NAV_RESOURCES, SOCIALS, CLIENT_PORTAL, EMAIL } from '../lib/site'
import { WEBINARS } from '../lib/webinars'

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, linkedin: Linkedin, youtube: Youtube }

// Events & Media nav: the hub, then a direct link to each webinar's own page.
const NAV_EVENTS = [
  { to: '/events', label: 'All Events & Media' },
  ...WEBINARS.map((w) => ({ to: w.path, label: w.title })),
]

/* ==========================================================================
   Nav route map (October 2026 restructure):
   Services / Driving On The Spectrum / About / Free Resources / Events & Media,
   then Client Portal (separate, external) + Get Started (primary CTA).
   ========================================================================== */

function ThemeSwitch() {
  const [theme, setTheme] = useState(() =>
    (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'neon-light'
  )
  const apply = (t) => {
    const valid = t === 'neon' || t === 'neon-light' ? t : 'neon-light'
    document.documentElement.setAttribute('data-theme', valid)
    try { localStorage.setItem('estus-theme', valid) } catch (e) { /* non-fatal */ }
    setTheme(valid)
  }
  return (
    <div className="mode-switch" role="group" aria-label="Colour mode">
      <span className="lbl" aria-hidden="true">Mode</span>
      <button className="mode-opt" aria-pressed={theme === 'neon-light'}
        title="Light mode" onClick={() => apply('neon-light')}>
        <Sun size={15} aria-hidden="true" /> Light
      </button>
      <button className="mode-opt" aria-pressed={theme === 'neon'}
        title="Dark mode" onClick={() => apply('neon')}>
        <Moon size={15} aria-hidden="true" /> Dark
      </button>
    </div>
  )
}

// Header dropdowns, in display order. Driving On The Spectrum sits between
// Services and About as a plain link (see DRIVING in lib/site.js).
const MENUS = {
  services: { label: 'Services', items: SERVICES },
  about: { label: 'About', items: NAV_ABOUT },
  resources: { label: 'Free Resources', items: NAV_RESOURCES },
  events: { label: 'Events & Media', items: NAV_EVENTS },
}

function Menu({ id, open, onToggle }) {
  const { label, items } = MENUS[id]
  return (
    <li className={`has-menu${open ? ' open' : ''}`}>
      <button className="menu-btn" aria-expanded={open} aria-controls={`${id}-menu`} onClick={onToggle}>
        {label} <span className="chev" aria-hidden="true">▾</span>
      </button>
      <ul className="menu" id={`${id}-menu`}>
        {items.map((m) => <li key={m.to}><Link to={m.to}>{m.label}</Link></li>)}
      </ul>
    </li>
  )
}

function Nav() {
  const [drawer, setDrawer] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const linksRef = useRef(null)
  const { pathname, hash } = useLocation()

  // Close menus on navigation (hash included, so anchor links close the menu).
  useEffect(() => { setDrawer(false); setOpenMenu(null) }, [pathname, hash])

  // Close dropdowns on outside click / Escape.
  useEffect(() => {
    const onClick = (e) => { if (linksRef.current && !linksRef.current.contains(e.target)) setOpenMenu(null) }
    const onKey = (e) => { if (e.key === 'Escape') setOpenMenu(null) }
    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey) }
  }, [])

  const menu = (id) => (
    <Menu id={id} open={openMenu === id} onToggle={() => setOpenMenu((m) => (m === id ? null : id))} />
  )

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link className="brand" to="/" aria-label="Estus Health home">
          <span className="mark" aria-hidden="true">E</span> Estus Health
        </Link>

        <nav aria-label="Primary">
          <ul className="links" ref={linksRef}>
            {menu('services')}
            <li><Link to={DRIVING.to}>{DRIVING.label}</Link></li>
            {menu('about')}
            {menu('resources')}
            {menu('events')}
          </ul>
        </nav>

        <div className="nav-cta">
          <a className="btn btn--ghost" href={CLIENT_PORTAL} target="_blank" rel="noopener">Client Portal</a>
          <Link className="btn" to="/contact">Get Started</Link>
        </div>

        <button className="burger" aria-label="Menu" aria-expanded={drawer} aria-controls="mnav"
          onClick={() => setDrawer((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav className={`mnav wrap${drawer ? ' open' : ''}`} id="mnav" aria-label="Mobile">
        <p className="group">Services</p>
        {SERVICES.map((s) => <Link key={s.to} className="sub" to={s.to}>{s.label}</Link>)}
        <Link to={DRIVING.to}>{DRIVING.label}</Link>
        <p className="group">About</p>
        {NAV_ABOUT.map((a) => <Link key={a.to} className="sub" to={a.to}>{a.label}</Link>)}
        <p className="group">Free Resources</p>
        {NAV_RESOURCES.map((r) => <Link key={r.to} className="sub" to={r.to}>{r.label}</Link>)}
        <p className="group">Events & Media</p>
        {NAV_EVENTS.map((e) => <Link key={e.to} className="sub" to={e.to}>{e.label}</Link>)}
        <a href={CLIENT_PORTAL} target="_blank" rel="noopener">Client Portal ↗</a>
        <Link to="/contact"><strong>Get Started</strong></Link>
      </nav>
    </header>
  )
}

// The footer mirrors the header's structure, so every column is the same list
// the matching menu uses.
function Footer() {
  const year = new Date().getFullYear()
  const col = (label, items) => (
    <nav aria-label={label}>
      <h2>{label}</h2>
      <ul>{items.map((i) => <li key={i.to}><Link to={i.to}>{i.label}</Link></li>)}</ul>
    </nav>
  )
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand"><span className="mark" aria-hidden="true">E</span> Estus Health</div>
            <p className="blurb">Neuroaffirming occupational therapy across Perth and via telehealth Australia-wide.</p>
            <ul className="foot-social" aria-label="Social media">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon]
                return (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                      {Icon ? <Icon size={20} aria-hidden="true" /> : s.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          {col('Services', [...SERVICES, DRIVING])}
          {col('About', [...NAV_ABOUT, { to: '/events', label: 'Events & Media' }])}
          {col('Free Resources', NAV_RESOURCES)}
          <nav aria-label="Contact">
            <h2>Contact</h2>
            <ul>
              <li>Perth, Western Australia</li>
              <li>Telehealth Australia-wide</li>
              <li>Mon – Sat, 8am – 7pm</li>
              <li><Link to="/contact">Make a referral →</Link></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© {year} Estus Health. All rights reserved.</span>
          <a href={CLIENT_PORTAL} target="_blank" rel="noopener">Client Portal ↗</a>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <ThemeSwitch />
    </>
  )
}
