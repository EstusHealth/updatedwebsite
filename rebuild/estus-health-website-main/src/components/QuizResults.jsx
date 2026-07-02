import ShareSection from './ShareSection';

/*
  Grain texture SVG data URI (same as used in index.css grain-overlay)
*/
const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`;

/*
  CSS keyframes injected once for the staggered fade-in-up animation.
*/
const RESULTS_STYLES = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.results-animate-1 { animation: fadeInUp 0.6s ease forwards; animation-delay: 0ms; opacity: 0; }
.results-animate-2 { animation: fadeInUp 0.6s ease forwards; animation-delay: 100ms; opacity: 0; }
.results-animate-3 { animation: fadeInUp 0.6s ease forwards; animation-delay: 200ms; opacity: 0; }
.results-animate-4 { animation: fadeInUp 0.6s ease forwards; animation-delay: 300ms; opacity: 0; }
.results-animate-5 { animation: fadeInUp 0.6s ease forwards; animation-delay: 400ms; opacity: 0; }
`;

/*
  Color constants (design system HSL values, never hardcoded hex)
*/
const C = {
  bg: 'hsl(35, 30%, 92%)',
  fg: 'hsl(20, 25%, 15%)',
  card: 'hsl(0, 0%, 100%)',
  primary: 'hsl(25, 35%, 35%)',
  primaryFg: 'hsl(35, 30%, 92%)',
  secondary: 'hsl(35, 20%, 82%)',
  border: 'hsl(25, 20%, 75%)',
  muted: 'hsl(20, 15%, 40%)',
  heroCenter: 'hsl(25, 40%, 28%)',
  heroEdge: 'hsl(20, 25%, 15%)',
};

export default function QuizResults({
  quizName,
  quizSlug,
  archetype,
  secondaryArchetype,
  scores,
  archetypeMap, // { key: { name, emoji } } for all archetypes in this quiz
  totalQuestions,
  referralURL,
  onRestart,
  isSharedView,
  onTakeQuiz,
}) {
  // Score breakdown: sort by highest score, calculate percentages
  const maxPossible = totalQuestions * 3;
  const breakdown = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([key, score]) => ({
      key,
      name: archetypeMap[key]?.name || key,
      emoji: archetypeMap[key]?.emoji || '',
      score,
      pct: maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0,
      isPrimary: key === archetype.key,
    }));

  // Archetype group label (e.g. "burnout", "chronotype")
  const archetypeGroupLabel = quizName.replace(' Quiz', '').toLowerCase();

  return (
    <>
      <style>{RESULTS_STYLES}</style>

      {/* Shared result banner */}
      {isSharedView && (
        <div
          style={{
            background: C.secondary,
            border: `1px solid ${C.border}`,
            padding: '1rem 1.5rem',
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: C.fg,
          }}
        >
          You're viewing a shared result. Take the quiz yourself to find your type.{' '}
          <button
            onClick={onTakeQuiz}
            style={{
              background: C.primary,
              color: C.primaryFg,
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.4rem 1rem',
              fontFamily: "'Oswald', sans-serif",
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              marginLeft: '0.75rem',
            }}
          >
            TAKE THE QUIZ
          </button>
        </div>
      )}

      {/* ─── HERO BAND ─────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          background: `radial-gradient(ellipse at center, ${C.heroCenter} 0%, ${C.heroEdge} 100%)`,
          padding: '4rem 1.5rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Grain overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: GRAIN_BG,
            opacity: 0.03,
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          {/* Eyebrow */}
          <p
            className="results-animate-1"
            style={{
              fontFamily: "'Oswald', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontSize: '0.8rem',
              color: C.primaryFg,
              opacity: 0,
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ opacity: 0.6 }}>YOUR {quizName.toUpperCase()} RESULT</span>
          </p>

          {/* Emoji / icon */}
          <div
            className="results-animate-2"
            style={{
              fontSize: '80px',
              lineHeight: 1,
              marginBottom: '1rem',
            }}
          >
            {archetype.emoji}
          </div>

          {/* Headline */}
          <h1
            className="results-animate-3"
            style={{
              fontFamily: "'Oswald', sans-serif",
              textTransform: 'uppercase',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              color: C.primaryFg,
              lineHeight: 1.1,
              marginBottom: '0.75rem',
              letterSpacing: '0.02em',
            }}
          >
            YOU'RE {archetype.name.toUpperCase().startsWith('THE ') ? '' : 'A '}
            {archetype.name.toUpperCase()}
          </h1>

          {/* Subtitle */}
          <p
            className="results-animate-4"
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontStyle: 'italic',
              fontSize: '1.25rem',
              color: C.primaryFg,
              opacity: 0.8,
              marginBottom: '0.75rem',
            }}
          >
            {archetype.tagline}
          </p>

          {/* Hook sentence */}
          {archetype.hook && (
            <p
              className="results-animate-5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: C.primaryFg,
                opacity: 0.7,
                maxWidth: '500px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              {archetype.hook}
            </p>
          )}

          {secondaryArchetype && (
            <p
              className="results-animate-5"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                color: C.primaryFg,
                opacity: 0.6,
                marginTop: '1rem',
              }}
            >
              with {secondaryArchetype.name} tendencies
            </p>
          )}
        </div>
      </section>

      {/* ─── DESCRIPTION SECTION ───────────────────────────────────── */}
      <section
        style={{
          background: C.bg,
          padding: '3rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            background: C.card,
            borderRadius: '12px',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          {/* Pull quote: first sentence */}
          {archetype.description.length > 0 && (
            <div
              style={{
                borderLeft: `3px solid ${C.primary}`,
                paddingLeft: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontStyle: 'italic',
                  fontSize: '1.25rem',
                  color: C.fg,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {archetype.description[0].split('.')[0]}.
              </p>
            </div>
          )}

          {/* Remaining description */}
          {archetype.description.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                lineHeight: 1.75,
                color: 'hsla(20, 25%, 15%, 0.85)',
                marginBottom: i < archetype.description.length - 1 ? '1rem' : 0,
              }}
            >
              {i === 0 ? p.substring(p.indexOf('.') + 2) || p : p}
            </p>
          ))}
        </div>
      </section>

      {/* ─── STRENGTHS STRIP ───────────────────────────────────────── */}
      {archetype.strengths && archetype.strengths.length > 0 && (
        <section style={{ background: C.bg, padding: '0 1.5rem 3rem' }}>
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {archetype.strengths.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: C.card,
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '0.5rem',
                      background: 'hsla(25, 35%, 35%, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {Icon && <Icon size={20} color={C.primary} />}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      textTransform: 'uppercase',
                      fontSize: '0.875rem',
                      letterSpacing: '0.05em',
                      color: C.fg,
                      marginBottom: '0.25rem',
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.875rem',
                      color: C.muted,
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── PRACTICAL TIPS ────────────────────────────────────────── */}
      {archetype.tips && archetype.tips.length > 0 && (
        <section style={{ background: C.card, padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: "'Oswald', sans-serif",
                textTransform: 'uppercase',
                fontSize: '1.5rem',
                letterSpacing: '0.02em',
                color: C.fg,
                marginBottom: '2rem',
              }}
            >
              WHAT TO TRY NEXT
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {archetype.tips.map((tip, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '3.5rem 1fr',
                    gap: '0.5rem',
                    alignItems: 'start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: C.primary,
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div style={{ paddingTop: '0.25rem' }}>
                    <p
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        textTransform: 'uppercase',
                        fontSize: '1rem',
                        color: C.fg,
                        marginBottom: '0.25rem',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {tip.headline}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.9rem',
                        color: C.muted,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {tip.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SCORE BREAKDOWN ───────────────────────────────────────── */}
      <section style={{ background: C.bg, padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              textTransform: 'uppercase',
              fontSize: '1.25rem',
              letterSpacing: '0.02em',
              color: C.fg,
              marginBottom: '0.75rem',
            }}
          >
            YOUR SCORE BREAKDOWN
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              color: C.muted,
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}
          >
            Here's how your answers mapped across all {archetypeGroupLabel} types.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {breakdown.map(({ key, name, emoji, pct, isPrimary }) => (
              <div key={key}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      textTransform: 'uppercase',
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      color: C.fg,
                    }}
                  >
                    {emoji} {name}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.85rem',
                        color: C.muted,
                      }}
                    >
                      {pct}%
                    </span>
                    {isPrimary && (
                      <span
                        style={{
                          background: 'hsla(25, 35%, 35%, 0.1)',
                          color: C.primary,
                          fontFamily: "'Oswald', sans-serif",
                          textTransform: 'uppercase',
                          fontSize: '0.7rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '100px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        Your type
                      </span>
                    )}
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: C.secondary,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      borderRadius: '4px',
                      background: isPrimary ? C.primary : 'hsla(25, 35%, 35%, 0.35)',
                      width: `${pct}%`,
                      transition: 'width 0.7s ease-out',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SHARE SECTION ─────────────────────────────────────────── */}
      <section style={{ background: C.card, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <ShareSection
            quizName={quizName}
            quizSlug={quizSlug}
            archetypeName={archetype.name}
            archetypeSlug={archetype.key}
            archetypeEmoji={archetype.emoji}
            archetypeSubtitle={archetype.tagline}
            shareCaption={archetype.shareCaption}
          />
        </div>
      </section>

      {/* ─── CTA + RETAKE ──────────────────────────────────────────── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.heroEdge} 0%, ${C.primary} 100%)`,
          padding: '3rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Oswald', sans-serif",
              textTransform: 'uppercase',
              fontSize: '1.5rem',
              color: '#fff',
              marginBottom: '0.75rem',
              letterSpacing: '0.02em',
            }}
          >
            {archetype.nextResource?.title || 'Ready to take the next step?'}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
              fontSize: '0.95rem',
            }}
          >
            {archetype.nextResource?.description ||
              'Our team can help you turn these insights into action.'}
          </p>
          <a
            href={referralURL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: C.primary,
              padding: '0.9rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              fontFamily: "'Oswald', sans-serif",
              textTransform: 'uppercase',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.03em',
              transition: 'transform 0.15s',
            }}
          >
            {archetype.nextResource?.cta || 'Get in touch'}
          </a>
        </div>
      </section>

      {/* Retake */}
      <section
        style={{
          background: C.bg,
          padding: '2rem 1.5rem 3rem',
          textAlign: 'center',
        }}
      >
        <button
          onClick={onRestart}
          style={{
            background: 'none',
            border: 'none',
            color: C.muted,
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontFamily: "'Inter', sans-serif",
            textDecoration: 'underline',
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = `2px solid ${C.primary}`;
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
        >
          Retake the quiz
        </button>
      </section>
    </>
  );
}
