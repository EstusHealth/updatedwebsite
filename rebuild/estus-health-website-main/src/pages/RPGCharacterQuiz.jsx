import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Shield, Sword, BookOpen, Music, Heart, Eye, Brain, Target, Compass, Lightbulb, Users, Zap, Scale, RefreshCw } from "lucide-react";
import QuizResults from "../components/QuizResults";

const ARCHETYPES = {
  paladin: {
    key: "paladin",
    name: "The Paladin",
    emoji: "\u{1F6E1}\uFE0F",
    tagline: "Heart of gold, spine of steel. You protect what matters.",
    hook: "Your loyalty and sense of justice are not performance. They are core architecture, and learning to protect yourself as fiercely as you protect others is the real quest.",
    description: [
      "You're the one people turn to when things fall apart. Not because you have all the answers, but because you show up, reliably, steadily, and with a moral compass that rarely wavers. In a D&D party, you'd be the one standing between the dragon and your friends, not out of recklessness, but because protecting people is wired into who you are. Your loyalty isn't performative. It's structural.",
      "Your sense of justice runs deep. You notice when things aren't fair, in systems, in relationships, in how people are treated, and it genuinely bothers you. This can be a tremendous strength: you advocate fiercely, you hold boundaries others won't, and you bring a sense of safety to the people around you. But it can also be exhausting. Carrying the shield for everyone means you sometimes forget to check your own HP.",
      "For many neurodivergent people, the Paladin archetype reflects a pattern of hypervigilance around fairness and responsibility that developed early. You learned to be the reliable one, the protector, the person who holds things together. That's admirable, and it's also worth asking who's holding things together for you."
    ],
    strengths: [
      { icon: Shield, label: "Unwavering Loyalty", description: "You show up for the people you care about with a consistency that builds genuine trust" },
      { icon: Scale, label: "Justice Sensitivity", description: "You notice unfairness others overlook and advocate fiercely to make things right" },
      { icon: Heart, label: "Protective Instinct", description: "You create safety for others by holding boundaries and standing firm under pressure" },
    ],
    tips: [
      { headline: "Rest at the Inn", body: "Your protective instincts are a genuine strength, but even Paladins need to rest. You cannot tank every encounter if your own resources are depleted. Schedule recovery as seriously as you schedule showing up for others." },
      { headline: "Pick Your Quests Wisely", body: "Notice when your sense of justice becomes a demand you place on yourself. Fighting every battle isn't noble, it's unsustainable. Focus your energy on the quests that matter most and let the side missions go." },
      { headline: "Trust Your Party", body: "Let other people carry weight sometimes. Delegating isn't abandoning your role. It's trusting your allies, and that trust is its own kind of strength." },
      { headline: "Extend Loyalty Inward", body: "Your consistency and reliability are rare gifts. Make sure you're extending that same care and loyalty to yourself, not just everyone around you. You deserve the protection you give others." },
    ],
    insight: "The Paladin archetype in neurodivergent people often maps to a strong sense of justice sensitivity, the deep, sometimes overwhelming awareness of unfairness that many autistic people experience. This isn't a character flaw or being 'too sensitive.' It's a neurological trait that, when understood and channelled well, becomes one of your greatest assets. The key is learning when to raise the shield and when to set it down.",
    shareCaption: "I got The Paladin on the RPG Character Build Quiz. Turns out my fierce loyalty and justice sensitivity are neurodivergent superpowers. Take the free quiz: #RPGCharacter #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Paladin's guide to sustainable protection",
      description: "A practical framework for channelling your justice sensitivity and protective instincts without burning through your own hit points.",
    },
    nextResource: {
      title: "Ready to explore your strengths with someone who gets it?",
      description: "At Estus Health, we understand that the traits that make you a protector can also leave you running on empty. We help you build sustainable strategies that honour your values without burning through your hit points.",
      cta: "Get in touch with our team",
    },
  },
  rogue: {
    key: "rogue",
    name: "The Rogue",
    emoji: "\u{1F5E1}\uFE0F",
    tagline: "You don't follow the path. You find a better one.",
    hook: "Your lateral thinking and adaptability are not defiance. They are a different kind of intelligence, and the world needs more of it.",
    description: [
      "You see angles that other people miss. While the rest of the party is debating whether to charge through the front door, you've already found the window, mapped the guard rotation, and identified three escape routes. Your brain works fast, laterally, and with a healthy disregard for 'the way things are supposed to be done.' In a world built for linear thinkers, you're beautifully diagonal.",
      "Adaptability is your superpower. You can read a room, shift your approach mid-conversation, and improvise solutions that nobody else would think of. You're resourceful under pressure and you thrive when you have autonomy. Rules that don't make sense? You'll find a workaround. Systems that are broken? You'll hack them. You're not being defiant. You're being efficient.",
      "The shadow side of the Rogue is that this constant adaptation can be isolating. You might feel like you're always operating slightly outside the group, even when you're technically part of it. Your independent streak is genuine, but it can sometimes mask a need for connection that you've learned to downplay. The lone wolf strategy works, until it doesn't."
    ],
    strengths: [
      { icon: Eye, label: "Pattern Recognition", description: "You spot alternative paths and hidden angles that others walk straight past" },
      { icon: Compass, label: "Radical Adaptability", description: "You shift strategies mid-situation with a speed and creativity that keeps you ahead" },
      { icon: Zap, label: "Resourceful Under Pressure", description: "When the plan falls apart, you improvise solutions nobody else would think of" },
    ],
    tips: [
      { headline: "Trust Your Diagonal Thinking", body: "Your ability to see alternative paths is genuinely valuable. You're not being difficult when you question the obvious approach. You're often seeing something others have missed. Trust that instinct." },
      { headline: "Watch for the Stealth Tax", body: "Constantly adapting and masking to fit different situations is exhausting. Find spaces where you can drop the disguise and just be yourself. That recovery time is not optional." },
      { headline: "Independence Is Not Isolation", body: "Your independent streak is a strength, but isolation is a risk. You don't have to join every party, but having a few trusted allies makes the adventure significantly better." },
      { headline: "Channel Your Pattern Recognition", body: "Your lateral thinking and pattern recognition are cognitive gifts. Direct them toward problems that genuinely interest you, and you'll be surprised how far they take you." },
    ],
    insight: "The Rogue archetype often reflects the autistic experience of navigating a world that wasn't designed for your operating system. The adaptability, the pattern recognition, the slight outsider perspective: these aren't signs of not fitting in. They're signs of a brain that processes differently, and often more creatively, than the mainstream expects. Many Rogues have spent years masking without realising it. Understanding this can be genuinely liberating.",
    shareCaption: "I got The Rogue on the RPG Character Build Quiz. My lateral thinking and adaptability are how my neurodivergent brain navigates the world. Take the free quiz: #RPGCharacter #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Rogue's guide to authentic adaptability",
      description: "How to channel your lateral thinking intentionally rather than reactively, and reduce the cognitive load of constant adaptation.",
    },
    nextResource: {
      title: "Want to stop masking and start strategising?",
      description: "At Estus Health, we help Rogues channel their adaptability intentionally rather than reactively. We understand the cognitive load of constant adaptation and can help you build a life that requires less stealth and more authenticity.",
      cta: "Get in touch with our team",
    },
  },
  wizard: {
    key: "wizard",
    name: "The Wizard",
    emoji: "\u{1F9D9}",
    tagline: "Knowledge is your magic, and your brain never stops casting.",
    hook: "Your deep focus and systematic thinking are not obsession. They are a different distribution of attention that allows for extraordinary depth.",
    description: [
      "Your mind is a library that never closes. You collect knowledge the way other people collect belongings, voraciously, systematically, and with a depth that genuinely surprises people. In a D&D party, you're the one who knows the lore, understands the mechanics, and has probably read the Monster Manual cover to cover. Twice. Your special interests aren't hobbies. They're deep dives into entire knowledge systems.",
      "You think in systems. Where others see isolated events, you see patterns, connections, and underlying structures. This makes you exceptional at analysis, problem-solving, and understanding complex topics at a level that most people never reach. You might be the person everyone comes to when they need something explained, researched, or figured out, because your brain doesn't just learn things, it maps them.",
      "The challenge for Wizards is that your intellectual intensity can sometimes feel alienating. You might struggle with small talk when your brain wants to discuss the deep stuff. You might feel frustrated when others don't share your need for accuracy or depth. And you might find it hard to switch off, because a brain that loves learning doesn't come with an off switch."
    ],
    strengths: [
      { icon: Brain, label: "Systems Thinking", description: "You see patterns, connections, and structures where others see only isolated events" },
      { icon: BookOpen, label: "Deep Knowledge", description: "You master topics at a level of depth and accuracy that most people never reach" },
      { icon: Lightbulb, label: "Analytical Precision", description: "You break down complex problems into clear, logical components and find the optimal path" },
    ],
    tips: [
      { headline: "Protect Your Deep-Dive Time", body: "Create deliberate 'spellbook time' for your special interests. Scheduling deep-dive sessions protects them from being crowded out by demands, and gives your brain the stimulation it genuinely needs." },
      { headline: "Watch for Analysis Paralysis", body: "Sometimes you need to cast the spell before you've read every scroll. Good enough is sometimes better than perfect, especially for low-stakes decisions. Save your analytical power for what truly matters." },
      { headline: "Don't Dim Your Depth", body: "Your deep knowledge and systematic thinking are genuine cognitive strengths. Don't dim them down because others find them intimidating. Find people who appreciate the depth." },
      { headline: "Gauge Your Audience", body: "Your need for accuracy and depth isn't pedantic. It's how your brain builds understanding. But learn to gauge when others need the full lecture versus the executive summary. Both skills serve you well." },
    ],
    insight: "The Wizard archetype maps directly to what researchers call 'monotropism,' the tendency toward deep, focused attention on specific interests. This isn't a deficit in attention. It's a different distribution of attention, one that allows for extraordinary depth at the cost of breadth. Understanding this about yourself can transform how you approach work, study, relationships, and self-care. Your brain isn't scattered or obsessive. It's specialised.",
    shareCaption: "I got The Wizard on the RPG Character Build Quiz. My deep focus and systematic thinking are how my neurodivergent brain makes sense of the world. Take the free quiz: #RPGCharacter #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Wizard's guide to leveraging deep focus",
      description: "How to build a life that works with your monotropic brain, not against it, and turn your depth of knowledge into your greatest asset.",
    },
    nextResource: {
      title: "Ready to understand your cognitive architecture?",
      description: "At Estus Health, we help Wizards understand and leverage their unique cognitive profile. We don't try to make you more 'balanced.' We help you build a life that works with your deep-focus brain, not against it.",
      cta: "Get in touch with our team",
    },
  },
  bard: {
    key: "bard",
    name: "The Bard",
    emoji: "\u{1F3B6}",
    tagline: "You feel everything deeply, and turn it into something meaningful.",
    hook: "Your emotional depth and creative sensitivity are not weaknesses to manage. They are high-bandwidth processing that the world genuinely needs.",
    description: [
      "You experience the world at high resolution. Emotions, atmospheres, subtexts, the energy in a room: you pick up on things that others walk straight past. In a D&D party, you're the one who notices the NPC is lying, who smooths over the argument between the Fighter and the Cleric, and who somehow makes the whole group feel like they belong. Your emotional intelligence isn't just a skill. It's a sensory system.",
      "Creativity flows naturally from you, whether that looks like art, music, writing, problem-solving, humour, or simply the way you connect with people. You have an intuitive understanding of narrative, in stories, in relationships, in life. You see meaning where others see randomness, and you have a gift for helping others see it too. People are often drawn to you because you make them feel understood.",
      "The Bard's challenge is intensity. Feeling everything deeply is a gift until it becomes overwhelming. You might absorb other people's emotions, struggle to set boundaries, or find yourself performing for others at the expense of your own needs. Sensory and emotional overwhelm can hit hard when you're always running with the volume turned up. Your empathy is a superpower, but it needs its own HP management."
    ],
    strengths: [
      { icon: Music, label: "Emotional Intelligence", description: "You read atmospheres, subtexts, and unspoken dynamics with remarkable accuracy" },
      { icon: Users, label: "Deep Connection", description: "You make people feel genuinely understood and create belonging wherever you go" },
      { icon: RefreshCw, label: "Creative Translation", description: "You turn complex feelings and experiences into meaning that others can access" },
    ],
    tips: [
      { headline: "Honour Your Emotional Depth", body: "Your emotional depth and creativity are genuine strengths, not weaknesses to manage. The world needs people who feel things deeply and can translate those feelings into connection and meaning." },
      { headline: "Schedule Your Long Rests", body: "Build in regular recovery time for sensory and emotional processing. You take in more than most people, and that processing needs space. Solitude isn't antisocial for you. It's maintenance." },
      { headline: "Check Whose Feelings You're Carrying", body: "You likely absorb emotions from people around you without realising it. Regular check-ins with yourself ('Is this feeling mine?') can be genuinely transformative for managing your energy." },
      { headline: "Turn the Perception Dial Down Sometimes", body: "Your ability to read people and situations is a real skill. Trust it. But learn when to turn the dial down. Not every room needs to be fully read, and not every subtext needs to be decoded." },
    ],
    insight: "The Bard archetype often reflects heightened interoception and emotional processing that many neurodivergent people experience. This isn't being 'too sensitive' or 'too emotional.' It's having a nervous system that processes social and emotional information at a higher bandwidth than average. Research shows this kind of empathic depth is neurologically real, not imagined. Understanding it as a feature of your neurology, rather than a personality flaw, changes everything.",
    shareCaption: "I got The Bard on the RPG Character Build Quiz. My emotional depth and creative sensitivity are how my neurodivergent brain experiences the world. Take the free quiz: #RPGCharacter #Neurodivergent #EstusHealth",
    emailCTA: {
      headline: "The Bard's guide to sustainable emotional depth",
      description: "How to harness your high-bandwidth emotional processing without burning out, and protect the sensitivity that makes you extraordinary.",
    },
    nextResource: {
      title: "Want to harness your emotional depth without burning out?",
      description: "At Estus Health, we help Bards build sustainable strategies for managing their high-bandwidth emotional processing. We understand that your sensitivity is a strength, and we help you protect it.",
      cta: "Get in touch with our team",
    },
  },
};

const ARCHETYPE_MAP = Object.fromEntries(
  Object.entries(ARCHETYPES).map(([k, v]) => [k, { name: v.name, emoji: v.emoji }])
);

const QUESTIONS = [
  // Section 1: Your Adventuring Style (3 questions)
  {
    text: "Your party arrives at a fork in the dungeon. One path is well-lit and mapped. The other is dark, unmapped, but you can hear something interesting. What do you do?",
    section: 1,
    options: [
      { text: "Take the mapped path. No point risking the party's safety on curiosity alone", scores: { paladin: 3, rogue: 0, wizard: 1, bard: 0 } },
      { text: "Scout the dark path alone first. If it's dangerous, only I'm at risk", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Investigate that sound carefully. Unknown paths often hold the most valuable discoveries", scores: { paladin: 0, rogue: 1, wizard: 3, bard: 0 } },
      { text: "Ask the group how they're feeling about it. The best path is the one everyone's comfortable with", scores: { paladin: 1, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "You find a mysterious spellbook in an abandoned tower. The text is in a language you don't know. Your instinct is to...",
    section: 1,
    options: [
      { text: "Secure it carefully and bring it back to someone who can translate it safely. Unknown magic is dangerous", scores: { paladin: 3, rogue: 0, wizard: 1, bard: 0 } },
      { text: "Pocket it quietly. Could be valuable, could be useful. Either way it's better in my hands than left here", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Sit down and start trying to decode it immediately. This is the most exciting thing that's happened all week", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 1 } },
      { text: "Read it aloud and see what happens. Life's too short for caution when there's magic involved", scores: { paladin: 0, rogue: 1, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "In real life, when you face a new challenge or unfamiliar situation, your first move is usually to...",
    section: 1,
    options: [
      { text: "Figure out who might be affected and what I need to do to make sure things go smoothly for everyone", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 1 } },
      { text: "Assess the situation quickly, identify my options, and stay flexible. Plans change, and I adapt", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Research it thoroughly before acting. I need to understand something before I can engage with it properly", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 0 } },
      { text: "Check in with my gut feeling and the people around me. I trust my instincts and I read the room", scores: { paladin: 1, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  // Section 2: Party Dynamics (3 questions)
  {
    text: "Two members of your adventuring party are having a heated argument about strategy. You...",
    section: 2,
    options: [
      { text: "Step in and mediate. Someone needs to keep this group together, and that someone is usually me", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 1 } },
      { text: "Let them sort it out while I quietly work on a backup plan in case their argument delays us", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Point out that both arguments have logical flaws and suggest a third option based on the actual evidence", scores: { paladin: 0, rogue: 1, wizard: 3, bard: 0 } },
      { text: "Read the emotional undercurrent. The argument probably isn't really about strategy. Address what's actually going on", scores: { paladin: 1, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "Your ideal role in any group, real life or game, is best described as...",
    section: 2,
    options: [
      { text: "The anchor. I'm the one people count on to be steady, fair, and present when things get difficult", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 1 } },
      { text: "The wild card. I bring ideas and solutions nobody else would think of, and I work best with freedom", scores: { paladin: 0, rogue: 3, wizard: 0, bard: 1 } },
      { text: "The strategist. I see the big picture, understand the systems at play, and plan the best path forward", scores: { paladin: 0, rogue: 1, wizard: 3, bard: 0 } },
      { text: "The heart. I keep the group connected, motivated, and aware of each other's needs", scores: { paladin: 1, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "A friend messages you at midnight saying they're having a really hard time. You...",
    section: 2,
    options: [
      { text: "Drop everything and respond immediately. When someone needs help, that takes priority over my own comfort", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 1 } },
      { text: "Respond with something practical and helpful. Empathy is good, but what they probably need is a solution", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Try to understand the full context first before responding. I want to give advice that's actually accurate, not just comforting", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 0 } },
      { text: "Send a voice message letting them know I hear them and I'm here. Sometimes people just need to feel less alone", scores: { paladin: 0, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  // Section 3: Your Inner Quest (3 questions)
  {
    text: "If your brain were a D&D stat block, your highest stat would honestly be...",
    section: 3,
    options: [
      { text: "Constitution. I can endure things that would break other people. I keep going when it gets hard", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 1 } },
      { text: "Dexterity. I'm quick, adaptive, and I can dodge problems that would hit others head-on", scores: { paladin: 0, rogue: 3, wizard: 0, bard: 0 } },
      { text: "Intelligence. I learn fast, think deeply, and understand systems that confuse most people", scores: { paladin: 0, rogue: 1, wizard: 3, bard: 0 } },
      { text: "Charisma. I connect with people naturally, express myself well, and feel things at full volume", scores: { paladin: 0, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "What tends to drain your 'mana' (energy) the fastest in everyday life?",
    section: 3,
    options: [
      { text: "Seeing injustice or unfairness and not being able to fix it. It genuinely weighs on me", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 1 } },
      { text: "Being stuck in rigid systems or routines with no room to do things my own way", scores: { paladin: 0, rogue: 3, wizard: 0, bard: 0 } },
      { text: "Shallow conversations and environments where curiosity or depth isn't valued", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 1 } },
      { text: "Absorbing other people's stress and emotions. I pick up on everything and it's exhausting", scores: { paladin: 1, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "The quest reward you'd value most in real life is...",
    section: 3,
    options: [
      { text: "Knowing the people I care about are safe, supported, and okay. That's worth more than gold", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 1 } },
      { text: "Freedom and autonomy. The ability to live life on my own terms without arbitrary rules", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Mastery. Becoming genuinely excellent at something I care deeply about", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 0 } },
      { text: "Connection. Deep, authentic relationships where I can be fully myself", scores: { paladin: 0, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  // Section 4: Battle Strategy (3 questions)
  {
    text: "You're in a boss fight (metaphorical or literal) and things aren't going well. Your response is to...",
    section: 4,
    options: [
      { text: "Dig in and protect the group. I'll take the hits if it means everyone else survives", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 0 } },
      { text: "Look for the exploit. There's always a weakness, a shortcut, or an angle that hasn't been tried yet", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Step back and analyse. What went wrong, what's the pattern, and what's the optimal strategy from here?", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 0 } },
      { text: "Rally the team. Morale matters more than tactics when things are desperate. Inspire first, strategise second", scores: { paladin: 1, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "After a long, draining day (your 'daily dungeon'), you recover best by...",
    section: 4,
    options: [
      { text: "Doing something useful for someone else. Helping others actually restores me, even when I'm tired", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 0 } },
      { text: "Complete solitude and freedom to do whatever I want with zero obligations or expectations", scores: { paladin: 0, rogue: 3, wizard: 1, bard: 0 } },
      { text: "Diving into a special interest. Learning, reading, gaming, or working on a project that fascinates me", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 1 } },
      { text: "Music, creative expression, or a deep conversation with someone who actually gets me", scores: { paladin: 0, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
  {
    text: "If you could add one passive ability to your real-life character sheet, it would be...",
    section: 4,
    options: [
      { text: "Unbreakable Resolve. I can endure any hardship without losing sight of what's right", scores: { paladin: 3, rogue: 0, wizard: 0, bard: 0 } },
      { text: "Shadow Step. I can slip through any situation unnoticed and always find the exit", scores: { paladin: 0, rogue: 3, wizard: 0, bard: 0 } },
      { text: "Perfect Recall. I can remember and connect every piece of information I've ever learned", scores: { paladin: 0, rogue: 0, wizard: 3, bard: 1 } },
      { text: "Emotional Resonance. I can feel what others feel and help them process it", scores: { paladin: 0, rogue: 0, wizard: 0, bard: 3 } },
    ],
  },
];

const SECTION_TITLES = {
  1: "Your Adventuring Style",
  2: "Party Dynamics",
  3: "Your Inner Quest",
  4: "Battle Strategy",
};

const REFERRAL_URL = "https://estushealth.com.au/referral";
const QUIZ_NAME = "RPG Character Build Quiz";
const QUIZ_SLUG = "rpg-character-quiz";

export default function RPGCharacterQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [screen, setScreen] = useState("landing");
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ paladin: 0, rogue: 0, wizard: 0, bard: 0 });
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
        const finalScores = { paladin: 0, rogue: 0, wizard: 0, bard: 0 };
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
      setScores({ paladin: 0, rogue: 0, wizard: 0, bard: 0 });
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
    setScores({ paladin: 0, rogue: 0, wizard: 0, bard: 0 });
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
            .quiz-container .class-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 420px; margin: 0 auto 2.5rem; }
            .quiz-container .class-card { background: var(--q-cream-light); border: 1px solid var(--q-border); border-radius: 10px; padding: 1rem; text-align: center; font-size: 0.88rem; color: var(--q-text-muted); line-height: 1.4; }
            .quiz-container .class-card .class-emoji { font-size: 1.8rem; margin-bottom: 0.35rem; }
            .quiz-container .class-card .class-name { font-weight: 600; color: var(--q-dark); font-family: 'Playfair Display', serif; }
            @media (max-width: 600px) {
              .quiz-container { padding: 1rem; }
              .quiz-container .landing-hero { padding: 2.5rem 0.5rem 2rem; }
              .quiz-container .question-card { padding: 1.25rem 1rem; }
              .quiz-container .landing-notes { padding: 1.25rem 1.5rem; }
              .quiz-container .class-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
            }
          `}</style>
          <div className="quiz-container">
            {screen === "landing" && (
              <div className={`fade-${fadeState}`}>
                <div className="landing-hero">
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{"\u{2694}\uFE0F"}</div>
                  <h1>What RPG Class Are&nbsp;You?</h1>
                  <p className="subtitle">
                    Roll for insight. Discover which classic RPG archetype matches your personality,
                    strengths, and the way your brain navigates the world.
                  </p>
                  <div className="time-badge">{"\u{1F3B2}"} Takes ~3 minutes {"\u00B7"} 12 questions</div>
                  <br />
                  <div className="class-grid">
                    <div className="class-card">
                      <div className="class-emoji">{"\u{1F6E1}\uFE0F"}</div>
                      <div className="class-name">Paladin</div>
                      <div>The Protector</div>
                    </div>
                    <div className="class-card">
                      <div className="class-emoji">{"\u{1F5E1}\uFE0F"}</div>
                      <div className="class-name">Rogue</div>
                      <div>The Strategist</div>
                    </div>
                    <div className="class-card">
                      <div className="class-emoji">{"\u{1F9D9}"}</div>
                      <div className="class-name">Wizard</div>
                      <div>The Scholar</div>
                    </div>
                    <div className="class-card">
                      <div className="class-emoji">{"\u{1F3B6}"}</div>
                      <div className="class-name">Bard</div>
                      <div>The Connector</div>
                    </div>
                  </div>
                  <div className="landing-notes">
                    <strong style={{ color: "var(--q-dark)" }}>A note before you roll:</strong> This isn't a clinical assessment. It's a personality-flavoured exploration using RPG archetypes as a lens. The questions blend D&D scenarios with real-life situations to reveal patterns in how you approach challenges, relationships, and your own inner world. Most people will see elements of multiple classes in themselves, and that's by design. Your character build is uniquely yours.
                  </div>
                  <button className="btn-primary" onClick={() => transition(() => setScreen("quiz"))}>
                    Begin Your Quest
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
