import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { BasicsPage } from "./components/BasicsPage";
import { HomePage } from "./components/HomePage";
import { AlphabetPage } from "./components/AlphabetPage";
import { PhonicsWordsPage } from "./components/PhonicsWordsPage";
import { MonthsPage } from "./components/MonthsPage";
import { DigraphsPage } from "./components/DigraphsPage";
import { NumbersPage } from "./components/NumbersPage";
import { ColorsPage } from "./components/ColorsPage";
import { JobsPage } from "./components/JobsPage";
import { ShapesPage } from "./components/ShapesPage";
import { GrammarPage } from "./components/GrammarPage";
import { FeelingsPage } from "./components/FeelingsPage";
import { DescribingPage } from "./components/DescribingPage";
import { NationalitiesPage } from "./components/NationalitiesPage";
import { GreetingsBasicsPage } from "./components/GreetingsBasicsPage";
import { CommonSocialPage } from "./components/CommonSocialPage";
import { TopicSentencesPage } from "./components/TopicSentencesPage";
import { DescribingSentencesPage } from "./components/DescribingSentencesPage";
import { ExercisesPage } from "./components/ExercisesPage";
import { ConversationsPage } from "./components/ConversationsPage";
import { SearchPage } from "./components/SearchPage";
import { LandingPage } from "./components/LandingPage";

import { LevelProvider } from "./context/LevelContext";
import { useDeviceTracking } from "./hooks/useDeviceTracking";

function App() {
  useDeviceTracking();
  return (
    <LevelProvider>
      <Layout>
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
      </Layout>
    </LevelProvider>
  );
}

export default App;
