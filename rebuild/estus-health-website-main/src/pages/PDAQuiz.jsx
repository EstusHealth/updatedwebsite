import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Shield, Compass, Eye, Brain, Heart, Lightbulb, RefreshCw, Lock, HeartHandshake, Scale, Zap, Target } from "lucide-react";
import QuizResults from "../components/QuizResults";

const ARCHETYPES = {
  negotiator: {
    key: "negotiator",
    name: "The Negotiator",
    emoji: "\u{1F91D}",
    tagline: "Autonomy is your operating system",
    hook: "Your need for choice isn't defiance. It's the way your nervous system stays regulated and engaged.",
    description: [
      "Your brain is wired to need a sense of choice and control in everything you do. It's not that you're being difficult. Your nervous system genuinely functions better when you feel like a co-author of your life rather than following someone else's script. When demands are framed as options or invitations, something clicks and you can move forward with energy and purpose.",
      "You likely have a strong internal compass and clear preferences about how things should be done. You may find yourself instinctively rephrasing instructions in your own words before acting on them, not to be defiant, but because your brain needs to 'own' the task before it can engage. This is actually a sophisticated self-regulation strategy.",
      "In relationships and work, you thrive when others collaborate with you rather than direct you. You're often incredibly capable and motivated, but only when the path forward feels genuinely chosen rather than imposed."
    ],
    strengths: [
      { icon: HeartHandshake, label: "Collaborative Drive", description: "You naturally turn top-down instructions into shared agreements that everyone can commit to" },
      { icon: Compass, label: "Strong Internal Compass", description: "You have a clear sense of direction and know what feels right for you, even under pressure" },
      { icon: Scale, label: "Fairness Radar", description: "You detect power imbalances and consent issues that others overlook entirely" },
    ],
    tips: [
      { headline: "Reframe Tasks as Choices", body: "Try 'I'm choosing to do this because...' even for non-negotiable tasks. Small reframes can reduce the demand load on your nervous system significantly." },
      { headline: "Build Negotiation Rituals", body: "Give yourself permission to adjust how and when tasks happen, even if the task itself is fixed. Owning the process makes the outcome feel chosen." },
      { headline: "Communicate Your Needs Directly", body: "'I work best when I have options' is a powerful self-advocacy statement, not an excuse. Naming what you need helps others collaborate with you." },
      { headline: "Watch for Invisible Demands", body: "Even self-imposed expectations can trigger demand sensitivity. Be gentle with your own to-do lists and notice when your inner critic starts issuing orders." },
    ],
    insight: "Here's something most people don't realise: your need for autonomy isn't a character flaw. It's actually linked to a heightened awareness of social dynamics and power imbalances. Your brain is constantly monitoring fairness and consent, which is an incredibly valuable trait.",
    shareCaption: "Just discovered I'm The Negotiator on the PDA Profile Quiz. Turns out my need for autonomy isn't defiance, it's how my nervous system stays regulated. Take the free quiz: #PDAProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Negotiator's guide to autonomy-friendly strategies",
      description: "Practical frameworks for turning external demands into choices your nervous system can work with.",
    },
    nextResource: {
      title: "Ready to explore what this means for you?",
      description: "Our team at Estus Health specialises in working with brains like yours. We use neuro-affirming, strengths-based approaches that honour your need for autonomy while helping you build sustainable strategies.",
      cta: "Get in touch with our team",
    },
  },
  avoider: {
    key: "avoider",
    name: "The Avoider",
    emoji: "\u{1F6E1}\uFE0F",
    tagline: "Your nervous system has a powerful protection system",
    hook: "When your brain hits the brakes, it's not laziness. It's a threat response doing exactly what it was designed to do.",
    description: [
      "Your brain has a deeply embedded protective response to perceived demands. When something feels like an expectation, even a simple, reasonable one, your nervous system can hit the brakes hard. This isn't laziness or defiance. It's your brain's threat detection system misfiring on everyday tasks, treating demands like dangers.",
      "You might notice that the harder you try to push through, the more stuck you feel. That's because demand avoidance operates below conscious control. It's a nervous system response, not a mindset problem. Tasks you genuinely want to do can become impossible the moment they feel like obligations. Even enjoyable activities can lose their appeal once they carry an expectation.",
      "The good news? Understanding this pattern is the first step to working with your brain instead of against it. Your avoidance isn't random. It has a logic, and once you understand that logic, you can start designing your environment to reduce demand load."
    ],
    strengths: [
      { icon: Shield, label: "Built-In Protection", description: "Your nervous system has a powerful circuit breaker that prevents you from overloading under pressure" },
      { icon: Brain, label: "Demand Sensitivity", description: "You process more demand signals than most people, which means you pick up on things others miss" },
      { icon: Lightbulb, label: "Creative Problem-Solving", description: "You instinctively find alternative routes when the direct path feels blocked" },
    ],
    tips: [
      { headline: "Drop the Pressure First", body: "When you feel paralysed, the goal isn't to 'push through.' It's to reduce the perceived demand until your nervous system relaxes enough to engage." },
      { headline: "Try the Novelty Hack", body: "Approaching a task in a completely new way (different location, different time, different order) can bypass the demand response because it feels like a fresh choice." },
      { headline: "Build Recovery Into Your Day", body: "Demand avoidance often intensifies when you're depleted. Rest isn't a reward for productivity. It's a prerequisite for being able to engage at all." },
      { headline: "Use Demand Disguises", body: "Timers, games, music, body-doubling, or pairing tasks with something enjoyable can lower the demand signature of necessary tasks." },
    ],
    insight: "Here's something counterintuitive: the strength of your avoidance response is often proportional to your sensitivity and intelligence. Your brain is processing more demand signals than most people's, which is exhausting, but also means you're picking up on things others miss.",
    shareCaption: "Just discovered I'm The Avoider on the PDA Profile Quiz. My brain's protective response to demands isn't laziness, it's a nervous system doing its job. Take the free quiz: #PDAProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Avoider's guide to working with your protective brain",
      description: "Strategies for reducing demand load so your nervous system can relax enough to engage on your own terms.",
    },
    nextResource: {
      title: "You don't have to figure this out alone",
      description: "At Estus Health, we work with demand-sensitive brains every day. Our OTs use strategies built around your nervous system, not against it. No 'just do it' advice, we promise.",
      cta: "Get in touch with our team",
    },
  },
  masker: {
    key: "masker",
    name: "The Masker",
    emoji: "\u{1F3AD}",
    tagline: "You perform compliance, at a cost",
    hook: "The world sees someone who's coping brilliantly. You know the truth costs more than anyone realises.",
    description: [
      "From the outside, you might look like you're coping brilliantly. You meet deadlines, follow instructions, show up when expected. But inside, the effort of overriding your demand-sensitive nervous system is enormous. You've learned to mask your discomfort so well that others, and sometimes even you, don't realise how much energy it costs.",
      "Masking demand sensitivity often means you experience the crash later: after work, after school, after social events. You might find yourself shutting down, withdrawing, or having intense emotional reactions in safe spaces (usually home) that seem disproportionate to what triggered them. This isn't overreacting. It's the accumulated cost of sustained compliance.",
      "Your ability to mask is actually a remarkable skill. It shows adaptability, social awareness, and resilience. But it's not sustainable long-term without support. The goal isn't to stop masking entirely (sometimes it's genuinely useful), but to reduce how often you need to do it and build in proper recovery."
    ],
    strengths: [
      { icon: RefreshCw, label: "Adaptive Performance", description: "You can maintain function under pressure that would visibly overwhelm others" },
      { icon: Eye, label: "Social Calibration", description: "You read social expectations with remarkable accuracy and respond accordingly" },
      { icon: Heart, label: "Deep Self-Knowledge", description: "You understand the gap between appearance and reality better than most people ever will" },
    ],
    tips: [
      { headline: "Track the Compliance Cost", body: "Notice when you're performing okayness rather than feeling it. The gap between your public appearance and your internal experience is the true measure of your demand load." },
      { headline: "Build Decompression Zones", body: "Schedule dedicated time after high-demand situations where nothing is expected of you. This isn't optional. It's essential maintenance for a demand-sensitive nervous system." },
      { headline: "Start Small With Unmasking", body: "Practice saying 'I need a moment' or 'that's harder for me than it looks' with safe people. Letting others see the real cost reduces isolation." },
      { headline: "Watch for Burnout Signals", body: "Increased irritability, physical tension, sleep disruption, and loss of interest in usually enjoyable activities are all signs your masking budget is overdrawn." },
    ],
    insight: "Research increasingly shows that masking PDA traits correlates with higher rates of burnout and mental health challenges, not because of the PDA itself, but because of the sustained effort of hiding it. Giving yourself permission to drop the mask, even partially, is genuinely therapeutic.",
    shareCaption: "Just discovered I'm The Masker on the PDA Profile Quiz. Apparently performing compliance while collapsing in private has a name, and strategies that help. Take the free quiz: #PDAProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Masker's guide to sustainable unmasking",
      description: "How to start closing the gap between your public performance and your private reality, safely and at your own pace.",
    },
    nextResource: {
      title: "Let's build a more sustainable approach",
      description: "Our team at Estus Health understands the hidden cost of masking. We help you develop strategies that reduce demand load so you don't have to perform your way through every day.",
      cta: "Get in touch with our team",
    },
  },
  adapter: {
    key: "adapter",
    name: "The Adapter",
    emoji: "\u{1F504}",
    tagline: "Context is everything for your brain",
    hook: "Your capacity isn't inconsistent. It's responsive to conditions that most people never even notice.",
    description: [
      "Your demand sensitivity isn't constant. It shifts significantly depending on the context, the person, the environment, and your internal state. Some days you can handle a packed schedule with ease; other days, being asked to make a simple decision feels overwhelming. This variability isn't inconsistency. It's your nervous system reading environmental cues and adjusting its tolerance in real time.",
      "You've likely noticed that who asks matters as much as what they ask. A request from someone you trust might feel collaborative, while the exact same request from someone else triggers resistance. Similarly, demands in environments where you feel safe land differently than those in unfamiliar or stressful settings. Your brain is doing sophisticated social and environmental processing.",
      "The adaptive pattern can be confusing, both for you and for others. People may wonder why you 'can' do something in one context but 'can't' in another. But this variability is actually a clue to what your nervous system needs: safety, trust, predictability, and the right conditions to engage."
    ],
    strengths: [
      { icon: Target, label: "Environmental Attunement", description: "You read the subtle cues in your surroundings that determine whether engagement feels safe or threatening" },
      { icon: Zap, label: "Responsive Flexibility", description: "You adapt your approach in real time based on who you're with and what the situation requires" },
      { icon: Compass, label: "Contextual Intelligence", description: "You understand that capacity is situational, giving you insight into what conditions bring out your best" },
    ],
    tips: [
      { headline: "Map Your Demand Tolerance", body: "Track which contexts, people, and internal states make demands easier or harder. You'll start seeing patterns that help you plan your energy strategically." },
      { headline: "Create Anchor Environments", body: "Identify spaces and routines where your demand tolerance is reliably higher. Use these for your most important tasks whenever possible." },
      { headline: "Communicate Your Variability", body: "'My capacity changes depending on context' helps others understand you're not being inconsistent. You're being responsive to conditions they may not see." },
      { headline: "Lean Into Supports on Hard Days", body: "On low-tolerance days, lean hard into environmental supports: familiar spaces, trusted people, reduced novelty, and maximum predictability." },
    ],
    insight: "Your context-dependent demand sensitivity is actually a sign of a highly attuned nervous system. You're not unreliable. You're responsive. The key is learning which contextual levers to pull so you can set yourself up for success more consistently.",
    shareCaption: "Just discovered I'm The Adapter on the PDA Profile Quiz. My demand tolerance shifts with context, and that's not inconsistency, it's a finely tuned nervous system. Take the free quiz: #PDAProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Adapter's guide to context-driven strategies",
      description: "How to map your demand tolerance landscape and design environments where your nervous system can thrive.",
    },
    nextResource: {
      title: "Let's decode your patterns together",
      description: "At Estus Health, we help you map your demand tolerance landscape and build personalised strategies for your unique context-dependent profile. No cookie-cutter approaches.",
      cta: "Get in touch with our team",
    },
  },
};

const ARCHETYPE_MAP = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);

const QUESTIONS = [
  // Section 1: Responding to Demands (3 questions)
  {
    text: "Someone asks you to do something straightforward, like putting out the bins or replying to an email. What's your most common internal reaction?",
    section: 1,
    options: [
      { text: "I'll do it, but I need to decide when and how, on my terms", scores: { negotiator: 3 } },
      { text: "An immediate wave of 'I can't', even though I know it's simple", scores: { avoider: 3 } },
      { text: "I do it straight away, but feel drained or resentful afterwards", scores: { masker: 3 } },
      { text: "It depends entirely on who's asking and how I'm feeling that day", scores: { adapter: 3 } },
    ],
  },
  {
    text: "When you have a list of tasks to get through, what typically happens?",
    section: 1,
    options: [
      { text: "I rewrite the list in my own order and do it my way", scores: { negotiator: 3 } },
      { text: "I look at the list and feel paralysed, even if the tasks are easy", scores: { avoider: 3 } },
      { text: "I power through everything, then collapse once it's done", scores: { masker: 3 } },
      { text: "Some items feel fine, others feel impossible. It's unpredictable", scores: { adapter: 3 } },
    ],
  },
  {
    text: "A friend suggests plans for the weekend. How do you typically respond?",
    section: 1,
    options: [
      { text: "I'm keen, as long as I have some say in what we actually do", scores: { negotiator: 3 } },
      { text: "Even fun plans can feel like pressure once they're 'locked in'", scores: { avoider: 3 } },
      { text: "I say yes, show up, enjoy it, but need to recover alone afterwards", scores: { masker: 3 } },
      { text: "Some weeks I'm all in, other weeks the same plan feels unbearable", scores: { adapter: 3 } },
    ],
  },
  // Section 2: Internal Experience (3 questions)
  {
    text: "Think about a task you genuinely enjoy, like a hobby or creative project. What happens when it starts to feel like an obligation?",
    section: 2,
    options: [
      { text: "I can still do it if I tweak it or approach it differently", scores: { negotiator: 3 } },
      { text: "I lose all interest. The enjoyment evaporates completely", scores: { avoider: 3 } },
      { text: "I keep doing it but it stops being fun and starts being work", scores: { masker: 3 } },
      { text: "Sometimes it's fine, sometimes the obligation feeling ruins it", scores: { adapter: 3 } },
    ],
  },
  {
    text: "How would you describe the demands you place on yourself (self-imposed goals, routines, expectations)?",
    section: 2,
    options: [
      { text: "I set my own goals but need flexibility in how I achieve them", scores: { negotiator: 3 } },
      { text: "Even my own expectations can feel like demands I want to avoid", scores: { avoider: 3 } },
      { text: "I hold myself to high standards and rarely let myself off the hook", scores: { masker: 3 } },
      { text: "My self-expectations fluctuate. Strict some days, non-existent others", scores: { adapter: 3 } },
    ],
  },
  {
    text: "After a day full of demands (work, appointments, social obligations), what's your usual state?",
    section: 2,
    options: [
      { text: "Tired, but okay, especially if I had some control over my schedule", scores: { negotiator: 3 } },
      { text: "Completely shut down. I need to withdraw and do absolutely nothing", scores: { avoider: 3 } },
      { text: "I seem fine to others, but at home I fall apart or become irritable", scores: { masker: 3 } },
      { text: "It really depends on the type of demands. Some drain me, others don't", scores: { adapter: 3 } },
    ],
  },
  // Section 3: Patterns & Relationships (3 questions)
  {
    text: "When someone gives you unsolicited advice or tells you the 'right' way to do something, how do you respond?",
    section: 3,
    options: [
      { text: "I listen, but I'll adapt their advice to fit my own approach", scores: { negotiator: 3 } },
      { text: "I feel a strong urge to do the opposite, even if their advice is good", scores: { avoider: 3 } },
      { text: "I nod and agree in the moment, even if inside I'm resisting", scores: { masker: 3 } },
      { text: "Sometimes I welcome it, sometimes it triggers instant resistance", scores: { adapter: 3 } },
    ],
  },
  {
    text: "How consistent is your ability to handle demands across different areas of life?",
    section: 3,
    options: [
      { text: "Pretty consistent. I can manage most things if I have autonomy", scores: { negotiator: 3 } },
      { text: "I find most demands difficult regardless of the area", scores: { avoider: 3 } },
      { text: "I manage well publicly but struggle privately. People would be surprised", scores: { masker: 3 } },
      { text: "Wildly inconsistent. I never know which version of me will show up", scores: { adapter: 3 } },
    ],
  },
  {
    text: "Which statement resonates most with how people in your life perceive you?",
    section: 3,
    options: [
      { text: "\"They always have their own way of doing things\"", scores: { negotiator: 3 } },
      { text: "\"They seem to shut down or avoid things for no clear reason\"", scores: { avoider: 3 } },
      { text: "\"They seem so capable. I had no idea they were struggling\"", scores: { masker: 3 } },
      { text: "\"They're so different depending on the day or situation\"", scores: { adapter: 3 } },
    ],
  },
  // Section 4: Coping & Support (3 questions)
  {
    text: "What strategy works best for you when you're facing a demand you're resisting?",
    section: 4,
    options: [
      { text: "Finding a way to make it feel like my own idea or choice", scores: { negotiator: 3 } },
      { text: "Removing all pressure and waiting until my nervous system is ready", scores: { avoider: 3 } },
      { text: "Just pushing through and dealing with the fallout later", scores: { masker: 3 } },
      { text: "Changing the context. Different time, place, or person helping", scores: { adapter: 3 } },
    ],
  },
  {
    text: "When you think about getting support for demand sensitivity, what feels most important?",
    section: 4,
    options: [
      { text: "Being treated as a partner, not a patient. Working together on my terms", scores: { negotiator: 3 } },
      { text: "Someone who understands that 'I can't' is different from 'I won't'", scores: { avoider: 3 } },
      { text: "Help seeing the cost of my coping before I burn out completely", scores: { masker: 3 } },
      { text: "Strategies that work across my different contexts and states", scores: { adapter: 3 } },
    ],
  },
  {
    text: "If you could change one thing about how people respond to your demand sensitivity, what would it be?",
    section: 4,
    options: [
      { text: "Stop telling me what to do. Ask me how I'd like to approach it", scores: { negotiator: 3 } },
      { text: "Stop assuming I'm choosing not to do things. It's not that simple", scores: { avoider: 3 } },
      { text: "Notice that I'm struggling even when I look like I'm coping", scores: { masker: 3 } },
      { text: "Accept that my capacity genuinely changes. I'm not being inconsistent on purpose", scores: { adapter: 3 } },
    ],
  },
];

const SECTION_TITLES = {
  1: "How You Respond to Demands",
  2: "Your Internal Experience",
  3: "Patterns & Relationships",
  4: "Coping & Support",
};

const REFERRAL_URL = "https://estushealth.com.au/referral";
const QUIZ_NAME = "PDA Profile Quiz";
const QUIZ_SLUG = "pda-quiz";

export default function PDAQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screen, setScreen] = useState("landing");
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ negotiator: 0, avoider: 0, masker: 0, adapter: 0 });
  const [result, setResult] = useState(null);
  const [secondaryResult, setSecondaryResult] = useState(null);
  const [fadeState, setFadeState] = useState("in");
  const [autoAdvancePending, setAutoAdvancePending] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);

  const totalSections = 4;

  // Deep-link: detect ?result= param on mount
  useEffect(() => {
    const resultParam = searchParams.get("result");
    if (resultParam && ARCHETYPES[resultParam]) {
      setResult(resultParam);
      setIsSharedView(true);
      // Build placeholder scores for display
      const placeholderScores = {};
      Object.keys(ARCHETYPES).forEach((k) => {
        placeholderScores[k] = k === resultParam ? 27 : Math.floor(Math.random() * 15) + 5;
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
      if (nowComplete) {
        setAutoAdvancePending(true);
      }
    }
  };

  // Auto-advance after 250ms when section becomes complete
  useEffect(() => {
    if (!autoAdvancePending) return;
    const timer = setTimeout(() => {
      setAutoAdvancePending(false);
      if (currentSection < totalSections) {
        transition(() => setCurrentSection((s) => s + 1));
      } else {
        // Calculate result with current answers
        const finalScores = { negotiator: 0, avoider: 0, masker: 0, adapter: 0 };
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
      setScores({ negotiator: 0, avoider: 0, masker: 0, adapter: 0 });
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
    setScores({ negotiator: 0, avoider: 0, masker: 0, adapter: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sectionQuestions = QUESTIONS.filter((q) => q.section === currentSection);

  const archetype = result ? ARCHETYPES[result] : null;
  const secondaryArchetype = secondaryResult ? ARCHETYPES[secondaryResult] : null;

  return (
    <>
      {screen !== "results" && (
        <>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');
            .quiz-container {
              --q-primary: #76543E;
              --q-primary-light: rgba(118, 84, 62, 0.08);
              --q-dark: #2E2519;
              --q-cream: #E5DCCC;
              --q-cream-light: #F5F0E8;
              --q-accent: #BFA88E;
              --q-accent-light: rgba(191, 168, 142, 0.15);
              --q-text: #2E2519;
              --q-text-muted: #8B7355;
              --q-bg: #FFFFFF;
              --q-bg-light: #F5F0E8;
              --q-border: #E5DCCC;
              font-family: 'DM Sans', -apple-system, sans-serif;
              color: var(--q-text);
              max-width: 760px;
              margin: 0 auto;
              padding: 1.5rem;
              min-height: 100vh;
              background: var(--q-bg);
            }
            .quiz-container .fade-in { opacity: 1; transform: translateY(0); transition: opacity 0.4s ease, transform 0.4s ease; }
            .quiz-container .fade-out { opacity: 0; transform: translateY(12px); transition: opacity 0.3s ease, transform 0.3s ease; }
            .quiz-container h1, .quiz-container h2, .quiz-container h3 { font-family: 'Playfair Display', Georgia, serif; color: var(--q-dark); }
            .quiz-container .landing-hero { text-align: center; padding: 4rem 1rem 3rem; }
            .quiz-container .landing-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; line-height: 1.15; margin-bottom: 1rem; }
            .quiz-container .landing-hero .subtitle { font-size: 1.15rem; color: var(--q-text-muted); max-width: 520px; margin: 0 auto 2rem; line-height: 1.6; }
            .quiz-container .landing-hero .time-badge { display: inline-block; background: var(--q-cream-light); border: 1px solid var(--q-border); padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.85rem; color: var(--q-text-muted); margin-bottom: 2.5rem; }
            .quiz-container .landing-notes { max-width: 480px; margin: 0 auto 2.5rem; text-align: left; background: var(--q-cream-light); border-radius: 12px; padding: 1.5rem 2rem; font-size: 0.92rem; color: var(--q-text-muted); line-height: 1.65; }
            .quiz-container .btn-primary { display: inline-block; background: var(--q-primary); color: #fff; border: none; padding: 1rem 2.5rem; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; }
            .quiz-container .btn-primary:hover { background: var(--q-dark); transform: translateY(-1px); }
            .quiz-container .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
            .quiz-container .btn-primary:focus-visible { outline: 2px solid var(--q-primary); outline-offset: 2px; }
            .quiz-container .btn-secondary { display: inline-block; background: transparent; color: var(--q-primary); border: 2px solid var(--q-primary); padding: 0.85rem 2rem; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
            .quiz-container .btn-secondary:hover { background: var(--q-primary-light); }
            .quiz-container .btn-secondary:focus-visible { outline: 2px solid var(--q-primary); outline-offset: 2px; }
            .quiz-container .progress-bar { display: flex; gap: 0.5rem; margin-bottom: 2.5rem; padding: 0 0.5rem; }
            .quiz-container .progress-segment { flex: 1; height: 4px; border-radius: 4px; background: var(--q-border); transition: background 0.3s ease; }
            .quiz-container .progress-segment.active { background: var(--q-primary); }
            .quiz-container .progress-segment.completed { background: var(--q-accent); }
            .quiz-container .section-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--q-text-muted); margin-bottom: 0.5rem; }
            .quiz-container .section-title { font-size: 1.6rem; font-weight: 700; margin-bottom: 2rem; }
            .quiz-container .question-card { background: var(--q-bg); border-radius: 12px; padding: 1.75rem 2rem; margin-bottom: 1.75rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); border-left: 4px solid var(--q-accent); }
            .quiz-container .question-text { font-size: 1.05rem; font-weight: 500; line-height: 1.55; margin-bottom: 1rem; }
            .quiz-container .option-btn { display: block; width: 100%; text-align: left; padding: 0.9rem 1.25rem; margin: 0.45rem 0; border: 2px solid var(--q-border); border-radius: 8px; background: var(--q-bg-light); cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 0.95rem; line-height: 1.5; color: var(--q-text); transition: all 0.2s ease; }
            .quiz-container .option-btn:hover { border-color: var(--q-accent); background: var(--q-accent-light); transform: translateX(3px); }
            .quiz-container .option-btn:focus-visible { outline: 2px solid var(--q-primary); outline-offset: 2px; }
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
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{"\u{1F9E0}"}</div>
                  <h1>How Does Your Brain Respond&nbsp;to&nbsp;Demands?</h1>
                  <p className="subtitle">
                    Discover your PDA profile, and learn practical strategies that work
                    with your nervous system, not against it.
                  </p>
                  <div className="time-badge">{"\u{1F550}"} Takes ~3 minutes {"\u00B7"} 12 questions</div>
                  <br />
                  <div className="landing-notes">
                    <strong style={{ color: "var(--q-dark)" }}>A note before you start:</strong> This quiz isn't a diagnostic tool. It's a reflection exercise to help you understand your relationship with demands. There's no right or wrong result, and every profile has genuine strengths. PDA (Pathological Demand Avoidance, also called Persistent Drive for Autonomy) exists on a spectrum, and most people show traits of more than one profile.
                  </div>
                  <button className="btn-primary" onClick={() => transition(() => setScreen("quiz"))}>
                    Discover Your Profile
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
                {sectionQuestions.map((q, i) => {
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
                      {"\u2190"} Back
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
          referralURL={REFERRAL_URL}
          onRestart={handleRestart}
          isSharedView={isSharedView}
          onTakeQuiz={handleTakeQuiz}
        />
      )}
    </>
  );
}
