import { useState, useEffect, useRef } from 'react';

// ─── COLORS ──────────────────────────────────────────────────────────
const C = {
  cream: '#ece3d4', creamLight: '#f4efe7', tan: '#ddd2c0',
  brown: '#6b4f3a', brownDark: '#3a2e22', brownLight: '#b0875e',
  black: '#2a231a', white: '#ffffff', bone: '#f8f6f2',
};

// ─── HOOKS ───────────────────────────────────────────────────────────
function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.12 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

// ─── PRIMITIVES ──────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

const grainSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function Grain() {
  return <div style={{ position: 'absolute', inset: 0, backgroundImage: grainSVG, opacity: 0.03, pointerEvents: 'none', zIndex: 1 }} />;
}

function Divider({ center }) {
  return <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${C.brown}, transparent)`, margin: center ? '0 auto' : undefined }} />;
}

function Dot() {
  return <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.brown, marginTop: 6, flexShrink: 0 }} />;
}

function Btn({ children, href, outline, glow, dark }) {
  const [h, setH] = useState(false);
  const s = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em',
    fontWeight: 600, fontSize: 15, padding: '15px 36px', borderRadius: 4, cursor: 'pointer',
    textDecoration: 'none', transition: 'all 0.3s ease',
    border: outline ? `2px solid ${dark ? C.cream + '40' : C.brown + '40'}` : 'none',
    background: outline ? 'transparent' : C.brown,
    color: outline ? (dark ? C.cream : C.brown) : C.cream,
    boxShadow: glow ? (h ? `0 0 50px ${C.brown}70` : `0 0 25px ${C.brown}40`) : h && !outline ? `0 0 30px ${C.brown}40` : 'none',
    transform: h ? 'scale(1.03)' : 'scale(1)',
  };
  if (h && outline) {
    s.borderColor = dark ? C.brownLight : C.brown;
    s.color = dark ? C.brownLight : C.brown;
  }
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      style={s}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >{children}</a>
  );
}

// ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Hero() {
  const [on, setOn] = useState(false);
  useEffect(() => { setTimeout(() => setOn(true), 100); }, []);
  const f = (d) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s ease ${d}s, transform 0.8s ease ${d}s`,
  });
  return (
    <section style={{
      position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: `linear-gradient(180deg, ${C.cream} 0%, ${C.tan} 100%)`,
      overflow: 'hidden',
    }}>
      <Grain />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.tan}40 100%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 10, padding: '80px 24px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ ...f(0.2), fontFamily: "'Oswald', sans-serif", fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.3em', color: C.brown, fontWeight: 600, marginBottom: 32 }}>
          Performance Lab: Protocols
        </p>
        <h1 style={{ ...f(0.4), fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 32, color: C.black }}>
          <span style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}>
            Protocols built for the life
          </span>
          <br />
          <span style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}>
            you actually have.
          </span>
          <br />
          <span style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: C.brown }}>
            Not the one the content assumes.
          </span>
        </h1>
        <div style={{ ...f(0.8), marginBottom: 48 }}>
          <p style={{ fontSize: 16, color: C.black + '99', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            A podcast, newsletter and community for allied health clinicians who know the research, understand the frameworks, and are still figuring out how to make them work inside a genuinely complex life.
          </p>
        </div>
        <div style={{ ...f(1.2), display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Btn href="#offerings" glow>Explore the Lab</Btn>
          <Btn href="#letter" outline>Read the Letter</Btn>
        </div>
        <div style={{ ...f(1.6), position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: C.black + '50' }}>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: "'Oswald', sans-serif" }}>Scroll</span>
          <span style={{ fontSize: 16, animation: 'plBounce 2s infinite' }}>↓</span>
        </div>
      </div>
    </section>
  );
}

// ━━━ LETTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Letter() {
  const b = { fontSize: 'clamp(16px, 2.2vw, 19px)', lineHeight: 1.75, color: C.black + 'C0' };
  const h = { fontFamily: "'Oswald', sans-serif", fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.1, color: C.black };
  const a = (t, bold) => <span style={{ color: C.brown, fontWeight: bold ? 700 : 400 }}>{t}</span>;
  return (
    <section id="letter" style={{ position: 'relative', padding: '96px 24px 120px', background: `linear-gradient(180deg, ${C.cream} 0%, ${C.creamLight} 100%)` }}>
      <Grain />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${C.brown}55, transparent)` }} />
      <div style={{ maxWidth: 700, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
            <Divider />
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.brown, fontWeight: 600 }}>Updated: February 2026</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p style={{ ...h, fontSize: 'clamp(26px, 4vw, 36px)' }}>I see you.</p>
            <p style={b}>Not the version of you that reads the research and builds the routines. The other one. The one navigating a caseload, a business, a family, a body that doesn't recover the way it used to -- and trying to figure out which lever to pull when you only have time for one.</p>
            <p style={b}>You've done the CPD. You understand the frameworks. <span style={{ color: C.brown, fontWeight: 600 }}>You're not missing information.</span></p>
            <p style={b}>What you're missing is protocols that were actually designed for your circumstances.</p>
            <p style={b}>Because most optimisation content is built for someone with {a('slack in their system', true)}. Time to experiment. Energy to track variables. Room to fail and iterate. That's not the life most clinicians are living. And applying generic high-performance protocols to a genuinely complex life doesn't produce better outcomes.</p>
            <p style={{ ...b, color: C.brown, fontWeight: 600 }}>It produces guilt when it doesn't stick.</p>
            <p style={{ ...h, fontSize: 'clamp(28px, 5vw, 40px)', paddingTop: 32 }}>That's what the <span style={{ color: C.brown }}>Lab</span> is for.</p>
            <p style={b}>Not motivation. Not another framework to add to the pile. Just {a('protocols', true)} -- tested approaches to health, performance, and sustainable practice -- designed for the specific constraints of the life you're actually in. New parent running a business. Solo practitioner carrying a full caseload. Clinician managing their own health while managing everyone else's.</p>
            <p style={{ ...b, color: C.brown, fontWeight: 600 }}>Small hinges. The right ones. Applied where they actually move something.</p>
            <p style={{ ...b, color: C.black + '80' }}>A podcast. A community of practice. Monthly group sessions. A newsletter built around {a('3 protocols')}, {a('2 ideas')}, and {a('1 prompt')} that matters.</p>
            <p style={{ ...h, fontSize: 'clamp(28px, 5vw, 40px)', color: C.brown, paddingTop: 32 }}>Welcome to Performance Lab.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ━━━ OFFERING CARD ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function OfferingCard({ title, subtitle, description, icon, ctaText, ctaLink, features, badge, imgUrl }) {
  return (
    <FadeIn>
      <div style={{ background: C.white, border: `1px solid ${C.brown}15`, borderRadius: 6, padding: 'clamp(20px, 4vw, 40px)', boxShadow: `0 2px 10px ${C.brown}06` }}>
        <div style={{
          width: '100%', aspectRatio: '16/9', borderRadius: 6, marginBottom: 28,
          background: `url(${imgUrl}) center/cover no-repeat, linear-gradient(145deg, ${C.brownDark}, ${C.black})`,
          position: 'relative', overflow: 'hidden',
        }}>
          <Grain />
          {badge && (
            <div style={{ position: 'absolute', top: 14, left: 14, background: C.brown, color: C.cream, padding: '4px 14px', fontSize: 11, fontFamily: "'Oswald', sans-serif", textTransform: 'uppercase', letterSpacing: '0.12em', borderRadius: 3, zIndex: 2 }}>{badge}</div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: C.brown + '12', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{icon}</div>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.18em', color: C.brown, fontWeight: 600 }}>{subtitle}</span>
        </div>
        <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 700, textTransform: 'uppercase', color: C.black, lineHeight: 1.05, marginBottom: 14 }}>{title}</h3>
        <p style={{ fontSize: 15, color: C.black + '90', lineHeight: 1.7, marginBottom: 22 }}>{description}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {features.map((feat, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: C.black + 'A0', fontSize: 14 }}>
              <Dot /><span>{feat}</span>
            </li>
          ))}
        </ul>
        <Btn href={ctaLink}>{ctaText}</Btn>
      </div>
    </FadeIn>
  );
}

// ━━━ OFFERINGS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Offerings() {
  const data = [
    {
      title: 'Performance Lab: Protocols', subtitle: 'The Podcast', icon: '\uD83C\uDFA7',
      description: "Conversations at the intersection of allied health, gaming, AI, and behavioural science. Leadership, retention, burnout, chronic pain, tech in therapy. With clinicians who are actually doing the work.",
      ctaText: 'Listen on Spotify', ctaLink: 'https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6?si=b8e356fee7ff46b4',
      features: ['Deep-dives with allied health clinicians and researchers', 'AI, gaming, and tech as clinical tools. Not hype.', 'Leadership, culture, and scaling impact in allied health', 'Evidence-based, experience-tested'],
      badge: 'Spotify',
      imgUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
    },
    {
      title: 'Monthly Protocols', subtitle: 'Community of Practice', icon: '\uD83D\uDC65',
      description: "No content. No recordings. Just protocols. Monthly live group chats for allied health clinicians on health, performance, burnout, longevity, and how we actually live.",
      ctaText: 'Register to Join', ctaLink: 'https://docs.google.com/forms/d/e/1FAIpQLSeLjgP4ROKNTgCJWhrEcXW3nuNyh2KIZrvK1hPtwWrOoOKWEg/viewform?usp=header',
      features: ['Exclusively for allied health clinicians', 'No recordings. You have to show up.', 'Interactive discussion, not passive content', 'Protocols that actually get implemented'],
      badge: 'Monthly',
      imgUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    },
    {
      title: 'The Newsletter', subtitle: '3 Protocols. 2 Ideas. 1 Prompt.', icon: '\u2709\uFE0F',
      description: "Each edition cuts through the noise with three protocols worth testing, two ideas worth questioning, and one prompt that matters. Short, practical, built for clinicians who don't have time for fluff.",
      ctaText: 'Subscribe on Substack', ctaLink: 'https://substack.com/@liam168691?utm_campaign=profile&utm_medium=profile-page',
      features: ['Protocols sourced from research, podcasts, and clinical practice', 'Ideas challenged. Not just repeated.', 'One reflective prompt to pressure-test your week', 'Continue the conversation in the community'],
      badge: 'Free',
      imgUrl: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&q=80',
    },
  ];
  return (
    <section id="offerings" style={{ position: 'relative', padding: '96px 24px 120px', background: C.bone }}>
      <Grain />
      <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.brown, fontWeight: 600, marginBottom: 14 }}>What We Offer</p>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 700, textTransform: 'uppercase', color: C.black, marginBottom: 20 }}>Enter the <span style={{ color: C.brown }}>Lab</span></h2>
            <Divider center />
          </div>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {data.map((d, i) => <OfferingCard key={i} {...d} />)}
        </div>
      </div>
    </section>
  );
}

// ━━━ CTA BAND ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CtaBand() {
  return (
    <section style={{ position: 'relative', padding: '96px 24px 112px', background: C.brownDark, overflow: 'hidden' }}>
      <Grain />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent, ${C.brown}10, transparent)`, pointerEvents: 'none' }} />
      <FadeIn>
        <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 700, textTransform: 'uppercase', color: C.cream, marginBottom: 20 }}>
            Ready to <span style={{ color: C.brownLight }}>start?</span>
          </h2>
          <p style={{ fontSize: 15, color: C.cream + '70', lineHeight: 1.7, maxWidth: 460, margin: '0 auto 36px' }}>
            Pick your entry point. Listen to an episode. Join a group session. Subscribe to the newsletter. There's no sequence. Just start where it makes sense.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn href="https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6?si=b8e356fee7ff46b4" glow>Listen to the Podcast</Btn>
            <Btn href="https://substack.com/@liam168691?utm_campaign=profile&utm_medium=profile-page" outline dark>Subscribe</Btn>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ━━━ PAGE EXPORT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function PerformanceLab() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: C.black, WebkitFontSmoothing: 'antialiased' }}>
      <Hero />
      <Letter />
      <Offerings />
      <CtaBand />
    </div>
  );
}
