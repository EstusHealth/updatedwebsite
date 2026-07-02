import { useState } from "react";

// ─── STYLES (UPDATED TO MATCH PERFORMANCE LAB THEME) ─────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    // Use CSS variables so it matches index.css
    background: "hsl(var(--background))", 
    color: "hsl(var(--foreground))",
    fontFamily: "var(--font-body)",
    position: "relative",
    overflow: "hidden",
  },
  grain: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    opacity: 0.03,
    mixBlendMode: "multiply",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
    backgroundSize: "256px 256px",
  },
  wrap: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 2rem",
  },

  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    padding: "5.5rem 0 3.5rem",
  },
  heroLabel: {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "0.7rem",
    color: "hsl(var(--primary))",
    fontWeight: 500,
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  heroLabelLine: {
    width: "24px",
    height: "1px",
    background: "hsl(var(--primary))",
  },
  heroTitle: {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
    lineHeight: 1.1,
    fontWeight: 600,
    color: "hsl(var(--foreground))",
    marginBottom: "1rem",
  },
  accentGradient: {
    // Matches the .text-gradient-accent in index.css
    background: "linear-gradient(135deg, hsl(25 40% 50%) 0%, hsl(25 35% 35%) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroBody: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "hsl(var(--muted-foreground))",
    maxWidth: "580px",
  },

  // ── Self-referral callout ───────────────────────────────────────────────
  callout: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    padding: "2rem 2.25rem",
    display: "flex",
    gap: "1.5rem",
    alignItems: "stretch",
    marginBottom: "3.5rem",
  },
  calloutBar: {
    width: "4px",
    background: "hsl(var(--primary))",
    borderRadius: "2px",
    flexShrink: 0,
  },
  calloutInner: {
    flex: 1,
  },
  calloutTag: {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "0.65rem",
    color: "hsl(var(--primary))",
    fontWeight: 500,
    marginBottom: "0.5rem",
  },
  calloutTitle: {
    fontFamily: "var(--font-body)",
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "hsl(var(--foreground))",
    marginBottom: "0.45rem",
    lineHeight: 1.4,
  },
  calloutBody: {
    fontSize: "0.88rem",
    color: "hsl(var(--muted-foreground))",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },
  calloutLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    color: "hsl(var(--primary))",
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.72rem",
    fontWeight: 500,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 200ms cubic-bezier(.4,0,.2,1)",
  },

  // ── Section titles ───────────────────────────────────────────────────────
  sectionTag: {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    fontSize: "0.65rem",
    color: "hsl(var(--primary))",
    fontWeight: 500,
    marginBottom: "0.4rem",
  },
  sectionTitle: {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "hsl(var(--foreground))",
    marginBottom: "1.25rem",
  },

  // ── Card ─────────────────────────────────────────────────────────────────
  card: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    padding: "1.75rem 2rem",
  },

  // ── Step row ─────────────────────────────────────────────────────────────
  step: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
  },
  stepNum: {
    width: "28px",
    height: "28px",
    minWidth: "28px",
    borderRadius: "50%",
    background: "hsl(var(--secondary))",
    border: "1px solid hsl(var(--border))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-display)",
    fontSize: "0.72rem",
    fontWeight: 500,
    color: "hsl(var(--primary))",
  },
  stepTitle: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "hsl(var(--foreground))",
    marginBottom: "0.2rem",
  },
  stepBody: {
    fontSize: "0.82rem",
    color: "hsl(var(--muted-foreground))",
    lineHeight: 1.55,
  },

  // ── Include list item ────────────────────────────────────────────────────
  includeRow: {
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
    marginBottom: "0.85rem",
  },
  includeDot: {
    width: "6px",
    height: "6px",
    minWidth: "6px",
    borderRadius: "50%",
    background: "hsl(var(--primary))",
    marginTop: "6px",
  },
  includeText: {
    fontSize: "0.84rem",
    color: "hsl(var(--muted-foreground))",
    lineHeight: 1.55,
  },

  // ── Funding badge ────────────────────────────────────────────────────────
  fundingBadge: {
    background: "hsl(var(--secondary))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "6px",
    padding: "0.9rem 1.1rem",
    marginTop: "1.25rem",
  },
  fundingLabel: {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "0.58rem",
    color: "hsl(var(--muted-foreground))",
    fontWeight: 500,
    marginBottom: "0.3rem",
  },
  fundingText: {
    fontFamily: "var(--font-serif)",
    fontStyle: "italic",
    fontSize: "0.87rem",
    color: "hsl(var(--foreground))",
    lineHeight: 1.5,
  },

  // ── CTA block at bottom ──────────────────────────────────────────────────
  cta: {
    background: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    padding: "2.75rem 2rem",
    textAlign: "center",
    marginTop: "3.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  ctaTitle: {
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "hsl(var(--foreground))",
    marginBottom: "0.6rem",
  },
  ctaBody: {
    fontSize: "0.88rem",
    color: "hsl(var(--muted-foreground))",
    marginBottom: "1.5rem",
    lineHeight: 1.55,
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.45rem",
    background: "hsl(var(--primary))",
    color: "hsl(var(--primary-foreground))",
    fontFamily: "var(--font-display)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    fontSize: "0.78rem",
    fontWeight: 500,
    border: "none",
    borderRadius: "4px",
    padding: "0.7rem 1.75rem",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 300ms cubic-bezier(.4,0,.2,1)",
    boxShadow: "0 4px 14px hsl(var(--primary) / 0.25)",
  },
  ctaNote: {
    fontSize: "0.75rem",
    color: "hsl(var(--muted-foreground))",
    marginTop: "0.6rem",
  },
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function Referrers() {
  const [hoverCalloutLink, setHoverCalloutLink] = useState(false);
  const [hoverCtaBtn, setHoverCtaBtn] = useState(false);

  return (
    <div style={S.page}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={S.grain} />

      <div style={S.wrap}>

        {/* ════════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════════ */}
        <div style={S.hero}>
          <div style={S.heroLabel}>
            <div style={S.heroLabelLine} />
            For Referrers
          </div>
          <h1 style={S.heroTitle}>
            Referring <span style={S.accentGradient}>a client</span>
          </h1>
          <p style={S.heroBody}>
            Everything you need to know, whether you're a GP, support coordinator, or referring yourself.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            SELF-REFERRAL CALLOUT
        ════════════════════════════════════════════════════════════════════ */}
        <div style={S.callout}>
          <div style={S.calloutBar} />
          <div style={S.calloutInner}>
            <div style={S.calloutTag}>Good news</div>
            <div style={S.calloutTitle}>Self-referrals are welcome.</div>
            <p style={S.calloutBody}>
              You don't need a GP or another professional to get started. If you'd like to refer yourself or a family member, use the self-referral form. No referral letter required.
            </p>
            <a
              href="https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...S.calloutLink,
                // Darker color on hover
                color: hoverCalloutLink ? "hsl(var(--noctua-brown-dark))" : "hsl(var(--primary))",
              }}
              onMouseEnter={() => setHoverCalloutLink(true)}
              onMouseLeave={() => setHoverCalloutLink(false)}
            >
              Open the self-referral form →
            </a>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            HOW IT WORKS
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ maxWidth: "720px", marginBottom: "2.75rem" }}>
          <div style={S.sectionTag}>How it works</div>
          <h2 style={S.sectionTitle}>The referral process</h2>

          <div style={S.card}>
            <div style={S.step}>
              <div style={S.stepNum}>1</div>
              <div>
                <div style={S.stepTitle}>Submit a referral</div>
                <div style={S.stepBody}>
                  Use the self-referral form if you're referring yourself or a family member. If you're a GP, support coordinator, or another professional, you can use the same form on behalf of your client. Just fill in the "About the client" section with their details.
                </div>
              </div>
            </div>

            <div style={S.step}>
              <div style={S.stepNum}>2</div>
              <div>
                <div style={S.stepTitle}>We review and make contact</div>
                <div style={S.stepBody}>
                  We'll review the referral and get in touch within 24 hours to discuss next steps, confirm suitability, and arrange an initial appointment.
                </div>
              </div>
            </div>

            <div style={{ ...S.step, marginBottom: 0 }}>
              <div style={S.stepNum}>3</div>
              <div>
                <div style={S.stepTitle}>We keep you in the loop</div>
                <div style={S.stepBody}>
                  If you're a referring professional, we'll keep you updated on progress (with the client's consent) and send through any reports once the assessment or therapy is complete.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            WHAT TO INCLUDE + FUNDING WORDING
        ════════════════════════════════════════════════════════════════════ */}
        <div style={{ maxWidth: "720px" }}>
          <div style={S.sectionTag}>Helpful</div>
          <h2 style={S.sectionTitle}>What to include in your referral</h2>

          <div style={S.card}>
            <div style={S.includeRow}>
              <div style={S.includeDot} />
              <div style={S.includeText}>
                <strong style={{ color: "hsl(var(--foreground))" }}>Client's name and contact details</strong> (or yours, if you're referring yourself).
              </div>
            </div>
            <div style={S.includeRow}>
              <div style={S.includeDot} />
              <div style={S.includeText}>
                <strong style={{ color: "hsl(var(--foreground))" }}>What service you're enquiring about</strong>: NDIS Access Request Support, Functional Capacity Assessment, or Occupational Therapy.
              </div>
            </div>
            <div style={S.includeRow}>
              <div style={S.includeDot} />
              <div style={S.includeText}>
                <strong style={{ color: "hsl(var(--foreground))" }}>Funding type</strong>: private, self-managed NDIS, or plan-managed NDIS.
              </div>
            </div>
            <div style={S.includeRow}>
              <div style={S.includeDot} />
              <div style={S.includeText}>
                <strong style={{ color: "hsl(var(--foreground))" }}>A brief description of the client's needs</strong>. Even a few sentences helps us prepare.
              </div>
            </div>

            {/* Funding wording */}
            <div style={S.fundingBadge}>
              <div style={S.fundingLabel}>Funding</div>
              <div style={S.fundingText}>
                Accepting private, self-managed, and plan-managed NDIS clients.
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            CTA
        ════════════════════════════════════════════════════════════════════ */}
        <div style={S.cta}>
          <h2 style={S.ctaTitle}>Ready to get started?</h2>
          <p style={S.ctaBody}>
            Whether you're referring yourself or a client, the self-referral form is the quickest way in.
          </p>
          <a
            href="https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...S.ctaBtn,
              background: hoverCtaBtn ? "hsl(var(--noctua-brown-dark))" : "hsl(var(--primary))",
              boxShadow: hoverCtaBtn
                ? "0 0 40px hsl(var(--primary) / 0.5)"
                : "0 0 20px hsl(var(--primary) / 0.2)",
            }}
            onMouseEnter={() => setHoverCtaBtn(true)}
            onMouseLeave={() => setHoverCtaBtn(false)}
          >
            Open the self-referral form →
          </a>
          <div style={S.ctaNote}>Response time within 24 hours</div>
        </div>

        <div style={{ height: "5rem" }} />
      </div>
    </div>
  );
}
