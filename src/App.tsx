import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AlphabetPage } from "./components/AlphabetPage";
import { PhonicsPage } from "./components/PhonicsPage";
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
import { SentencesPage } from "./components/SentencesPage";
import { ExercisesPage } from "./components/ExercisesPage";
import { ConversationsPage } from "./components/ConversationsPage";
import { SearchPage } from "./components/SearchPage";

import { LevelProvider } from "./context/LevelContext";

function App() {
  return (
    <LevelProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:levelId/alphabet" element={<AlphabetPage />} />
          <Route
            path="/:levelId/magic-e"
            element={<PhonicsPage type="magic-e" />}
          />
          <Route path="/:levelId/digraphs" element={<DigraphsPage />} />
          <Route path="/:levelId/search" element={<SearchPage />} />
          <Route path="/:levelId/numbers" element={<NumbersPage />} />
          <Route path="/:levelId/colors" element={<ColorsPage />} />
          <Route path="/:levelId/jobs" element={<JobsPage />} />
          <Route path="/:levelId/shapes" element={<ShapesPage />} />
          <Route path="/:levelId/grammar" element={<GrammarPage />} />
          <Route path="/:levelId/feelings" element={<FeelingsPage />} />
          <Route path="/:levelId/describing" element={<DescribingPage />} />
          <Route
            path="/:levelId/silent-letters"
            element={<PhonicsPage type="silent-letters" />}
          />
          <Route path="/:levelId/months" element={<MonthsPage />} />
          <Route
            path="/:levelId/nationalities"
            element={<NationalitiesPage />}
          />
          <Route path="/:levelId/sentences" element={<SentencesPage />} />
          <Route path="/:levelId/exercises" element={<ExercisesPage />} />
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
