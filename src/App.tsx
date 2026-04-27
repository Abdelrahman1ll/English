import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

// ==========================================
// Lazy-Loaded Pages & Components
// ==========================================

// --- General & Shared Pages ---
const HomePage = lazy(() => import("./components/HomePage").then((m) => ({ default: m.HomePage })));
const MonthsPage = lazy(() => import("./components/MonthsPage").then((m) => ({ default: m.MonthsPage })));
const ExercisesPage = lazy(() => import("./components/ExercisesPage").then((m) => ({ default: m.ExercisesPage })));
const ConversationsPage = lazy(() => import("./components/ConversationsPage").then((m) => ({ default: m.ConversationsPage })));
const SearchPage = lazy(() => import("./components/SearchPage").then((m) => ({ default: m.SearchPage })));
const LandingPage = lazy(() => import("./components/LandingPage").then((m) => ({ default: m.LandingPage })));
const MindMapPage = lazy(() => import("./components/MindMapPage").then((m) => ({ default: m.MindMapPage })));

// --- Grammar Pages ---
const ArticlesPage = lazy(() => import("./components/A1/ArticlesPage").then((m) => ({ default: m.ArticlesPage })));
const PluralsPage = lazy(() => import("./components/Grammar/PluralsPage").then((m) => ({ default: m.PluralsPage })));
const PronounsPage = lazy(() => import("./components/Grammar/PronounsPage").then((m) => ({ default: m.PronounsPage })));
const VerbToBePage = lazy(() => import("./components/Grammar/VerbToBePage").then((m) => ({ default: m.VerbToBePage })));
const DemonstrativesPage = lazy(() => import("./components/Grammar/DemonstrativesPage").then((m) => ({ default: m.DemonstrativesPage })));
const PrepositionsPage = lazy(() => import("./components/Grammar/PrepositionsPage").then((m) => ({ default: m.PrepositionsPage })));

// --- Level A1 Pages ---
const BasicsPage = lazy(() => import("./components/A1/BasicsPage").then((m) => ({ default: m.BasicsPage })));
const AlphabetPage = lazy(() => import("./components/A1/AlphabetPage").then((m) => ({ default: m.AlphabetPage })));
const PhonicsWordsPage = lazy(() => import("./components/A1/PhonicsWordsPage").then((m) => ({ default: m.PhonicsWordsPage })));
const DigraphsPage = lazy(() => import("./components/A1/DigraphsPage").then((m) => ({ default: m.DigraphsPage })));
const NumbersPage = lazy(() => import("./components/A1/NumbersPage").then((m) => ({ default: m.NumbersPage })));
const ColorsPage = lazy(() => import("./components/A1/ColorsPage").then((m) => ({ default: m.ColorsPage })));
const JobsPage = lazy(() => import("./components/A1/JobsPage").then((m) => ({ default: m.JobsPage })));
const ShapesPage = lazy(() => import("./components/A1/ShapesPage").then((m) => ({ default: m.ShapesPage })));
const FeelingsPage = lazy(() => import("./components/A1/FeelingsPage").then((m) => ({ default: m.FeelingsPage })));
const DescribingPage = lazy(() => import("./components/A1/DescribingPage").then((m) => ({ default: m.DescribingPage })));
const NationalitiesPage = lazy(() => import("./components/A1/NationalitiesPage").then((m) => ({ default: m.NationalitiesPage })));
const GreetingsBasicsPage = lazy(() => import("./components/A1/GreetingsBasicsPage").then((m) => ({ default: m.GreetingsBasicsPage })));
const CommonSocialPage = lazy(() => import("./components/A1/CommonSocialPage").then((m) => ({ default: m.CommonSocialPage })));
const TopicSentencesPage = lazy(() => import("./components/A1/TopicSentencesPage").then((m) => ({ default: m.TopicSentencesPage })));
const DescribingSentencesPage = lazy(() => import("./components/A1/DescribingSentencesPage").then((m) => ({ default: m.DescribingSentencesPage })));

// --- Level A2 Pages ---
const FamilyPage = lazy(() => import("./components/A2/FamilyPage").then((m) => ({ default: m.FamilyPage })));
const PersonalityPage = lazy(() => import("./components/A2/PersonalityPage").then((m) => ({ default: m.PersonalityPage })));
const TellingTimePage = lazy(() => import("./components/A2/TellingTimePage").then((m) => ({ default: m.TellingTimePage })));
const RoutinesPage = lazy(() => import("./components/A2/RoutinesPage").then((m) => ({ default: m.RoutinesPage })));
const VerbsPage = lazy(() => import("./components/A2/VerbsPage").then((m) => ({ default: m.VerbsPage })));
const ClassroomPage = lazy(() => import("./components/A2/ClassroomPage").then((m) => ({ default: m.ClassroomPage })));
const PronunciationPage = lazy(() => import("./components/A2/PronunciationPage").then((m) => ({ default: m.PronunciationPage })));
const CountriesPage = lazy(() => import("./components/A2/CountriesPage").then((m) => ({ default: m.CountriesPage })));
const PartsOfSpeechPage = lazy(() => import("./components/A2/PartsOfSpeechPage").then((m) => ({ default: m.PartsOfSpeechPage })));
const IntroduceMyselfPage = lazy(() => import("./components/A2/IntroduceMyselfPage").then((m) => ({ default: m.IntroduceMyselfPage })));
const PresentContinuousWorksheetPage = lazy(() => import("./components/A2/PresentContinuousWorksheetPage").then((m) => ({ default: m.PresentContinuousWorksheetPage })));
const SentenceStructurePage = lazy(() => import("./components/A2/SentenceStructurePage"));
const SubscriptionPage = lazy(() => import("./components/SubscriptionPage/SubscriptionPage").then((m) => ({ default: m.SubscriptionPage })));

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
              {/* ============================== */}
              {/* Core Application Routes        */}
              {/* ============================== */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/:levelId/home" element={<HomePage />} />
              <Route path="/:levelId/search" element={<SearchPage />} />
              <Route path="/:levelId/mindmap" element={<MindMapPage />} />
              
              {/* ============================== */}
              {/* Level A1 Routes                */}
              {/* ============================== */}
              <Route path="/:levelId/alphabet" element={<AlphabetPage />} />
              <Route path="/:levelId/basics" element={<BasicsPage />} />
              <Route path="/:levelId/digraphs" element={<DigraphsPage />} />
              <Route
                path="/:levelId/word-bank"
                element={<PhonicsWordsPage />}
              />
              <Route path="/:levelId/numbers" element={<NumbersPage />} />
              <Route path="/:levelId/colors" element={<ColorsPage />} />
              <Route path="/:levelId/jobs" element={<JobsPage />} />
              <Route path="/:levelId/shapes" element={<ShapesPage />} />
              <Route path="/:levelId/feelings" element={<FeelingsPage />} />
              <Route path="/:levelId/describing" element={<DescribingPage />} />
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

              {/* ============================== */}
              {/* Grammar Routes (A1 & A2)       */}
              {/* ============================== */}
              <Route path="/:levelId/articles" element={<ArticlesPage />} />
              <Route path="/:levelId/plurals" element={<PluralsPage />} />
              <Route path="/:levelId/pronouns" element={<PronounsPage />} />
              <Route path="/:levelId/verb-to-be" element={<VerbToBePage />} />
              <Route
                path="/:levelId/demonstratives"
                element={<DemonstrativesPage />}
              />
              <Route
                path="/:levelId/prepositions"
                element={<PrepositionsPage />}
              />
              <Route path="/:levelId/months" element={<MonthsPage />} />

              {/* ============================== */}
              {/* Level A2 Routes                */}
              {/* ============================== */}
              <Route path="/:levelId/family" element={<FamilyPage />} />
              <Route path="/:levelId/sentence-structure" element={<SentenceStructurePage />} />
              <Route
                path="/:levelId/personality"
                element={<PersonalityPage />}
              />
              <Route path="/:levelId/time" element={<TellingTimePage />} />
              <Route path="/:levelId/routines" element={<RoutinesPage />} />
              <Route path="/:levelId/verbs" element={<VerbsPage />} />
              <Route path="/:levelId/classroom" element={<ClassroomPage />} />
              <Route
                path="/:levelId/pronunciation"
                element={<PronunciationPage />}
              />
              <Route path="/:levelId/countries" element={<CountriesPage />} />
              <Route
                path="/:levelId/parts-of-speech"
                element={<PartsOfSpeechPage />}
              />
              <Route
                path="/:levelId/introduce-myself"
                element={<IntroduceMyselfPage />}
              />
              <Route
                path="/:levelId/present-continuous"
                element={<PresentContinuousWorksheetPage />}
              />

              {/* ============================== */}
              {/* Testing & Exercises Routes     */}
              {/* ============================== */}
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
              <Route
                path="/:levelId/subscription"
                element={<SubscriptionPage />}
              />
            </Routes>
          </Suspense>
        </Layout>
      </PracticeProvider>
    </LevelProvider>
  );
}

export default App;
