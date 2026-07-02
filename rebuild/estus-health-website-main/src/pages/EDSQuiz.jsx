import { useState } from "react";

// ── Archetypes ──
const archetypes = {
  strategist: {
    key: "strategist",
    name: "The Strategist",
    emoji: "🗺️",
    tagline: "Plan everything. Control what you can.",
    color: "#76543E",
    lightColor: "#76543E18",
    description: [
      "You manage your body the way a chess player manages a board: always thinking several moves ahead. You've probably built systems for your symptoms, whether that's a spreadsheet tracking flare triggers, a colour-coded medication schedule, or a carefully structured week that accounts for energy reserves.",
      "This approach has real strengths. You catch patterns others miss. You're less likely to be blindsided by a crash because you've mapped the territory. Clinicians often underestimate how much knowledge you've built about your own condition because you don't present as \"struggling\" in the traditional sense.",
      "The shadow side? Hypervigilance. When your management system becomes the thing that exhausts you, or when an unexpected flare breaks through your carefully constructed plan and it feels like a personal failure rather than just a bad body day. The Strategist's biggest risk isn't poor planning. It's the belief that if you plan well enough, you can prevent all crashes. You can't. And that's not a failure of your system.",
    ],
    tips: [
      "Build \"plan B\" routines that are pre-made and ready to deploy on flare days, so you don't have to think when your body surprises you.",
      "Schedule unstructured time into your week intentionally. Your brain needs space that isn't optimised.",
      "Practice the phrase \"this is a body day, not a strategy failure\" for the moments your systems can't contain what's happening.",
      "Audit your tracking systems quarterly. If you're tracking more than you're using, the tracking itself has become a demand.",
    ],
    nextResource: {
      title: "Energy Management Protocol",
      description: "A structured framework for mapping your energy patterns and building sustainable daily rhythms.",
      type: "PDF Guide",
    },
  },
  surfer: {
    key: "surfer",
    name: "The Surfer",
    emoji: "🌊",
    tagline: "Ride the wave. Adapt in the moment.",
    color: "#8B7355",
    lightColor: "#8B735518",
    description: [
      "You've learned that rigidity breaks you faster than any flare does. Your approach to managing EDS or HSD is fluid: you read your body in the moment and adjust on the fly. Good energy day? You'll ride it. Crash day? You'll lower the bar and get through. You don't fight the waves. You surf them.",
      "This flexibility is genuinely adaptive, especially for neurodivergent people whose energy and capacity fluctuate unpredictably. You're less likely to trigger the boom-bust cycle that catches rigid planners, because you don't have a fixed expectation to crash against.",
      "The risk is that surfing can look a lot like drifting. Without anchor points (non-negotiable minimums for self-care, sleep, hydration, movement), your adaptability can slide into reactive survival mode. You end up responding to your body constantly without ever getting ahead of it. The Surfer's growth edge isn't becoming more structured. It's building a small number of non-negotiable anchors that stay fixed while everything else flexes.",
    ],
    tips: [
      "Identify your 3 non-negotiable anchors: the things that happen every day regardless of energy level. Make them tiny and achievable even on your worst day.",
      "Use a traffic light system (green/amber/red) to quickly categorise your day and have pre-set activity menus for each level.",
      "Build one consistent evening routine. This gives your nervous system a reliable signal that the day is ending, even when the day itself was chaotic.",
      "When you notice you've been in reactive mode for more than 3 days straight, that's your signal to pause and reassess rather than keep surfing.",
    ],
    nextResource: {
      title: "Morning Architecture Guide",
      description: "A flexible morning framework designed to work with fluctuating energy, not against it.",
      type: "Mini-Guide",
    },
  },
  fortress: {
    key: "fortress",
    name: "The Fortress",
    emoji: "🏰",
    tagline: "Protect your energy at all costs.",
    color: "#5C4033",
    lightColor: "#5C403318",
    description: [
      "You've learned the hard way that overextending has consequences. So you've built walls. Your boundaries are firm, sometimes rigid. You've reduced commitments, simplified your social life, and created a controlled environment where your body can function with the least amount of disruption.",
      "This protective approach is often born from repeated experience of crashing after overcommitment, and it works. You're probably better at energy conservation than most people your clinicians see. You've figured out what your limits are and you stay within them.",
      "The tension is that walls that protect can also isolate. When your management strategy is primarily about avoidance (avoiding activities, avoiding social situations, avoiding anything that might trigger a flare), you can end up with a life that's stable but small. The Fortress's growth edge is learning to build drawbridges: controlled, chosen ways to expand your world when you're ready, without dismantling the protection you need.",
    ],
    tips: [
      "Distinguish between protective boundaries (keeping you safe) and avoidance patterns (keeping you stuck). Ask: am I choosing this, or am I afraid of what happens if I don't?",
      "Experiment with one small expansion per month: a short outing, a brief social commitment, a new activity. Treat it as data collection, not a test you can fail.",
      "Build recovery into the plan before the expansion, not after the crash. If you know you're going out Saturday, clear Sunday beforehand.",
      "Find one person you trust enough to be honest about your capacity with. Fortress builders often mask to protect others from their limitations, which adds cognitive load.",
    ],
    nextResource: {
      title: "Cognitive Load Reduction Guide",
      description: "Practical strategies for reducing the mental tax of managing daily life with a complex body.",
      type: "PDF Guide",
    },
  },
  alchemist: {
    key: "alchemist",
    name: "The Alchemist",
    emoji: "⚗️",
    tagline: "Transform the raw material. Find meaning in it.",
    color: "#9B7E5E",
    lightColor: "#9B7E5E18",
    description: [
      "You don't just manage your condition. You've woven it into your identity, your work, your relationships, and your understanding of yourself. You might advocate for others with EDS or HSD, create content about your experience, mentor newly diagnosed people, or simply hold a philosophical stance that this is part of who you are, not something separate to be conquered.",
      "This meaning-making approach has genuine psychological benefits. Research consistently shows that people who integrate chronic conditions into their sense of self (rather than fighting against them) report better quality of life and lower distress. Your approach is sophisticated and mature.",
      "The risk is that meaning-making can become its own demand. When your identity becomes tied to \"managing well\" or \"being an advocate,\" bad days feel like a threat to who you are, not just your body. The Alchemist's growth edge is allowing space for the days when there's no meaning, no lesson, no growth. Sometimes a flare is just a flare, and that's enough.",
    ],
    tips: [
      "Give yourself explicit permission to have meaningless pain days. Not every experience needs to be integrated or learned from.",
      "Watch for advocacy fatigue. Supporting others with your condition is valuable, but it also keeps you in constant contact with the hardest parts of the experience.",
      "Build parts of your identity that have nothing to do with your health. Hobbies, interests, skills, and relationships that exist completely outside the EDS/HSD space.",
      "When someone asks how you're doing, practice occasionally saying \"it's hard right now\" instead of the reframed, meaning-rich version. Letting it be hard is also valid.",
    ],
    nextResource: {
      title: "Shutdown Ritual Builder",
      description: "A guide for creating end-of-day routines that let your body and brain actually switch off.",
      type: "Worksheet",
    },
  },
};

// ── Questions ──
const questions = [
  // Section 1: Daily Patterns
  {
    section: 1,
    sectionTitle: "Your Daily Patterns",
    text: "When you wake up and your body feels different from yesterday, what's your first instinct?",
    options: [
      { text: "Check my tracking system and adjust the plan for today", scores: { strategist: 3 } },
      { text: "See how it goes. I'll figure it out as the day unfolds", scores: { surfer: 3 } },
      { text: "Scale everything back immediately. Protect what energy I have", scores: { fortress: 3 } },
      { text: "Acknowledge it, remind myself this is part of the process, and carry on mindfully", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 1,
    text: "How do you handle tasks on a low-energy day?",
    options: [
      { text: "I have a pre-made low-energy task list that I switch to", scores: { strategist: 3 } },
      { text: "I do whatever feels manageable in the moment and let the rest go", scores: { surfer: 3 } },
      { text: "I cancel almost everything and focus on bare survival", scores: { fortress: 3 } },
      { text: "I pick one meaningful thing to do, even if it's small, so the day still counts", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 1,
    text: "What does your evening routine look like?",
    options: [
      { text: "Structured. Same steps each night to optimise sleep and recovery", scores: { strategist: 3 } },
      { text: "It depends on the day. Some nights I have a routine, some nights I don't", scores: { surfer: 3 } },
      { text: "Early shutdown. I prioritise rest above everything else in the evening", scores: { fortress: 3 } },
      { text: "I use it as reflection time. Processing the day, journaling, or connecting with myself", scores: { alchemist: 3 } },
    ],
  },
  // Section 2: Flare Management
  {
    section: 2,
    sectionTitle: "Managing Flares",
    text: "A flare hits unexpectedly mid-week. You had plans. What happens?",
    options: [
      { text: "I activate my flare protocol. I've already planned for this scenario", scores: { strategist: 3 } },
      { text: "I adapt. Reschedule what I can, lower the bar on what I can't", scores: { surfer: 3 } },
      { text: "I withdraw. Everything stops until my body settles", scores: { fortress: 3 } },
      { text: "I let people know what's happening. Being honest about it is part of how I cope", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 2,
    text: "After a crash, what's the first thing you think about?",
    options: [
      { text: "What triggered it. I want to prevent it from happening again", scores: { strategist: 3 } },
      { text: "What I need right now. I'll analyse later, if at all", scores: { surfer: 3 } },
      { text: "How to make sure I'm not in this position again. More boundaries, fewer commitments", scores: { fortress: 3 } },
      { text: "What I can learn from this. Even bad days teach me something about my body", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 2,
    text: "How do you talk to other people about your flares?",
    options: [
      { text: "In practical terms. \"I can do X but not Y today.\" Clear, specific, solution-focused", scores: { strategist: 3 } },
      { text: "Casually. \"Bit of a rough one today, we'll see how it goes\"", scores: { surfer: 3 } },
      { text: "Minimally. I'd rather just handle it myself than explain", scores: { fortress: 3 } },
      { text: "Honestly and openly. I think normalising these conversations matters", scores: { alchemist: 3 } },
    ],
  },
  // Section 3: Identity and Relationships
  {
    section: 3,
    sectionTitle: "Your Relationship With Your Body",
    text: "When someone asks \"how do you manage everything?\", what's your honest answer?",
    options: [
      { text: "Systems. I have systems for everything, and they keep me going", scores: { strategist: 3 } },
      { text: "I don't really. I just take each day as it comes", scores: { surfer: 3 } },
      { text: "By keeping my world small enough that I can handle it", scores: { fortress: 3 } },
      { text: "By finding purpose in it. This experience has shaped who I am", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 3,
    text: "What's your biggest frustration with your body right now?",
    options: [
      { text: "The unpredictability. I can't plan around something I can't predict", scores: { strategist: 3 } },
      { text: "The cumulative effect. Any single thing is manageable, but they pile up", scores: { surfer: 3 } },
      { text: "The constant negotiation. Everything costs energy I don't have", scores: { fortress: 3 } },
      { text: "That other people don't understand. The invisible nature of it is exhausting", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 3,
    text: "If you could change one thing about how you manage your condition, what would it be?",
    options: [
      { text: "I'd want better data. More accurate tracking to fine-tune my strategies", scores: { strategist: 3 } },
      { text: "I'd want more consistency. My approach works, but it's scattered", scores: { surfer: 3 } },
      { text: "I'd want to expand my life without the fear of what it'll cost me physically", scores: { fortress: 3 } },
      { text: "I'd want to stop feeling like I have to prove my experience is real", scores: { alchemist: 3 } },
    ],
  },
  // Section 4: Support and Growth
  {
    section: 4,
    sectionTitle: "Support and Growth",
    text: "What kind of support would actually help you right now?",
    options: [
      { text: "Help optimising my existing systems. Better tools, sharper strategies", scores: { strategist: 3 } },
      { text: "A few anchor points. Something consistent I can build flexibility around", scores: { surfer: 3 } },
      { text: "Permission and a plan to expand my life safely", scores: { fortress: 3 } },
      { text: "Someone who gets it. Understanding and validation, not just strategies", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 4,
    text: "When you imagine a \"good day\" with your condition, what does it look like?",
    options: [
      { text: "Everything runs according to plan. Minimal surprises, maximum efficiency", scores: { strategist: 3 } },
      { text: "A day where I feel in flow. Not controlled, but not out of control either", scores: { surfer: 3 } },
      { text: "A day where I have energy left over at the end. Some in reserve, for once", scores: { fortress: 3 } },
      { text: "A day where I feel like myself, not like a person managing a condition", scores: { alchemist: 3 } },
    ],
  },
  {
    section: 4,
    text: "What's the hardest part about being neurodivergent and hypermobile at the same time?",
    options: [
      { text: "The executive function load. Managing a complex body requires planning my brain finds hard", scores: { strategist: 3 } },
      { text: "The inconsistency. My brain and my body have different capacity each day and they rarely align", scores: { surfer: 3 } },
      { text: "The sensory load. Recommended supports often feel intolerable, so I avoid them", scores: { fortress: 3 } },
      { text: "The invisibility. People see neither condition, so they assume I'm fine", scores: { alchemist: 3 } },
    ],
  },
];

const sectionCount = 4;

function getResult(scores) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = archetypes[sorted[0][0]];
  const secondaryEntry = sorted[1];
  const secondaryClose =
    sorted[0][1] > 0 && secondaryEntry[1] / sorted[0][1] >= 0.85;
  const secondary = secondaryClose ? archetypes[secondaryEntry[0]] : null;
  return { primary, secondary };
}

// ── Styles ──
const t = {
  primary: "#76543E",
  dark: "#2E2519",
  cream: "#F5F0E8",
  creamDark: "#E5DCCC",
  accent: "#BFA88E",
  bg: "#FAF6F0",
  white: "#ffffff",
  muted: "#8B7E72",
};

export default function EDSQuiz() {
  const [screen, setScreen] = useState("landing"); // landing | quiz | results
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ strategist: 0, surfer: 0, fortress: 0, alchemist: 0 });
  const [fade, setFade] = useState(true);

  const sectionQuestions = questions.filter((q) => q.section === currentSection);
  const allCurrentAnswered = sectionQuestions.every((_, i) => {
    const qIndex = questions.findIndex(
      (q) => q.section === currentSection && sectionQuestions.indexOf(q) === i
    );
    return answers[qIndex] !== undefined;
  });

  const currentSectionTitle =
    sectionQuestions[0]?.sectionTitle || `Section ${currentSection}`;

  function handleAnswer(questionGlobalIndex, optionIndex) {
    const q = questions[questionGlobalIndex];
    const option = q.options[optionIndex];
    const prevOption = answers[questionGlobalIndex] !== undefined ? q.options[answers[questionGlobalIndex]] : null;

    const newScores = { ...scores };
    if (prevOption) {
      Object.entries(prevOption.scores).forEach(([k, v]) => {
        newScores[k] -= v;
      });
    }
    Object.entries(option.scores).forEach(([k, v]) => {
      newScores[k] += v;
    });

    setScores(newScores);
    setAnswers({ ...answers, [questionGlobalIndex]: optionIndex });
  }

  function nextSection() {
    setFade(false);
    setTimeout(() => {
      if (currentSection < sectionCount) {
        setCurrentSection(currentSection + 1);
      } else {
        setScreen("results");
      }
      setFade(true);
    }, 300);
  }

  function restart() {
    setScreen("landing");
    setCurrentSection(1);
    setAnswers({});
    setScores({ strategist: 0, surfer: 0, fortress: 0, alchemist: 0 });
  }

  const result = screen === "results" ? getResult(scores) : null;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        backgroundColor: t.bg,
        color: t.dark,
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* ════════ LANDING ════════ */}
      {screen === "landing" && (
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            padding: "4rem 1.5rem 6rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: t.primary,
              marginBottom: "1.5rem",
            }}
          >
            Estus Health
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}
          >
            What's Your
            <br />
            <span style={{ color: t.primary }}>EDS/HSD Management Style?</span>
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.65,
              color: t.muted,
              maxWidth: "480px",
              margin: "0 auto 1rem",
            }}
          >
            Everyone manages hypermobility differently. Some plan every detail. Some ride each day as
            it comes. Some protect their energy fiercely. Some find meaning in the experience.
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.65,
              color: t.dark,
              maxWidth: "480px",
              margin: "0 auto 2.5rem",
            }}
          >
            This quiz maps your natural management approach so you can understand your strengths,
            your blind spots, and what kind of support would actually help.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            {[
              { label: "12 questions", sub: "across 4 sections" },
              { label: "~3 minutes", sub: "to complete" },
              { label: "4 archetypes", sub: "based on real coping patterns" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: t.white,
                  padding: "1rem 1.25rem",
                  borderRadius: "10px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  minWidth: "140px",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: "1rem" }}>{item.label}</div>
                <div style={{ fontSize: "0.8rem", color: t.muted }}>{item.sub}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setScreen("quiz");
              setFade(true);
            }}
            style={{
              padding: "1rem 3rem",
              fontSize: "1.05rem",
              fontWeight: 700,
              backgroundColor: t.primary,
              color: t.cream,
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Start the Quiz →
          </button>
        </div>
      )}

      {/* ════════ QUIZ ════════ */}
      {screen === "quiz" && (
        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            padding: "3rem 1.5rem 6rem",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {/* Progress */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: t.primary,
                }}
              >
                {currentSectionTitle}
              </span>
              <span style={{ fontSize: "0.8rem", color: t.muted }}>
                Section {currentSection} of {sectionCount}
              </span>
            </div>
            <div
              style={{
                height: "4px",
                backgroundColor: t.creamDark,
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(currentSection / sectionCount) * 100}%`,
                  backgroundColor: t.primary,
                  borderRadius: "2px",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* Questions */}
          {sectionQuestions.map((q, sectionIdx) => {
            const globalIdx = questions.indexOf(q);
            return (
              <div
                key={globalIdx}
                style={{
                  backgroundColor: t.white,
                  borderRadius: "12px",
                  padding: "1.75rem 2rem",
                  marginBottom: "1.5rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  borderLeft: `4px solid ${t.accent}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    lineHeight: 1.45,
                    marginBottom: "1rem",
                  }}
                >
                  {q.text}
                </p>
                {q.options.map((opt, optIdx) => {
                  const selected = answers[globalIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(globalIdx, optIdx)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "0.875rem 1.25rem",
                        margin: "0.4rem 0",
                        border: `2px solid ${selected ? t.primary : t.creamDark}`,
                        borderRadius: "8px",
                        backgroundColor: selected ? `${t.primary}10` : t.bg,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.95rem",
                        lineHeight: 1.5,
                        fontWeight: selected ? 600 : 400,
                        color: t.dark,
                      }}
                    >
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* Next/Submit */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={nextSection}
              disabled={!allCurrentAnswered}
              style={{
                padding: "0.875rem 2.5rem",
                fontSize: "1rem",
                fontWeight: 700,
                backgroundColor: allCurrentAnswered ? t.primary : t.creamDark,
                color: allCurrentAnswered ? t.cream : t.muted,
                border: "none",
                borderRadius: "10px",
                cursor: allCurrentAnswered ? "pointer" : "default",
                transition: "all 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {currentSection < sectionCount ? "Next Section →" : "See My Results →"}
            </button>
          </div>
        </div>
      )}

      {/* ════════ RESULTS ════════ */}
      {screen === "results" && result && (
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
          {/* Hero result */}
          <div
            style={{
              backgroundColor: result.primary.color,
              borderRadius: "16px",
              padding: "3rem 2.5rem",
              textAlign: "center",
              marginBottom: "2.5rem",
              color: t.cream,
            }}
          >
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
              {result.primary.emoji}
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                opacity: 0.8,
                marginBottom: "0.5rem",
              }}
            >
              Your Management Style
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "0.75rem",
              }}
            >
              {result.primary.name}
            </h2>
            <p
              style={{
                fontSize: "1.15rem",
                fontStyle: "italic",
                opacity: 0.9,
              }}
            >
              {result.primary.tagline}
            </p>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "2.5rem" }}>
            {result.primary.description.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  marginBottom: "1.25rem",
                  color: `${t.dark}cc`,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tips */}
          <div
            style={{
              backgroundColor: t.white,
              borderRadius: "12px",
              padding: "2rem 2.25rem",
              marginBottom: "2.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              borderLeft: `4px solid ${result.primary.color}`,
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.35rem",
                fontWeight: 700,
                marginBottom: "1.25rem",
              }}
            >
              Practical Tips for {result.primary.name}s
            </h3>
            {result.primary.tips.map((tip, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: result.primary.lightColor,
                    color: result.primary.color,
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  {i + 1}
                </span>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.65, color: `${t.dark}cc` }}>
                  {tip}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary archetype */}
          {result.secondary && (
            <div
              style={{
                backgroundColor: result.secondary.lightColor,
                borderRadius: "12px",
                padding: "1.5rem 2rem",
                marginBottom: "2.5rem",
              }}
            >
              <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: result.secondary.color, marginBottom: "0.5rem" }}>
                You also show traits of...
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                }}
              >
                {result.secondary.emoji} {result.secondary.name}
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: `${t.dark}b3` }}>
                {result.secondary.tagline}. Your approach blends elements of both styles.
                Read the tips for {result.secondary.name}s too, as you'll likely recognise
                yourself in both.
              </p>
            </div>
          )}

          {/* What this means */}
          <div
            style={{
              borderLeft: `3px solid ${t.primary}`,
              paddingLeft: "1.5rem",
              marginBottom: "2.5rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              What This Means for You
            </h3>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: `${t.dark}b3` }}>
              There's no wrong way to manage EDS or HSD. Each style has genuine strengths and real
              blind spots. The goal isn't to change your approach entirely. It's to recognise where
              your natural pattern serves you well and where a small adjustment could make your daily
              life more sustainable. If you're neurodivergent, the intersection of your brain and your
              body means generic management advice often misses the mark. Working with someone who
              understands both systems can help you build strategies that actually fit.
            </p>
          </div>

          {/* Next resource CTA */}
          <div
            style={{
              background: `linear-gradient(135deg, ${t.primary} 0%, ${t.dark} 100%)`,
              borderRadius: "12px",
              padding: "2.5rem 2rem",
              textAlign: "center",
              color: t.cream,
              marginBottom: "2rem",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                opacity: 0.7,
                marginBottom: "0.5rem",
              }}
            >
              Recommended for you · {result.primary.nextResource.type}
            </p>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              {result.primary.nextResource.title}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.6,
                opacity: 0.85,
                maxWidth: "420px",
                margin: "0 auto 1.5rem",
              }}
            >
              {result.primary.nextResource.description}
            </p>
            {/* Placeholder email form */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                maxWidth: "400px",
                margin: "0 auto",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: "1 1 220px",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "0.95rem",
                  fontFamily: "'DM Sans', sans-serif",
                  minWidth: "200px",
                }}
              />
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  backgroundColor: t.cream,
                  color: t.primary,
                  border: "none",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Send It →
              </button>
            </div>
            <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "0.75rem" }}>
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>

          {/* Soft CTA */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p
              style={{
                fontSize: "1rem",
                color: t.muted,
                marginBottom: "1rem",
                lineHeight: 1.6,
              }}
            >
              Want to explore how OT could help with your specific pattern?
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                backgroundColor: t.primary,
                color: t.cream,
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Talk to Estus Health →
            </a>
          </div>

          {/* Retake */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={restart}
              style={{
                background: "none",
                border: "none",
                color: t.muted,
                fontSize: "0.9rem",
                cursor: "pointer",
                textDecoration: "underline",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Retake the quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
