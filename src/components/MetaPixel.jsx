import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { REFERRAL_FORM, BOOKING_PAGE } from '../lib/site'

/*
  Meta Pixel, site-wide.
  - PageView on every route change (SPA navigation included).
  - CompleteRegistration on /book-your-call. People only get that link after
    submitting the referral form, so a visit there means a real referral.
  - Lead when someone clicks any "Start the referral form" link.
  - Schedule when someone clicks through to a clinician's Google calendar.
  Skipped under automation so the build-time prerender records nothing.
*/
const PIXEL_ID = '1480288163972904'
const CALENDAR = 'https://calendar.app.google/'

const enabled = () => typeof window !== 'undefined' && !navigator.webdriver

function boot() {
  if (window.fbq) return
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js')
  window.fbq('init', PIXEL_ID)
}

const norm = (p) => p.replace(/\/+$/, '') || '/'

export default function MetaPixel() {
  const { pathname } = useLocation()

  // Load once and watch clicks on outbound links.
  useEffect(() => {
    if (!enabled()) return
    boot()
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href]')
      if (!a) return
      const href = a.href
      if (href.startsWith(REFERRAL_FORM)) window.fbq('track', 'Lead')
      else if (href.startsWith(CALENDAR)) window.fbq('track', 'Schedule')
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  // Page views, plus the referral-submitted signal.
  useEffect(() => {
    if (!enabled()) return
    boot()
    window.fbq('track', 'PageView')
    if (norm(pathname) === norm(BOOKING_PAGE)) window.fbq('track', 'CompleteRegistration')
  }, [pathname])

  return null
}
