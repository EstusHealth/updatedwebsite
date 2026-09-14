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
export const COMMCARD_EXTERNAL = 'https://commcard.estushealth.com'
// GIVE WAY! road rules arcade: bundled standalone page in public/giveway.
// Append ?studio to unlock the team-only Instagram export panel.
export const GIVEWAY_APP = '/giveway/'

// Current intake capacity. One source of truth for the notice shown on the
// home page, the contact / referral page, and the team profiles, so the three
// never drift apart. Update here when intake reopens.
export const CAPACITY = {
  badge: 'Capacity update',
  heading: 'Term 3 and school holiday intake has closed.',
  body: 'We are not taking new Term 3 or school holiday bookings. We will open a limited intake for Term 4 ongoing therapy through September and October. Spaces are limited, so register your interest now and we will be in touch as soon as a place opens.',
  short: 'Term 3 and school holiday intake has closed. A limited Term 4 intake opens through September and October, and spaces are limited.',
  cta: 'Register your interest',
  // Shown on the team profiles for clinicians who are not taking new bookings.
  clinicianStatus: 'Term 4 waitlist only · limited spaces',
}

// Discovery-call booking (BookingButtonPair on Contact + Minecraft pages).
export const BOOKING = [
  { name: 'Nik', label: 'Over 16s', url: 'https://calendar.app.google/iLxEVkhaRCFEhsSC8' },
  { name: 'Nam', label: 'Under 16s', url: 'https://calendar.app.google/vGXRQqSbPwSXsY8q9' },
]

export const SERVICES = [
  { to: '/services/occupational-therapy', label: 'Occupational Therapy' },
  { to: '/services/gaming-informed-therapy', label: 'Gaming-Informed Therapy' },
  { to: '/services/minecraft-program', label: 'Minecraft Program' },
  { to: '/services/live-sessions', label: 'Live Sessions' },
  { to: '/services/assessments-reports', label: 'Assessments & Reports' },
]

// Free Resources nav dropdown: the hub plus its category sections (anchors on
// the /resources page, handled by ScrollToTop).
export const NAV_RESOURCES = [
  { to: '/resources', label: 'All Free Resources' },
  { to: '/resources#quizzes', label: 'Quizzes' },
  { to: '/resources#guides', label: 'Guides' },
  { to: '/resources#tools', label: 'Tools' },
  { to: '/resources#driving-ot', label: 'Driving OT' },
]

export const FOOTER_RESOURCES = [
  { to: '/resources', label: 'All Free Resources' },
  { to: '/resources/pda-quiz', label: 'PDA Profile Quiz' },
  { to: '/resources/understanding-pda', label: 'Understanding PDA' },
  { to: '/resources/commcard', label: 'CommCard' },
  { to: '/resources/driving-ot', label: 'Driving OT' },
  { to: '/resources/lexicon', label: 'The Shared Lexicon' },
  { to: '/resources/open-loops', label: 'Open Loops' },
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
