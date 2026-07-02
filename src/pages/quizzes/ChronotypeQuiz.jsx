import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Clock,
  Coffee,
  Brain,
  Zap,
  Target,
  Eye,
  Shield,
  Compass,
  Lightbulb,
  Activity,
  Heart,
} from 'lucide-react';
import QuizResults from '../../components/QuizResults';
import SEO from '../../components/SEO';
import { REFERRAL_FORM } from '../../lib/site';

// ─── Quiz questions ──────────────────────────────────────────────────────────

const questions = [
  {
    id: 1,
    question: "If you had no obligations tomorrow, when would you naturally wake up?",
    icon: Sunrise,
    options: [
      { label: "Before 6:00 am", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 1 } },
      { label: "6:00 \u2013 7:30 am", scores: { lion: 2, bear: 3, wolf: 0, dolphin: 1 } },
      { label: "7:30 \u2013 9:00 am", scores: { lion: 0, bear: 2, wolf: 2, dolphin: 2 } },
      { label: "After 9:00 am", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
    ],
  },
  {
    id: 2,
    question: "When do you feel most mentally sharp and focused?",
    icon: Brain,
    options: [
      { label: "Early morning (6\u20139 am)", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { label: "Mid-morning (9 am \u2013 12 pm)", scores: { lion: 2, bear: 3, wolf: 0, dolphin: 1 } },
      { label: "Afternoon (12\u20134 pm)", scores: { lion: 0, bear: 2, wolf: 1, dolphin: 2 } },
      { label: "Evening or late at night", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 2 } },
    ],
  },
  {
    id: 3,
    question: "How do you feel within the first 30 minutes of waking up?",
    icon: Coffee,
    options: [
      { label: "Alert and ready to go", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { label: "A bit groggy, but functional after a few minutes", scores: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } },
      { label: "Foggy and slow, need significant warm-up time", scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { label: "Depends on the day. Sometimes fine, sometimes terrible", scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 4,
    question: "If you could choose your ideal bedtime, when would you go to sleep?",
    icon: Moon,
    options: [
      { label: "Before 9:30 pm", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { label: "9:30 \u2013 11:00 pm", scores: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } },
      { label: "11:00 pm \u2013 12:30 am", scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { label: "After 12:30 am", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 2 } },
    ],
  },
  {
    id: 5,
    question: "How would you describe your energy across the day?",
    icon: Zap,
    options: [
      { label: "High in the morning, fading by evening", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { label: "Steady through the day with a slight afternoon dip", scores: { lion: 1, bear: 3, wolf: 0, dolphin: 0 } },
      { label: "Low in the morning, building through the day, peaking at night", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { label: "Unpredictable. It varies a lot day to day", scores: { lion: 0, bear: 1, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 6,
    question: "How easily do you fall asleep at night?",
    icon: Moon,
    options: [
      { label: "Very easily. I'm usually out within minutes", scores: { lion: 3, bear: 2, wolf: 0, dolphin: 0 } },
      { label: "Usually within 15\u201320 minutes", scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { label: "It takes a while. My mind tends to be active", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { label: "It's a struggle. I often lie awake or have restless sleep", scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 7,
    question: "How do you feel about early morning commitments (e.g., 7 am meeting)?",
    icon: Clock,
    options: [
      { label: "No problem. I'm already up and productive", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 1 } },
      { label: "Manageable with an alarm, but not ideal", scores: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } },
      { label: "Painful. It takes a lot of effort to function", scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { label: "Depends on how I slept. Sometimes okay, sometimes impossible", scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 8,
    question: "When do you prefer to exercise or do physical activity?",
    icon: Zap,
    options: [
      { label: "First thing in the morning", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 0 } },
      { label: "Late morning or lunchtime", scores: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } },
      { label: "Afternoon or evening", scores: { lion: 0, bear: 1, wolf: 3, dolphin: 1 } },
      { label: "Whenever I have the energy. No consistent preference", scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 9,
    question: "How would you describe your sleep quality overall?",
    icon: Moon,
    options: [
      { label: "Deep and restorative. I rarely wake during the night", scores: { lion: 3, bear: 2, wolf: 0, dolphin: 0 } },
      { label: "Generally good. The occasional rough night", scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { label: "Decent once I get to sleep, but getting there is the hard part", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { label: "Light and easily disrupted. I often feel unrested", scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 10,
    question: "How do you respond to changes in your routine or schedule?",
    icon: Clock,
    options: [
      { label: "I prefer structure and find disruption frustrating", scores: { lion: 3, bear: 1, wolf: 0, dolphin: 1 } },
      { label: "I can adapt fairly easily", scores: { lion: 1, bear: 3, wolf: 1, dolphin: 0 } },
      { label: "I'm naturally flexible. I don't love rigid schedules", scores: { lion: 0, bear: 1, wolf: 3, dolphin: 0 } },
      { label: "I find routine hard to maintain but know I need it", scores: { lion: 0, bear: 0, wolf: 1, dolphin: 3 } },
    ],
  },
  {
    id: 11,
    question: "If you could do your most important creative or thinking work at any time, when would it be?",
    icon: Brain,
    options: [
      { label: "Dawn or very early morning", scores: { lion: 3, bear: 0, wolf: 0, dolphin: 1 } },
      { label: "Mid-morning to early afternoon", scores: { lion: 1, bear: 3, wolf: 0, dolphin: 1 } },
      { label: "Late afternoon into the evening", scores: { lion: 0, bear: 1, wolf: 2, dolphin: 1 } },
      { label: "Late at night when everything is quiet", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 2 } },
    ],
  },
  {
    id: 12,
    question: "How would others describe your personality?",
    icon: Sun,
    options: [
      { label: "Driven, disciplined, and goal-oriented", scores: { lion: 3, bear: 0, wolf: 0, dolphin: 1 } },
      { label: "Friendly, steady, and easy-going", scores: { lion: 0, bear: 3, wolf: 0, dolphin: 0 } },
      { label: "Creative, impulsive, and a bit of a night owl", scores: { lion: 0, bear: 0, wolf: 3, dolphin: 1 } },
      { label: "Analytical, cautious, and detail-oriented", scores: { lion: 0, bear: 0, wolf: 0, dolphin: 3 } },
    ],
  },
];

// ─── Chronotype result data (expanded for new results page) ─────────────────

const chronotypes = {
  lion: {
    key: "lion",
    name: "The Lion",
    emoji: "\u{1F981}",
    tagline: "The Early Riser",
    hook: "Your best hours happen while the rest of the world is still asleep, and that's a genuine competitive advantage.",
    description: [
      "Lions wake early and hit peak performance before most people have finished breakfast. Your biological rhythm front-loads energy, focus, and drive into the first half of the day. This isn't discipline or willpower. It's your circadian system operating exactly as it was designed to.",
      "You likely find mornings effortless and productive. Your executive function peaks early, your motivation is highest before midday, and you naturally gravitate toward structure and routine. This consistency makes you reliable, focused, and effective during conventional hours. People who work with you know they can count on your morning output.",
      "The trade-off is real though. Your energy drops significantly in the afternoon and evening, which means social events, late meetings, and evening commitments often feel harder than they should. You're not being antisocial. Your biology is genuinely winding down. Understanding this helps you plan your days around your actual rhythm rather than fighting it."
    ],
    strengths: [
      { icon: Sunrise, label: "Peak Morning Performance", description: "Your cognitive sharpness in early hours exceeds what most people achieve all day" },
      { icon: Target, label: "Natural Discipline", description: "Consistent sleep-wake cycles give you reliable daily structure without effort" },
      { icon: Brain, label: "Strong Early Executive Function", description: "Planning, decision-making, and focus come naturally in your first few hours" },
    ],
    tips: [
      { headline: "Front-Load Your Most Important Work", body: "Your brain is at its sharpest between 6 and 11 am. Schedule deep work, creative tasks, and important decisions for this window. Don't waste your peak hours on email." },
      { headline: "Protect Your Evening Wind-Down", body: "Avoid stimulating activities after 8 pm. Your circadian system is genuinely winding down, and fighting it creates a false 'second wind' that costs you sleep quality." },
      { headline: "Plan Social Events Strategically", body: "If evening socialising drains you, host morning or afternoon gatherings instead. Brunch is your natural social window. Let the wolves handle the dinner parties." },
      { headline: "Use Light Exposure Deliberately", body: "Get bright light immediately upon waking to reinforce your rhythm. In the evening, dim lights aggressively. Your system responds strongly to light cues." },
    ],
    insight: "Your circadian system is wired to wind down early. Protect your evening transition time. Avoid stimulating activities after 8 pm and lean into the natural drop. Fighting it creates the illusion of a 'second wind' that costs you sleep quality.",
    shareCaption: "Just found out I'm a Lion Chronotype. My early-morning energy isn't random, it's biological. Take the free quiz to find your chronotype: #Chronotype #SleepScience #EstusHealth",
    emailCTA: {
      headline: "The Lion's guide to building your optimal daily schedule",
      description: "A practical framework for structuring your day around your biological peak hours.",
    },
    nextResource: {
      title: "Ready to work with your rhythm?",
      description: "Our Sleep Performance Program builds a personalised system around your biology. Four sessions. Real protocols. Built for your actual life.",
      cta: "Start a referral",
    },
  },
  bear: {
    key: "bear",
    name: "The Bear",
    emoji: "\u{1F43B}",
    tagline: "The Steady Performer",
    hook: "Your energy tracks the sun, which makes you naturally aligned with how most of the world works.",
    description: [
      "Bears follow a solar-aligned rhythm that tracks closely with the rise and fall of daylight. This is the most common chronotype. Your energy is steady, your sleep is generally reliable, and you perform well during conventional hours. That consistency is a genuine strength, even if it feels unremarkable compared to more extreme types.",
      "Your mid-morning to early afternoon window is your cognitive peak. This is when your focus, decision-making, and creative thinking are strongest. You probably handle the standard workday reasonably well, adapt to most schedules without major difficulty, and maintain good enough sleep without dramatic interventions.",
      "The risk for Bears isn't dramatic sleep failure. It's gradual erosion. Because your baseline is 'okay,' you might underestimate the impact of small compromises: late screens, inconsistent bedtimes, weekend sleep-ins. These accumulate into chronic under-performance that never triggers an alarm but steadily reduces your potential."
    ],
    strengths: [
      { icon: Sun, label: "Steady Daily Energy", description: "Predictable energy patterns let you plan your day with confidence" },
      { icon: Compass, label: "Schedule Flexibility", description: "You can adapt to most timetables without serious circadian conflict" },
      { icon: Shield, label: "Reliable Sleep Architecture", description: "Your sleep quality stays consistent when you protect basic habits" },
    ],
    tips: [
      { headline: "Guard Against Gradual Erosion", body: "Small compromises like late screens, irregular bedtimes, and weekend lie-ins accumulate into chronic under-performance. Consistency is your highest-leverage tool." },
      { headline: "Protect Your Mid-Morning Peak", body: "Schedule your most demanding cognitive work between 10 am and 1 pm. This is when your Bear brain does its best thinking. Routine admin can wait until after lunch." },
      { headline: "Watch the Afternoon Dip", body: "The post-lunch energy drop is real for Bears. Plan lighter tasks for 2 to 4 pm, and consider a brief walk or change of environment to manage it." },
      { headline: "Keep Weekends Consistent", body: "The temptation to sleep in on weekends shifts your circadian clock. Try to keep wake times within 30 minutes of your weekday schedule for better Monday performance." },
    ],
    insight: "Your greatest risk isn't dramatic sleep failure. It's gradual erosion. Small compromises (late screens, inconsistent bedtimes, weekend sleep-ins) accumulate into chronic under-performance. Consistency is your highest-leverage tool.",
    shareCaption: "Just found out I'm a Bear Chronotype. Turns out my energy patterns aren't random, they're solar-aligned. Take the free quiz: #Chronotype #SleepScience #EstusHealth",
    emailCTA: {
      headline: "The Bear's guide to building your optimal weekly schedule",
      description: "How to leverage your steady rhythm for peak performance without dramatic lifestyle changes.",
    },
    nextResource: {
      title: "Ready to work with your rhythm?",
      description: "Our Sleep Performance Program builds a personalised system around your biology. Four sessions. Real protocols. Built for your actual life.",
      cta: "Start a referral",
    },
  },
  wolf: {
    key: "wolf",
    name: "The Wolf",
    emoji: "\u{1F43A}",
    tagline: "The Night Thinker",
    hook: "Your brain does its best work when the world goes quiet, and that's not a flaw in your wiring.",
    description: [
      "Wolves come alive when the rest of the world slows down. Your circadian rhythm is shifted later. You peak cognitively in the afternoon and evening, and mornings are genuinely difficult, not just inconvenient. This is biological, not a discipline problem.",
      "Your best creative and analytical work happens when most people are winding down. You're naturally suited to deep focus in the evening hours, comfortable with flexible schedules, and often bring strong lateral thinking and problem-solving ability. The quiet of late hours gives your brain the low-distraction environment it actually needs to perform.",
      "The challenge is that the modern world is built for early risers. Morning obligations create ongoing circadian conflict, and social norms often punish your natural rhythm. You've probably been told you're lazy, unmotivated, or 'not a morning person' as if that's a choice. It's not. Your biology runs on a different clock, and the solution isn't to force yourself into an early schedule. It's to build structure around your actual biology."
    ],
    strengths: [
      { icon: Sunset, label: "Evening Cognitive Peak", description: "Your focus and creativity surge when the world quiets down" },
      { icon: Brain, label: "Strong Lateral Thinking", description: "You approach problems from angles that earlier risers often miss" },
      { icon: Activity, label: "Deep Work Capacity", description: "You can sustain concentrated effort for long evening sessions" },
    ],
    tips: [
      { headline: "Stop Fighting Your Clock", body: "The solution isn't forcing an early schedule. It's building structure around your actual biology. Give yourself permission to work with your rhythm, not against it." },
      { headline: "Use Strategic Light Exposure", body: "Bright light in the morning helps gently shift your window earlier without fighting your wiring. A light therapy lamp for 20 minutes after waking makes a measurable difference." },
      { headline: "Manage Caffeine Timing", body: "Your natural late-night alertness means caffeine after 2 pm can push your already-late sleep onset even further. Front-load your caffeine and taper by early afternoon." },
      { headline: "Build a Gradual Wind-Down", body: "Your brain doesn't have a natural 'off switch' in the evening. Build a deliberate wind-down protocol: dim lights, reduce stimulation, and create a transition ritual that signals sleep time." },
    ],
    insight: "The solution isn't forcing yourself into an early schedule. It's building structure around your actual biology. Strategic light exposure in the morning, careful caffeine timing, and a gradual wind-down protocol can shift your window without fighting your wiring.",
    shareCaption: "Just found out I'm a Wolf Chronotype. My late-night energy isn't laziness, it's biology. Take the free quiz: #Chronotype #SleepScience #EstusHealth",
    emailCTA: {
      headline: "The Wolf's guide to thriving in an early-bird world",
      description: "Practical strategies for building a schedule that respects your natural rhythm while meeting real-world demands.",
    },
    nextResource: {
      title: "Ready to work with your rhythm?",
      description: "Our Sleep Performance Program builds a personalised system around your biology. Four sessions. Real protocols. Built for your actual life.",
      cta: "Start a referral",
    },
  },
  dolphin: {
    key: "dolphin",
    name: "The Dolphin",
    emoji: "\u{1F42C}",
    tagline: "The Light Sleeper",
    hook: "Your sleep system needs more scaffolding than most, and understanding that changes everything.",
    description: [
      "Dolphins are light sleepers with irregular rhythms. Your sleep is easily disrupted, your energy fluctuates, and you may feel like you've never quite figured out a pattern that works. This is especially common in neurodivergent profiles where sensory sensitivity, anxiety, and nervous system regulation all affect sleep architecture.",
      "Your brain stays more alert than most people's, even during rest. This means you're highly attuned to environmental changes, detail-oriented with strong analytical thinking, and often processing information at a level that others don't reach. The downside is that this alertness doesn't switch off easily, making sleep onset difficult and sleep quality fragile.",
      "Dolphins often feel like they've failed at sleep because generic advice doesn't work for them. '10 pm bedtime, no screens, warm bath' sounds simple but ignores the neurological reality of a system that stays vigilant. Your sleep needs genuine, structured scaffolding, not willpower. When you get the right environmental and behavioural supports in place, the improvement can be dramatic."
    ],
    strengths: [
      { icon: Eye, label: "High Environmental Awareness", description: "Your alertness picks up on details and changes that others miss completely" },
      { icon: Lightbulb, label: "Analytical Depth", description: "Your brain processes information with unusual precision and thoroughness" },
      { icon: Heart, label: "Sensory Attunement", description: "You read environments and atmospheres with remarkable accuracy" },
    ],
    tips: [
      { headline: "Build Environmental Scaffolding", body: "Blackout curtains, white noise, and temperature regulation aren't optional for Dolphins. They're foundational. Your sensory system needs a controlled environment to allow sleep onset." },
      { headline: "Create a Strict Wind-Down Protocol", body: "Start your wind-down 90 minutes before intended sleep time. Dim lights, reduce stimulation progressively, and build a consistent ritual that your nervous system learns to associate with sleep." },
      { headline: "Address the Worry Loop", body: "If your mind races at bedtime, try a 'worry dump' journal 2 hours before bed. Write down everything unresolved, then close the notebook. This externalises the processing your brain wants to do in bed." },
      { headline: "Accept Variable Energy", body: "Your energy will fluctuate more than other types. Instead of fighting this, plan your week with built-in flexibility. Schedule important tasks during your most reliable windows, not rigid slots." },
    ],
    insight: "Your sleep system needs more scaffolding than most. Environment control (blackout, white noise, temperature regulation), strict wind-down protocols, and sensory management aren't optional. They're foundational. A structured approach makes the biggest difference for Dolphins.",
    shareCaption: "Just found out I'm a Dolphin Chronotype. My light sleep isn't a flaw, it's a wiring pattern that needs different support. Take the free quiz: #Chronotype #SleepScience #EstusHealth",
    emailCTA: {
      headline: "The Dolphin's guide to building a sleep system that actually works",
      description: "Structured protocols for sensory-sensitive sleepers who need more than generic advice.",
    },
    nextResource: {
      title: "Ready to work with your rhythm?",
      description: "Our Sleep Performance Program builds a personalised system around your biology. Four sessions. Real protocols. Built for your actual life.",
      cta: "Start a referral",
    },
  },
};

const CHRONOTYPE_MAP = Object.fromEntries(
  Object.entries(chronotypes).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);

const QUIZ_NAME = "Chronotype Quiz";
const QUIZ_SLUG = "chronotype-quiz";

// ─── Scoring logic ───────────────────────────────────────────────────────────

function calcResult(ans) {
  const totals = { lion: 0, bear: 0, wolf: 0, dolphin: 0 };
  ans.forEach((answerIndex, questionIndex) => {
    if (answerIndex !== null && questions[questionIndex]) {
      const scores = questions[questionIndex].options[answerIndex].scores;
      Object.keys(scores).forEach((type) => {
        totals[type] += scores[type];
      });
    }
  });
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  return { primary: sorted[0][0], scores: totals };
}

// ─── Main quiz component ─────────────────────────────────────────────────────

export default function ChronotypeQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phase, setPhase] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState(null);
  const [scores, setScores] = useState({ lion: 0, bear: 0, wolf: 0, dolphin: 0 });
  const [autoAdvancePending, setAutoAdvancePending] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);

  // Deep-link: detect ?result= param on mount
  useEffect(() => {
    const resultParam = searchParams.get("result");
    if (resultParam && chronotypes[resultParam]) {
      setResult(resultParam);
      setIsSharedView(true);
      const placeholderScores = {};
      Object.keys(chronotypes).forEach((k) => {
        placeholderScores[k] = k === resultParam ? 27 : Math.floor(Math.random() * 15) + 5;
      });
      setScores(placeholderScores);
      setPhase('results');
    }
  }, []);

  function handleStart() {
    setPhase('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleAnswer(optionIndex) {
    const wasUnanswered = answers[currentQuestion] === null;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (wasUnanswered) {
      setAutoAdvancePending(true);
    }
  }

  // Auto-advance after 250ms
  useEffect(() => {
    if (!autoAdvancePending) return;
    const timer = setTimeout(() => {
      setAutoAdvancePending(false);
      if (currentQuestion === questions.length - 1) {
        const res = calcResult(answers);
        setResult(res.primary);
        setScores(res.scores);
        setPhase('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentQuestion((q) => q + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [autoAdvancePending]);

  function handleBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleRestart() {
    setPhase('intro');
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setResult(null);
    setScores({ lion: 0, bear: 0, wolf: 0, dolphin: 0 });
    setIsSharedView(false);
    setSearchParams({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleTakeQuiz() {
    setIsSharedView(false);
    setSearchParams({});
    setPhase('intro');
    setResult(null);
    setScores({ lion: 0, bear: 0, wolf: 0, dolphin: 0 });
    setAnswers(Array(questions.length).fill(null));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const archetype = result ? chronotypes[result] : null;
  const q = questions[currentQuestion];

  return (
    <>
      <SEO title="Chronotype Quiz | Estus Health" description="Find out whether you're a Lion, Bear, Wolf, or Dolphin sleeper, and learn how to align your schedule to your biology." path="/resources/chronotype-quiz" />
      {phase !== 'results' && (
        <>
          <style>{`
            .quiz-container {
              --q-primary: var(--teal);
              --q-primary-light: rgba(28,232,240,.10);
              --q-dark: var(--heading);
              --q-cream: var(--surface-2);
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
            .quiz-container h1, .quiz-container h2, .quiz-container h3 { font-family: var(--f-head); color: var(--q-dark); }
            .quiz-container .landing-hero { text-align: center; padding: 4rem 1rem 3rem; }
            .quiz-container .landing-hero h1 { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; line-height: 1.15; margin-bottom: 1rem; text-transform: uppercase; }
            .quiz-container .landing-hero .subtitle { font-size: 1.15rem; color: var(--q-text-muted); max-width: 520px; margin: 0 auto 2rem; line-height: 1.6; }
            .quiz-container .landing-hero .time-badge { display: inline-block; background: var(--q-cream-light); border: 1px solid var(--q-border); padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.85rem; color: var(--q-text-muted); margin-bottom: 2.5rem; }
            .quiz-container .landing-notes { max-width: 480px; margin: 0 auto 2.5rem; text-align: left; background: var(--q-cream-light); border-radius: 12px; padding: 1.5rem 2rem; font-size: 0.92rem; color: var(--q-text-muted); line-height: 1.65; }
            .quiz-container .btn-primary { display: inline-block; background: var(--q-primary); color: var(--btn-text); border: 3px solid var(--line); padding: 1rem 2.5rem; border-radius: 999px; font-family: var(--f-display); text-transform: uppercase; font-size: 1.05rem; font-weight: 600; cursor: pointer; transition: background 0.2s, transform 0.15s; }
            .quiz-container .btn-primary:hover { background: var(--q-dark); transform: translateY(-1px); }
            .quiz-container .btn-secondary { display: inline-flex; align-items: center; gap: 0.4rem; background: transparent; color: var(--q-primary); border: 3px solid var(--line); padding: 0.85rem 2rem; border-radius: 999px; font-family: var(--f-display); text-transform: uppercase; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
            .quiz-container .btn-secondary:hover { background: var(--q-primary-light); }
            .quiz-container .progress-bar { display: flex; gap: 0.5rem; margin-bottom: 2.5rem; padding: 0 0.5rem; }
            .quiz-container .progress-segment { flex: 1; height: 4px; border-radius: 4px; background: var(--q-border); transition: background 0.3s ease; }
            .quiz-container .progress-segment.active { background: var(--q-primary); }
            .quiz-container .progress-segment.completed { background: var(--q-accent); }
            .quiz-container .section-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--q-text-muted); margin-bottom: 0.5rem; }
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
            {phase === 'intro' && (
              <div className="landing-hero">
                <div className="section-label" style={{ color: 'var(--q-primary)', marginBottom: '1rem' }}>Sleep Performance</div>
                <h1>What's Your Chronotype?</h1>
                <p className="subtitle" style={{ fontFamily: 'var(--f-head)', fontStyle: 'italic' }}>
                  Your chronotype is your biological preference for when you sleep, wake, and perform at your best.
                </p>
                <div className="landing-notes">
                  <p style={{ marginTop: 0 }}>
                    Understanding your chronotype changes how you approach sleep. Instead of fighting
                    your biology with generic advice, you can build a schedule and environment that
                    works with your natural rhythm.
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    This quiz takes about 2 minutes. Answer based on what feels natural to you, not
                    what your current schedule demands.
                  </p>
                </div>
                <button className="btn-primary" onClick={handleStart}>Start the Quiz</button>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                  {[
                    { icon: Clock, label: "12 questions" },
                    { icon: Brain, label: "Evidence-informed" },
                    { icon: Moon, label: "No account needed" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--q-text-muted)', fontSize: '0.9rem' }}>
                      <Icon size={16} color="var(--q-primary)" /> {label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {phase === 'quiz' && q && (
              <div>
                <div className="progress-bar">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`progress-segment ${
                        i === currentQuestion ? 'active' : i < currentQuestion ? 'completed' : ''
                      }`}
                    />
                  ))}
                </div>
                <div className="section-label">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="question-card">
                  <div className="question-text">{q.question}</div>
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      className={`option-btn ${answers[currentQuestion] === oi ? 'selected' : ''}`}
                      onClick={() => handleAnswer(oi)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="nav-row">
                  {currentQuestion > 0 && (
                    <button className="btn-secondary" onClick={handleBack}>
                      <ArrowLeft size={16} /> Back
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {phase === 'results' && archetype && (
        <QuizResults
          quizName={QUIZ_NAME}
          quizSlug={QUIZ_SLUG}
          archetype={archetype}
          secondaryArchetype={null}
          scores={scores}
          archetypeMap={CHRONOTYPE_MAP}
          totalQuestions={questions.length}
          referralURL={REFERRAL_FORM}
          onRestart={handleRestart}
          isSharedView={isSharedView}
          onTakeQuiz={handleTakeQuiz}
        />
      )}
    </>
  );
}
