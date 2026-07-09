/* ==========================================================================
   Webinar catalogue. One source of truth for our recorded workshops, shared by
   the preview cards on the Events & Media page and the hero of each webinar's
   own dedicated page. The rich, interactive content for a webinar lives in its
   page component (src/pages/events/*); this file holds only the index metadata.

   `videoId` is a YouTube ID. Thumbnails are derived from it, so we never store
   an image path. To publish a new webinar: add an entry here, create its page
   component, and wire the route in App.jsx.
   ========================================================================== */

export const WEBINARS = [
  {
    slug: 'gaming-informed-therapy',
    path: '/events/gaming-informed-therapy',
    tag: 'Workshop',
    title: 'Gaming-Informed Therapy',
    subtitle: 'Why the controller belongs in the clinic room',
    presenter: 'Liam Fagan',
    videoId: 'rU-a07QBf5w',
    dateISO: '2025-05-22',
    dateLabel: 'May 2025',
    duration: '~100 min',
    blurb:
      'How gaming, used with intention, becomes a bridge to communication, regulation and real-world goals for autistic, ADHD and PDA-profile clients. Watch the full workshop, browse a therapist-tested library of co-op games, and see the frameworks behind the play.',
  },
]

// YouTube thumbnail URLs for a video id. `maxresdefault` is 16:9 but is not
// guaranteed to exist for every upload, so callers fall back to `hqdefault`.
export const ytThumb = (videoId, quality = 'maxresdefault') =>
  `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`

export const webinarBySlug = (slug) => WEBINARS.find((w) => w.slug === slug)
