import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

// Lazy-loaded pages
const BasicsPage = lazy(() => import("./components/BasicsPage").then(m => ({ default: m.BasicsPage })));
const HomePage = lazy(() => import("./components/HomePage").then(m => ({ default: m.HomePage })));
const AlphabetPage = lazy(() => import("./components/AlphabetPage").then(m => ({ default: m.AlphabetPage })));
const PhonicsWordsPage = lazy(() => import("./components/PhonicsWordsPage").then(m => ({ default: m.PhonicsWordsPage })));
const MonthsPage = lazy(() => import("./components/MonthsPage").then(m => ({ default: m.MonthsPage })));
const DigraphsPage = lazy(() => import("./components/DigraphsPage").then(m => ({ default: m.DigraphsPage })));
const NumbersPage = lazy(() => import("./components/NumbersPage").then(m => ({ default: m.NumbersPage })));
const ColorsPage = lazy(() => import("./components/ColorsPage").then(m => ({ default: m.ColorsPage })));
const JobsPage = lazy(() => import("./components/JobsPage").then(m => ({ default: m.JobsPage })));
const ShapesPage = lazy(() => import("./components/ShapesPage").then(m => ({ default: m.ShapesPage })));
const GrammarPage = lazy(() => import("./components/GrammarPage").then(m => ({ default: m.GrammarPage })));
const FeelingsPage = lazy(() => import("./components/FeelingsPage").then(m => ({ default: m.FeelingsPage })));
const DescribingPage = lazy(() => import("./components/DescribingPage").then(m => ({ default: m.DescribingPage })));
const NationalitiesPage = lazy(() => import("./components/NationalitiesPage").then(m => ({ default: m.NationalitiesPage })));
const GreetingsBasicsPage = lazy(() => import("./components/GreetingsBasicsPage").then(m => ({ default: m.GreetingsBasicsPage })));
const CommonSocialPage = lazy(() => import("./components/CommonSocialPage").then(m => ({ default: m.CommonSocialPage })));
const TopicSentencesPage = lazy(() => import("./components/TopicSentencesPage").then(m => ({ default: m.TopicSentencesPage })));
const DescribingSentencesPage = lazy(() => import("./components/DescribingSentencesPage").then(m => ({ default: m.DescribingSentencesPage })));
const ExercisesPage = lazy(() => import("./components/ExercisesPage").then(m => ({ default: m.ExercisesPage })));
const ConversationsPage = lazy(() => import("./components/ConversationsPage").then(m => ({ default: m.ConversationsPage })));
const SearchPage = lazy(() => import("./components/SearchPage").then(m => ({ default: m.SearchPage })));
const LandingPage = lazy(() => import("./components/LandingPage").then(m => ({ default: m.LandingPage })));
const FamilyPage = lazy(() => import("./components/FamilyPage").then(m => ({ default: m.FamilyPage })));
const PersonalityPage = lazy(() => import("./components/PersonalityPage").then(m => ({ default: m.PersonalityPage })));
const TellingTimePage = lazy(() => import("./components/TellingTimePage").then(m => ({ default: m.TellingTimePage })));
const RoutinesPage = lazy(() => import("./components/RoutinesPage").then(m => ({ default: m.RoutinesPage })));
const VerbsPage = lazy(() => import("./components/VerbsPage").then(m => ({ default: m.VerbsPage })));
const ClassroomPage = lazy(() => import("./components/ClassroomPage").then(m => ({ default: m.ClassroomPage })));
const PronunciationPage = lazy(() => import("./components/PronunciationPage").then(m => ({ default: m.PronunciationPage })));
const CountriesPage = lazy(() => import("./components/CountriesPage").then(m => ({ default: m.CountriesPage })));
const PartsOfSpeechPage = lazy(() => import("./components/PartsOfSpeechPage").then(m => ({ default: m.PartsOfSpeechPage })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

import { LevelProvider } from "./context/LevelContext";
import { PracticeProvider } from "./context/PracticeContext";
// import { useDeviceTracking } from "./hooks/useDeviceTracking";

function App() {
  // useDeviceTracking();
  return (
    <LevelProvider>
      <PracticeProvider>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/:levelId/home" element={<HomePage />} />
              <Route path="/:levelId/alphabet" element={<AlphabetPage />} />
              <Route path="/:levelId/basics" element={<BasicsPage />} />
              <Route path="/:levelId/digraphs" element={<DigraphsPage />} />
              <Route path="/:levelId/search" element={<SearchPage />} />
              <Route path="/:levelId/word-bank" element={<PhonicsWordsPage />} />
              <Route path="/:levelId/numbers" element={<NumbersPage />} />
              <Route path="/:levelId/colors" element={<ColorsPage />} />
              <Route path="/:levelId/jobs" element={<JobsPage />} />
              <Route path="/:levelId/shapes" element={<ShapesPage />} />
              <Route path="/:levelId/grammar" element={<GrammarPage />} />
              <Route path="/:levelId/feelings" element={<FeelingsPage />} />
              <Route path="/:levelId/describing" element={<DescribingPage />} />
              <Route path="/:levelId/months" element={<MonthsPage />} />
              <Route path="/:levelId/family" element={<FamilyPage />} />
              <Route path="/:levelId/personality" element={<PersonalityPage />} />
              <Route path="/:levelId/time" element={<TellingTimePage />} />
              <Route path="/:levelId/routines" element={<RoutinesPage />} />
              <Route path="/:levelId/verbs" element={<VerbsPage />} />
              <Route path="/:levelId/classroom" element={<ClassroomPage />} />
              <Route path="/:levelId/pronunciation" element={<PronunciationPage />} />
              <Route path="/:levelId/countries" element={<CountriesPage />} />
              <Route path="/:levelId/parts-of-speech" element={<PartsOfSpeechPage />} />
              <Route
                path="/:levelId/nationalities"
                element={<NationalitiesPage />}
              />
              <Route
                path="/:levelId/greetings-basics"
                element={<GreetingsBasicsPage />}
              />
              <Route
                path="/:levelId/common-social"
                element={<CommonSocialPage />}
              />
              <Route
                path="/:levelId/topic-sentences"
                element={<TopicSentencesPage />}
              />
              <Route
                path="/:levelId/describing-sentences"
                element={<DescribingSentencesPage />}
              />
              <Route
                path="/:levelId/exercises/:category"
                element={<ExercisesPage />}
              />
              <Route
                path="/:levelId/exercises/:category/:testId"
                element={<ExercisesPage />}
              />
              <Route
                path="/:levelId/conversations"
                element={<ConversationsPage />}
              />
            </Routes>
          </Suspense>
        </Layout>
    </PracticeProvider>
    </LevelProvider>
  );
}

export default App;
