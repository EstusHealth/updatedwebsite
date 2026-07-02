import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Flame, Eye, Shield, Zap, Brain, Heart, RefreshCw, Compass, Target, AlertTriangle, Lightbulb, Sprout } from "lucide-react";
import QuizResults from "../components/QuizResults";

const ARCHETYPES = {
  smouldering: {
    key: "smouldering",
    name: "The Smouldering Ember",
    emoji: "\u{1F525}",
    tagline: "You've been burning low for longer than you realise",
    hook: "Your capacity didn't vanish overnight. It's been quietly eroding, and recognising that is the first step toward change.",
    description: [
      "Your burnout didn't arrive with a dramatic crash. It crept in slowly, like a fire burning down to embers. You've been running on fumes for so long that this depleted state has started to feel normal. You might not even recognise it as burnout because there was no single breaking point, just a gradual erosion of capacity, interest, and energy that's been building for months or even years.",
      "You've probably noticed that things you used to manage easily now feel disproportionately hard. Your tolerance for sensory input, social interaction, and everyday demands has been quietly shrinking. Skills you once had on autopilot, like cooking, replying to messages, keeping track of appointments, now require conscious effort that leaves you drained.",
      "The tricky thing about chronic burnout is that it rewrites your baseline. You may have forgotten what it feels like to have capacity, so you keep measuring yourself against your current depleted state rather than recognising how far you've drifted from your actual potential."
    ],
    strengths: [
      { icon: Eye, label: "Pattern Recognition", description: "You notice subtle shifts in your capacity that others would miss entirely" },
      { icon: Shield, label: "Quiet Endurance", description: "You've kept going under conditions that would have stopped most people" },
      { icon: Compass, label: "Self-Awareness", description: "Your experience gives you deep insight into what sustainable really means" },
    ],
    tips: [
      { headline: "Accept Your Current Capacity", body: "Your current capacity is real, not a character flaw. You cannot recover from burnout while judging yourself for being in it. Start from where you actually are." },
      { headline: "Audit Your Invisible Demands", body: "Social masking, sensory processing, executive function tasks, and emotional labour drain your battery every day but don't appear on any to-do list. Map them out." },
      { headline: "Lower the Bar Deliberately", body: "Not as failure, but as strategy. Recovery requires operating below your current maximum, not at it. Give your system room to rebuild." },
      { headline: "Track Your Energy Patterns", body: "Spend a week noting which times, environments, and activities drain you disproportionately. This data becomes your personalised recovery roadmap." },
    ],
    insight: "Here's what most people miss about chronic autistic burnout: it's not caused by doing too much of one thing. It's caused by the cumulative, invisible cost of navigating a world that wasn't designed for your neurology. The masking, the sensory processing, the constant translation between your internal experience and external expectations. These are full-time jobs that nobody sees, including you.",
    shareCaption: "Just found out I'm a Smouldering Ember on the Autistic Burnout Quiz. Turns out my slow energy decline isn't laziness, it's chronic burnout that crept in over years. Take the free quiz: #AutisticBurnout #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Smouldering Ember's guide to recognising hidden burnout",
      description: "A practical framework for mapping your invisible demands and building a recovery plan that actually works.",
    },
    nextResource: {
      title: "Ready to start rebuilding?",
      description: "Our team at Estus Health specialises in autistic burnout recovery. We use neuro-affirming, occupational therapy approaches that help you identify what's draining your battery and build a sustainable way forward, at your pace.",
      cta: "Get in touch with our team",
    },
  },
  shutdown: {
    key: "shutdown",
    name: "The Sudden Shutdown",
    emoji: "\u{1F50C}",
    tagline: "Your system hit the emergency brake",
    hook: "This wasn't a choice. Your nervous system did what it had to do to protect you.",
    description: [
      "Your burnout feels like it came out of nowhere. One day you were functioning, and the next your brain pulled the emergency stop. You may have lost skills you've relied on for years: speaking fluently, managing your emotions, tolerating environments that were previously fine, or simply getting through a normal day. It feels sudden, but the pressure was likely building long before the shutdown.",
      "In this state, your nervous system is in deep protection mode. It's not that you're choosing to withdraw or can't be bothered. Your brain has literally reduced operations to preserve core function. You might experience increased meltdowns or shutdowns, regression in communication or self-care skills, heightened sensory sensitivity, or a profound need to retreat from the world.",
      "The sudden shutdown is actually your brain's most assertive act of self-preservation. It's saying: the demands have exceeded capacity, and I'm taking emergency action. This is not weakness. It's your neurology doing exactly what it's designed to do under unsustainable pressure."
    ],
    strengths: [
      { icon: Zap, label: "Emergency Self-Preservation", description: "Your system has a built-in circuit breaker that protects you from total collapse" },
      { icon: AlertTriangle, label: "Clear Signal Detection", description: "When your limits are hit, you know it immediately and unambiguously" },
      { icon: Brain, label: "Neurological Honesty", description: "Your body won't let you fake being okay when you're not, which is actually protective" },
    ],
    tips: [
      { headline: "Treat This as a Neurological Event", body: "Your brain needs recovery conditions, not pep talks. Approach this the way you would any physical health event: rest, reduced demands, and patience." },
      { headline: "Reduce Demands to the Minimum", body: "Sensory and social demands need to be cut to the absolute minimum possible. This is triage, not laziness. Your nervous system needs space to recover." },
      { headline: "Stop Pushing Through", body: "The shutdown happened because the push-through strategy failed. Recovery means genuinely resting. Do less than you think you need to for longer than feels necessary." },
      { headline: "Communicate Your Needs Clearly", body: "Tell safe people: 'My brain is in recovery mode. I need reduced demands and patience, not solutions or encouragement to push through.' Direct communication saves energy." },
    ],
    insight: "Research on autistic burnout shows that sudden shutdowns are often preceded by a period of increased masking or demand load that went unrecognised. Your brain was sending warning signals: fatigue, irritability, sensory overload, reduced tolerance. But the external pressure to keep performing overrode them. Understanding this pattern is crucial for prevention.",
    shareCaption: "Just found out I'm a Sudden Shutdown on the Autistic Burnout Quiz. My brain didn't break, it hit the emergency brake after too much pressure. Take the free quiz: #AutisticBurnout #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Sudden Shutdown recovery guide",
      description: "Practical steps for creating genuine recovery conditions when your nervous system has hit emergency mode.",
    },
    nextResource: {
      title: "Your brain is asking for help",
      description: "At Estus Health, we understand that autistic shutdown isn't something you can willpower your way out of. Our OTs work with your nervous system to create genuine recovery conditions and build early warning systems for the future.",
      cta: "Get in touch with our team",
    },
  },
  masked: {
    key: "masked",
    name: "The Masked Flame",
    emoji: "\u{1F3AD}",
    tagline: "You're burning out behind a perfect performance",
    hook: "The world sees someone who's coping brilliantly. You know the truth costs more than anyone realises.",
    description: [
      "You're experiencing burnout, but nobody around you would know it. You've built such effective compensation strategies and masking skills that your external performance barely shows the internal deterioration. You still show up, still deliver, still seem capable. But the cost of maintaining that facade is accelerating your burnout rather than resolving it.",
      "The cruel irony of masked burnout is that your competence is being used as evidence that you're fine. Because you can still function in public, people assume you have capacity to spare. But what they don't see is the complete collapse that happens when you're alone: the hours of recovery needed after social interaction, the executive function debt you're accumulating, the slowly shrinking list of things you can actually enjoy.",
      "Your masking ability is genuinely impressive. It represents years of learning, adapting, and performing. But it's also the very thing preventing you from getting the support and rest you need, because it hides the severity of your burnout from others and sometimes from yourself."
    ],
    strengths: [
      { icon: RefreshCw, label: "Adaptive Performance", description: "You can maintain function under pressure that would visibly break others" },
      { icon: Eye, label: "Social Calibration", description: "You read social expectations with remarkable accuracy and respond accordingly" },
      { icon: Heart, label: "Deep Self-Knowledge", description: "You understand the gap between appearance and reality better than most people ever will" },
    ],
    tips: [
      { headline: "Track the Gap", body: "Start tracking the difference between your public performance and your private experience. This gap is the true measure of your burnout, not how well you're functioning externally." },
      { headline: "Practice Selective Unmasking", body: "With safe people, let them see the cost. 'I managed that meeting, but I'm now completely depleted' is honest, not dramatic. Start small and build from there." },
      { headline: "Challenge the Coping Myth", body: "Surviving is not thriving. Your ability to push through doesn't mean you should have to. Coping and being okay are not the same thing." },
      { headline: "Build Decompression Protocols", body: "Schedule non-negotiable recovery time into your day. Not as optional extras, but as essential maintenance that's as important as any meeting or commitment." },
    ],
    insight: "Studies on late-diagnosed autistic adults consistently find that the highest-masking individuals experience the most severe burnout, not because they're more vulnerable, but because their masking delays recognition and intervention. The better you are at hiding it, the longer the burnout continues unchecked. Giving yourself permission to be visibly struggling is paradoxically one of the most powerful recovery tools.",
    shareCaption: "Just found out I'm a Masked Flame on the Autistic Burnout Quiz. Apparently being 'fine' on the outside while collapsing in private has a name. Take the free quiz: #AutisticBurnout #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Masked Flame's guide to sustainable unmasking",
      description: "How to start closing the gap between your public performance and your private reality, safely and at your own pace.",
    },
    nextResource: {
      title: "Let's look behind the mask together",
      description: "Our team at Estus Health specialises in working with high-masking autistic adults who are burning out invisibly. We help you quantify the hidden costs and build a more sustainable way of moving through the world.",
      cta: "Get in touch with our team",
    },
  },
  recovering: {
    key: "recovering",
    name: "The Rising Phoenix",
    emoji: "\u{1F331}",
    tagline: "You're rebuilding, and learning what sustainable actually looks like",
    hook: "You've been through it. Now you're building something that lasts, informed by everything you've learned.",
    description: [
      "You've been through burnout, possibly more than once, and you're now in a phase of recovery and rebuilding. You're starting to understand your autistic neurology better and making deliberate choices about how you spend your energy. This isn't a return to your pre-burnout self; it's the construction of something more sustainable and more authentically you.",
      "Recovery from autistic burnout isn't linear. You likely have days where you feel like yourself again and days where the depletion returns with force. This variability isn't a sign of failure. It's a normal part of neurological recovery. Your brain is recalibrating, and that process has its own timeline that doesn't respond to impatience or pressure.",
      "What makes your current phase powerful is the self-knowledge you've gained. You now have data about your limits, your warning signs, and what genuine rest looks like for your neurology. This knowledge, hard-won through difficult experience, is the foundation for a life that works with your brain rather than against it."
    ],
    strengths: [
      { icon: Sprout, label: "Earned Resilience", description: "You've survived burnout and come out with genuine wisdom about your own neurology" },
      { icon: Lightbulb, label: "Embodied Self-Knowledge", description: "You understand your limits and warning signs from lived experience, not theory" },
      { icon: Target, label: "Intentional Living", description: "You make deliberate choices about energy expenditure rather than running on autopilot" },
    ],
    tips: [
      { headline: "Guard Your Recovering Capacity", body: "Resist the urge to fill returning energy with new demands. Having capacity doesn't mean you need to spend it immediately. Building a buffer prevents the next burnout." },
      { headline: "Create an Early Warning System", body: "Build a personal checklist of your specific warning signs: sleep changes, sensory sensitivity increases, skill regression, social withdrawal. Check in with it weekly." },
      { headline: "Redefine Productivity", body: "Recovery is productive. Rest is productive. Understanding yourself is productive. Don't let neurotypical productivity metrics define your progress or your worth." },
      { headline: "Build at 70% Capacity", body: "Design your new baseline around 70% of your maximum, not 100%. The remaining 30% is your buffer for unexpected demands, difficult days, and the invisible processing your brain does constantly." },
    ],
    insight: "Many autistic adults who've recovered from burnout describe it as a turning point, not because the burnout was positive, but because the recovery process forced them to understand their neurology in ways they never had before. You're not just recovering; you're building a more informed, more boundaried, more authentically autistic life. That's genuinely transformative.",
    shareCaption: "Just found out I'm a Rising Phoenix on the Autistic Burnout Quiz. Recovery isn't going back to who I was. It's building something more sustainable. Take the free quiz: #AutisticBurnout #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Rising Phoenix's guide to burnout-proofing your life",
      description: "How to consolidate your recovery gains and build systems that protect your energy long-term.",
    },
    nextResource: {
      title: "Let's build your sustainable future",
      description: "At Estus Health, we work with autistic adults at every stage of burnout and recovery. Our OTs can help you consolidate what you've learned and build robust systems that protect your energy long-term.",
      cta: "Get in touch with our team",
    },
  },
};

const ARCHETYPE_MAP = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);

const QUESTIONS = [
  { text: "How would you describe your energy levels over the past few months compared to your usual self?", section: 1, options: [
    { text: "Gradually declining \u2013 I've been running on less and less for a long time now", scores: { smouldering: 3 } },
    { text: "Dropped suddenly \u2013 I went from managing to barely functioning in a short period", scores: { shutdown: 3 } },
    { text: "I seem fine to others, but privately I'm exhausted beyond what anyone would guess", scores: { masked: 3 } },
    { text: "Variable \u2013 some days I feel like I'm coming back, other days the depletion hits hard", scores: { recovering: 3 } },
  ]},
  { text: "When you think about your daily tasks and responsibilities, what best describes your experience?", section: 1, options: [
    { text: "Things that used to be easy now require enormous effort \u2013 the bar keeps getting lower", scores: { smouldering: 3 } },
    { text: "I've lost the ability to do things I could previously do without thinking", scores: { shutdown: 3 } },
    { text: "I can still do them, but each one costs far more than it should \u2013 and nobody sees that cost", scores: { masked: 3 } },
    { text: "I'm slowly getting some skills back, but I'm being more careful about how I spend my energy", scores: { recovering: 3 } },
  ]},
  { text: "How does your capacity change throughout a typical day?", section: 1, options: [
    { text: "I start low and stay low \u2013 there's not much variation because everything is depleted", scores: { smouldering: 3 } },
    { text: "I can barely get through essential tasks \u2013 any additional demand feels impossible", scores: { shutdown: 3 } },
    { text: "I perform well during the day but completely collapse when I'm finally alone", scores: { masked: 3 } },
    { text: "I have windows of genuine capacity, but I'm learning not to overdo it when they appear", scores: { recovering: 3 } },
  ]},
  { text: "How has your sensory experience changed recently?", section: 2, options: [
    { text: "My tolerance has been slowly shrinking \u2013 things that were manageable are becoming harder to bear", scores: { smouldering: 3 } },
    { text: "I'm overwhelmed by things that never bothered me before \u2013 it's like my filters have completely failed", scores: { shutdown: 3 } },
    { text: "I manage in public but need to retreat to a controlled environment to recover from sensory exposure", scores: { masked: 3 } },
    { text: "I'm more aware of my sensory needs now and actively managing my environment to protect my capacity", scores: { recovering: 3 } },
  ]},
  { text: "What best describes your emotional state lately?", section: 2, options: [
    { text: "Flat and disconnected \u2013 I don't feel much of anything anymore, including joy", scores: { smouldering: 3 } },
    { text: "Intense and dysregulated \u2013 small things trigger big emotional responses I can't control", scores: { shutdown: 3 } },
    { text: "Contained in public, but volatile or numb in private \u2013 the contrast surprises even me", scores: { masked: 3 } },
    { text: "More regulated than before, but I still have unexpected emotional waves related to what I've been through", scores: { recovering: 3 } },
  ]},
  { text: "How do you feel about social interaction right now?", section: 2, options: [
    { text: "I've been gradually withdrawing \u2013 socialising has become more draining than it used to be", scores: { smouldering: 3 } },
    { text: "I can barely tolerate any social contact \u2013 even messages or calls feel overwhelming", scores: { shutdown: 3 } },
    { text: "I can still socialise when I have to, but the masking required is becoming unsustainable", scores: { masked: 3 } },
    { text: "I'm being more selective about social energy \u2013 choosing connection that genuinely nourishes me", scores: { recovering: 3 } },
  ]},
  { text: "Thinking about skills you've relied on \u2013 cooking, cleaning, personal care, managing admin \u2013 what's happening with them?", section: 3, options: [
    { text: "They're declining slowly \u2013 each week I seem to manage a little less than the week before", scores: { smouldering: 3 } },
    { text: "Several have disappeared almost overnight \u2013 I genuinely can't do things I could do recently", scores: { shutdown: 3 } },
    { text: "I maintain them in visible areas of my life but have let go of everything behind closed doors", scores: { masked: 3 } },
    { text: "Some are coming back, others haven't returned yet \u2013 I'm learning which ones to prioritise", scores: { recovering: 3 } },
  ]},
  { text: "How are you managing with executive function tasks like planning, organising, and decision-making?", section: 3, options: [
    { text: "Everything requires more steps, more reminders, more effort than it should \u2013 my brain feels foggy all the time", scores: { smouldering: 3 } },
    { text: "I can barely make simple decisions \u2013 my brain feels like it's running in safe mode", scores: { shutdown: 3 } },
    { text: "I still appear organised to others, but I'm using every compensatory strategy I have just to keep up appearances", scores: { masked: 3 } },
    { text: "I'm rebuilding my systems with more self-knowledge \u2013 simpler structures that match my actual capacity", scores: { recovering: 3 } },
  ]},
  { text: "What's your relationship with your special interests or hobbies right now?", section: 3, options: [
    { text: "They don't bring me the joy or engagement they used to \u2013 I go through the motions but the spark is dimmer", scores: { smouldering: 3 } },
    { text: "I've lost access to them almost entirely \u2013 I can't engage with things I used to love", scores: { shutdown: 3 } },
    { text: "I use them strategically to recover from masking, but even they feel more like medicine than pleasure", scores: { masked: 3 } },
    { text: "They're starting to feel enjoyable again \u2013 reconnecting with my interests feels like finding myself", scores: { recovering: 3 } },
  ]},
  { text: "How do you feel about your autistic identity in relation to what you're experiencing?", section: 4, options: [
    { text: "I'm starting to realise that what I thought was 'just how life is' might actually be burnout that's been building for years", scores: { smouldering: 3 } },
    { text: "I'm struggling to recognise myself \u2013 I feel like I've lost the person I was before this happened", scores: { shutdown: 3 } },
    { text: "I understand I'm autistic, but I still feel pressure to perform neurotypically \u2013 and that pressure is part of the problem", scores: { masked: 3 } },
    { text: "I'm developing a more honest relationship with my neurology \u2013 learning what I actually need versus what I've been told I should need", scores: { recovering: 3 } },
  ]},
  { text: "When you imagine recovery, what comes to mind?", section: 4, options: [
    { text: "I'm not sure I'd recognise recovery \u2013 I've been depleted for so long that I've forgotten what full capacity feels like", scores: { smouldering: 3 } },
    { text: "I just want to get back to being able to do basic things again \u2013 recovery feels very far away", scores: { shutdown: 3 } },
    { text: "I want to stop having to perform wellness \u2013 I want to actually feel as okay as I look", scores: { masked: 3 } },
    { text: "I'm in it \u2013 it's not what I expected, but I can see progress when I look at where I was versus where I am now", scores: { recovering: 3 } },
  ]},
  { text: "What kind of support feels most relevant to where you are right now?", section: 4, options: [
    { text: "Help recognising that this is burnout and understanding why it's been happening so gradually I didn't see it", scores: { smouldering: 3 } },
    { text: "Practical support to reduce demands and create conditions where my nervous system can begin to recover", scores: { shutdown: 3 } },
    { text: "Permission and strategies to lower the mask \u2013 and support to handle the consequences of being more visibly autistic", scores: { masked: 3 } },
    { text: "Guidance on building a sustainable life that prevents the next burnout while consolidating my recovery", scores: { recovering: 3 } },
  ]},
];

const SECTION_TITLES = {
  1: "Your Energy & Capacity",
  2: "Sensory & Emotional Experience",
  3: "Daily Functioning & Skills",
  4: "Identity & Recovery",
};

const REFERRAL_URL = "https://estushealth.com.au/referral";
const QUIZ_NAME = "Autistic Burnout Quiz";
const QUIZ_SLUG = "burnout-quiz";

export default function BurnoutQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screen, setScreen] = useState("landing");
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ smouldering: 0, shutdown: 0, masked: 0, recovering: 0 });
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
        const finalScores = { smouldering: 0, shutdown: 0, masked: 0, recovering: 0 };
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
      setScores({ smouldering: 0, shutdown: 0, masked: 0, recovering: 0 });
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
    setScores({ smouldering: 0, shutdown: 0, masked: 0, recovering: 0 });
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
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{"\u{1F525}"}</div>
                  <h1>Are You Experiencing Autistic&nbsp;Burnout?</h1>
                  <p className="subtitle">
                    Understand your burnout pattern, and discover strategies that work
                    with your neurology, not against it.
                  </p>
                  <div className="time-badge">{"\u{1F550}"} Takes ~3 minutes {"\u00B7"} 12 questions</div>
                  <br />
                  <div className="landing-notes">
                    <strong style={{ color: "var(--q-dark)" }}>A note before you start:</strong> This quiz isn't a diagnostic tool. It's a reflection exercise designed to help autistic adults (diagnosed or self-identified) understand their relationship with burnout. Autistic burnout is a recognised experience characterised by long-term exhaustion, loss of skills, and reduced tolerance to stimuli. Every result has genuine value, and most people will relate to more than one profile.
                  </div>
                  <button className="btn-primary" onClick={() => transition(() => setScreen("quiz"))}>
                    Explore Your Burnout Profile
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
