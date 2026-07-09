import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home'
import Team from './pages/Team'
import Contact from './pages/Contact'

import OccupationalTherapy from './pages/services/OccupationalTherapy'
import GamingInformedTherapy from './pages/services/GamingInformedTherapy'
import MinecraftProgram from './pages/services/MinecraftProgram'
import AssessmentsReports from './pages/services/AssessmentsReports'

import ResourcesHub from './pages/resources/ResourcesHub'
import UnderstandingPDA from './pages/resources/UnderstandingPDA'
import LateAutismDiagnosis from './pages/resources/LateAutismDiagnosis'
import ExecutiveFunction from './pages/resources/ExecutiveFunction'
import EdsHsd from './pages/resources/EdsHsd'
import CommCard from './pages/resources/CommCard'
import OpenLoops from './pages/resources/OpenLoops'
import Lexicon from './pages/resources/Lexicon'
import SecondBrain from './pages/resources/SecondBrain'
import Events from './pages/resources/Events'

// The webinar hub (video + filterable library + rich data) is large and not a
// primary entry page, so it is code-split into its own chunk.
const GamingInformedTherapyWebinar = lazy(() => import('./pages/events/GamingInformedTherapyWebinar'))

// Quizzes are heavy (question banks + lucide-react icons) and rarely the entry
// page, so they are code-split into their own chunks.
const PDAQuiz = lazy(() => import('./pages/quizzes/PDAQuiz'))
const ChronotypeQuiz = lazy(() => import('./pages/quizzes/ChronotypeQuiz'))
const EnergyQuiz = lazy(() => import('./pages/quizzes/EnergyQuiz'))
const BurnoutQuiz = lazy(() => import('./pages/quizzes/BurnoutQuiz'))
const GamingQuiz = lazy(() => import('./pages/quizzes/GamingQuiz'))
const RPGCharacterQuiz = lazy(() => import('./pages/quizzes/RPGCharacterQuiz'))
const EDSQuiz = lazy(() => import('./pages/quizzes/EDSQuiz'))

import NotFound from './pages/NotFound'

// Old /learn/* URLs remain valid content: redirect to their new /resources/* home.
function LearnRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/resources/${slug}`} replace />
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<div className="wrap" style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--text-soft)' }}>Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/gaming-informed-therapy" element={<GamingInformedTherapyWebinar />} />

        <Route path="/services/occupational-therapy" element={<OccupationalTherapy />} />
        <Route path="/services/gaming-informed-therapy" element={<GamingInformedTherapy />} />
        <Route path="/services/minecraft-program" element={<MinecraftProgram />} />
        <Route path="/services/assessments-reports" element={<AssessmentsReports />} />

        <Route path="/resources" element={<ResourcesHub />} />
        <Route path="/resources/understanding-pda" element={<UnderstandingPDA />} />
        <Route path="/resources/late-autism-diagnosis" element={<LateAutismDiagnosis />} />
        <Route path="/resources/executive-function-complex-health" element={<ExecutiveFunction />} />
        <Route path="/resources/eds-hsd" element={<EdsHsd />} />
        <Route path="/resources/commcard" element={<CommCard />} />
        <Route path="/resources/open-loops" element={<OpenLoops />} />
        <Route path="/resources/lexicon" element={<Lexicon />} />
        <Route path="/resources/second-brain" element={<SecondBrain />} />

        <Route path="/resources/pda-quiz" element={<PDAQuiz />} />
        <Route path="/resources/chronotype-quiz" element={<ChronotypeQuiz />} />
        <Route path="/resources/energy-quiz" element={<EnergyQuiz />} />
        <Route path="/resources/burnout-quiz" element={<BurnoutQuiz />} />
        <Route path="/resources/gaming-quiz" element={<GamingQuiz />} />
        <Route path="/resources/rpg-character-quiz" element={<RPGCharacterQuiz />} />
        <Route path="/resources/eds-hsd-quiz" element={<EDSQuiz />} />

        {/* Legacy redirects: keep old indexed URLs alive. */}
        <Route path="/resources/events" element={<Navigate to="/events" replace />} />
        <Route path="/learn" element={<Navigate to="/resources" replace />} />
        <Route path="/learn/:slug" element={<LearnRedirect />} />
        <Route path="/about/approach" element={<Navigate to="/team" replace />} />
        <Route path="/about/team" element={<Navigate to="/team" replace />} />
        <Route path="/for-referrers" element={<Navigate to="/contact" replace />} />
        <Route path="/services/sleep-program" element={<Navigate to="/services" replace />} />
        <Route path="/services" element={<Navigate to="/services/occupational-therapy" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </Layout>
  )
}
