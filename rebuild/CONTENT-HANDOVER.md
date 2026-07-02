# Estus Health — Content Handover for Rebuild

**Revision 2** — updated 2026-07-02 per `content-handover-revision-brief.md`. This supersedes v1 in full: two pages deleted, two pages merged, `/team` rebuilt with new bios, three new sections added, and the nav/route map revised. Structure and unchanged copy are carried over from v1; see "What changed from v1" below the route map for a one-screen summary of the diff.

This document extracts and now revises all copy for the Estus Health site, organized by route, so Claude Code can rebuild the site on the new style guide/branding while reusing existing content wherever it wasn't called out for change. Structural/JSX code is intentionally omitted — only copy, CTAs, meta/SEO, and content structure are captured.

Site info: Estus Health — neuroaffirming, gaming-informed occupational therapy. Perth, WA + telehealth Australia-wide. Contact: hello@estushealth.com.

**Note on depth**: For short/marketing pages, copy is reproduced in full below. For the long-form guide articles and quiz question banks (which run 300–900 lines of source each), this doc captures full headings, structure, and key passages verbatim, with dense reference sections summarized, since the original `.jsx` files remain in the repo for Claude Code to pull exact wording from directly during the rebuild.

**A note on draft copy**: anywhere you see *[DRAFT]*, that's new copy written to fill a structural gap created by this revision (e.g., archetype bio hooks) — it's a working placeholder, not approved final copy, consistent with the revision brief's own framing of the archetype direction as "not final copy, a brief for whoever drafts it."

---

## Route Map

| Path | Notes |
|---|---|
| `/` | Home — unchanged except a trimmed team section |
| `/team` | **NEW route.** Replaces `/about/approach` and `/about/team`. Philosophy lead-in + 3 archetype bios. |
| `/services/occupational-therapy` | unchanged |
| `/services/gaming-informed-therapy` | unchanged |
| `/services/minecraft-program` | unchanged |
| `/services/assessments-reports` | unchanged |
| ~~`/services/sleep-program`~~ | **DELETED.** Full removal, nothing carries forward. |
| `/contact` | Now also absorbs the referrer flow (was split out to `/for-referrers`) |
| ~~`/for-referrers`~~ | **DELETED.** Merged into `/contact`. |
| ~~`/for-clinicians/performance-lab`~~ | **DELETED.** Podcast name/description/Spotify link pulled forward to `/team` and `/resources/events`; newsletter content dropped; Monthly Protocols unresolved (see Open Questions). |
| `/resources` | **NEW route.** Free Resources hub, replaces `/learn` (index). Consolidates the old Learn hub + Resources + Events & Media into one destination. |
| `/resources/understanding-pda` | was `/learn/understanding-pda` — content unchanged, one typo fixed |
| `/resources/late-autism-diagnosis` | was `/learn/late-autism-diagnosis` — content unchanged |
| `/resources/executive-function-complex-health` | was `/learn/executive-function-complex-health` — content unchanged, broken CTA link fixed |
| `/resources/eds-hsd` | was `/learn/eds-hsd` — content unchanged, referral links repointed to `/contact` |
| `/resources/chronotype-quiz` | was `/learn/chronotype-quiz` — content unchanged |
| `/resources/energy-quiz` | was `/learn/energy-quiz` — content unchanged |
| `/resources/pda-quiz` | was `/learn/pda-quiz` — content unchanged |
| `/resources/burnout-quiz` | was `/learn/burnout-quiz` — content unchanged |
| `/resources/gaming-quiz` | was `/learn/gaming-quiz` — content unchanged |
| `/resources/rpg-character-quiz` | was `/learn/rpg-character-quiz` — content unchanged |
| `/resources/eds-hsd-quiz` | was `/learn/eds-hsd-quiz` — content unchanged |
| `/resources/commcard` | path unchanged — email fix applied |
| `/resources/open-loops` | **NEW.** Journaling tool, placement job only (see section below). |
| `/resources/events` | **NEW.** Events & Media: Eventbrite, event archive, podcast archive, Instagram. |
| `/home` | redirect → `/` (unchanged) |

**Slug note (this doc's proposal, not specified in the brief):** `/resources` as the hub root and `/team` as the bios page are defaults chosen here for consistency — `/resources` extends the namespace CommCard already used, and `/team` matches the new flat (non-dropdown) nav item. Confirm both with Liam, and set up 301 redirects from the old `/learn/*`, `/about/*`, and `/for-referrers` URLs if any are indexed or linked externally.

### What changed from v1

- **Deleted**: `/for-clinicians/performance-lab` (podcast pulled forward; newsletter dropped; Monthly Protocols flagged as open); `/services/sleep-program` (full removal).
- **Merged**: `/about/approach` → condensed lead-in on `/team`; `/for-referrers` → folded into `/contact`.
- **Rebuilt**: `/about/team` → `/team`, three archetype-driven bios replace both old bio sets.
- **Added**: Open Loops tool, Events & Media hub, and a consolidated Free Resources hub (replaces `/learn`).
- **Nav**: "About" dropdown removed; Services dropdown loses Sleep Program; "For Referrers" removed as its own nav item (absorbed into Get Started → Contact); "Learn" renamed "Free Resources" and flattened (no dropdown).
- **Small fixes**: PDA guide typo, Executive Function guide's broken CTA link, CommCard's support email domain.

Shared components with reusable copy: `Layout.jsx` (nav/footer — rebuilt, see Shared Components below), `HeroSection.jsx`, `TeamSpotlight.jsx`, `CapacityTracker.jsx`, `ShareSection.jsx`, `BookingButtons.jsx`, `QuizResults.jsx`, `Toast.jsx`.

---

## `/` — Home (HomePage.jsx)

**Status: mostly unchanged.** Only Section 2 (team) is trimmed per the revision brief; everything else carries over as-is.

**SEO / Meta**
- Title: `Estus Health | Neuroaffirming Occupational Therapy Perth`
- Description: `A small team of neurodivergent occupational therapists in Perth, with telehealth Australia-wide. Working with autistic adults, PDA profiles, ADHD, and complex health.`
- OG description (shorter): `A small team of neurodivergent occupational therapists in Perth, with telehealth Australia-wide.`
- Schema.org: MedicalBusiness, Perth WA AU, hours Mon–Sat 8am–7pm.

**Section 1 — Hero** (unchanged)
- Eyebrow: "Neuroaffirming Occupational Therapy · Perth + Telehealth"
- H1: "Estus Health"
- Subhead: "A small team of neurodivergent clinicians who build sessions around how your brain actually works."
- Team banner image caption: "The Estus Health Team" / "Liam, Dai Nam, and Nik"

**Section 2 — Team Spotlights (TRIMMED to a teaser — full bios now live only on `/team`)**
- Eyebrow: "Your clinicians" (unchanged)
- H2: "Meet the people, not the service menu." (unchanged)
- Subhead: "Every clinician here chose this work because it matters to them. Most of us have been on the other side of that conversation." (unchanged)
- Teaser cards replace the three full paragraph bios — name + one-line hook drawing on the new `/team` archetype framing, no specialty tags needed here:
  1. Liam Fagan — *[DRAFT]* "Systems-and-structure energy. Late-diagnosed, PDA profile, gamifies his own life."
  2. Dai Nam Lang — *[DRAFT]* "Storyteller energy. Meets you through the game or story you already love."
  3. Nik Peshwani — *[DRAFT]* "Experimenter energy. Tries it on himself before he suggests it to you."
- CTA (new): "Meet the team →" → `/team`

**Section 3 — Who We Work With** (unchanged)
- H2: "Who we work with."
- Presentations list: Autistic adults and adolescents; PDA profiles (pathological demand avoidance); ADHD; Late-diagnosed neurodivergent adults; Executive function challenges; Chronic health and fatigue (EDS, POTS, fibromyalgia); Sensory processing differences; Hypermobility and chronic pain; Children navigating school and daily routines.
- Funding options: NDIS plan-managed ("Your plan manager pays us directly. No gap fees."); NDIS self-managed ("You manage your own funding and claim our invoices against your plan."); Private ("Pay per session. No referral needed. No funding body required.").

**Section 4 — Practical stuff** (unchanged)
- H2: "The practical stuff."
- Hours: Monday to Saturday / 8am to 7pm AWST
- Location: Perth, Western Australia / Telehealth Australia-wide
- Referrals: No referral needed / Self-refer, parent-refer, or clinician-refer

**Section 5 — Referral CTA** (`id="referral"`) (unchanged)
- H2: "Send us a referral."
- Subhead: "For yourself, your child, or your client. No GP referral required."
- Primary CTA: "Open referral form" → https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7
- Microcopy: "Takes about 2 minutes. We'll be in touch within one business day."
- Footer line: "Or email us directly at hello@estushealth.com"

---

## `/team` — REBUILT (replaces `/about/approach` and `/about/team`)

**Status: rebuilt per revision brief.** Merges the philosophy content from the old `/about/approach` (condensed, as a lead-in) with three new archetype-driven personality bios, replacing both old bio sets (the HomePage/TeamSpotlight version and the TeamPage version), which had inconsistent specialties and tone for the same three people.

### Lead-in (condensed from `/about/approach`)

**Hero** (reused verbatim):
- Eyebrow: "Our Philosophy"
- H1: "We Don't Fix People / We Fix the Environment"
- Sub: "Traditional therapy often asks neurodivergent people to change who they are. We take a different view: when the environment is right, people thrive."
- Pull quote: "We don't force change. We walk alongside until the next step feels possible."

**Condensed principles** — 4 of the original 6 cards, selected to support a "why personality matching matters" framing per the brief:
1. **Lived Experience Matters** — "Several members of our team are neurodivergent ourselves. We understand this work from the inside: the struggles, the strengths, and what actually helps."
2. **Strengths-Based** — "We start with what's working, what brings joy, what you're already good at. Deficits-focused approaches miss the full picture of who someone is."
3. **Neuroaffirming, Not Normalising** — "We don't try to make autistic people act less autistic. Stimming, special interests, and different communication styles aren't problems to fix. They're valid ways of being in the world."
4. **Safety First** — "Therapeutic progress requires feeling safe. We prioritise building trust and connection before asking anyone to do hard things. Regulation before expectation."

Reserve cards (dropped from the condensed 4, full text kept here in case there's room for a 5th/6th):
- **Low-Demand by Design** — "Our sessions are designed to reduce pressure, not add to it. We understand that traditional therapy structures can feel like demands, and for PDA profiles especially, demands trigger the nervous system."
- **Practical, Not Just Theoretical** — "We're occupational therapists. Our job is to help people do the things they need and want to do in their actual lives, not just talk about it."

**"What We Don't Do"** — optional, include if there's room (unchanged, full text):
- Intro: "Being clear about what we don't do is just as important as what we offer:"
- **ABA or compliance-based approaches**: "we don't use methods designed to extinguish autistic behaviours or prioritise obedience."
- **Masking as a goal**: "we don't teach people to hide who they are. If someone chooses to mask in certain contexts for safety, we support that choice, but it's never our therapeutic goal."
- **Pathologising difference**: "being autistic isn't a disorder to be cured. The challenges come from living in a world not designed for neurodivergent brains."
- **Pushing through at any cost**: "we don't believe in "no pain, no gain" approaches. Sustainable progress respects capacity limits."

**OT-parity statement** (new — state once, not per bio, per the brief): *[DRAFT]* "All three of us are qualified occupational therapists. What's different is who we are as people — and that's what actually determines whether we're the right fit for you."

### Three bios

Per-bio structure: name, role, clinical-lead tag (if applicable), accepting-referrals status, an opening line, then an expandable section with approach, personal interests, and works-with tags. Order below follows the original HomePage sequence — reorder freely.

**1. Liam Fagan — "Systems and structure" energy**
- Role: Founder & Occupational Therapist
- Clinical lead tag: none (Founder covers seniority)
- Accepting referrals: **No** *(confirm current status before launch — recorded as "Not Accepting Referrals" as of the last content pull)*
- Opening line: *[DRAFT]* "Late-diagnosed autistic, PDA profile, and the kind of person who gamifies his own laundry. If it can be tracked or turned into a system, Liam's tried it on himself first."
- **Approach**: Came to OT through accounting, finance, and university librarianship before realising he wanted to help people build systems that work for their brains. Being diagnosed autistic later in life reshaped how he understands himself. Sessions are direct, practical, and built around real life, not textbook goals.
- **Personal interests**: Holds a top-four world record speedrun in Tony Hawk's Pro Skater; 20+ years of competitive gaming. Named the company after the healing item in Dark Souls. Finds spreadsheets relaxing and budgets for fun. Deeply interested in machine learning, AI, and how they'll reshape healthcare. Background spans accounting, finance, computer science, and ML alongside OT.
- **Works with**: PDA profiles, gaming-informed therapy, driving OT, executive function, late diagnosis, complex health, autism.
- **Podcast** (new field, per brief): links to *Performance Lab: Protocols* on Spotify — pulled forward from the deleted Performance Lab page. Liam co-features on this podcast.
- **Social**: no confirmed personal/professional account found in source material — add only if Liam provides a real handle, don't fabricate one.

**2. Dai Nam Lang — "Storyteller" energy**
- Role: Occupational Therapist — Clinical Lead, Gaming & Anime-Informed Therapy
- Accepting referrals: **Yes**
- Opening line: *[DRAFT]* "Nam meets people through the story they're already inside of — anime, a game, a build — and works from there."
- **Approach**: Specialises in autistic youth and young adults through the things they already care about. Anime, gaming, and storytelling aren't rewards in his sessions, they're the medium. Interests are windows into how someone thinks, what they value, and where they feel most themselves.
- **Personal interests**: Uses anime storylines as therapeutic tools. Keen sportsperson — football, gym, always training for something. PC and Xbox gamer (Minecraft, Roblox, Sea of Thieves, Repo), always open to co-op. Currently building a PC with a wood-grain CPU cooler. Speaks multiple languages, brings a multicultural lens to his clinical work.
- **Works with**: Anime-informed therapy, gaming-informed therapy, youth and young adults, screen and gaming transitions, daily living independence, Minecraft Program, paediatrics.
- **Podcast**: none — per the brief, the podcast link goes on Liam's and Nik's cards specifically.
- **Social**: no confirmed account found — add only if Nam provides a real handle.

**3. Nik Peshwani — "Experimenter" energy**
- Role: Occupational Therapist — Clinical Lead, Executive Function
- Accepting referrals: **Yes**
- Opening line: *[DRAFT]* "Nik tests it on himself before he'll ever suggest it to you, and he'll tell you straight when something isn't working."
- **Approach**: Turned down a place in medical school, realising he wanted to improve quality of life, not just treat illness. Brings a gaming-informed, identity-respecting lens, particularly for high-masking people who've spent years being told they're fine. Leads with curiosity instead of labels.
- **Personal interests**: Currently deep into The Finals. Plays Minecraft, Dead by Daylight, and Rocket League ("badly," by his own admission, but his clients love teaching him). Catan is his all-time favourite board game. Big into fitness, macros, nutrition, and supplements. Lifelong learner who experiments on himself before recommending anything to clients. Speaks Hindi, Gujarati, English, and Sindhi.
- **Works with**: Executive function, ADHD, adolescents and adults, sleep, sensory profiles, hypermobility and pain, late diagnosis.
- **Podcast**: links to *Performance Lab: Protocols* on Spotify — pulled forward from the deleted Performance Lab page. Nik co-features on this podcast.
- **Social**: no confirmed account found — add only if Nik provides a real handle.

**Pulled-forward podcast details** (for reference, source of the two podcast links above):
- Name: "Performance Lab: Protocols"
- Description: "Conversations at the intersection of allied health, gaming, AI, and behavioural science. Leadership, retention, burnout, chronic pain, tech in therapy. With clinicians who are actually doing the work."
- Spotify link: https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6

**CTA** (reused from old TeamPage, unchanged)
- H2: "Ready to Work With Us?"
- Sub: "Whether you're self-referring, a parent, or a support coordinator, we're here to help find the right fit."
- Button: "Make a Referral" → `/contact`

---

## `/services/occupational-therapy` (services/OccupationalTherapy.jsx)

**Status: unchanged**, except one link fix (see CTA).

**Hero**
- Eyebrow: "Services"
- H1: "Occupational Therapy"
- Sub (italic): "Functional support that respects who you are"
- Body: "Occupational therapy is about helping people do the things they need and want to do in their daily lives. For neurodivergent people, that means therapy that works with your brain, not against it."

**What is OT?**
- "Occupational therapy (OT) focuses on function: your ability to do the activities that matter to you, from self-care and household tasks to work, study, and leisure. "Occupation" in this context means anything that occupies your time and has meaning to you."
- "For autistic people and those with other neurodivergent profiles, OT can address challenges with sensory processing, executive function, daily routines, emotional regulation, and participation in life activities, all while respecting who you are."

**Who this is for**
- Autistic adults and teens seeking neuroaffirming support
- People with PDA profiles where traditional approaches haven't worked
- Anyone struggling with executive function, daily routines, or self-care
- People navigating late diagnosis and understanding their needs
- Those managing chronic conditions alongside neurodivergence

**What we can work on together** — 6 cards: Daily Living Skills ("Morning routines, meal preparation, household management, and personal care. Building systems that work for your brain."); Executive Function ("Task initiation, planning, prioritising, time management, and bridging the gap between knowing and doing."); Sensory Regulation ("Understanding your sensory profile, identifying triggers, and building environments and routines that support regulation."); Work & Study Support ("Accommodations, workspace setup, managing workload, and strategies for sustainable productivity."); Emotional Regulation ("Understanding emotional responses, building coping strategies, and creating conditions that support stability."); Life Transitions ("Moving out, starting work, navigating diagnosis, or any major change. Support through transitions.")

**Funding & Fees**
- Occupational Therapy: $193.99/hr
- "This rate applies to NDIS participants (Capacity Building: Improved Daily Living), self-managed, and private pay clients."
- "Sessions are typically 1 hour. We offer both in-person sessions (Perth metro) and telehealth Australia-wide."

**CTA**: "Ready to Get Started?" — "We'd love to hear from you. Whether you're self-referring or coming through a support coordinator, the first step is the same." Buttons: "Make a Referral" (`/contact`), "For Support Coordinators" (**was `/for-referrers`, now `/contact`** — since both buttons now resolve to the same page, Claude Code may want to collapse these into one CTA, or point the second button at an anchor like `/contact#referral-process` to jump straight to the referrer content there).

---

## `/services/gaming-informed-therapy` (services/GamingInformedTherapy.jsx)

**Status: unchanged.**

**Hero**
- Eyebrow: "Services"
- H1: "Gaming-Informed Therapy"
- Sub: "Therapy through a channel that actually works"
- Body: "For many neurodivergent people, gaming isn't just a hobby. It's a space where they feel competent, connected, and regulated. We meet people there, using games as a genuine therapeutic tool rather than treating them as something to overcome."

**What is it?**
- "Gaming-informed therapy uses video games as a medium for therapeutic work. This isn't about using games as a reward or treating gaming as problematic. It's about recognising that games create genuine opportunities for skill development, emotional processing, and connection."
- "Games provide a lower-stakes environment to practice skills that feel overwhelming in real life. They offer immediate feedback, clear rules, and controllable challenge levels, all things that can be difficult to find in everyday situations."
- Evidence note callout: "Gaming-informed therapy is an emerging area of practice. We draw on established principles of play therapy, occupational therapy, and neurodivergent-affirming practice."

**Who this is for**
- Autistic youth and adults who already love gaming
- People with PDA profiles who find traditional therapy too demanding
- Anyone whose interests have been dismissed or pathologised
- People who struggle to engage in talk-based therapy
- Young people transitioning to adult services

**How we use gaming in sessions** — 4 items: Building Connection & Trust ("Playing together creates genuine connection without the pressure of face-to-face conversation. For PDA profiles especially, this parallel engagement feels safer than direct demands."); Practicing Problem-Solving ("Games present problems to solve with immediate feedback. We can observe how someone approaches challenges, where they get stuck, and what strategies help, then translate this to real-world situations."); Emotional Regulation ("Games can be regulating (Stardew Valley, Minecraft creative mode) or challenging (competitive games, harder difficulty levels). We use this range intentionally to practice managing different emotional states."); Social Skills in Context ("Multiplayer games provide natural opportunities to practice communication, cooperation, and conflict resolution. These are skills that can feel artificial when taught through worksheets.")

**What sessions look like** — intro: "Sessions vary based on the person and their goals. They might include:"
- Playing Minecraft together while talking through a challenge they're facing
- Using a story-driven game to explore emotions and perspectives
- Practicing frustration tolerance through progressively challenging games
- Co-op games to work on communication and turn-taking
- VR experiences for exposure therapy or sensory exploration
- Discussing their existing gaming interests as a way to understand their values and strengths

**CTA**: "Interested in Gaming-Informed Therapy?" — "If you or someone you support might benefit from this approach, we'd love to chat about whether it's a good fit." Buttons: "Make a Referral" (`/contact`), "Our Other Services" (`/services/occupational-therapy`)

---

## `/services/minecraft-program` (services/MinecraftProgram.jsx)

**Status: unchanged.**

**Hero**
- Eyebrow: "Services"
- H1: "Minecraft Program"
- Badge: "April 2026: New modpack, new Bedrock server"
- Sub (italic): "A space to build, connect, and just be yourself."
- Sub 2 (italic): "Not a reward system. Not a bribe. A genuine community where gaming is the medium and growth happens naturally."
- Body: "Our Minecraft servers are clinician-facilitated environments where neurodivergent young people practise executive function, collaboration, and communication through shared building projects. No PvP. No pressure. Just meaningful participation on your terms."
- Buttons: "Get Started" (`/contact`), "Gaming-Informed Therapy" (`/services/gaming-informed-therapy`)

**What the program is**
- "We run two Minecraft servers as part of our gaming-informed therapy model. One runs Java Edition with a full modpack. The other runs Bedrock Edition for cross-platform access. Both are private, whitelisted, and clinician-moderated."
- "This is not a social skills group dressed up as gaming. The server is a genuine digital third space where participants build, problem-solve, and connect at their own pace. Clinicians observe, scaffold, and facilitate, but the environment is participant-led. We structure the server around collaborative infrastructure builds, not competition. PvP is turned off. The focus is on creating something together."
- Pull quote: "He logs on to build with the group more than he talks to anyone at school. This is where his friendships actually happen." — Parent of a participant, age 14
- Feature chips: PvP disabled; Whitelisted access; Infrastructure focus; Two servers available

**Two servers**
- Intro: "We run a Java Edition server for the full modded experience and a Bedrock Edition server for cross-platform access. Both are private, safe, and clinician-moderated."
- **Java Edition Server** ("Modded"): "Our primary server runs the All of Create modpack — a Create mod experience with 50+ addons focused on engineering, automation, and building. Participants design factories, transport systems, and collaborative infrastructure projects." Details: Edition Minecraft Java; Modpack All of Create; Focus Infrastructure builds; PvP Disabled; Access Whitelisted, private.
- **Bedrock Edition Server** ("Cross-Platform"): "Our Bedrock server is for participants who play on console, tablet, or mobile. No mods needed, no special setup. Just join and build. This makes the community accessible regardless of what device you play on." Details: Edition Minecraft Bedrock; Platforms PC, Xbox, PS, Switch, Mobile; Modpack Vanilla (no mods required); PvP Disabled; Access Whitelisted, private.

**What we build (current focus)** — intro: "PvP is turned off across both servers. The focus right now is collaborative building. Here is what that looks like in practice."
- Collaborative Builds — "Shared infrastructure projects where participants contribute at their own pace. Railway networks, shared storage systems, town planning. Each build has natural decision points that practise negotiation, planning, and compromise."
- Engineering & Automation (Java) — "The All of Create modpack gives participants access to mechanical systems, conveyor belts, trains, and processing chains. Designing a working factory is genuine problem-solving with visible outcomes."
- Resource & Project Management — "Gathering, allocating, and managing resources across a shared project is executive function in action. Participants learn to plan ahead, coordinate with others, and adapt when things go wrong."

**Who this is for**
- Young people who find face-to-face social settings overwhelming — "The server provides a way to participate socially without the sensory and performance demands of in-person interaction. Conversations happen alongside shared activity, not as the main event."
- Participants who have had negative experiences in competitive gaming — "PvP is off. Griefing is not tolerated. The server rules are clear, the moderation is active, and the culture is collaborative. This is a space where everyone builds, nobody destroys."
- Young people working on executive function, planning, or collaboration — "Building projects require sequencing, resource management, and working alongside others. These skills transfer to real-world contexts because they are practised in a motivating, low-stakes environment."
- Clients already engaged in gaming-informed therapy at Estus Health — "The server extends your OT sessions into a between-session space where skills can be practised in a natural context. Your clinician can observe progress over time and adjust therapy goals accordingly."

**How it works** (4 process steps):
1. Start with an OT session — "The Minecraft Program is part of our gaming-informed therapy model. Your clinician will discuss whether it is a good fit during your initial sessions and help set goals that the server environment supports."
2. Choose your server — "If you play Java Edition on PC and want the modded experience, you will join the Java server running All of Create. If you play on console, tablet, mobile, or prefer vanilla Minecraft, you will join the Bedrock server."
3. Get whitelisted — "Both servers are private. Once your clinician confirms you are ready, we will add your gamertag to the whitelist. You will receive the server details, the rules, and a brief orientation."
4. Build, connect, grow — "Log on when you want. Join a build project. Start your own. The server is available between sessions as a space to practise skills and connect with others in the community."

**What to expect** (4 cards): Session integration; Moderation and safety; Technical setup; Funding — see source for full body text (verbatim in file, all reused as-is).

**FAQ**
1. "Does my child need their own Minecraft account?" — "Yes. For Java Edition, you need a Minecraft: Java Edition account (purchased through minecraft.net). For Bedrock Edition, you need the version for your platform (available through the Microsoft Store, PlayStation Store, Nintendo eShop, or App Store). We can help troubleshoot setup during a session."
2. "What is the All of Create modpack?" — "All of Create is a popular modpack built around the Create mod, which adds mechanical engineering, automation, trains, and factory-building tools to Minecraft. It includes over 50 addons and has been downloaded over a million times on CurseForge. It runs on Java Edition only."
3. "Why is PvP turned off?" — "Our servers focus on collaborative building. Turning off PvP removes the anxiety and conflict that competitive environments create. Participants can focus on building, planning, and connecting without worrying about being attacked. This is a deliberate clinical decision."
4. "Can my child play on the Bedrock server from their iPad or Switch?" — "Yes. The Bedrock server supports PC (Windows 10/11), Xbox, PlayStation, Nintendo Switch, and mobile devices (iOS and Android). That is the whole point of running a separate Bedrock server — to make sure no one is excluded because of their device."
5. "Is the server monitored?" — "Yes. Both servers are whitelisted (only approved participants can join) and clinician-moderated. We have server logs, clear rules, and an active moderation approach. This is a therapeutic environment, not a public server."
6. "Do we need to be existing Estus Health clients?" — "Yes. The Minecraft Program is part of our gaming-informed therapy model and requires active engagement with an Estus Health clinician. Server access is integrated into your therapy plan, not a standalone service."

**CTA**: "Ready to join the server?" — "The Minecraft Program is part of our gaming-informed occupational therapy. Get in touch to start your sessions and get whitelisted." Buttons: "Get Started" (`/contact`), "Gaming-Informed Therapy"

---

## `/services/assessments-reports` (services/AssessmentsReports.jsx)

**Status: unchanged**, except one link fix (see CTA).

**Hero**
- Eyebrow: "Services"
- H1: "Assessments & Reports"
- Sub: "Documentation that translates into action"
- Body: "Whether you need a functional capacity assessment, NDIS report, or documentation for another purpose, we create clear, practical reports that capture the full picture and translate into meaningful recommendations."

**What we offer** — 4 cards:
1. Functional Capacity Assessments — "Comprehensive assessment of your ability to perform daily activities, manage self-care, participate in work or study, and engage in community life. We assess what you can actually do on good days, bad days, and everything in between." Note: "Often requested for NDIS applications, plan reviews, or other funding bodies."
2. NDIS Reports — "Reports written specifically for NDIS purposes, using the language and evidence base that reviewers need to see. We understand what the NDIA looks for and how to present information effectively." Note: "For access requests, plan reviews, or supporting specific funding items."
3. OT Progress Reports — "Documentation of ongoing therapy: goals, progress, barriers, and recommendations. Useful for NDIS reporting, sharing with other providers, or just having a clear record of the work."
4. Home & Environment Assessments — "Assessment of physical and sensory environments, identifying barriers, modifications, and supports that could improve daily functioning. Particularly useful for sensory profiles and executive function challenges."

**Our approach to assessments** — 4 points: Low-demand process ("We structure assessments to minimise overwhelm. No marathon sessions or unnecessary questioning."); Accurate capacity representation ("We don't just assess you on a good day. We explore the full range of your capacity, including what happens when you're depleted or flaring."); Strengths alongside challenges ("Our reports include what's working, not just what's difficult. A full picture leads to better recommendations."); Practical recommendations ("Every report ends with clear, actionable recommendations. Not generic suggestions, but specific next steps tailored to your situation.")

**What to expect** (4-step process):
1. Initial Conversation — "We discuss what you need the assessment for, gather background information, and plan how to structure sessions to work for you."
2. Assessment Sessions — "Usually 2-3 sessions depending on complexity. We combine conversation, observation, and standardised tools as appropriate. Breaks are always okay."
3. Report Writing — "We compile findings into a clear, professional report. Turnaround is typically 2-3 weeks depending on current workload."
4. Feedback Session — "We talk through the report with you before finalising. You can ask questions, request clarifications, or flag anything that doesn't feel accurate."

**CTA**: "Need an Assessment?" — "Get in touch to discuss what you need and we'll let you know how we can help." Buttons: "Make a Referral" (`/contact`), "For Support Coordinators" (**was `/for-referrers`, now `/contact`** — same collapse-or-anchor note as the OT page above).

---

## ~~`/services/sleep-program`~~ — REMOVED

**Status: deleted per revision brief.** Full removal, nothing carries forward. (Previously: "Sleep Performance Program," a 4-session OT intervention on sleep and circadian health, which referenced a "Small Hinges Series" that was never otherwise defined anywhere else in the site.) No other page linked to Sleep Program, and its own outbound cross-links (to Occupational Therapy and Gaming-Informed Therapy) simply disappear with the page — no orphaned links elsewhere to clean up. Remove its entry from the Services nav dropdown and footer column.

---

## `/contact` (ContactPage.jsx) — now also serves the referrer flow (merged `/for-referrers`)

**Status: merged.** Contact becomes the destination behind "Get Started" for both self-referrers and professional referrers, since Get Started now absorbs the referrer flow. Existing FAQ and sidebar stay as they were; the referral callout, process, and checklist from `/for-referrers` are folded in as a new section.

**Hero** (unchanged)
- Eyebrow: "Get in Touch"
- H1: "Contact Us"
- Sub (serif italic): "Have a question, or ready to get started? We're here to help."
- Microcopy: "Response time within 24 hours"

**NEW — Referral process (merged from `/for-referrers`)**

Self-referral callout:
- Tag: "Good news"
- Title: "Self-referrals are welcome."
- Body: "You don't need a GP or another professional to get started. If you'd like to refer yourself or a family member, use the self-referral form. No referral letter required."
- Link: "Open the self-referral form →" → https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7

The referral process (3 steps):
1. "Submit a referral" — "Use the self-referral form if you're referring yourself or a family member. If you're a GP, support coordinator, or another professional, you can use the same form on behalf of your client. Just fill in the "About the client" section with their details."
2. "We review and make contact" — "We'll review the referral and get in touch within 24 hours to discuss next steps, confirm suitability, and arrange an initial appointment."
3. "We keep you in the loop" — "If you're a referring professional, we'll keep you updated on progress (with the client's consent) and send through any reports once the assessment or therapy is complete."

What to include in your referral:
- Client's name and contact details (or yours, if referring yourself).
- What service you're enquiring about: NDIS Access Request Support, Functional Capacity Assessment, or Occupational Therapy.
- Funding type: private, self-managed NDIS, or plan-managed NDIS.
- A brief description of the client's needs. Even a few sentences helps us prepare.
- Funding badge: "Accepting private, self-managed, and plan-managed NDIS clients."

*Implementation notes: the old `/for-referrers` page also had its own closing CTA band ("Ready to get started?" / "Open the self-referral form →") — not carried forward here since it would duplicate Contact's existing "Open Contact Form" CTA below. There's also some overlap between this callout and Contact's existing FAQ Q1 ("Do I need a GP referral?") — worth consolidating when this gets built rather than showing the same answer twice.*

**Discovery call band** (unchanged)
- H2: "Not ready for a full referral? Start with a conversation."
- Body: "Book a free 15-minute discovery call to ask questions, check the fit, and figure out next steps. No obligation."
- Uses `BookingButtonPair` component (see Shared Components below)

**Main content — left column** (unchanged)
- H2: "Send us a message"
- Body: "Use the contact form to ask a question or let us know you're interested. If you're ready to refer yourself or a family member, the self-referral form gives us everything we need to get started quickly."
- CTA: "Open Contact Form" → https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7

**FAQ ("Common Questions")** (unchanged)
1. Q: "Do I need a GP referral?" A: "No. Self-referrals are welcome for all of our services. You can refer yourself or a family member directly using the self-referral form; no GP letter needed."
2. Q: "How quickly will someone get back to me?" A: "We aim to respond to all enquiries within 24 hours. Our therapists are available Monday to Saturday, 8am to 7pm."
3. Q: "What funding types do you accept?" A: "We accept private, self-managed NDIS, and plan-managed NDIS clients across all of our services."
4. Q: "What if I'm not sure which service I need?" A: "That's completely fine. Just get in touch and we'll help you work out the right fit. The contact form is the quickest way to start that conversation."

**Sidebar — "Other ways to reach us"** (unchanged)
- Email: hello@estushealth.com
- Location: "Perth Metro & Telehealth Australia-wide"
- Response Time: "Within 24 hours"
- Therapist Availability: "Monday - Saturday, 8am - 7pm"

---

## ~~`/for-referrers`~~ — DELETED, merged into `/contact`

Removed as a standalone page. Its self-referral callout, three-step process, and "what to include" checklist now live on `/contact` (see above). The nav item is also removed — "Get Started" now covers both self-referrers and professional referrers.

---

## ~~`/for-clinicians/performance-lab`~~ — DELETED

Cut entirely as a page. What was pulled forward before deletion:
- Podcast name: "Performance Lab: Protocols"
- Podcast description: "Conversations at the intersection of allied health, gaming, AI, and behavioural science. Leadership, retention, burnout, chronic pain, tech in therapy. With clinicians who are actually doing the work."
- Spotify link: https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6
- Reused on: `/team` (podcast link on Liam's and Nik's bios) and `/resources/events` (podcast archive).

**Does not carry forward**: the newsletter ("3 Protocols. 2 Ideas. 1 Prompt.", Substack link) — dead, don't reuse anywhere.

**Unresolved**: Monthly Protocols (the community group chat) has no confirmed new home. See Open Questions at the end of this doc.

---

## `/resources` — Free Resources Hub (replaces `/learn`; consolidates Learn + Resources + Events & Media)

**Status: rebuilt per revision brief.** Same 7 quizzes and 4 guides as before, content unchanged — see the dedicated sections below. This hub now additionally surfaces CommCard and Open Loops as tools, and folds in Events & Media as a section or sub-link, becoming the single destination for everything that used to be split across Learn, Resources, and Events & Media.

**Hero** (reused from the old Learn hub — the meta title may be worth updating given the broadened scope):
- SEO: Title "Resources & Quizzes | Estus Health" *(consider "Free Resources | Estus Health" to match the new nav label)*. Description: "Free interactive quizzes and in-depth guides on PDA, autism, sleep, executive function, burnout, and gaming. Know your brain. Build your life."
- Eyebrow: "Learn & Explore"
- H1: "Know your brain. / Build your life."
- Sub (italic): "Understanding your neurotype is the first step toward support that actually sticks."
- Body: "Explore our free quizzes and guides, written for people navigating these experiences, not about them. No jargon, no clinical distance."

**Quizzes section** — unchanged, 7 cards, same copy (see "Quiz Pages" section below for full detail). Card links now use `/resources/*` paths:
1. PDA Profile Quiz (`/resources/pda-quiz`, badge "Autism") — "Discover your PDA archetype and get personalised strategies for navigating demands."
2. Chronotype Quiz (`/resources/chronotype-quiz`, badge "Sleep") — "Find out whether you're a Lion, Bear, Wolf, or Dolphin sleeper, and learn how to align your schedule to your biology."
3. Energy & Executive Function Quiz (`/resources/energy-quiz`, badge "Executive Function") — "Map your energy patterns and executive function profile to understand when and why tasks feel impossible, and what actually helps."
4. Autistic Burnout Quiz (`/resources/burnout-quiz`, badge "Burnout") — "Assess where you are on the burnout spectrum and get a clearer picture of what your nervous system needs right now."
5. Gaming & Wellbeing Quiz (`/resources/gaming-quiz`, badge "Gaming") — "Explore the relationship between your gaming habits and your mental health, focus, and emotional regulation."
6. RPG Character Build Quiz (`/resources/rpg-character-quiz`, badge "Gaming") — "Build your neurodivergent character sheet. Find out your stat distribution, class archetype, and innate abilities."
7. EDS/HSD Management Style Quiz (`/resources/eds-hsd-quiz`, badge "EDS / HSD") — "Discover how you naturally manage hypermobility, fatigue, and pain. Four archetypes, practical tips, and strategies that actually fit a neurodivergent brain."
All quiz cards CTA: "Take the quiz"

**Guides section** — unchanged, 4 cards, same copy (see individual guide sections below). Card links now use `/resources/*` paths:
1. Understanding PDA (`/resources/understanding-pda`, badge "PDA", 8 min read) — "Pathological Demand Avoidance explained: what it is, how it shows up across different ages, and why traditional approaches often backfire."
2. Late Autism Diagnosis (`/resources/late-autism-diagnosis`, badge "Autism", 7 min read) — "Why autism gets missed in adults, what the late-diagnosis experience is actually like, and how to move forward with self-understanding."
3. Executive Function & Complex Health (`/resources/executive-function-complex-health`, badge "Executive Function", 10 min read) — "Managing POTS, hEDS, MCAS, ME/CFS, or chronic pain alongside neurodivergence? Here's why executive function takes the hit."
4. EDS & Hypermobility (`/resources/eds-hsd`, badge "EDS / HSD", 9 min read) — "Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder: what they are, how they overlap with neurodivergence, and what OT support actually looks like."
All guide cards CTA: "Read guide"

**Tools section** (expanded — now two tools instead of a single CommCard teaser):
- **CommCard** — unchanged teaser copy (see full section below). "Open CommCard" (external) / "Learn more" → `/resources/commcard`.
- **Open Loops** (NEW) — see full section below. Link → `/resources/open-loops`.

**Events & Media** (NEW section or sub-link within the hub) — see full section below. Link → `/resources/events`.

**CTA** — same as before, secondary button updated since `/about/approach` no longer exists as its own page:
- "Ready to take the next step?" — "Quizzes and guides are a starting point. If you want personalised support, we're here." Buttons: "Make a Referral" (`/contact`), "Meet the Team" (**was "About Our Approach" → `/about/approach`, now → `/team`**)

---

## `/resources/understanding-pda` (was `/learn/understanding-pda`)

**Status: content unchanged**, one typo fixed (see below).

**Meta/Hero**: Badges "Learn", "PDA", "Autism". H1: "Understanding PDA". Sub: "Pathological Demand Avoidance: what it is, how it shows up, and what actually helps." Body: "PDA is a profile of autism where the nervous system perceives everyday demands as threats. It's not defiance or "bad behaviour." It's a survival response. And what helps isn't more structure. It's less pressure."

**TL;DR**: "PDA (Pathological Demand Avoidance) is a profile of autism where the nervous system perceives everyday demands as threats. It's not defiance or "bad behaviour." It's a survival response. What helps isn't more structure. It's less pressure."

**Article structure** (full body verbatim in source file `src/pages/learn/LearnPDA.jsx`):
- **What is PDA?** — Origin (Elizabeth Newson, 1980s), the "pathological" naming controversy (preferred term "Pervasive Drive for Autonomy"), and the core point that people with PDA often want to do the thing but can't once it's framed as a demand.
- **How PDA Shows Up**
  - In Children: school refusal; meltdowns over "easy" tasks; social masking; role play and fantasy as coping.
  - In Adults: burnout cycles; employment difficulties; avoiding even wanted activities; difficulty with self-care.
- **PDA vs Other Presentations** — comparison table PDA vs. ODD (root cause, response to demands, what helps) + callout: "PDA is frequently misdiagnosed as ODD, leading to interventions that make things worse."
- **What Helps**
  - Low-Demand Approaches: "Does this actually need to happen right now?" / "Does it need to happen this way, or is there flexibility?" / "What's the cost of not doing this vs forcing it?"
  - Autonomy Over Compliance: genuine choices; indirect language ("I wonder if..." vs "You need to..."); letting the person set the pace.
  - What Backfires: reward charts; consequences; countdowns/timers; praise (each with a one-line rationale in source).
- **How We Work With PDA at Estus Health** — Low-Demand Therapy; Gaming-Informed Approaches; Lived Experience — "Our team have lived experience with Autism and PDA. We understand from the inside, not just from textbooks." *(fixed: source had "lived expereince," corrected per revision brief.)*

**CTA**: "Looking for PDA-Informed Support?" — "We understand why traditional approaches haven't worked. Our team specialises in support that actually helps." Buttons: "Make a Referral", "Gaming-Informed Therapy"

**Related reading**: Late Autism Diagnosis; Executive Function & Complex Health

---

## `/resources/late-autism-diagnosis` (was `/learn/late-autism-diagnosis`)

**Status: content unchanged.**

**Hero**: Badges "Learn", "Autism", "Diagnosis". H1: "Late Autism Diagnosis". Sub: "What it means to be diagnosed as an adult, and what comes next." Body: "Many autistic people aren't diagnosed until adulthood. Getting diagnosed later isn't "less valid." For many, it's the missing piece that finally makes a lifetime of experiences make sense."

**TL;DR**: "Late autism diagnosis is increasingly common, especially for women, people of colour, and anyone who learned to mask their traits. Getting diagnosed as an adult isn't "less valid." For many, it's the missing piece that finally makes a lifetime of experiences make sense."

**Article structure** (full body verbatim in source file):
- **Why Autism Gets Missed** — Outdated Diagnostic Criteria; Masking and Camouflaging; High Academic Achievement; Misdiagnosis (anxiety, depression, disordered eating, bipolar, BPD, ADHD alone).
- **Signs That Often Get Overlooked** — social exhaustion after "normal" interactions; sensory sensitivities dismissed as "fussiness"; intense interests labelled "obsessions"; difficulty with unwritten social rules; burnout cycles mistaken for depression; feeling "different" without knowing why.
- **What Late Diagnosis Feels Like** — 4 cards: Relief; Grief; Re-evaluation; Identity Shifts. Callout on "unmasking": "After diagnosis, many people feel pressure to immediately unmask. Be gentle with yourself. The mask developed as a survival strategy. Taking it off is gradual, and some parts can stay."
- **What Helps After Diagnosis** — Finding Community; Adjusting Expectations; Sensory Accommodations; Understanding Your Capacity (spoon theory / energy accounting).
- **How We Support Late-Diagnosed Adults** — Assessment Tailored to Adult Presentations; Focus on Self-Understanding, Not "Fixing"; Executive Function Support.

**CTA**: "Navigating Late Diagnosis?" — "Whether you're seeking assessment, recently diagnosed, or looking for support in understanding what diagnosis means for your life, we're here to help." Buttons: "Make a Referral", "Our OT Services"

**Related reading**: Understanding PDA; Executive Function & Complex Health

---

## `/resources/executive-function-complex-health` (was `/learn/executive-function-complex-health`)

**Status: content unchanged**, one broken link fixed (see CTA).

**Hero**: Badges "Learn", "Executive Function", "Chronic Illness". H1: "Executive Function & Chronic Illness". Sub: "Managing life with POTS, hEDS, MCAS, ME/CFS and neurodivergence." Body: "When you're managing multiple conditions alongside autism or ADHD, everything competes for the same limited energy. The solution isn't "try harder." It's building systems that account for your actual capacity."

**TL;DR**: "Executive function (your brain's ability to plan, start, and finish tasks) doesn't exist in isolation. When you're managing conditions like POTS, hEDS, MCAS, or ME/CFS alongside neurodivergence, everything competes for the same limited energy. The solution isn't "try harder." It's building systems that account for your actual capacity."

**Article structure** (full body verbatim in source file):
- **What is Executive Function?** — defines working memory, task initiation, planning/prioritising, cognitive flexibility, emotional regulation; notes prefrontal cortex differences in autistic/ADHD brains are neurology, not character flaw.
- **The Overlap: Why These Conditions Travel Together** — hEDS, POTS, MCAS, ME/CFS each explained with their link to neurodivergence.
- **What This Actually Looks Like Day-to-Day** — knowing what to do but not being able to start; decision fatigue before deciding anything; the "good day" trap (boom-bust cycle); medical admin as a part-time job.
- **Why "Just Use a Planner" Doesn't Work** — planners assume consistent capacity; to-do lists become shame lists; time management doesn't address the real problem (it's energy/symptoms, not time).
- **What Actually Helps** — Energy Accounting (Not Time Management); Externalising Executive Function (body doubling, visual cues, automation, "Resistance Breaker" support); Pacing Strategies That Respect PEM (post-exertional malaise); Reducing Decisions, Not Adding Tools (same breakfast, clothes laid out, default answers, pre-made bad-day decisions).
- **How We Support Executive Function at Estus Health** — Functional Capacity Assessment; Systems Built Around Fluctuating Capacity; Coordination With Your Other Providers.

**CTA**: "Need Support With Executive Function?" Buttons: "Make a Referral", "Learn About Our Support" → `/services/occupational-therapy` *(fixed: source linked to a route that doesn't exist, `/services/executive-function-support`; repointed per revision brief.)*

**Related reading**: Understanding PDA; Late Autism Diagnosis

---

## `/resources/eds-hsd` (was `/learn/eds-hsd`)

**Status: content unchanged**, referral links repointed (see below).

**Hero**: Badges "Learn", "EDS", "HSD", "Hypermobility". H1: "When Your Body Bends Further Than It Should". Sub: "Ehlers-Danlos Syndromes and Hypermobility Spectrum Disorder affect far more than your joints. They shape how you move, think, rest, and get through each day." Body: "If you're neurodivergent and hypermobile, you're managing two complex systems at once. Your brain works differently. Your connective tissue works differently. And the interaction between the two rarely gets addressed. This page is for people who are tired of being told they're "just flexible" or "just anxious," and want to understand what's actually going on." Buttons: "Take the EDS/HSD Quiz" (`/resources/eds-hsd-quiz`), "Refer a Client" (**was `/for-referrers`, now `/contact`**)

**Stats band**: 50%+ of neurodivergent adults show elevated hypermobility; 5.6x higher ADHD rates in people with EDS; 7.4x higher autism rates in people with EDS; 75% of EDS patients report severe fatigue.

**In Plain Language** — full 4-paragraph explainer covering EDS (connective tissue/collagen), HSD, the neurodivergence overlap statistic, and why the intersection compounds difficulty (verbatim in source).

**What You Might Notice** — 6 sign cards: Fatigue that rest doesn't fix; Pain that moves and fluctuates; Brain fog that derails your day; Temperature and autonomic weirdness; Joints that bend too far or give way; Interoception gaps (full descriptions in source).

**Why It Gets Missed** — intro: "The average time to an EDS diagnosis is over a decade. For neurodivergent people, it can take even longer." 4 reasons: "You're too young for this"; "It's just anxiety"; Masking hides the impact; Body and brain get treated separately.

**The Neurodivergence Connection** — explainer on proprioception/interoception overlap + "Research Snapshot" facts: over 50% of autistic/ADHD/Tourette's adults show significant hypermobility vs ~20% general population; EDS patients 5.6x more likely to have ADHD; Swedish registry study found EDS patients 7.4x more likely to be autistic; hypermobility mediates increased pain/dysautonomia in ND populations; shared genetic pathways identified at molecular level. Sources cited: Csecs et al. (2022, Frontiers in Psychiatry); Casanova et al. (2020, Journal of Personalized Medicine); Swedish National Registry (2016).

**What OT Actually Looks Like for EDS and HSD** — "We don't treat your joints. We treat your daily life." 4 areas: Energy management and pacing; Routine and environmental design; Sensory and autonomic support; Cognitive load reduction. Closing line: "This isn't about learning to push through. It's about designing your days so that pushing through isn't the only option."

**FAQ** (6 questions, full verbatim in source):
1. "What is the difference between EDS and HSD?"
2. "Why does an OT work with EDS and HSD, not just a physio?"
3. "I think I might have EDS or HSD. Can you diagnose me?"
4. "What does a neurodivergent person with EDS/HSD actually need from OT?"
5. "Do I need a referral or an NDIS plan?" — "No referral is needed to see us. We work with NDIS participants (both plan-managed and self-managed) and private clients. Telehealth sessions are available Australia-wide."
6. "How is this different from what I'd get at a standard OT clinic?"

**Reputable resources** (external links): The Ehlers Danlos Society (ehlers-danlos.com); Csecs et al. (2022) research paper (Frontiers in Psychiatry); Ehlers-Danlos Support UK (ehlers-danlos.org)

**CTA**: "Your Body and Your Brain Deserve the Same Team" — "No referral needed. NDIS and private clients welcome. Telehealth available across Australia." Buttons: "Take the EDS/HSD Quiz", "Refer a Client" (**now → `/contact`**)

---

## `/resources/commcard` (path unchanged)

**Status: content unchanged**, one email fixed (see below).

*(CommCard is a separate free tool/product — a communication aid hosted at commcard.estushealth.com — this page markets it.)*

**Hero**
- Eyebrow: "Free Tool"
- H1: "Words When You Have None"
- Sub (italic): "A free communication tool for moments when speaking is hard."
- Body: "CommCard gives you ready-made phrases and custom cards you can show on screen or speak aloud. No signup. No data collected. Works on any device with a browser."
- Buttons: "Open CommCard" (https://commcard.estushealth.com), "Learn More Below" (`#features`)

**Key features** — H2: "Designed for How Your Brain Works", sub: "Practical features that stay out of your way when you need them most." 4 features:
1. Your Privacy, Protected — "CommCard does not collect, store, or transmit any personal data. Nothing you type or speak is recorded or sent anywhere. Your communication is yours alone."
2. Text-to-Speech — "Tap a phrase to hear it spoken aloud. Adjust voice, speed, and volume in settings. For moments when showing a screen works better than finding words."
3. Ready-Made Phrases — "Six categories of pre-written phrases covering common situations: Right Now, Low Battery, Setting the Scene, Out in the World, Explaining Me, and At Appointments."
4. Make Your Own Cards — "Create custom communication cards with your own words. Choose your colour. Download as an image or show directly from your screen."

**Who CommCard is for** — H2: "Who CommCard Is For"
- "CommCard was designed for neurodivergent adults who experience intermittent or situational speech difficulties. That includes autistic adults, people with ADHD who experience verbal shutdowns, selective mutism, burnout-related communication challenges, or anyone who sometimes needs words on a screen instead of in their mouth."
- "It is a neuroaffirming tool. It does not try to fix how you communicate. It gives you another way to do it when you need one."
- Illustrative user quotes: "I can think the words but I can't say them right now." / "I need to tell someone how I'm feeling but I don't know where to start." / "I'm at a medical appointment and I'm too overwhelmed to explain." / "I want to order coffee but verbal communication isn't available to me today."

**For clinicians/referrers** — H2: "Recommend CommCard to Your Clients" — "CommCard is a free, no-signup tool you can recommend to clients who experience situational or intermittent communication difficulties. It works on any device with a browser. There is nothing to install, no account to create, and no data is ever collected." Use cases: pre-load on a client's phone as part of a session; recommend as part of a communication toolkit alongside AAC devices; use during appointments to help clients express needs; share the link with families and support workers; add to therapy resource packs and discharge summaries. Buttons: "Share CommCard", "Suggest a Phrase" → mailto:hello@estushealth.com *(fixed: was performancelab@estushealth.com, inconsistent with the domain used everywhere else on the client-facing site; corrected per revision brief.)*

**How it works** (3 steps): Open the app (visit commcard.estushealth.com, no download/signup/login); Find or create your phrase (six categories or custom card); Show or speak (display on screen, speak aloud via text-to-speech, or copy text).

**Privacy pull-quote**: "CommCard does not collect, store, or transmit any personal data. Nothing you type or say through this tool is recorded, saved, or sent to any server. Your communication is yours alone." — attributed "CommCard Privacy Promise"

**CTA**: "Try CommCard Now" — "Free. Private. No signup needed. Works on any device." Buttons: "Open CommCard", "Suggest a Phrase"

---

## `/resources/open-loops` — NEW

**Status: new per revision brief.** This is a placement job, not a design job — Open Loops already exists as a standalone HTML file; the rebuild's job is to integrate and link it well, not redesign it. *(Source file wasn't found in this repo/session — confirm its location with Liam before build.)*

**What it is**: a free, domain-based journaling tool. Users pick from pre-written "loops" (open threads/thoughts that feel unresolved) across eight domains: **Health, Sleep, School or Work, Identity, Relationships, Energy, Life Admin,** and **Reflection**. For each loop they pick, they mark it as one of:
- **Parked** — acknowledged, not acting on it right now
- **Given a tiny next step**
- **Closed**

The finished entry exports as markdown — either copied to clipboard or downloaded.

**Design constraints** (carried over from CommCard): stores nothing client-side, same zero-data-collection design. Per the brief: **do not put an email wall on it directly** — it should stay a frictionless, private tool like CommCard.

**Content connection**: this is the tool behind the weekly "Journal Club" content on Instagram — cross-link the two (Open Loops page ↔ Instagram / Events & Media section below).

**Copy gap**: hero framing, the eight domain labels/descriptions, and sample loop text aren't specified in the revision brief. Pull the actual copy from the existing HTML file once it's located, rather than drafting new copy here — this is presentational content that already exists and shouldn't be reinvented.

---

## `/resources/events` — Events & Media — NEW

**Status: new per revision brief.** Consolidates content that used to be scattered across separate ideas of "events" and "media": Eventbrite, a permanent event archive, the podcast, and Instagram.

- **Eventbrite** — upcoming and past bi-monthly events. Most recent (as of this brief): "Gaming in Therapy" (June 2026). Next: "Boundary Setting" with Nic Voican. *(Pull live event data from Eventbrite at build time rather than hardcoding dates/titles here — they'll go stale fast.)*
- **Event archive** — every past event gets a permanent entry with its YouTube recording embedded, so it stays a usable asset after the live date passes instead of disappearing.
- **Podcast archive** — pulled forward from the deleted Performance Lab page:
  - Name: "Performance Lab: Protocols"
  - Description: "Conversations at the intersection of allied health, gaming, AI, and behavioural science. Leadership, retention, burnout, chronic pain, tech in therapy. With clinicians who are actually doing the work."
  - Spotify link: https://open.spotify.com/show/3IsFpkUItgNPDrwIu9dyy6
  - Episodes feature Liam and Nik (also linked from their `/team` bios).
- **Instagram** — feed embed or link. This is also where the weekly "Journal Club" content lives — cross-link to `/resources/open-loops`, since Open Loops is the tool behind that content.

---

## Quiz Pages (7 total) — shared pattern

**Status: content unchanged**, route prefix updated from `/learn/*` to `/resources/*`.

All seven quizzes share one mechanic, built via the shared `QuizResults.jsx` + `ShareSection.jsx` components: a multiple-choice question bank scores the user against several archetypes; the highest-scoring archetype becomes the "result page," which functions as a mini landing page with its own hook, description, strengths, tips, a research "insight," a social share caption, an email-capture CTA, and an Estus Health service tie-in ("nextResource"). Each archetype's copy is extensive (300–600 words) and highly polished — this is a major content asset. Full verbatim copy for every archetype lives in the respective source `.jsx` file; reproducing all of it here would run to many thousands of lines, so this section captures the quiz identity, archetype set, and structure only. **Recommend Claude Code read each quiz source file directly when rebuilding**, since the archetype content is close to final-form marketing copy that should carry over largely unchanged.

Shared UI notes: results page includes a score breakdown (percentage per archetype), a "secondary archetype" callout, restart/retake option, and share functionality (native share API / copy link / social). Quiz results are shareable via URL query params (`useSearchParams`), producing a "shared view" banner when someone opens a friend's result link.

1. **`/resources/chronotype-quiz`** (ChronotypeQuiz.jsx, ~610 lines) — "Chronotype Quiz." Archetypes: **The Lion, The Bear, The Wolf, The Dolphin** (classic 4-chronotype sleep model). ~12+ questions on wake time, focus windows, energy patterns, sleep onset, response to routine change, etc. (question bank sampled in earlier extraction; full set in source).

2. **`/resources/energy-quiz`** ("Energy & Executive Function Quiz", EnergyQuiz.jsx, ~551 lines). Archetypes: **The Sprinter** (burst energy, crash cycles), **The Drifter** (initiation gap / task inertia), **The Juggler** (divergent thinking, unfinished projects), **The Conserver** (strategic energy budgeting). Each archetype includes 3 strengths, 4 tips, a research insight, share caption, and an Estus "nextResource" CTA (full copy in source).

3. **`/resources/pda-quiz`** ("PDA Profile Quiz", PDAQuiz.jsx, ~551 lines). Archetypes: **The Negotiator** (autonomy-driven), **The Avoider** (protective nervous-system response), **The Masker** (performs compliance, crashes privately), **The Adapter** (context-dependent capacity). Full descriptions, strengths, tips, insight, share caption, nextResource per archetype in source.

4. **`/resources/burnout-quiz`** ("Autistic Burnout Quiz", BurnoutQuiz.jsx, ~499 lines). Archetypes: **The Smouldering Ember** (chronic, slow-onset burnout), **The Sudden Shutdown** (acute nervous-system shutdown), **The Masked Flame** (high-masking, invisible burnout), **The Rising Phoenix** (in recovery). Full copy in source.

5. **`/resources/gaming-quiz`** ("Gaming & Wellbeing Quiz", GamingQuiz.jsx, ~551 lines). Archetypes: **The Deep Diver** (gaming as special interest/strength), **The Escape Artist**, **The Balanced Player**, **The Burnt Controller** (full descriptions in source).

6. **`/resources/rpg-character-quiz`** ("RPG Character Build Quiz", RPGCharacterQuiz.jsx, ~578 lines) — playful D&D-style framing: "Build your neurodivergent character sheet." Archetypes: **The Paladin** (protector, justice-sensitive), **The Rogue**, **The Wizard**, **The Bard** (full descriptions in source, richly written with RPG metaphor throughout, e.g. "Rest at the Inn," "Pick Your Quests Wisely").

7. **`/resources/eds-hsd-quiz`** ("EDS/HSD Management Style Quiz", EDSQuiz.jsx, ~910 lines — the largest quiz file). Archetypes: **The Strategist** (plans everything, hypervigilant), **The Surfer** (adapts moment-to-moment), **The Fortress**, **The Alchemist** (full descriptions in source). Uses a distinct visual system (hex color tokens per archetype rather than the shared HSL design tokens) — flag for reconciliation into the unified design system during rebuild.

**Content strategy note for the rebuild**: these quizzes are arguably the site's strongest lead-generation asset — each archetype result functions as tailored, shareable content with a natural CTA into services. Recommend preserving the full archetype copy verbatim and prioritising a clean, fast, mobile-friendly quiz UI in the new build, since this is high-value IP.

---

## Shared Components (reusable copy/config)

- **`Layout.jsx`** — site nav and footer. **Nav and footer rebuilt per revision brief:**
  - **Nav structure (new)**: Logo "Estus Health" (`/`) → **Services** dropdown (Occupational Therapy, Gaming-Informed Therapy, Minecraft Program, Assessments & Reports — Sleep Program removed) → **Team** (single link, no dropdown, → `/team`) → **Free Resources** (single link, no dropdown, → `/resources`) → **Get Started** (primary CTA, → `/contact`, now serves both self-referrers and professional referrers) → **Client Portal** (persistent link, visually separate from the four nav items above, not a dropdown, external → https://questot.bookings.pracsuite.com/).
  - **Removed from nav**: the "About" dropdown (folded into `/team`); "For Referrers" as its own top-level link (folded into Contact via Get Started); the nested "Learn" mega-menu with its three grouped columns (replaced by a flat "Free Resources" link — any sub-navigation now lives on the hub page itself).
  - **Footer (rebuilt)**: Brand blurb (unchanged): "Neuroaffirming occupational therapy across Perth and via telehealth Australia-wide." Columns: **Services** (4 links, Sleep Program removed), **Free Resources** (replaces the old separate Learn + Resources columns — consolidate into one; exact link selection not pixel-specified, Claude Code can finalize), **Contact** (Perth, Western Australia / Telehealth Australia-wide / Mon–Sat, 8am–7pm / "Make a referral →" to `/contact`). Copyright line unchanged: "© [year] Estus Health. All rights reserved."
- **`HeroSection.jsx`** — reusable hero pattern; likely reused for the new `/team`, Open Loops, and Events & Media heroes.
- **`TeamSpotlight.jsx`** — now needs to render the Home page's trimmed teaser cards (see `/` Section 2 above) rather than full bios.
- **`CapacityTracker.jsx`** — likely a "spots available" / booking capacity indicator component; check for live copy strings (e.g., "X spots remaining this week") to preserve if used site-wide. Unaffected by this revision.
- **`ShareSection.jsx`** — powers quiz result sharing (native share, copy link, social captions per archetype). Unaffected by this revision.
- **`BookingButtons.jsx`** — exports `BOOKING` config and `BookingButtonPair` component, used on Contact for the "15-minute discovery call" CTA (also referenced in MinecraftProgram.jsx). Two bookable clinicians: **Nik** ("Over 16s") → https://calendar.app.google/iLxEVkhaRCFEhsSC8; **Nam** ("Under 16s") → https://calendar.app.google/vGXRQqSbPwSXsY8q9. Button label pattern: "[Label] with [Name]" / "Book call". Unaffected by this revision.
- **`QuizResults.jsx`** — shared results-page shell for all 7 quizzes (styling currently uses its own hardcoded HSL palette distinct from the main site tokens — reconcile in rebuild). Unaffected by this revision.
- **`Toast.jsx`** — toast/notification UI, no marketing copy of note.

---

## Cross-Cutting Notes for the Rebuild

1. **Design system fragmentation**: two visual/token systems still coexist — (a) the main site's `primary`/`foreground`/`card` CSS-variable system (most pages) and (b) the "noctua-brown/russet/bone" palette (Free Resources hub + guide + quiz pages) — plus `EDSQuiz.jsx`'s own per-archetype hex color tokens as a smaller third outlier. (ForReferrers.jsx and PerformanceLab.jsx, the other two inline-styled outliers from v1, are now deleted, so this problem is smaller than before but not gone.) The rebuild should consolidate everything into one design system per the new style guide.
2. **Repeated primary CTA pattern**: "Make a Referral" / "Open referral form" / "Open Contact Form" all point to the same Pracsuite form: `https://questot.forms.pracsuite.com/t/9rrusgskOVlmiQQtMYzCuYn7`. This link now gets reused even more widely (Team, Contact, every service page) since Contact absorbs the referrer flow. **Confirm it's still the single canonical link before reusing it everywhere** — explicit ask in the revision brief.
3. **SEO**: only HomePage and the Free Resources hub currently have `<Helmet>` meta tags. Every other page should get title/description tags in the rebuild — this doc captures the two existing ones verbatim in their sections above.

*Removed from v1 (resolved by this revision): the team-bio-inconsistency note — fixed by the new archetype bios on `/team`; the Performance-Lab-sub-brand question — moot, the page is cut; the CommCard email inconsistency and the PDA-guide-typo/broken-CTA-link notes — all fixed inline at their respective sections above.*

---

## Open Questions (flag for Liam — don't resolve silently)

1. **Monthly Protocols** — the Performance Lab community group chat has no confirmed new home now that `/for-clinicians/performance-lab` is cut. If it's still running, it needs a destination: its own page, folded into Events & Media, or something else entirely.
2. **Second Brain Discord Setup guide** — built alongside Open Loops but not yet confirmed for this rebuild. Flagging rather than including or excluding it by default.
3. *(Added by this doc, not the original brief, but related)* — confirm the proposed `/resources` and `/team` URL slugs (see the Route Map note above) and whether 301 redirects from the old `/learn/*`, `/about/*`, and `/for-referrers` URLs are needed for SEO.
