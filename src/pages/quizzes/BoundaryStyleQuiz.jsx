import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart, HeartHandshake, Eye, Scale, Shield, RefreshCw, Lock, Target, Compass } from "lucide-react";
import QuizResults from "../../components/QuizResults";
import SEO, { breadcrumb } from "../../components/SEO";
import { REFERRAL_FORM } from "../../lib/site";

/* Standalone "What is your boundary style?" quiz. It maps you onto the porous
   to rigid spectrum (with healthy in the middle) from the Boundary Setting
   webinar. Reuses the shared QuizResults + ShareSection pattern, like the other
   Estus quizzes. Australian spelling, no em-dashes, per the site copy rules. */

const ARCHETYPES = {
  porous: {
    key: "porous",
    name: "The Open Door",
    emoji: "\u{1F30A}",
    tagline: "You bend to keep the peace",
    hook: "Saying yes is your reflex. The cost of it tends to arrive later, as resentment and burnout.",
    description: [
      "Your boundaries are the porous kind: flexible, and often too flexible. You say yes to things that do not really protect what you value, you over-explain when a short no would do, and you let limits get crossed again and again. It rarely comes from other people being malicious. People simply get used to treating you a certain way because it has been allowed.",
      "The tell is the after-feeling. You agree in the moment, then quietly stew on it, because the need never got said out loud. Over time that unspoken tab adds up into resentment towards people who were not actually doing anything wrong, and into a slow drain on your energy.",
      "None of this means you are weak or a pushover. A porous style usually sits on top of real warmth, generosity and attunement to others. The work is not to harden up. It is to add a little structure, so your yes means yes and your no is available when you need it.",
    ],
    strengths: [
      { icon: HeartHandshake, label: "Genuinely Generous", description: "You give freely and make people feel welcome, which is a real gift once it is paired with a limit or two" },
      { icon: Eye, label: "Attuned To Others", description: "You read what people around you need with unusual accuracy, often before they say it" },
      { icon: Heart, label: "Warm By Default", description: "Your instinct is connection, not distance, which is exactly the soil healthy boundaries grow in" },
    ],
    tips: [
      { headline: "Buy Yourself Time", body: "Keep one line ready: 'Let me check and get back to you.' That single pause lets you choose on purpose instead of saying yes on reflex." },
      { headline: "Decide In Advance", body: "Work out your limits before the moment, not during it. A preset response ('If asked to stay late, I will say I finish at 5') is far easier to hold than an in-the-moment decision." },
      { headline: "Notice The Resentment", body: "Simmering resentment is data. It usually marks a spot where a boundary was needed and a yes slipped out instead. Track it, and you will find your next boundary." },
      { headline: "State The Need, Not The Apology", body: "Try naming what you need without the string of sorries. 'I keep evenings screen-free, so I will reply tomorrow' needs no apology attached." },
    ],
    shareCaption: "Turns out my boundary style is The Open Door, the porous end of the spectrum. Warm, generous, and a bit too easy to cross. Found out where I land and what to do about it. Take the free quiz: #Boundaries #Neurodivergent #EstusHealth",
    nextResource: {
      title: "Want to build a bit more structure?",
      description: "At Estus Health we help people move from porous towards healthy without losing the warmth. Practical, neuroaffirming, and paced to your nervous system.",
      cta: "Get in touch with our team",
    },
  },
  healthy: {
    key: "healthy",
    name: "The Sturdy Gate",
    emoji: "\u{1F333}",
    tagline: "Firm roots, room to bend",
    hook: "You hold your limits and can still flex when it genuinely matters. That balance is the goal, not the exception.",
    description: [
      "Your boundaries are the healthy kind: you set clear expectations, you protect what you value, and you stay assertive and consistent, but you can still bend when the situation truly calls for it. Think of the parent whose rule is 'chocolate after dinner', who can make an exception on a hard day without the whole rule collapsing.",
      "You tend to decide your boundaries in advance, state them plainly, and restate them without much heat when you get push-back. You also know the difference between a limit worth holding and a preference you can happily trade away, which saves you a lot of unnecessary friction.",
      "This is the direction both a porous and a rigid style are aiming for, so your job is mostly maintenance rather than overhaul. Keep noticing which relationships flourish under your boundaries and which ones only ever pushed against them. That signal is worth paying attention to.",
    ],
    strengths: [
      { icon: Scale, label: "Balanced", description: "You hold firm and stay flexible at the same time, the exact mix that keeps healthy relationships thriving" },
      { icon: Shield, label: "Steady Under Push-back", description: "You can restate a limit calmly without escalating or caving, which is a genuinely advanced skill" },
      { icon: RefreshCw, label: "Adaptable", description: "You can renegotiate a boundary when the situation changes, rather than defending it out of pure principle" },
    ],
    tips: [
      { headline: "Keep Deciding In Advance", body: "Your consistency is your superpower. Keep a few preset responses ready for the situations you can see coming, so you are never caught improvising." },
      { headline: "Watch The Relationships That Strain", body: "Healthy boundaries expose unhealthy dynamics. If someone consistently pushes against reasonable limits, that is information about the relationship, not a reason to drop the limit." },
      { headline: "Protect Your Own Recovery", body: "Firm boundaries around rest and energy are easy to quietly erode when you are capable. Guard the ones that protect your downtime as fiercely as the rest." },
      { headline: "Model It Out Loud", body: "You are a living example for people still learning this. Naming your own boundaries clearly ('I do not take calls after six') teaches more than any explanation." },
    ],
    shareCaption: "My boundary style came out as The Sturdy Gate, the healthy middle of the spectrum: firm, but able to bend when it matters. Curious where you land? Take the free quiz: #Boundaries #Neurodivergent #EstusHealth",
    nextResource: {
      title: "Keep building on solid ground",
      description: "Even healthy boundaries need upkeep. If you want support protecting your energy and relationships as life changes, our team is here.",
      cta: "Get in touch with our team",
    },
  },
  rigid: {
    key: "rigid",
    name: "The High Wall",
    emoji: "\u{1F9F1}",
    tagline: "Protected, but everyone at arm's length",
    hook: "Your no is strong and fast. The question is whether it is keeping the wrong things out along with the right ones.",
    description: [
      "Your boundaries are the rigid kind: strong, fixed, and non-negotiable. That strength is a real asset, and some rigid boundaries are completely healthy to keep. The trouble starts when every boundary is fixed, because saying no to almost everything protects your energy and quietly costs you connection at the same time.",
      "A rigid style often shows up as keeping people at arm's length, declining by default, and treating your limits as rules with no exceptions. Guilt is usually not much of a factor, which makes the boundaries easy to hold but hard to soften when softening would actually serve you.",
      "The growth edge here points towards healthy, from the opposite direction to a porous style. You do not need to tear down the wall. You need to build a gate or two: pick the boundaries where a little flex would cost you almost nothing, and practise negotiating a middle ground instead of a flat no.",
    ],
    strengths: [
      { icon: Lock, label: "Clear Limits", description: "You know exactly where you stand and rarely get talked out of it, which most people find genuinely hard" },
      { icon: Target, label: "Protective", description: "You are excellent at guarding your time, energy and values from things that would drain them" },
      { icon: Compass, label: "Decisive", description: "You decide fast and hold the line, so you waste very little energy agonising over requests" },
    ],
    tips: [
      { headline: "Build A Gate Or Two", body: "Pick one or two boundaries where a little flexibility would cost you almost nothing, and practise a negotiated middle ground instead of an automatic no." },
      { headline: "Separate Safe From Threatening", body: "Not every request is an intrusion. Before the reflex no, ask whether this one is genuinely a threat to what you value, or just unfamiliar." },
      { headline: "Name The Rigid Ones As Rigid", body: "Some of your boundaries are non-negotiable and that is fine. Naming which ones are fixed frees you to be more flexible everywhere else." },
      { headline: "Notice What The Wall Costs", body: "Protecting energy is worth it. Just keep an eye on the connection it costs, so you are choosing the trade rather than defaulting to it." },
    ],
    shareCaption: "My boundary style is The High Wall, the rigid end of the spectrum: strong limits, everyone at arm's length. Learning where a gate might help. Find your style with the free quiz: #Boundaries #Neurodivergent #EstusHealth",
    nextResource: {
      title: "Want to add a little flex?",
      description: "At Estus Health we help people keep their strong boundaries while building room to bend where it serves them. Neuroaffirming, and never about forcing you open.",
      cta: "Get in touch with our team",
    },
  },
};

const ARCHETYPE_MAP = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);

const QUESTIONS = [
  // Section 1: In the moment
  {
    text: "Someone asks you for something you do not really want to do. What usually happens?",
    section: 1,
    options: [
      { text: "I say yes, then quietly resent it later", scores: { porous: 3 } },
      { text: "I say 'let me check and get back to you', then decide", scores: { healthy: 3 } },
      { text: "An instant no, almost before they finish", scores: { rigid: 3 } },
    ],
  },
  {
    text: "A friend suggests weekend plans you are only lukewarm about.",
    section: 1,
    options: [
      { text: "I go along with it and drain myself to keep them happy", scores: { porous: 3 } },
      { text: "I suggest a version that works for both of us", scores: { healthy: 3 } },
      { text: "I decline. I keep my weekends clear", scores: { rigid: 3 } },
    ],
  },
  {
    text: "You need something in a social setting, like a quieter spot or your headphones.",
    section: 1,
    options: [
      { text: "I put up with it silently rather than make a fuss", scores: { porous: 3 } },
      { text: "I ask for the adjustment plainly and move on", scores: { healthy: 3 } },
      { text: "I leave, or I avoid that kind of event altogether", scores: { rigid: 3 } },
    ],
  },
  // Section 2: Holding the line
  {
    text: "You state a need and get push-back ('why do you even need that?'). You tend to...",
    section: 2,
    options: [
      { text: "Back down and apologise for asking", scores: { porous: 3 } },
      { text: "Restate it calmly, and look for a middle ground if there is one", scores: { healthy: 3 } },
      { text: "Shut the conversation down, or walk away", scores: { rigid: 3 } },
    ],
  },
  {
    text: "Someone keeps crossing a limit you have set.",
    section: 2,
    options: [
      { text: "I let it slide again. It feels easier than the conflict", scores: { porous: 3 } },
      { text: "I name it again, calmly and consistently, as many times as it takes", scores: { healthy: 3 } },
      { text: "I cut them off. One warning was enough", scores: { rigid: 3 } },
    ],
  },
  {
    text: "When you decide your boundaries, you tend to...",
    section: 2,
    options: [
      { text: "Work them out in the heat of the moment, often too late", scores: { porous: 3 } },
      { text: "Decide in advance, with a bit of room to adapt", scores: { healthy: 3 } },
      { text: "Decide in advance, as hard rules with no exceptions", scores: { rigid: 3 } },
    ],
  },
  // Section 3: The cost, and the pattern
  {
    text: "When you say no, guilt shows up as...",
    section: 3,
    options: [
      { text: "A wave big enough that I often cave", scores: { porous: 3 } },
      { text: "A twinge that passes once I remember why", scores: { healthy: 3 } },
      { text: "Not really a factor. No is no", scores: { rigid: 3 } },
    ],
  },
  {
    text: "People who know you well would say you...",
    section: 3,
    options: [
      { text: "Are easy to push around, a bit of a yes-person", scores: { porous: 3 } },
      { text: "Are clear and consistent about where you stand", scores: { healthy: 3 } },
      { text: "Keep almost everyone at arm's length", scores: { rigid: 3 } },
    ],
  },
  {
    text: "How often do you say yes to things that drain you?",
    section: 3,
    options: [
      { text: "Often. I struggle to turn things down", scores: { porous: 3 } },
      { text: "Rarely. I know what I am protecting", scores: { healthy: 3 } },
      { text: "Almost never. I decline most things by default", scores: { rigid: 3 } },
    ],
  },
];

const SECTION_TITLES = {
  1: "In The Moment",
  2: "Holding The Line",
  3: "The Cost, And The Pattern",
};

const QUIZ_NAME = "Boundary Style Quiz";
const QUIZ_SLUG = "boundary-style-quiz";
const START_SCORES = { porous: 0, healthy: 0, rigid: 0 };

export default function BoundaryStyleQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screen, setScreen] = useState("landing");
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ ...START_SCORES });
  const [result, setResult] = useState(null);
  const [secondaryResult, setSecondaryResult] = useState(null);
  const [fadeState, setFadeState] = useState("in");
  const [autoAdvancePending, setAutoAdvancePending] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);

  const totalSections = 3;

  // Deep-link: detect ?result= param on mount
  useEffect(() => {
    const resultParam = searchParams.get("result");
    if (resultParam && ARCHETYPES[resultParam]) {
      setResult(resultParam);
      setIsSharedView(true);
      const placeholderScores = {};
      Object.keys(ARCHETYPES).forEach((k) => {
        placeholderScores[k] = k === resultParam ? 21 : Math.floor(Math.random() * 9) + 3;
      });
      setScores(placeholderScores);
      setScreen("results");
    }
  }, []);

  const transition = (callback) => {
    setFadeState("out");
    setTimeout(() => {
      callback();
      setFadeState("in");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 350);
  };

  const handleAnswer = (questionIndex, optionIndex) => {
    const wasUnanswered = answers[questionIndex] === undefined;
    const newAnswers = { ...answers, [questionIndex]: optionIndex };
    setAnswers(newAnswers);

    if (wasUnanswered) {
      const sectionQs = QUESTIONS.filter((q) => q.section === currentSection);
      const nowComplete = sectionQs.every(
        (_, i) => newAnswers[QUESTIONS.indexOf(sectionQs[i])] !== undefined
      );
      if (nowComplete) setAutoAdvancePending(true);
    }
  };

  // Auto-advance after 250ms when the current section becomes complete.
  useEffect(() => {
    if (!autoAdvancePending) return;
    const timer = setTimeout(() => {
      setAutoAdvancePending(false);
      if (currentSection < totalSections) {
        transition(() => setCurrentSection((s) => s + 1));
      } else {
        const finalScores = { ...START_SCORES };
        Object.entries(answers).forEach(([qIdx, optIdx]) => {
          const option = QUESTIONS[parseInt(qIdx)].options[optIdx];
          Object.entries(option.scores).forEach(([arch, pts]) => {
            finalScores[arch] += pts;
          });
        });
        setScores(finalScores);
        const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
        const primary = sorted[0];
        const secondary = sorted[1];
        setResult(primary[0]);
        if (primary[1] > 0 && secondary[1] / primary[1] >= 0.85) {
          setSecondaryResult(secondary[0]);
        }
        transition(() => setScreen("results"));
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [autoAdvancePending]);

  const handleRestart = () => {
    transition(() => {
      setScreen("landing");
      setCurrentSection(1);
      setAnswers({});
      setScores({ ...START_SCORES });
      setResult(null);
      setSecondaryResult(null);
      setIsSharedView(false);
      setSearchParams({});
    });
  };

  const handleTakeQuiz = () => {
    setIsSharedView(false);
    setSearchParams({});
    setScreen("landing");
    setResult(null);
    setSecondaryResult(null);
    setAnswers({});
    setScores({ ...START_SCORES });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sectionQuestions = QUESTIONS.filter((q) => q.section === currentSection);
  const archetype = result ? ARCHETYPES[result] : null;
  const secondaryArchetype = secondaryResult ? ARCHETYPES[secondaryResult] : null;

  return (
    <>
      <SEO
        title="Boundary Style Quiz | Estus Health"
        description="Are your boundaries porous, healthy or rigid? Answer nine quick questions to find your boundary-setting style and get practical, neuroaffirming next steps."
        path="/resources/boundary-style-quiz" schema={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Free Resources', path: '/resources' }, { name: 'Boundary Style Quiz', path: '/resources/boundary-style-quiz' }])}
      />
      {screen !== "results" && (
        <>
          <style>{`
            .quiz-container {
              --q-primary: var(--teal);
              --q-primary-light: rgba(28,232,240,.10);
              --q-dark: var(--heading);
              --q-cream-light: var(--surface-2);
              --q-accent: var(--mauve);
              --q-accent-light: rgba(255,46,154,.14);
              --q-text: var(--text);
              --q-text-muted: var(--text-soft);
              --q-bg: var(--surface);
              --q-bg-light: var(--surface-2);
              --q-border: var(--line);
              font-family: var(--f-body);
              color: var(--q-text);
              max-width: 760px;
              margin: 0 auto;
              padding: 1.5rem;
              min-height: 100vh;
              background: transparent;
            }
            .quiz-container .fade-in { opacity: 1; transform: translateY(0); transition: opacity 0.4s ease, transform 0.4s ease; }
            .quiz-container .fade-out { opacity: 0; transform: translateY(12px); transition: opacity 0.3s ease, transform 0.3s ease; }
            .quiz-container h1, .quiz-container h2, .quiz-container h3 { font-family: var(--f-head); color: var(--q-dark); }
            .quiz-container .landing-hero { text-align: center; padding: 4rem 1rem 3rem; }
            .quiz-container .landing-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; line-height: 1.15; margin-bottom: 1rem; text-transform: uppercase; }
            .quiz-container .landing-hero .subtitle { font-size: 1.15rem; color: var(--q-text-muted); max-width: 520px; margin: 0 auto 2rem; line-height: 1.6; }
            .quiz-container .landing-hero .time-badge { display: inline-block; background: var(--q-cream-light); border: 1px solid var(--q-border); padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.85rem; color: var(--q-text-muted); margin-bottom: 2.5rem; }
            .quiz-container .landing-notes { max-width: 480px; margin: 0 auto 2.5rem; text-align: left; background: var(--q-cream-light); border-radius: 12px; padding: 1.5rem 2rem; font-size: 0.92rem; color: var(--q-text-muted); line-height: 1.65; }
            .quiz-container .btn-primary { display: inline-block; background: var(--q-primary); color: var(--btn-text); border: 3px solid var(--line); padding: 1rem 2.5rem; border-radius: 999px; font-family: var(--f-display); text-transform: uppercase; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; }
            .quiz-container .btn-primary:hover { background: var(--q-dark); transform: translateY(-1px); }
            .quiz-container .btn-secondary { display: inline-block; background: transparent; color: var(--q-primary); border: 3px solid var(--line); padding: 0.85rem 2rem; border-radius: 999px; font-family: var(--f-display); text-transform: uppercase; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
            .quiz-container .btn-secondary:hover { background: var(--q-primary-light); }
            .quiz-container .progress-bar { display: flex; gap: 0.5rem; margin-bottom: 2.5rem; padding: 0 0.5rem; }
            .quiz-container .progress-segment { flex: 1; height: 4px; border-radius: 4px; background: var(--q-border); transition: background 0.3s ease; }
            .quiz-container .progress-segment.active { background: var(--q-primary); }
            .quiz-container .progress-segment.completed { background: var(--q-accent); }
            .quiz-container .section-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--q-text-muted); margin-bottom: 0.5rem; }
            .quiz-container .section-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 2rem; }
            .quiz-container .question-card { background: var(--q-bg); border-radius: 12px; padding: 1.75rem 2rem; margin-bottom: 1.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); border-left: 4px solid var(--q-accent); }
            .quiz-container .question-text { font-size: 1.05rem; font-weight: 500; line-height: 1.55; margin-bottom: 1rem; }
            .quiz-container .option-btn { display: block; width: 100%; text-align: left; padding: 0.9rem 1.25rem; margin: 0.45rem 0; border: 2px solid var(--q-border); border-radius: 8px; background: var(--q-bg-light); cursor: pointer; font-family: var(--f-body); font-size: 0.95rem; line-height: 1.5; color: var(--q-text); transition: all 0.2s ease; }
            .quiz-container .option-btn:hover { border-color: var(--q-accent); background: var(--q-accent-light); transform: translateX(3px); }
            .quiz-container .option-btn.selected { border-color: var(--q-primary); background: var(--q-primary-light); font-weight: 500; }
            .quiz-container .nav-row { display: flex; justify-content: flex-start; margin-top: 1.5rem; gap: 1rem; }
            @media (max-width: 600px) {
              .quiz-container { padding: 1rem; }
              .quiz-container .landing-hero { padding: 2.5rem 0.5rem 2rem; }
              .quiz-container .question-card { padding: 1.25rem 1rem; }
              .quiz-container .landing-notes { padding: 1.25rem 1.5rem; }
            }
          `}</style>
          <div className="quiz-container">
            {screen === "landing" && (
              <div className={`fade-${fadeState}`}>
                <div className="landing-hero">
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{"\u{1F6AA}"}</div>
                  <h1>What Is Your Boundary&nbsp;Style?</h1>
                  <p className="subtitle">
                    Every boundary sits on a spectrum from porous to rigid, with
                    healthy in the middle. Find out where you tend to land, and
                    which way your growth edge points.
                  </p>
                  <div className="time-badge">{"\u{1F550}"} Takes ~3 minutes {"·"} 9 questions</div>
                  <br />
                  <div className="landing-notes">
                    <strong style={{ color: "var(--q-dark)" }}>A note before you start:</strong> This is a reflection exercise, not a diagnostic tool. Almost everyone shows a mix, and your style can shift by domain and by who you are with. There is no right or wrong result, and every style has real strengths.
                  </div>
                  <button className="btn-primary" onClick={() => transition(() => setScreen("quiz"))}>
                    Find Your Style
                  </button>
                </div>
              </div>
            )}

            {screen === "quiz" && (
              <div className={`fade-${fadeState}`}>
                <div className="progress-bar">
                  {Array.from({ length: totalSections }, (_, i) => (
                    <div
                      key={i}
                      className={`progress-segment ${
                        i + 1 === currentSection ? "active" : i + 1 < currentSection ? "completed" : ""
                      }`}
                    />
                  ))}
                </div>
                <div className="section-label">
                  Section {currentSection} of {totalSections}
                </div>
                <h2 className="section-title">{SECTION_TITLES[currentSection]}</h2>
                {sectionQuestions.map((q) => {
                  const globalIndex = QUESTIONS.indexOf(q);
                  return (
                    <div className="question-card" key={globalIndex}>
                      <div className="question-text">{q.text}</div>
                      {q.options.map((opt, oi) => (
                        <button
                          key={oi}
                          className={`option-btn ${answers[globalIndex] === oi ? "selected" : ""}`}
                          onClick={() => handleAnswer(globalIndex, oi)}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  );
                })}
                <div className="nav-row">
                  {currentSection > 1 && (
                    <button
                      className="btn-secondary"
                      onClick={() => transition(() => setCurrentSection(currentSection - 1))}
                    >
                      {"←"} Back
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {screen === "results" && archetype && (
        <QuizResults
          quizName={QUIZ_NAME}
          quizSlug={QUIZ_SLUG}
          archetype={archetype}
          secondaryArchetype={secondaryArchetype}
          scores={scores}
          archetypeMap={ARCHETYPE_MAP}
          totalQuestions={QUESTIONS.length}
          referralURL={REFERRAL_FORM}
          onRestart={handleRestart}
          isSharedView={isSharedView}
          onTakeQuiz={handleTakeQuiz}
        />
      )}
    </>
  );
}
