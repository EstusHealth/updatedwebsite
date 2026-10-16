/* ==========================================================================
   Site-wide constants. One source of truth for links, so the canonical
   Pracsuite referral form (reused everywhere per the content handover) can
   be changed in exactly one place.
   ========================================================================== */

// The single canonical referral / contact form (Pracsuite). Reused by every
// "Make a Referral" / "Open referral form" / "Open Contact Form" CTA.
export const REFERRAL_FORM = 'https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7'
export const CLIENT_PORTAL = 'https://questot.bookings.pracsuite.com/'
export const EMAIL = 'hello@estushealth.com'

// Podcasts. Performance Lab: Protocols is Liam's show; OT and Yap is Nik's.
export const PODCASTS = {
  performanceLab: { name: 'Performance Lab: Protocols', host: 'Liam', url: 'https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6' },
  otAndYap: { name: 'OT and Yap', host: 'Nik', url: 'https://open.spotify.com/show/0inAJS350wpidn8xLcPY9m' },
}
export const COMMCARD_APP = '/commcard/' // bundled standalone PWA in public/commcard
// GIVE WAY! road rules arcade: bundled standalone page in public/giveway.
// Append ?studio to unlock the team-only Instagram export panel.
export const GIVEWAY_APP = '/giveway/'

// Current intake capacity. One source of truth for the notice shown on the
// home page, the contact / referral page, and the team profiles, so the three
// never drift apart. Update here when intake changes.
export const CAPACITY = {
  badge: 'Term 4 places open',
  heading: 'Limited Term 4 places are now available.',
  body: 'We have opened a small number of places for Term 4 ongoing therapy. Spaces are limited and are offered in the order referrals come in, so send your referral now and we will be in touch to get you booked.',
  short: 'Limited Term 4 places are now available. Spaces are offered in the order referrals come in.',
  cta: 'Make a referral',
  // Shown on the team profiles for clinicians with Term 4 places.
  clinicianStatus: 'Limited Term 4 places available',
}

// Halloween skin for the home page. Switches itself on for all of October,
// Perth time, every year. Preview it any time with ?halloween=1, or hide it
// with ?halloween=0.
export function isHalloween(now = new Date()) {
  if (typeof window !== 'undefined') {
    const q = new URLSearchParams(window.location.search).get('halloween')
    if (q === '1') return true
    if (q === '0') return false
  }
  const month = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Perth', month: 'numeric' }).format(now)
  return month === '10'
}

// Discovery-call booking (BookingButtonPair on the Contact page).
export const BOOKING = [
  { name: 'Nik', label: 'Over 16s', url: 'https://calendar.app.google/iLxEVkhaRCFEhsSC8' },
  { name: 'Nam', label: 'Under 16s', url: 'https://calendar.app.google/vGXRQqSbPwSXsY8q9' },
]

export const SERVICES = [
  { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
  { to: '/services/assessments-reports', label: 'Assessments & Reports' },
  { to: '/services/gaming-informed-therapy', label: 'Gaming-Informed Therapy' },
  { to: '/services/study-on-the-spectrum', label: 'Study On The Spectrum (2027)' },
]

// Driving On The Spectrum: the driving OT business. Its own top-level nav item,
// separate from the Services dropdown.
export const DRIVING = { to: '/driving-on-the-spectrum', label: 'Driving On The Spectrum' }

// Study On The Spectrum register-interest form. Paste the form URL here when
// it exists; until then the page shows an email fallback instead of a form.
export const STUDY_FORM = null

export const NAV_ABOUT = [
  { to: '/team', label: 'Meet the Team' },
  { to: '/contact', label: 'Contact & Referrals' },
]

// Free Resources topics. Each `id` is a section anchor on the /resources page
// (scrolled to by ScrollToTop), so the nav, footer and hub share one list.
export const RESOURCE_TOPICS = [
  { id: 'pda', label: 'PDA' },
  { id: 'late-diagnosis', label: 'Late Diagnosis & Burnout' },
  { id: 'executive-function', label: 'Executive Function & Energy' },
  { id: 'eds', label: 'EDS & Hypermobility' },
  { id: 'communication', label: 'Communication' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'driving', label: 'Driving' },
]

export const NAV_RESOURCES = [
  { to: '/resources', label: 'All Free Resources' },
  ...RESOURCE_TOPICS.map((t) => ({ to: `/resources#${t.id}`, label: t.label })),
]

// Instagram profile. INSTAGRAM_EMBED is the unofficial profile-embed endpoint
// used for the home-page feed iframe; if Instagram ever breaks it, the section
// still degrades to its "Follow us" button.
export const INSTAGRAM = 'https://www.instagram.com/estus_health/'
export const INSTAGRAM_EMBED = 'https://www.instagram.com/estus_health/embed'

// Social media links shown bottom-left of the footer. Placeholder hrefs
// ('#') can be swapped for the real profile URLs when they are ready.
export const SOCIALS = [
  { label: 'Instagram', icon: 'instagram', href: INSTAGRAM },
  { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@Estushealth' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=61567995865625' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/estus-health' },
]
