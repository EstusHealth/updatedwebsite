import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import { Section } from '../components/ui';
import QuizResults from '../components/QuizResults';

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

const REFERRAL_URL = "https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7";
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

// ─── Component: Progress bar ─────────────────────────────────────────────────

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Component: Intro screen ─────────────────────────────────────────────────

function QuizIntro({ onStart }) {
  return (
    <section className="relative py-16 lg:py-24 grain-overlay border-b border-border">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-display text-sm uppercase tracking-widest mb-4">
            Sleep Performance
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold leading-tight mb-6">
            What's Your
            <br />
            <span className="text-gradient-accent">Chronotype?</span>
          </h1>
          <p className="font-serif text-xl text-foreground/80 italic mb-6">
            Your chronotype is your biological preference for when you sleep, wake, and perform at your best.
          </p>
          <p className="text-foreground/70 leading-relaxed mb-4 max-w-2xl mx-auto">
            Understanding your chronotype changes how you approach sleep. Instead of fighting
            your biology with generic advice, you can build a schedule and environment that
            works with your natural rhythm.
          </p>
          <p className="text-foreground/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            This quiz takes about 2 minutes. Answer based on what feels natural to you, not
            what your current schedule demands.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center justify-center font-display uppercase tracking-wide transition-all duration-200 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            Start the Quiz
          </button>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-left max-w-2xl mx-auto">
            {[
              { icon: Clock, label: "12 questions" },
              { icon: Brain, label: "Evidence-informed" },
              { icon: Moon, label: "No account needed" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground/70 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Component: Question screen ──────────────────────────────────────────────

function QuizQuestion({ question, questionIndex, totalQuestions, selectedAnswer, onAnswer, onBack }) {
  const Icon = question.icon;

  return (
    <Section>
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-foreground/60 font-display uppercase tracking-wide">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-foreground/40">
              {Math.round(((questionIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <ProgressBar current={questionIndex + 1} total={totalQuestions} />
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-display leading-tight">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-10">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                selectedAnswer === idx
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border bg-card hover:border-primary/30 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedAnswer === idx
                      ? 'border-primary bg-primary'
                      : 'border-border'
                  }`}
                >
                  {selectedAnswer === idx && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <span className={`text-sm leading-relaxed ${selectedAnswer === idx ? 'text-foreground' : 'text-foreground/80'}`}>
                  {option.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation - Back only, auto-advance handles forward */}
        <div className="flex justify-start items-center">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-sm font-display uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
              questionIndex === 0
                ? 'text-foreground/30 cursor-not-allowed'
                : 'text-foreground/60 hover:text-foreground'
            }`}
            disabled={questionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </div>
    </Section>
  );
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

  return (
    <>
      <Helmet>
        <title>Chronotype Quiz | Estus Health</title>
        <meta
          name="description"
          content="Discover your sleep chronotype. A free, evidence-informed quiz from Estus Health to help you understand your biological sleep rhythm."
        />
      </Helmet>

      {phase === 'intro' && <QuizIntro onStart={handleStart} />}

      {phase === 'quiz' && (
        <QuizQuestion
          question={questions[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={questions.length}
          selectedAnswer={answers[currentQuestion]}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
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
          referralURL={REFERRAL_URL}
          onRestart={handleRestart}
          isSharedView={isSharedView}
          onTakeQuiz={handleTakeQuiz}
        />
      )}
    </>
  );
}
