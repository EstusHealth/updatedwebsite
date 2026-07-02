import { Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { ToastProvider } from './components/Toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutApproach from './pages/AboutApproach';
import TeamPage from './pages/TeamPage';
import OccupationalTherapy from './pages/services/OccupationalTherapy';
import GamingInformedTherapy from './pages/services/GamingInformedTherapy';
import MinecraftProgram from './pages/services/MinecraftProgram';
import AssessmentsReports from './pages/services/AssessmentsReports';
import SleepProgram from './pages/services/SleepProgram';
import ForReferrers from './pages/ForReferrers';
import PerformanceLab from './pages/PerformanceLab';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/learn/ResourcesPage';
import LearnPDA from './pages/learn/LearnPDA';
import LearnLateDiagnosis from './pages/learn/LearnLateDiagnosis';
import LearnExecutiveFunction from './pages/learn/LearnExecutiveFunction';
import ChronotypeQuiz from './pages/ChronotypeQuiz';
import EnergyQuiz from './pages/EnergyQuiz';
import PDAQuiz from './pages/PDAQuiz';
import BurnoutQuiz from './pages/BurnoutQuiz';
import GamingQuiz from './pages/GamingQuiz';
import RPGCharacterQuiz from './pages/RPGCharacterQuiz';
import EDSQuiz from './pages/EDSQuiz';
import LearnEDSHSD from './pages/learn/LearnEDSHSD';
import CommCard from './pages/resources/CommCard';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ToastProvider>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about">
            <Route path="approach" element={<AboutApproach />} />
            <Route path="team" element={<TeamPage />} />
          </Route>
          <Route path="services">
            <Route path="occupational-therapy" element={<OccupationalTherapy />} />
            <Route path="gaming-informed-therapy" element={<GamingInformedTherapy />} />
            <Route path="minecraft-program" element={<MinecraftProgram />} />
            <Route path="assessments-reports" element={<AssessmentsReports />} />
            <Route path="sleep-program" element={<SleepProgram />} />
          </Route>
          <Route path="for-referrers" element={<ForReferrers />} />
          <Route path="for-clinicians">
            <Route path="performance-lab" element={<PerformanceLab />} />
          </Route>
          <Route path="contact" element={<ContactPage />} />
          <Route path="resources">
            <Route path="commcard" element={<CommCard />} />
          </Route>
          <Route path="learn">
            <Route index element={<ResourcesPage />} />
            <Route path="understanding-pda" element={<LearnPDA />} />
            <Route path="late-autism-diagnosis" element={<LearnLateDiagnosis />} />
            <Route path="executive-function-complex-health" element={<LearnExecutiveFunction />} />
            <Route path="chronotype-quiz" element={<ChronotypeQuiz />} />
            <Route path="energy-quiz" element={<EnergyQuiz />} />
            <Route path="pda-quiz" element={<PDAQuiz />} />
            <Route path="burnout-quiz" element={<BurnoutQuiz />} />
            <Route path="gaming-quiz" element={<GamingQuiz />} />
            <Route path="rpg-character-quiz" element={<RPGCharacterQuiz />} />
            <Route path="eds-hsd" element={<LearnEDSHSD />} />
            <Route path="eds-hsd-quiz" element={<EDSQuiz />} />
          </Route>
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </ToastProvider>
  );
}

export default App;
