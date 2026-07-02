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
export const SPOTIFY_SHOW = 'https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6'
export const COMMCARD_APP = '/commcard/' // bundled standalone PWA in public/commcard
export const COMMCARD_EXTERNAL = 'https://commcard.estushealth.com'

// Discovery-call booking (BookingButtonPair on Contact + Minecraft pages).
export const BOOKING = [
  { name: 'Nik', label: 'Over 16s', url: 'https://calendar.app.google/iLxEVkhaRCFEhsSC8' },
  { name: 'Nam', label: 'Under 16s', url: 'https://calendar.app.google/vGXRQqSbPwSXsY8q9' },
]

export const SERVICES = [
  { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
  { to: '/services/gaming-informed-therapy', label: 'Gaming-Informed Therapy' },
  { to: '/services/minecraft-program', label: 'Minecraft Program' },
  { to: '/services/assessments-reports', label: 'Assessments & Reports' },
]

export const FOOTER_RESOURCES = [
  { to: '/resources', label: 'All Free Resources' },
  { to: '/resources/pda-quiz', label: 'PDA Profile Quiz' },
  { to: '/resources/understanding-pda', label: 'Understanding PDA' },
  { to: '/resources/commcard', label: 'CommCard' },
  { to: '/resources/open-loops', label: 'Open Loops' },
]

// Social media links shown bottom-left of the footer. Placeholder hrefs
// ('#') can be swapped for the real profile URLs when they are ready.
export const SOCIALS = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/estus_health/' },
  { label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@Estushealth' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/profile.php?id=61567995865625' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/company/estus-health' },
]
