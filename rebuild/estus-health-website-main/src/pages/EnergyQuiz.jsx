import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Zap, Battery, Target, Compass, Lightbulb, Brain, Clock, RefreshCw, Layers, Flame, Waves, Activity } from "lucide-react";
import QuizResults from "../components/QuizResults";

const ARCHETYPES = {
  sprinter: {
    key: "sprinter",
    name: "The Sprinter",
    emoji: "\u{1F3CE}\uFE0F",
    tagline: "You run hot, then hit the wall",
    hook: "Your intensity is a genuine asset. The challenge is learning to harness it without paying the price every single time.",
    description: [
      "Your brain operates in bursts. When you're on, you're really on, hyperfocused, productive, creative, unstoppable. But that intensity comes at a cost. The crash that follows isn't a failure of willpower. It's your nervous system collecting on the energy debt your brain just racked up.",
      "You probably know the pattern well: a surge of motivation hits, you ride it hard, get an impressive amount done, and then nothing. The tank is empty. Recovery can take hours or days, and during that time even basic tasks feel impossible. Other people might call this inconsistent, but it's actually a very consistent pattern. It's just not the one most productivity advice is built for.",
      "The sprint-crash cycle isn't something you need to eliminate entirely. Your ability to lock in and produce at high intensity is a genuine strength. The goal is to make the sprints more intentional and the recovery less brutal."
    ],
    strengths: [
      { icon: Zap, label: "Burst Capacity", description: "You can produce extraordinary output in short windows when your brain locks in" },
      { icon: Flame, label: "Intensity as Fuel", description: "Your deep engagement drives creative and strategic breakthroughs others can't access" },
      { icon: Activity, label: "Honest Recovery Signals", description: "Your body tells you clearly when it's time to stop, which is genuinely protective" },
    ],
    tips: [
      { headline: "Set a Sprint Budget", body: "Decide in advance how many high-intensity blocks you can afford each day or week. Protect your recovery time just as fiercely as your productive time." },
      { headline: "Use the Halfway Rule", body: "When you feel like you could keep going for another two hours, stop after one. Leaving fuel in the tank prevents the worst crashes and extends your overall capacity." },
      { headline: "Build Transition Rituals", body: "Create a bridge between sprint and rest. A walk, a snack, a change of environment. Hard stops are easier on your nervous system than running until you collapse." },
      { headline: "Track Your Sprint-to-Crash Ratio", body: "Over a few weeks, note how long you sprint and how long you need to recover. Most Sprinters discover they need roughly equal time resting as they spend in high gear." },
    ],
    insight: "Here's what most people miss about the sprint-crash pattern: it's not a discipline problem. Research on cognitive energy suggests that brains wired for intense focus actually consume glucose and neurotransmitters at a higher rate during those bursts. Your crashes are neurochemical, not motivational.",
    shareCaption: "Just discovered I'm a Sprinter on the Energy & Executive Function Quiz. My intense bursts aren't inconsistency, they're how my brain is designed to work. Take the free quiz: #EnergyProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Sprinter's guide to sustainable intensity",
      description: "Practical strategies for harnessing your burst capacity without burning out every time.",
    },
    nextResource: {
      title: "Want help building a sustainable rhythm?",
      description: "Our team at Estus Health specialises in helping brains like yours find a pace that works. We use energy mapping and environmental design to help you sprint smarter, not harder.",
      cta: "Get in touch with our team",
    },
  },
  drifter: {
    key: "drifter",
    name: "The Drifter",
    emoji: "\u{1F30A}",
    tagline: "Starting is the hardest part",
    hook: "The gap between wanting to act and actually beginning isn't laziness. It's a neurological threshold your brain needs help crossing.",
    description: [
      "Your biggest challenge isn't doing the work, it's getting started. There's a gap between wanting to do something and actually beginning it, and that gap can feel enormous. You might spend hours circling a task, knowing exactly what needs to happen, but unable to bridge the distance between intention and action.",
      "Once you do get going, something shifts. The resistance melts, focus arrives, and you can often sustain effort for a decent stretch. This is what makes the initiation struggle so frustrating. You know you're capable, because you've proven it every time you manage to start. The problem isn't ability. It's activation.",
      "The Drifter pattern is closely linked to how your brain handles dopamine and task salience. Your executive function system needs a stronger signal than average to switch from 'thinking about it' to 'doing it'. This isn't procrastination in the traditional sense. It's a neurological threshold issue."
    ],
    strengths: [
      { icon: Brain, label: "Deep Processing", description: "Your circling time often produces richer, more considered output once you begin" },
      { icon: Compass, label: "Intention Clarity", description: "You know exactly what needs doing, which means your planning skills are already strong" },
      { icon: Lightbulb, label: "Momentum Mastery", description: "Once you start, you can sustain focus and effort impressively well" },
    ],
    tips: [
      { headline: "Lower the Entry Point", body: "Instead of 'write the report', try 'open the document and type one sentence'. Your brain needs a tiny, friction-free first step to cross the activation threshold." },
      { headline: "Use Body-Doubling", body: "Working alongside someone else, even virtually, borrows external activation energy. Many Drifters find that another person's presence provides just enough signal to get started." },
      { headline: "Pair Initiation with Sensory Input", body: "Music, movement, a specific drink, a change of location. These act as activation cues that help your brain shift gears from planning mode to doing mode." },
      { headline: "Protect Your Peak Activation Windows", body: "Schedule your most important tasks for whenever your natural activation energy is highest. Don't waste your best starting energy on emails or low-stakes admin." },
    ],
    insight: "The gap between intention and action that you experience has a name in neuroscience: task inertia. It's related to the prefrontal cortex's role in initiating voluntary action, and it's significantly more pronounced in neurodivergent brains. Knowing this can help you stop blaming yourself and start designing better launch sequences.",
    shareCaption: "Just discovered I'm a Drifter on the Energy & Executive Function Quiz. The gap between knowing and doing isn't laziness, it's a neurological threshold. Take the free quiz: #EnergyProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Drifter's guide to closing the intention-action gap",
      description: "Personalised activation strategies that work with your brain's initiation style, no willpower required.",
    },
    nextResource: {
      title: "Let's close the intention-action gap",
      description: "At Estus Health, we help you build personalised activation strategies that work with your brain's initiation style. No willpower required.",
      cta: "Get in touch with our team",
    },
  },
  juggler: {
    key: "juggler",
    name: "The Juggler",
    emoji: "\u{1F3AA}",
    tagline: "Your brain wants to do everything at once",
    hook: "Your divergent thinking is genuinely valuable. The work is learning to channel it without scattering your energy across too many things.",
    description: [
      "You don't lack energy or motivation. You have plenty of both. The challenge is that your brain distributes them across too many things simultaneously. You start projects with genuine enthusiasm, pivot to something new when inspiration strikes, and end up with fifteen open tabs (literally and metaphorically) and nothing quite finished.",
      "This isn't a focus problem in the traditional sense. You can focus intensely, just not on one thing for long enough to complete it before the next interesting thing pulls you away. Your brain is wired for novelty and variety, which makes you excellent at generating ideas, making connections, and adapting to change. But it makes linear task completion genuinely difficult.",
      "The Juggler pattern often comes with a side of guilt, the sense that you should be able to just pick one thing and stick with it. But your brain doesn't work that way, and forcing it into a single-track mode usually backfires. The goal isn't to stop juggling. It's to juggle fewer balls at once and finish the important ones."
    ],
    strengths: [
      { icon: Layers, label: "Divergent Thinking", description: "You generate more ideas and connections in an hour than most people do in a week" },
      { icon: RefreshCw, label: "Rapid Adaptation", description: "You switch contexts and absorb new information faster than linear thinkers" },
      { icon: Waves, label: "Creative Energy", description: "Your novelty drive fuels innovation and keeps you engaged across multiple domains" },
    ],
    tips: [
      { headline: "Use a Parking Lot System", body: "When a new idea or task pops up mid-flow, write it down somewhere specific and return to what you were doing. This satisfies the novelty hit without derailing your current task." },
      { headline: "Cap Active Projects at Three", body: "Limit your active projects to three at a time. Everything else goes on a 'next up' list. You can rotate projects in and out, but the cap stays at three." },
      { headline: "Build Variety Into Your Schedule", body: "Switch between different types of tasks (creative, admin, physical) intentionally. This satisfies your novelty drive without scattering your energy across unfinished projects." },
      { headline: "Celebrate Completions Loudly", body: "Your brain is wired to reward starting, not finishing. Create artificial completion rewards to retrain the loop and build a positive association with follow-through." },
    ],
    insight: "The Juggler pattern is strongly associated with divergent thinking, the cognitive style that generates multiple solutions and makes unexpected connections. Research shows this is one of the most valuable cognitive traits in creative and strategic work. Your challenge isn't that your brain works wrong. It's that most systems are designed for convergent thinkers.",
    shareCaption: "Just discovered I'm a Juggler on the Energy & Executive Function Quiz. My scattered energy is actually divergent thinking in action. Take the free quiz: #EnergyProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Juggler's guide to finishing what you start",
      description: "How to harness your divergent thinking without scattering your energy across too many unfinished projects.",
    },
    nextResource: {
      title: "Ready to juggle smarter?",
      description: "Our team at Estus Health helps you harness your divergent thinking without the scattered energy. We build systems that work with your novelty-seeking brain, not against it.",
      cta: "Get in touch with our team",
    },
  },
  conserver: {
    key: "conserver",
    name: "The Conserver",
    emoji: "\u{1F50B}",
    tagline: "You manage a limited energy budget with precision",
    hook: "Your careful energy management isn't avoidance. It's a sophisticated system your nervous system built to keep you functional long-term.",
    description: [
      "You've learned, probably through hard experience, that your energy is a finite and sometimes unpredictable resource. So you've become strategic about how you spend it. You say no to things others say yes to. You plan ahead. You protect your reserves. From the outside, this can look like avoidance or low motivation, but it's actually sophisticated self-management.",
      "The Conserver pattern often develops after repeated experiences of overcommitting and paying the price. You've felt the cost of running on empty, and your brain has adapted by installing a more conservative energy management system. This is intelligent. Your nervous system is trying to keep you functional across the long term rather than burning bright and flaming out.",
      "The trade-off is that you might hold back from opportunities, social events, or challenges that could be rewarding because the energy cost feels too uncertain. Your world can gradually shrink as you optimise for safety. The goal isn't to spend recklessly, but to find opportunities where the investment is worth it."
    ],
    strengths: [
      { icon: Battery, label: "Strategic Resource Management", description: "You allocate energy with a precision that keeps you functional when others burn out" },
      { icon: Target, label: "Intentional Living", description: "Every commitment you make is deliberate, which means your choices reflect your real priorities" },
      { icon: Clock, label: "Long-term Sustainability", description: "Your conservative approach protects you from the boom-bust cycles that derail other profiles" },
    ],
    tips: [
      { headline: "Create a Three-Category Energy Budget", body: "Each week, divide your energy across essentials (non-negotiable), investments (things that cost energy now but pay off later), and treats (purely enjoyable). Make sure investments and treats don't get cut every week." },
      { headline: "Distinguish Protective Rest from Avoidant Rest", body: "Protective rest (planned recovery) is healthy. Avoidant rest (not doing things because they might be tiring) can shrink your world over time. Notice which one you're choosing." },
      { headline: "Run Small Energy Experiments", body: "Build low-stakes activities into your routine that test whether something costs as much energy as you expect. You might find some things are cheaper than your brain predicts." },
      { headline: "Watch for the Conservation Trap", body: "Sometimes spending energy on the right things actually generates more energy. Exercise, social connection, and meaningful work can be net-positive. Not every expenditure is a loss." },
    ],
    insight: "The Conserver pattern is often misread as laziness or depression, but it's actually a highly functional adaptation. Your brain has essentially built an energy management system that prioritises sustainability. The research on spoon theory and energy envelope management validates this approach. The key is calibrating it so you're not over-conserving.",
    shareCaption: "Just discovered I'm a Conserver on the Energy & Executive Function Quiz. My careful energy management isn't avoidance, it's a sophisticated survival strategy. Take the free quiz: #EnergyProfile #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Conserver's guide to expanding without burning out",
      description: "How to find the right balance between conservation and investment so your world grows rather than shrinks.",
    },
    nextResource: {
      title: "Let's optimise your energy budget",
      description: "At Estus Health, we help you find the right balance between conservation and investment. Our OTs specialise in energy management strategies that expand your capacity without burning you out.",
      cta: "Get in touch with our team",
    },
  },
};

const ARCHETYPE_MAP = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);

const QUESTIONS = [
  // Section 1: Energy Patterns (3 questions)
  {
    text: "Think about a typical week. How would you describe your energy pattern?",
    section: 1,
    options: [
      { text: "Intense bursts of high energy followed by significant crashes", scores: { sprinter: 3 } },
      { text: "Low and flat most of the time, with occasional windows of momentum", scores: { drifter: 3 } },
      { text: "High and scattered \u2013 I have energy, but it goes in ten directions at once", scores: { juggler: 3 } },
      { text: "Carefully rationed \u2013 I protect what I have and spend it strategically", scores: { conserver: 3 } },
    ],
  },
  {
    text: "When you wake up in the morning, what's your most common experience?",
    section: 1,
    options: [
      { text: "Some mornings I'm fired up and ready to go, other mornings I can barely move \u2013 it depends on yesterday", scores: { sprinter: 3 } },
      { text: "I know what I need to do, but there's a heavy gap between knowing and doing", scores: { drifter: 3 } },
      { text: "My brain is already buzzing with ideas and plans before I've even got out of bed", scores: { juggler: 3 } },
      { text: "I mentally scan the day ahead and calculate whether I have enough energy for it", scores: { conserver: 3 } },
    ],
  },
  {
    text: "How do you relate to the concept of 'pacing yourself'?",
    section: 1,
    options: [
      { text: "I understand it intellectually but in the moment I can't resist going all in", scores: { sprinter: 3 } },
      { text: "Pacing isn't really my issue \u2013 getting moving in the first place is", scores: { drifter: 3 } },
      { text: "I pace myself on individual tasks but take on too many things overall", scores: { juggler: 3 } },
      { text: "Pacing is my superpower \u2013 maybe too much. I sometimes hold back more than I need to", scores: { conserver: 3 } },
    ],
  },
  // Section 2: Task Engagement (3 questions)
  {
    text: "You have an important task that needs to get done today. What's most likely to happen?",
    section: 2,
    options: [
      { text: "I wait for the energy surge, then blast through it in one intense session", scores: { sprinter: 3 } },
      { text: "I circle it for hours, then either start late in the day or push it to tomorrow", scores: { drifter: 3 } },
      { text: "I start it, get pulled into three other things, and come back to it later", scores: { juggler: 3 } },
      { text: "I plan exactly when and how to do it so I don't waste energy on decision-making", scores: { conserver: 3 } },
    ],
  },
  {
    text: "What happens when you're halfway through a task that's going well?",
    section: 2,
    options: [
      { text: "I push harder and try to finish in one go while the momentum lasts", scores: { sprinter: 3 } },
      { text: "I'm relieved I started and try to keep the momentum going as long as possible", scores: { drifter: 3 } },
      { text: "A new idea or task catches my attention and I'm tempted to switch", scores: { juggler: 3 } },
      { text: "I check in with my energy levels to decide if I should keep going or save some for later", scores: { conserver: 3 } },
    ],
  },
  {
    text: "How do you typically handle a long to-do list?",
    section: 2,
    options: [
      { text: "I attack it in a marathon session and try to clear as much as possible in one burst", scores: { sprinter: 3 } },
      { text: "I stare at it, feel overwhelmed, and struggle to pick where to start", scores: { drifter: 3 } },
      { text: "I cherry-pick the most interesting items and bounce between them", scores: { juggler: 3 } },
      { text: "I prioritise ruthlessly and accept that some things won't get done", scores: { conserver: 3 } },
    ],
  },
  // Section 3: Recovery & Downtime (3 questions)
  {
    text: "After a particularly productive or demanding day, what does the next day look like?",
    section: 3,
    options: [
      { text: "Often a write-off. I've used everything and need time to recharge", scores: { sprinter: 3 } },
      { text: "About the same as any other day \u2013 the struggle to start continues regardless", scores: { drifter: 3 } },
      { text: "I'm usually fine \u2013 I just redirect my energy to whatever's next", scores: { juggler: 3 } },
      { text: "I deliberately schedule lighter days after big ones to stay balanced", scores: { conserver: 3 } },
    ],
  },
  {
    text: "When you have genuine free time with no obligations, how do you spend it?",
    section: 3,
    options: [
      { text: "Either doing something intensely or doing absolutely nothing \u2013 no middle ground", scores: { sprinter: 3 } },
      { text: "I have things I want to do but often can't get started on any of them", scores: { drifter: 3 } },
      { text: "I fill it immediately with projects, hobbies, or new ideas to explore", scores: { juggler: 3 } },
      { text: "I guard it carefully and rest, even if I could probably do more", scores: { conserver: 3 } },
    ],
  },
  {
    text: "How do you know when you've pushed too far?",
    section: 3,
    options: [
      { text: "I crash hard \u2013 complete shutdown, brain fog, sometimes physical symptoms", scores: { sprinter: 3 } },
      { text: "Everything feels even more impossible than usual, and guilt piles up", scores: { drifter: 3 } },
      { text: "I start dropping balls \u2013 forgetting things, missing details, making careless mistakes", scores: { juggler: 3 } },
      { text: "I rarely push that far. I've learned to stop well before that point", scores: { conserver: 3 } },
    ],
  },
  // Section 4: Self-Perception & Support (3 questions)
  {
    text: "Which statement do you most relate to?",
    section: 4,
    options: [
      { text: "\"I can do amazing things, but I pay for it afterwards\"", scores: { sprinter: 3 } },
      { text: "\"I know what I need to do, I just can't make myself start\"", scores: { drifter: 3 } },
      { text: "\"I have so many ideas and interests, I can't stick to just one\"", scores: { juggler: 3 } },
      { text: "\"I've had to learn the hard way to protect my energy\"", scores: { conserver: 3 } },
    ],
  },
  {
    text: "What kind of support would make the biggest difference for you right now?",
    section: 4,
    options: [
      { text: "Help finding a sustainable rhythm so I stop swinging between extremes", scores: { sprinter: 3 } },
      { text: "Strategies to get started without needing motivation or the perfect conditions", scores: { drifter: 3 } },
      { text: "A system for finishing things without killing the creative energy that starts them", scores: { juggler: 3 } },
      { text: "Permission and guidance to expand my world without risking burnout", scores: { conserver: 3 } },
    ],
  },
  {
    text: "If a friend described your relationship with productivity, what would they most likely say?",
    section: 4,
    options: [
      { text: "\"They're either in beast mode or completely offline \u2013 there's no in between\"", scores: { sprinter: 3 } },
      { text: "\"They talk about doing things way more than they actually do them\"", scores: { drifter: 3 } },
      { text: "\"They've always got ten projects going and somehow keep starting new ones\"", scores: { juggler: 3 } },
      { text: "\"They're careful about what they commit to and always seem to have a plan\"", scores: { conserver: 3 } },
    ],
  },
];

const SECTION_TITLES = {
  1: "Your Energy Patterns",
  2: "How You Engage with Tasks",
  3: "Recovery & Downtime",
  4: "Self-Perception & Support",
};

const REFERRAL_URL = "https://estushealth.com.au/referral";
const QUIZ_NAME = "Energy & Executive Function Quiz";
const QUIZ_SLUG = "energy-quiz";

export default function EnergyQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screen, setScreen] = useState("landing");
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ sprinter: 0, drifter: 0, juggler: 0, conserver: 0 });
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
        const finalScores = { sprinter: 0, drifter: 0, juggler: 0, conserver: 0 };
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
      setScores({ sprinter: 0, drifter: 0, juggler: 0, conserver: 0 });
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
    setScores({ sprinter: 0, drifter: 0, juggler: 0, conserver: 0 });
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
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{"\u26A1"}</div>
                  <h1>How Does Your Brain Manage Energy&nbsp;&&nbsp;Action?</h1>
                  <p className="subtitle">
                    Discover your executive function and energy profile, and learn strategies
                    built for the way your brain actually works.
                  </p>
                  <div className="time-badge">{"\u{1F550}"} Takes ~3 minutes {"\u00B7"} 12 questions</div>
                  <br />
                  <div className="landing-notes">
                    <strong style={{ color: "var(--q-dark)" }}>Before you start:</strong> This isn't about how productive you are. It's about understanding your brain's natural energy patterns and how you move from intention to action. Every profile has real strengths, and most people will recognise themselves in more than one. There are no wrong answers.
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
