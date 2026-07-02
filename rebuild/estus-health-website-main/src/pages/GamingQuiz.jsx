import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Gamepad2, Shield, Heart, Brain, Target, Compass, Eye, Zap, Clock, RefreshCw, Lightbulb, AlertTriangle, Activity, Battery } from "lucide-react";
import QuizResults from "../components/QuizResults";

const ARCHETYPES = {
  deepdiver: {
    key: "deepdiver",
    name: "The Deep Diver",
    emoji: "\u{1F3AE}",
    tagline: "Gaming is your special interest, and that's a genuine strength",
    hook: "Your depth of engagement is not obsession. It's your neurology doing exactly what it does best.",
    description: [
      "Gaming isn't just something you do. It's something you are. You bring the same depth, intensity, and passion to your gaming that characterises a true special interest. You don't just play games; you study them, master them, collect knowledge about them, and find profound satisfaction in the systems, stories, and skills they offer. This kind of deep engagement is a hallmark of autistic passion, and it's genuinely valuable.",
      "Your gaming knowledge is likely extensive and detailed. You might know game mechanics at a level most players never reach, have strong opinions about design philosophy, follow development studios and industry trends, or have built skills like strategic thinking, problem-solving, pattern recognition, and reaction time that transfer well beyond the screen.",
      "For you, gaming provides what every good special interest provides: a reliable source of flow state, intellectual stimulation, emotional regulation, and identity. It's not escapism. It's engagement. The world of gaming makes sense to your brain in a way that other domains might not, and that connection is something to be understood and supported, not pathologised."
    ],
    strengths: [
      { icon: Brain, label: "Systems Mastery", description: "You understand game mechanics at a depth most players never reach" },
      { icon: Target, label: "Flow State Access", description: "You can enter deep focus reliably, a skill that transfers well beyond gaming" },
      { icon: Lightbulb, label: "Knowledge Architecture", description: "You build rich mental models of the systems you engage with" },
    ],
    tips: [
      { headline: "Lean Into Your Special Interest", body: "Deep gaming knowledge and skills are genuinely valuable, whether for career paths, social connection, or personal fulfilment. Own it with confidence." },
      { headline: "Use Gaming as a Regulation Tool", body: "Notice which genres, mechanics, or play styles help you decompress, focus, or regulate your emotions. This self-knowledge is powerful and worth mapping deliberately." },
      { headline: "Watch for the Obligation Trap", body: "If gaming starts to feel like a demand (streaming schedules, guild commitments, completion pressure), it can lose its regulatory benefit. Protect the joy." },
      { headline: "Connect Your Expertise Outward", body: "Consider how your gaming knowledge might link to broader interests or opportunities. Game design, community building, content creation, competitive play, or therapeutic applications are all valid paths." },
    ],
    insight: "Research increasingly recognises that autistic special interests serve crucial neurological functions: they regulate the nervous system, provide cognitive stimulation, build identity, and create social connection. Gaming as a special interest is no different from any other deep passion. It just happens to be one that's often dismissed or pathologised by people who don't understand its genuine value to your neurology.",
    shareCaption: "I'm a Deep Diver on the Gaming & Wellbeing Quiz. My gaming isn't obsession, it's a genuine special interest that serves real neurological functions. Take the free quiz: #GamingWellbeing #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Deep Diver's guide to gaming as a genuine strength",
      description: "A practical framework for leveraging your special interest, protecting its joy, and connecting it to your broader life goals.",
    },
    nextResource: {
      title: "Want to explore how gaming fits into your bigger picture?",
      description: "At Estus Health, we use gaming-informed therapy approaches that honour your special interest. We help you leverage your gaming strengths while building a life that works for your whole neurology.",
      cta: "Get in touch with our team",
    },
  },
  escapist: {
    key: "escapist",
    name: "The Escape Artist",
    emoji: "\u{1F6E1}\uFE0F",
    tagline: "Gaming is your shelter, but the storm is still outside",
    hook: "Your brain found the safest place it could. That's resourcefulness, not weakness.",
    description: [
      "Gaming has become your primary way of avoiding things that feel overwhelming, distressing, or impossible to face. It's not that you don't care about the tasks, responsibilities, or problems you're avoiding. It's that gaming provides a reliable, predictable, controllable environment when everything else feels chaotic, demanding, or threatening. Your brain has found the most effective escape route it can, and it's using it.",
      "The avoidance pattern often looks like this: you know there are things you need to do. You might even want to do them. But the activation energy required to start feels enormous, while gaming requires almost none. It's immediately rewarding, reliably engaging, and demands nothing of you emotionally. So the gap between 'I should do this' and 'I'm gaming instead' keeps growing, and with it comes guilt, shame, and a deepening cycle.",
      "Here's the important reframe: your brain isn't being lazy or irresponsible. It's doing what overwhelmed nervous systems do, seeking the path of least resistance to safety. Gaming provides genuine neurological relief: predictable rules, controllable stimulation, clear feedback, and a temporary reprieve from demands. The problem isn't the gaming itself. It's that the underlying distress or demand overload isn't being addressed."
    ],
    strengths: [
      { icon: Shield, label: "Self-Protective Instinct", description: "Your nervous system knows how to find safety when the world feels too much" },
      { icon: Compass, label: "Environmental Awareness", description: "You can sense when demands exceed your capacity, even before you consciously recognise it" },
      { icon: RefreshCw, label: "Resourceful Coping", description: "You found a reliable regulation strategy on your own, which shows real adaptive intelligence" },
    ],
    tips: [
      { headline: "Name the Avoidance Without Judgement", body: "'I'm gaming because the alternative feels overwhelming right now' is honest, not shameful. Understanding the function is the first step to changing the pattern." },
      { headline: "Address the Demand Load, Not the Gaming", body: "The most effective strategy isn't to restrict gaming. It's to reduce the overwhelm that's driving you toward it. What specific demands are you avoiding, and can any of them be reduced, delegated, or restructured?" },
      { headline: "Try the Ten-Minute Bridge", body: "Before gaming, commit to spending just ten minutes on one avoided task. Not to complete it, just to make contact with it. Often the hardest part is starting, and even brief engagement reduces the avoidance momentum." },
      { headline: "Build Session Awareness", body: "Notice when you're gaming from choice versus gaming from avoidance. They feel different internally, even if they look the same externally. Tracking this distinction builds insight over time." },
    ],
    insight: "Avoidance-driven gaming in autistic adults is often misdiagnosed as 'gaming addiction' when it's actually a symptom of demand overload, executive function challenges, or unaddressed burnout. The gaming isn't the problem. It's the most visible symptom of a nervous system that needs support. Treat the underlying overwhelm, and the compulsive quality of the gaming often resolves naturally.",
    shareCaption: "I'm an Escape Artist on the Gaming & Wellbeing Quiz. My gaming isn't laziness, it's my nervous system seeking safety from overwhelm. Take the free quiz: #GamingWellbeing #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Escape Artist's guide to addressing what's underneath",
      description: "Practical steps for reducing demand overload and rebuilding your relationship with gaming from avoidance to choice.",
    },
    nextResource: {
      title: "Let's address what's underneath the gaming",
      description: "Our team at Estus Health uses gaming-informed approaches to understand your relationship with gaming without judgement. We help you address the demands and distress driving the avoidance pattern.",
      cta: "Get in touch with our team",
    },
  },
  balanced: {
    key: "balanced",
    name: "The Balanced Player",
    emoji: "\u{2696}\uFE0F",
    tagline: "Gaming serves you well, with a few patterns worth watching",
    hook: "You've found a rhythm that mostly works. The skill now is noticing when it starts to shift.",
    description: [
      "Your relationship with gaming has elements of both genuine special interest and occasional avoidance, and overall you're managing the balance reasonably well. You enjoy gaming deeply and it provides real benefits to your wellbeing: regulation, stimulation, social connection, and joy. At the same time, you're honest enough to recognise that sometimes you game when you probably shouldn't, or use it to put off things that feel hard.",
      "This mixed profile is actually the most common one among autistic gamers, and it's not a problem to solve. It's a balance to maintain. Most people who have a genuine special interest in gaming will sometimes use it as an escape, just as someone whose special interest is reading might retreat into books when life gets hard. The question isn't whether this ever happens, but whether it's happening in a way that consistently undermines your wellbeing or goals.",
      "Your self-awareness about the dual nature of your gaming is a significant strength. You can distinguish between gaming that nourishes you and gaming that's hiding you, and that distinction is the key to maintaining a healthy, sustainable relationship with something you genuinely love."
    ],
    strengths: [
      { icon: Activity, label: "Self-Monitoring", description: "You can read your own patterns and notice when the balance starts to shift" },
      { icon: Heart, label: "Honest Self-Reflection", description: "You're willing to look at your gaming habits without defensiveness or denial" },
      { icon: Eye, label: "Dual Awareness", description: "You understand the difference between gaming that nourishes and gaming that hides" },
    ],
    tips: [
      { headline: "Develop a Check-In Habit", body: "Before a gaming session, briefly ask yourself 'Am I choosing this or avoiding something?' No judgement either way, just awareness. This simple practice maintains the balance." },
      { headline: "Protect the Joy", body: "Protect the joy of gaming as a special interest by being honest about when it shifts into avoidance. The two feel different, and honouring that difference keeps gaming positive." },
      { headline: "Use Gaming as a Deliberate Reward", body: "'I'll do this task, then game for an hour' works well for many autistic brains because it pairs a demand with a reliable reward. Structure supports sustainability." },
      { headline: "Monitor Your Baseline", body: "If the balance starts tipping more toward avoidance than enjoyment, take it as a signal that your demand load needs attention, not that gaming needs restricting." },
    ],
    insight: "The key insight for balanced gamers is that the goal isn't to eliminate the avoidance function of gaming. It's to ensure it doesn't become the primary function. A special interest that occasionally serves as a refuge is healthy. A refuge that occasionally feels like a special interest is a warning sign. You currently sit on the healthier side of that spectrum, and understanding what tips the balance helps you stay there.",
    shareCaption: "I'm a Balanced Player on the Gaming & Wellbeing Quiz. Gaming serves me well, and now I know the patterns worth watching. Take the free quiz: #GamingWellbeing #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Balanced Player's guide to maintaining your rhythm",
      description: "How to protect the joy of gaming as a special interest while catching early signs that the balance is shifting.",
    },
    nextResource: {
      title: "Want to optimise your gaming balance?",
      description: "At Estus Health, our gaming-informed therapists understand the nuance of your relationship with gaming. We can help you strengthen the patterns that serve you and address the ones that don't.",
      cta: "Get in touch with our team",
    },
  },
  burnedout: {
    key: "burnedout",
    name: "The Burnt Controller",
    emoji: "\u{1F6A8}",
    tagline: "Gaming has shifted from nourishing to numbing",
    hook: "This isn't about willpower. Your nervous system is running on the only fuel it can find.",
    description: [
      "Your gaming has moved past special interest and past occasional avoidance into something that's actively impacting your health, relationships, daily functioning, or sense of self. You might be gaming for hours longer than you intend, neglecting basic needs like sleep, food, hygiene, or responsibilities, and feeling worse, not better, after long sessions. The thing that used to help regulate you is now dysregulating you.",
      "This pattern often develops gradually. Gaming started as something genuinely enjoyable and regulating. Then life got harder: demands increased, burnout set in, mental health declined, or supports fell away. Gaming became the primary coping mechanism because nothing else was accessible. Over time, the dose needed to achieve the same relief kept increasing, while the relief itself kept decreasing. You're now gaming compulsively, not enjoyably.",
      "It's crucial to understand that this isn't a moral failing or a lack of willpower. Your nervous system found the most reliable source of dopamine, predictability, and escape available to it, and it's clinging to it because the alternatives feel impossible. The compulsive quality of your gaming is a symptom of unmet needs and overwhelm, not a character flaw."
    ],
    strengths: [
      { icon: Battery, label: "Survival Intelligence", description: "Your brain found the most accessible source of regulation when everything else felt impossible" },
      { icon: AlertTriangle, label: "Signal Clarity", description: "The intensity of your gaming pattern is a clear signal that something deeper needs attention" },
      { icon: Zap, label: "Dopamine Resourcefulness", description: "You know how to access reward and stimulation, a skill that can be redirected once the pressure eases" },
    ],
    tips: [
      { headline: "Start With Compassion, Not Restriction", body: "Trying to simply stop or reduce gaming without addressing what's driving it usually triggers more distress and stronger rebound gaming. Understand the 'why' first." },
      { headline: "Protect One Basic Need", body: "Identify the basic need that gaming is displacing most: sleep, nutrition, movement, hygiene, or social connection. Pick the one that feels most manageable and commit to protecting it. Not perfectly, just consistently." },
      { headline: "Seek Neuro-Informed Support", body: "Look for support specifically from someone who understands both gaming and neurodivergence. Generic 'screen time' advice or addiction frameworks often miss the autistic context entirely." },
      { headline: "Notice the Quality Shift", body: "Track the difference between gaming that leaves you feeling regulated and gaming that leaves you feeling hollow. The first is still serving a function. The second is the compulsive pattern that needs attention." },
    ],
    insight: "What's often labelled 'gaming addiction' in autistic adults is frequently a combination of autistic burnout, demand avoidance, executive function challenges, and a lack of alternative regulation strategies. The gaming isn't the core problem. It's the most visible symptom of a system under stress. Effective support addresses the underlying neurology, not just the screen time.",
    shareCaption: "I'm a Burnt Controller on the Gaming & Wellbeing Quiz. My compulsive gaming isn't a character flaw, it's a signal my nervous system needs support. Take the free quiz: #GamingWellbeing #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Burnt Controller's guide to rebuilding from the inside out",
      description: "Practical, compassionate steps for understanding what's driving compulsive gaming and building genuine alternatives that work for your brain.",
    },
    nextResource: {
      title: "You deserve support that actually understands this",
      description: "At Estus Health, we specialise in gaming-informed, neuro-affirming therapy. We won't tell you to just stop gaming. We'll help you understand what's driving the pattern and build genuine alternatives that work for your brain.",
      cta: "Get in touch with our team",
    },
  },
};

const ARCHETYPE_MAP = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);

const QUESTIONS = [
  // Section 1: Your Gaming Patterns (3 questions)
  {
    text: "Think about a typical week. What best describes your gaming pattern?",
    section: 1,
    options: [
      { text: "I have dedicated gaming time that I look forward to. It's a valued part of my routine", scores: { deepdiver: 3 } },
      { text: "I often find myself gaming when I know there are other things I should be doing", scores: { escapist: 3 } },
      { text: "It varies. Sometimes I game because I want to, sometimes because I'm avoiding something else", scores: { balanced: 3 } },
      { text: "I game for much longer than I intend to, and it's hard to stop even when I want to", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "When you sit down to game, what's usually driving the decision?",
    section: 1,
    options: [
      { text: "Genuine excitement about what I'm playing. A new challenge, a game I'm invested in, or a skill I'm developing", scores: { deepdiver: 3 } },
      { text: "The need to not think about something else. Gaming quiets the noise of demands I can't face", scores: { escapist: 3 } },
      { text: "A mix. Sometimes it's enthusiasm, sometimes it's 'I'll do that hard thing after one more game'", scores: { balanced: 3 } },
      { text: "I'm not always sure. I often end up gaming almost automatically, without a clear decision to start", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "How do you feel when you finish a gaming session?",
    section: 1,
    options: [
      { text: "Satisfied and recharged, like I've spent time doing something I genuinely value", scores: { deepdiver: 3 } },
      { text: "Temporarily relieved, but the things I was avoiding are still there, sometimes with added guilt", scores: { escapist: 3 } },
      { text: "Usually good, though occasionally I notice I used gaming to dodge something I should have dealt with", scores: { balanced: 3 } },
      { text: "Often drained, guilty, or hollow. The gaming didn't actually make me feel better, but I couldn't stop", scores: { burnedout: 3 } },
    ],
  },
  // Section 2: Motivation & Emotion (3 questions)
  {
    text: "What role does gaming play in your emotional life?",
    section: 2,
    options: [
      { text: "It's a rich source of joy, flow, and intellectual stimulation. I genuinely love the worlds and systems games offer", scores: { deepdiver: 3 } },
      { text: "It's primarily a way to escape distress, overwhelm, or the weight of real-life demands", scores: { escapist: 3 } },
      { text: "It serves both purposes. Sometimes it's pure enjoyment, sometimes it's emotional shelter", scores: { balanced: 3 } },
      { text: "It used to bring joy but now it's more about numbing or filling time. The pleasure has faded but I keep going", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "How do you engage with gaming knowledge and culture outside of actually playing?",
    section: 2,
    options: [
      { text: "Extensively. I follow gaming news, discuss strategies, watch content, and build deep knowledge about games I love", scores: { deepdiver: 3 } },
      { text: "Not much. Gaming is more about the in-the-moment relief than a broader interest I engage with outside sessions", scores: { escapist: 3 } },
      { text: "Moderately. I enjoy gaming content and conversations but it's one interest among several", scores: { balanced: 3 } },
      { text: "I used to, but I've lost interest in the broader gaming world. Now I mostly just play to pass time or cope", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "If someone suggested you take a full week off from gaming, how would you honestly react?",
    section: 2,
    options: [
      { text: "I'd miss it like I'd miss any special interest, but I could manage. I'd find other things to engage with", scores: { deepdiver: 3 } },
      { text: "I'd feel anxious about losing my main coping strategy. What would I do when things feel overwhelming?", scores: { escapist: 3 } },
      { text: "I'd be a bit uncomfortable but could probably do it. I have other ways to unwind and regulate", scores: { balanced: 3 } },
      { text: "The thought is genuinely distressing. I'm not sure how I'd get through a day without it right now", scores: { burnedout: 3 } },
    ],
  },
  // Section 3: Impact on Daily Life (3 questions)
  {
    text: "How is gaming affecting your daily responsibilities and self-care?",
    section: 3,
    options: [
      { text: "It doesn't interfere. I manage my responsibilities and gaming fits around them comfortably", scores: { deepdiver: 3 } },
      { text: "I regularly delay or skip tasks because gaming feels easier. The avoidance is the bigger issue, not the gaming itself", scores: { escapist: 3 } },
      { text: "Mostly manageable, but I occasionally notice gaming eating into time I should spend on other things", scores: { balanced: 3 } },
      { text: "Basic things are slipping. Sleep, meals, hygiene, work, or relationships are being affected by how much I game", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "What's happening with your sleep in relation to gaming?",
    section: 3,
    options: [
      { text: "I generally maintain good sleep habits and wrap up gaming at a reasonable time", scores: { deepdiver: 3 } },
      { text: "I sometimes stay up late gaming because I'm dreading the next day's demands", scores: { escapist: 3 } },
      { text: "Occasionally I lose track of time and stay up later than I planned, but it's not a frequent pattern", scores: { balanced: 3 } },
      { text: "My sleep is regularly disrupted by gaming. I often game late into the night and struggle to stop", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "How do the important people in your life view your gaming?",
    section: 3,
    options: [
      { text: "They understand it's a passion. Even if they don't share it, they respect how important it is to me", scores: { deepdiver: 3 } },
      { text: "There's tension. They see me gaming when things aren't getting done and it causes friction", scores: { escapist: 3 } },
      { text: "Mixed. Generally accepting, but occasionally concerned when they notice it increasing during stressful times", scores: { balanced: 3 } },
      { text: "It's a significant source of conflict. People close to me are worried, frustrated, or have pulled away", scores: { burnedout: 3 } },
    ],
  },
  // Section 4: Self-Awareness & Wellbeing (3 questions)
  {
    text: "When you're honest with yourself, which statement resonates most?",
    section: 4,
    options: [
      { text: "Gaming is one of the best things in my life. It brings genuine fulfilment and I'm proud of my knowledge and skills", scores: { deepdiver: 3 } },
      { text: "I know I'm using gaming to hide from things, but I don't know how else to cope with the overwhelm", scores: { escapist: 3 } },
      { text: "I enjoy gaming and mostly manage the balance, but I could be more honest about when it tips into avoidance", scores: { balanced: 3 } },
      { text: "Gaming isn't really making me happy anymore, but I can't seem to stop. Something needs to change", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "How does your gaming relate to your physical health and wellbeing?",
    section: 4,
    options: [
      { text: "I'm reasonably aware of my physical needs and take breaks, move around, and look after myself alongside gaming", scores: { deepdiver: 3 } },
      { text: "I tend to ignore physical needs when I'm deep in gaming. Eating, moving, and stretching fall away", scores: { escapist: 3 } },
      { text: "I'm usually okay but notice that during heavy gaming periods my physical habits slip a bit", scores: { balanced: 3 } },
      { text: "My physical health has noticeably declined. Less movement, worse nutrition, more pain, disrupted sleep patterns", scores: { burnedout: 3 } },
    ],
  },
  {
    text: "What kind of support would be most helpful for you right now?",
    section: 4,
    options: [
      { text: "Validation that my gaming is a legitimate special interest and help connecting it to broader life goals", scores: { deepdiver: 3 } },
      { text: "Help addressing the demands and overwhelm that make me retreat into gaming. The gaming itself isn't the core issue", scores: { escapist: 3 } },
      { text: "Strategies for maintaining my current balance and catching early signs when gaming starts serving avoidance more than enjoyment", scores: { balanced: 3 } },
      { text: "Genuine, non-judgemental support to understand why gaming has become compulsive and to rebuild other parts of my life", scores: { burnedout: 3 } },
    ],
  },
];

const SECTION_TITLES = {
  1: "Your Gaming Patterns",
  2: "Motivation & Emotion",
  3: "Impact on Daily Life",
  4: "Self-Awareness & Wellbeing",
};

const REFERRAL_URL = "https://estushealth.com.au/referral";
const QUIZ_NAME = "Gaming & Wellbeing Quiz";
const QUIZ_SLUG = "gaming-quiz";

export default function GamingQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screen, setScreen] = useState("landing");
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ deepdiver: 0, escapist: 0, balanced: 0, burnedout: 0 });
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
        const finalScores = { deepdiver: 0, escapist: 0, balanced: 0, burnedout: 0 };
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
      setScores({ deepdiver: 0, escapist: 0, balanced: 0, burnedout: 0 });
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
    setScores({ deepdiver: 0, escapist: 0, balanced: 0, burnedout: 0 });
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
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{"\u{1F3AE}"}</div>
                  <h1>Gaming: Special Interest or&nbsp;Avoidance?</h1>
                  <p className="subtitle">
                    Explore your relationship with gaming. Understand whether it's nourishing you,
                    shielding you, or something that needs attention.
                  </p>
                  <div className="time-badge">{"\u{1F550}"} Takes ~3 minutes {"\u00B7"} 12 questions</div>
                  <br />
                  <div className="landing-notes">
                    <strong style={{ color: "var(--q-dark)" }}>A note before you start:</strong> This quiz isn't about whether gaming is 'good' or 'bad'. It's about understanding the role it plays in your life right now. For many autistic people, gaming is a genuine special interest that provides regulation, joy, and connection. For others, it can become a primary avoidance strategy when demands feel overwhelming. Most gamers will recognise elements of more than one profile, and your relationship with gaming can change over time.
                  </div>
                  <button className="btn-primary" onClick={() => transition(() => setScreen("quiz"))}>
                    Explore Your Gaming Profile
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
