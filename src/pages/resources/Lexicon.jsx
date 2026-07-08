import { useState, useMemo, useRef, useCallback } from 'react'
import SEO from '../../components/SEO'
import { PageHero, Btn, CTABand, ReferralButton } from '../../components/Bits'

/* The Shared Lexicon: a family-friendly, neuroaffirming glossary across five
   domains. Static content, no data collected. The interaction model is a set
   of expandable domain accordions plus a live search that filters every term
   at once and auto-opens whichever domains still have matches. */

const DOMAINS = [
  {
    id: 'ot',
    label: 'Therapy & OT',
    c: 'var(--teal)',
    blurb: 'Family-facing occupational therapy language, minus the clinical distance.',
    terms: [
      { t: 'Occupational therapy (OT)', d: 'A health profession that helps people of all ages do the everyday "occupations" that matter to them: self-care, play, learning, work and connecting with others, by building skills, adapting tasks, and changing the environment to remove barriers.' },
      { t: 'Sensory processing (sensory integration)', d: 'How the brain takes in and organises information from the senses, including the eight OTs recognise: sight, sound, touch, taste, smell, movement (vestibular), body position (proprioception) and internal body signals (interoception).' },
      { t: 'Sensory diet', d: 'An individualised plan of sensory activities designed to help someone feel regulated and ready to engage across the day. The term was coined by OT Patricia Wilbarger.', care: '"Diet" is a metaphor (like a balanced diet of activity, not food), and some affirming practitioners prefer "sensory plan" or "sensory supports".' },
      { t: 'Self-regulation', d: 'The ability to notice and manage your own energy, emotions and attention to meet the demands of a situation.' },
      { t: 'Co-regulation', d: 'Regulating together: a calm, supportive person helping another person settle their nervous system. It is how children first learn regulation, and it remains important across the lifespan.' },
      { t: 'Executive function', d: 'The brain\'s "management system": planning, organising, remembering instructions, starting tasks, managing time, controlling impulses and switching between tasks.' },
      { t: 'Executive dysfunction', d: 'When those management skills are harder to access, common in ADHD and other neurotypes. It is not laziness or lack of care.' },
      { t: 'Interoception', d: 'The "hidden sense" of the internal body: noticing hunger, thirst, needing the toilet, heart rate, or the body signs of emotions. It underpins self-regulation.' },
      { t: 'Proprioception', d: 'The body\'s sense of position, movement and force: knowing where your limbs are without looking, and how hard to press or grip.' },
      { t: 'Vestibular sense', d: 'The sense of balance and movement, coming from the inner ear; it tells us about head position and motion.' },
      { t: 'Fine motor skills', d: 'Small, precise movements using the hands and fingers (writing, doing up buttons, using cutlery).' },
      { t: 'Gross motor skills', d: 'Large movements using the whole body or big muscle groups (running, jumping, climbing, balancing).' },
      { t: 'Activities of daily living (ADLs)', d: 'The everyday self-care tasks of life: dressing, eating, bathing, toileting, grooming. "Instrumental ADLs" (IADLs) are more complex tasks like cooking, shopping and managing money.' },
      { t: 'Scaffolding', d: 'Providing just enough support for someone to succeed at a task that is slightly beyond what they could do alone, then gradually reducing the support as their skills grow.' },
      { t: 'Zones of Regulation', d: 'A widely used, colour-coded framework that gives children and families a shared language for emotional states (blue, green, yellow, red) and strategies to support regulation. It is a teaching tool, not a diagnosis.' },
      { t: 'Window of tolerance', d: 'A concept from psychiatrist Dr Dan Siegel describing the "zone" of arousal in which a person can cope, think clearly and stay connected. Above it we become overwhelmed (hyperarousal); below it we can shut down (hypoarousal). Support aims to widen the window.' },
      { t: 'Masking', d: 'Consciously or unconsciously hiding neurodivergent traits to fit in with neurotypical expectations. It can help someone get by, but it is exhausting and is strongly linked to burnout and mental health strain.' },
      { t: 'Burnout (autistic / neurodivergent)', d: 'A state of profound physical, mental and emotional exhaustion, plus reduced capacity and heightened sensory sensitivity, caused by prolonged strain, often from masking and living in an unaccommodating environment. It is distinct from ordinary tiredness or occupational burnout.' },
      { t: 'Meltdown vs shutdown', d: 'A meltdown is an intense, involuntary response to overwhelm that turns outward (crying, shouting, big movements). A shutdown is the same overwhelm turned inward (going quiet, withdrawing, becoming still or unresponsive). Neither is "bad behaviour" or a tantrum, both are nervous-system responses to too much.' },
      { t: 'Stimming (self-stimulatory behaviour)', d: 'Repetitive movements, sounds or actions (hand-flapping, rocking, fidgeting, humming) that help with self-regulation, focus, and expressing emotion. Affirming practice supports safe stimming rather than trying to stop it.' },
      { t: 'Functional capacity', d: 'A person\'s ability to carry out everyday activities across home, community, learning and work. In Australia, an NDIS Functional Capacity Assessment (FCA) is usually completed by an occupational therapist and describes strengths and challenges to inform NDIS support.' },
      { t: 'Telehealth', d: 'Therapy delivered via video call or phone rather than in person, widely used in Australia to improve access, especially in regional areas.' },
      { t: 'Goal-directed therapy', d: 'Therapy organised around meaningful, person-chosen goals. Affirming practice writes goals with the client and family (co-production) to improve self-determined quality of life, not to make someone appear "normal".' },
    ],
    footnote: 'Affirming practice favours describing the environment and unmet needs rather than "challenging behaviour"; prefers "supports" over "treatment / fixing"; and frames sensory and regulation differences as needs to accommodate, not deficits to eliminate.',
  },
  {
    id: 'neuro',
    label: 'Neurodivergence',
    c: 'var(--mauve)',
    blurb: 'Affirming, community-preferred language for brains that work differently.',
    terms: [
      { t: 'Neurodiversity', d: 'The natural variation in human brains and minds: the idea that there is no single "right" way for a brain to work. The term is credited to Judy Singer in the late 1990s.' },
      { t: 'Neurodivergent', d: 'Having a mind that works differently from what is considered "typical": includes autistic people, ADHDers, dyslexic people and others.' },
      { t: 'Neurotypical', d: 'Someone whose neurological development and functioning fall within societal expectations of "typical".' },
      { t: 'Neurotype', d: 'A person\'s particular kind of brain wiring (for example, the autistic neurotype).' },
      { t: 'Autistic (identity-first language)', d: 'Most autistic people and affirming organisations prefer "autistic person" over "person with autism", because autism is seen as an inseparable, valued part of identity rather than an add-on or illness. Always follow an individual\'s stated preference.' },
      { t: 'ADHD (Attention Deficit Hyperactivity Disorder)', d: 'A neurotype involving differences in attention regulation, impulse control and activity levels. Affirming framing describes it as variable attention (interest- and dopamine-driven), not simply a "deficit" of attention.' },
      { t: 'AuDHD', d: 'A community term for someone who is both autistic and has ADHD. It is informal (not a separate diagnosis) but widely used and clinically respectful.' },
      { t: 'PDA', d: 'Originally "Pathological Demand Avoidance", increasingly reframed by the autistic community as Persistent (or Pervasive) Drive for Autonomy: a profile involving an anxiety-driven, nervous-system need for autonomy and intense resistance to everyday demands.', care: 'Terminology is genuinely contested. There is growing acceptance of the concept within the community across Australia and the UK, but it is not yet formally defined or recognised as a standalone diagnosis in the DSM-5.' },
      { t: 'Sensory overload', d: 'When sensory input (noise, light, crowds, textures) becomes too much for the nervous system to process, leading to distress, overwhelm, or meltdown / shutdown.' },
      { t: 'Special interest / hyperfocus', d: 'A special interest is a deep, joyful, often expert-level passion for a topic, a genuine source of wellbeing and connection. Hyperfocus is intense, absorbed concentration on an engaging task.' },
      { t: 'Masking / unmasking', d: 'Masking is hiding neurodivergent traits to fit in. Unmasking is the gradual, self-paced process of letting authentic traits show and honouring one\'s own needs. Unmasking is not always equally safe for everyone.' },
      { t: 'Spoon theory / energy accounting', d: 'A metaphor coined by Christine Miserandino in her 2003 essay "The Spoon Theory", where she, living with lupus, used a handful of spoons at a diner as units of finite daily energy. Tasks cost spoons, and once they run out, rest is needed. It helps explain fluctuating capacity to others.' },
      { t: 'Double empathy problem', d: 'Dr Damian Milton\'s theory (2012) that communication difficulties between autistic and non-autistic people are a two-way mismatch, not a one-sided deficit: understanding needs to flow both ways.' },
      { t: 'Monotropism', d: 'A neurodivergent-led theory (Dinah Murray, Wenn Lawson and Mike Lesser) that autistic attention tends to focus intensely on a few interests at a time ("a beam of light in a dark room"), rather than being spread widely.' },
      { t: 'Dyslexia', d: 'A learning difference affecting reading, spelling and word processing, unrelated to intelligence.' },
      { t: 'Dyspraxia (Developmental Coordination Disorder)', d: 'A difference affecting motor coordination and the planning of movements.' },
      { t: 'Dyscalculia', d: 'A learning difference affecting numbers, arithmetic and mathematical reasoning.' },
      { t: 'Rejection sensitive dysphoria (RSD)', d: 'Intense emotional pain triggered by real or perceived rejection, criticism or failure, commonly associated with ADHD.', care: 'It is a widely used descriptive term, not a formal DSM-5 diagnosis.' },
      { t: 'Info-dumping', d: 'Enthusiastically sharing lots of detail about a beloved topic. In neurodivergent communities it is understood as an act of trust and connection, a "love language".' },
      { t: 'Parallel play / body doubling', d: 'Being companionably together while doing separate things ("alone together"). It offers connection and, for many, helps focus, without the pressure of constant interaction.' },
    ],
    footnote: 'Affirming practice prefers identity-first ("autistic person"); avoids "high / low functioning" (which erases individual needs); has largely retired "Asperger\'s"; and avoids "suffers from" or "afflicted by". Follow each individual\'s own preference above any general rule.',
  },
  {
    id: 'lgbtqia',
    label: 'LGBTQIA+',
    c: 'var(--navy)',
    blurb: 'Respectful, widely-accepted definitions following GLAAD and PFLAG National.',
    terms: [
      { t: 'LGBTQIA+', d: 'An acronym for Lesbian, Gay, Bisexual, Transgender, Queer (or Questioning), Intersex, and Asexual (or Aromantic / Agender), with the "+" recognising all other non-straight, non-cisgender identities.' },
      { t: 'Gay', d: 'A person whose enduring physical, romantic and / or emotional attraction is to people of the same gender.' },
      { t: 'Lesbian', d: 'A woman whose enduring attraction is to other women.' },
      { t: 'Bisexual (bi, bi+)', d: 'A person who has the potential to be attracted to people of more than one gender, not necessarily at the same time or to the same degree.' },
      { t: 'Transgender', d: 'An adjective for a person whose gender identity differs from the sex they were assigned at birth. Being transgender does not depend on medical steps or appearance.' },
      { t: 'Cisgender', d: 'A person whose gender identity aligns with the sex they were assigned at birth.' },
      { t: 'Nonbinary', d: 'An adjective for people whose gender identity falls outside the categories of solely man or woman. Some nonbinary people also identify as transgender; some do not. Sometimes shortened to "enby".' },
      { t: 'Gender identity vs sex assigned at birth', d: 'Gender identity is a person\'s innermost sense of their own gender. Sex assigned at birth is the label (male / female) given at birth based on physical characteristics. They may or may not align.' },
      { t: 'Gender expression', d: 'How a person outwardly presents gender, through clothing, hair, voice, behaviour, which may or may not match societal expectations.' },
      { t: 'Pronouns (he / she / they)', d: 'The words used to refer to a person instead of their name. Using someone\'s correct pronouns is a basic sign of respect; when unsure, it is fine to ask.' },
      { t: 'Coming out', d: 'The lifelong, personal process of understanding and then sharing one\'s sexual orientation or gender identity with others. It happens on each person\'s own terms.' },
      { t: 'Queer', d: 'An umbrella and reclaimed term used by some LGBTQIA+ people, especially younger people, whose identity feels broader than "gay", "lesbian" or "bisexual".', care: 'Once a slur and still not universally embraced, use only for people who use it for themselves.' },
      { t: 'Asexual (ace)', d: 'A person who does not experience sexual attraction (experienced along a spectrum). Distinct from chosen celibacy.' },
      { t: 'Intersex', d: 'A person born with innate sex characteristics (genitals, hormones, chromosomes) that don\'t fit typical definitions of male or female. Being intersex is about biology and is distinct from gender identity and sexual orientation.' },
      { t: 'Ally', d: 'A person who supports and advocates for LGBTQIA+ people. Allyship is an ongoing practice of learning and action, not a fixed identity.' },
      { t: 'Gender-affirming', d: 'Describes care, language or actions that recognise and support a person\'s gender identity.' },
    ],
    footnote: 'Avoid "homosexual" (clinical, considered derogatory), "sexual preference" (implies choice), "lifestyle", and "gay marriage" (use "marriage equality"). Prefer "LGBTQIA+ community" over "gay community". Always mirror the person\'s own words.',
  },
  {
    id: 'gaming',
    label: 'Gaming',
    c: 'var(--teal)',
    blurb: 'For parents making sense of the language of gaming culture.',
    terms: [
      { t: 'GG ("good game")', d: 'Said at the end of a match as a sign of good sportsmanship. Saying it early can seem dismissive.' },
      { t: 'NPC ("non-player character")', d: 'A character controlled by the game, not a player. As slang, calling someone an "NPC" means they seem to act robotically or without original thought (mildly teasing).' },
      { t: 'Respawn', d: 'Coming back into the game after your character is defeated, usually after a short timer.' },
      { t: 'Grind / grinding', d: 'Repeating tasks to earn points, levels or rewards. Can feel satisfying when the payoff is worth it.' },
      { t: 'Loot', d: 'Items, gear or currency collected from enemies, quests or the game world.' },
      { t: 'Buff / nerf', d: 'A buff makes something stronger; a nerf makes it weaker. Usually refers to developer balance changes.' },
      { t: 'Meta', d: 'The currently most effective strategies, characters or gear ("most effective tactics available"). It shifts as games are updated.' },
      { t: 'Noob / newbie', d: 'A new or inexperienced player. "Newbie" is neutral; "noob" can be an insult.' },
      { t: 'AFK ("away from keyboard")', d: 'Temporarily not at the controls.' },
      { t: 'Lag', d: 'Delay between a player\'s action and the game\'s response, usually from a slow connection.' },
      { t: 'Speedrun', d: 'Attempting to finish a game (or level) as fast as possible, often as a challenge or competition.' },
      { t: 'Co-op', d: 'Cooperative play, teaming up with others toward a shared goal.' },
      { t: 'PvP / PvE', d: 'PvP is Player vs Player (competing against real people). PvE is Player vs Environment (against the game\'s computer-controlled challenges).' },
      { t: 'Mod / modding', d: 'Player-made modifications that change or add to a game.' },
      { t: 'Twitch / streaming', d: 'Broadcasting gameplay live online (Twitch is a major platform) so others can watch and chat.' },
      { t: 'Discord', d: 'A chat app (text, voice, video) where gaming and interest communities gather to talk, often outside the game itself.' },
      { t: 'Guild / clan', d: 'An organised group of players who team up regularly.' },
      { t: 'Aggro', d: 'Short for aggression, drawing the attention / hostility of enemies in a game.' },
      { t: 'Cooldown', d: 'The wait time before an ability or item can be used again.' },
      { t: 'Sandbox game', d: 'An open game with few fixed goals where players create and explore freely (for example, Minecraft).' },
      { t: 'Minecraft / creative mode', d: 'A hugely popular building game; creative mode gives unlimited resources and no threats, for pure building and exploring.' },
      { t: 'Checkpoint', d: 'A saved point players return to after failing, rather than restarting completely.' },
      { t: 'Boss / boss fight', d: 'A powerful enemy, often at the end of a level or game, requiring extra skill.' },
      { t: 'Level up', d: 'Gaining experience to become more powerful or capable (also used in everyday life to mean self-improvement).' },
      { t: 'Main quest vs side quest', d: 'The main quest is the central storyline; side quests are optional extra adventures.' },
      { t: 'Casual vs hardcore', d: 'Casual players play for relaxed fun without heavy investment; hardcore players play intensely and competitively.' },
    ],
    footnote: 'Gaming is a real social world for many young people, a place for friendship, mastery, creativity and belonging. Understanding the language shows respect for something that is genuinely important to them.',
  },
  {
    id: 'genz',
    label: 'Gen Z & Internet',
    c: 'var(--mauve)',
    blurb: 'Mainstream, non-offensive slang, safety-checked for a family setting.',
    terms: [
      { t: 'Rizz', d: 'Charm or charisma, especially the ability to attract or flirt (from "charisma"). Oxford University Press named it Word of the Year 2023.' },
      { t: 'Glow up', d: 'A positive transformation, in appearance, confidence, or skills.' },
      { t: 'Slay', d: 'To do something impressively well.' },
      { t: 'No cap', d: '"No lie / for real / I\'m serious."' },
      { t: 'Cap', d: 'A lie; "that\'s cap" means "that\'s false".' },
      { t: 'Bet', d: '"Okay / sounds good / I agree."' },
      { t: 'Bussin', d: 'Really good, usually about food (AAVE origin).' },
      { t: 'Mid', d: 'Mediocre, average, unimpressive.' },
      { t: 'Sus', d: 'Suspicious or untrustworthy (popularised by the game Among Us).' },
      { t: 'Based', d: 'A term of approval for someone being authentic and unapologetically themselves.', care: 'Occasionally used in edgy / political meme contexts, but benign in general use.' },
      { t: 'Cringe', d: 'Embarrassing or awkward; causing second-hand embarrassment.' },
      { t: 'Ate (and left no crumbs)', d: 'Did something flawlessly and completely.' },
      { t: 'Understood the assignment', d: 'Did exactly what was needed, and did it well.' },
      { t: 'Main character energy', d: 'Confidence; carrying yourself as the protagonist of your own story.' },
      { t: 'Touch grass', d: 'A playful nudge to step away from screens and reconnect with the real world.' },
      { t: 'IYKYK ("if you know, you know")', d: 'Signals an inside joke or shared understanding.' },
      { t: 'Lowkey / highkey', d: 'Lowkey = slightly, quietly, or secretly; highkey = very much, openly.' },
      { t: 'Vibe check', d: 'Assessing the mood or energy of a person or situation.' },
      { t: 'Ratio', d: 'On social media, when replies or an opposing post get more engagement than the original, signalling disagreement.' },
      { t: 'W / L', d: 'A W is a win / success; an L is a loss / failure ("took the W", "that\'s an L").' },
      { t: 'Delulu', d: 'Short for "delusional", used playfully about unrealistic optimism (often about crushes).' },
      { t: 'Ick', d: 'A sudden feeling of turn-off or distaste, usually in a dating context.' },
      { t: 'Skibidi', d: 'A nonsense word from the viral "Skibidi Toilet" videos; meaning shifts with tone (cool, bad, or just absurd filler).' },
      { t: 'Brainrot', d: 'Low-quality, absurd internet content, or the mental fog of consuming too much of it. Oxford University Press made it Word of the Year 2024. Also used affectionately ("I have total brainrot for this show").' },
      { t: 'Era (as in "in my X era")', d: 'A phase or chapter of life ("my healthy era").' },
      { t: '-core (as a suffix)', d: 'Denotes an aesthetic or style (for example, cottagecore, cleancore): "in the style of" the word before it.' },
      { t: 'Fr ("for real")', d: 'Emphasis or agreement.' },
      { t: 'It\'s giving', d: '"It gives off the vibe / energy of..." ("it\'s giving main character").' },
    ],
    footnote: 'We exclude any slang that is sexual, drug-related, or drawn from incel / "manosphere" subcultures. The threshold: anything we would comfortably read aloud to a mixed-age family in a therapy waiting room.',
  },
]

const TOTAL_TERMS = DOMAINS.reduce((n, d) => n + d.terms.length, 0)

function normalise(s) { return s.toLowerCase() }

export default function Lexicon() {
  const [query, setQuery] = useState('')
  // Which domains are manually opened. When searching, matches force-open.
  const [open, setOpen] = useState(() => ({ ot: true }))
  const searchRef = useRef(null)

  const q = normalise(query.trim())
  const searching = q.length > 0

  // Filter terms per domain against the query.
  const filtered = useMemo(() => {
    if (!searching) return DOMAINS.map((d) => ({ ...d, matches: d.terms }))
    return DOMAINS.map((d) => ({
      ...d,
      matches: d.terms.filter((term) =>
        normalise(term.t).includes(q) || normalise(term.d).includes(q) || (term.care && normalise(term.care).includes(q))
      ),
    }))
  }, [q, searching])

  const totalMatches = filtered.reduce((n, d) => n + d.matches.length, 0)

  const toggle = useCallback((id) => setOpen((o) => ({ ...o, [id]: !o[id] })), [])
  const expandAll = () => setOpen(Object.fromEntries(DOMAINS.map((d) => [d.id, true])))
  const collapseAll = () => setOpen({})

  const isOpen = (id) => searching || !!open[id]

  return (
    <>
      <SEO
        title="The Shared Lexicon | Estus Health"
        description="A free, family-friendly, neuroaffirming glossary of the words we use across occupational therapy, neurodivergence, LGBTQIA+, gaming, and Gen Z slang. Search it, expand it, and find shared language."
        path="/resources/lexicon"
      />

      <PageHero eyebrow="Interactive Tool" title="The Shared" accent="Lexicon"
        sub="The words we use, in plain language. Search any term, or expand a domain to explore."
        sub2="Built for families and clients, not clinicians." decor={false} />

      {/* Framing */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow">
          <div className="callout">
            <p style={{ color: 'var(--text-soft)', marginTop: 0 }}>Language is how we reach each other. When a family, a clinician, and a young person all use words the same way, misunderstandings shrink and trust grows. A shared lexicon is not about being "correct", it is about being understood.</p>
            <p style={{ margin: 0, color: 'var(--text-soft)' }}>We are guided by the <strong style={{ color: 'var(--heading)' }}>double empathy problem</strong>: when communication breaks down between two people who experience the world differently, the gap is mutual. Understanding flows both ways. This glossary is not here to help one group translate another, but to build common ground everyone can stand on.</p>
          </div>
          <div className="pullquote" style={{ marginBottom: 0 }}>
            When in doubt, ask the person how they describe themselves, and follow their lead.
          </div>
        </div>
      </section>

      {/* Search + controls */}
      <section style={{ paddingTop: 0 }} aria-label="Search the lexicon">
        <div className="wrap wrap--narrow">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search all ${TOTAL_TERMS} terms...`}
                aria-label="Search all terms"
                style={{ width: '100%', font: 'inherit', padding: '13px 16px', borderRadius: 999, border: '3px solid var(--line)', background: 'var(--surface)', color: 'var(--text)', boxShadow: '4px 4px 0 var(--shadow-col)' }}
              />
            </div>
            {searching
              ? <button className="btn btn--ghost" onClick={() => { setQuery(''); searchRef.current?.focus() }}>Clear</button>
              : (
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn--ghost" onClick={expandAll}>Expand all</button>
                  <button className="btn btn--ghost" onClick={collapseAll}>Collapse all</button>
                </div>
              )}
          </div>
          <p style={{ color: 'var(--text-soft)', fontSize: '.9rem', margin: '12px 2px 0' }} aria-live="polite">
            {searching
              ? `${totalMatches} ${totalMatches === 1 ? 'term matches' : 'terms match'} "${query.trim()}"`
              : `${DOMAINS.length} domains · ${TOTAL_TERMS} terms · tap a domain to expand it`}
          </p>
        </div>
      </section>

      {/* Domain accordions */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap wrap--narrow" style={{ display: 'grid', gap: 18 }}>
          {searching && totalMatches === 0 && (
            <p style={{ color: 'var(--text-soft)', fontStyle: 'italic', textAlign: 'center', padding: '24px 0' }}>
              No terms match "{query.trim()}". Try a shorter word, or clear the search to browse everything.
            </p>
          )}

          {filtered.map((d) => {
            if (searching && d.matches.length === 0) return null
            const opened = isOpen(d.id)
            const panelId = `lex-panel-${d.id}`
            return (
              <article key={d.id} className="card card--static" style={{ padding: 0, overflow: 'hidden', borderLeft: `8px solid ${d.c}` }}>
                <button
                  onClick={() => !searching && toggle(d.id)}
                  aria-expanded={opened}
                  aria-controls={panelId}
                  disabled={searching}
                  style={{
                    width: '100%', textAlign: 'left', cursor: searching ? 'default' : 'pointer', font: 'inherit',
                    background: 'transparent', border: 'none', padding: '22px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span aria-hidden="true" style={{ width: 16, height: 16, background: d.c, borderRadius: 5, flex: 'none', boxShadow: '2px 2px 0 var(--shadow-col)' }} />
                    <span>
                      <span style={{ fontFamily: 'var(--f-head)', fontSize: '1.15rem', textTransform: 'uppercase', color: 'var(--heading)', letterSpacing: '-.5px', display: 'block' }}>{d.label}</span>
                      <span style={{ fontSize: '.88rem', color: 'var(--text-soft)' }}>{d.blurb}</span>
                    </span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
                    <span className="badge" style={{ background: d.c }}>{searching ? d.matches.length : d.terms.length}</span>
                    {!searching && (
                      <span aria-hidden="true" style={{ fontFamily: 'var(--f-display)', color: d.c, fontSize: '1rem', transform: opened ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}>▾</span>
                    )}
                  </span>
                </button>

                {opened && (
                  <div id={panelId} style={{ padding: '0 24px 20px', display: 'grid', gap: 4 }}>
                    <div style={{ borderTop: '2px dashed var(--line)', paddingTop: 14, display: 'grid', gap: 14 }}>
                      {d.matches.map((term) => (
                        <div key={term.t}>
                          <h3 style={{ fontFamily: 'var(--f-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--heading)', margin: 0 }}>{term.t}</h3>
                          <p style={{ color: 'var(--text-soft)', margin: '3px 0 0', fontSize: '.96rem' }}>{term.d}</p>
                          {term.care && (
                            <p style={{ margin: '8px 0 0', fontSize: '.88rem', color: 'var(--text)', background: 'var(--surface-2)', borderLeft: `4px solid ${d.c}`, borderRadius: '0 10px 10px 0', padding: '8px 12px' }}>
                              <strong style={{ color: 'var(--mauve)', textTransform: 'uppercase', fontSize: '.72rem', letterSpacing: '.5px', display: 'block', marginBottom: 2 }}>Handle with care</strong>
                              {term.care}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {!searching && d.footnote && (
                      <p style={{ margin: '16px 0 0', fontSize: '.86rem', fontStyle: 'italic', color: 'var(--text-soft)' }}>
                        <strong style={{ color: d.c, fontStyle: 'normal' }}>Preferred vs avoided: </strong>{d.footnote}
                      </p>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* A living document note */}
      <section className="tint-section">
        <div className="wrap wrap--narrow">
          <span className="eyebrow eyebrow--mauve">A living document</span>
          <h2 className="sec-head" style={{ marginTop: 16, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>Language changes. So will this.</h2>
          <p className="lead" style={{ marginTop: 14 }}>Slang and identity language evolve. Where a term is contested or fast-moving, we say so. Where a term can cause harm, we leave it out. Everything here is offered in the spirit of connection, not correction.</p>
          <p style={{ color: 'var(--text-soft)', marginTop: 12 }}>Definitions draw on reputable, affirming sources: GLAAD, PFLAG National, autistic-led organisations, the NDIS, and major dictionaries. Australian spelling throughout. This lexicon is educational, not diagnostic or clinical advice.</p>
        </div>
      </section>

      <CTABand
        title="Words are where connection starts."
        body="A shared lexicon is a beginning. If you want personalised, neuroaffirming support, we are here."
        buttons={<><ReferralButton big /><Btn to="/team" variant="btn--alt" big>Meet the Team</Btn></>}
      />
    </>
  )
}
