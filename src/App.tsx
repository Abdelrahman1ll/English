import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { AlphabetPage } from "./components/AlphabetPage";
import { PhonicsPage } from "./components/PhonicsPage";
import { MonthsPage } from "./components/MonthsPage";
import { DigraphsPage } from "./components/DigraphsPage";
import { GreetingsPage } from "./components/GreetingsPage";
import { NumbersPage } from "./components/NumbersPage";
import { ColorsPage } from "./components/ColorsPage";
import { JobsPage } from "./components/JobsPage";
import { ShapesPage } from "./components/ShapesPage";
import { GrammarPage } from "./components/GrammarPage";
import { FeelingsPage } from "./components/FeelingsPage";
import { DescribingPage } from "./components/DescribingPage";
import { NationalitiesPage } from "./components/NationalitiesPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alphabet" element={<AlphabetPage />} />
        <Route
          path="/reading"
          element={
            <div className="p-10 border border-dashed border-neutral-800 rounded-xl text-center text-neutral-500">
              Reading Module Placeholder
            </div>
          }
        />
        <Route
          path="/listening"
          element={
            <div className="p-10 border border-dashed border-neutral-800 rounded-xl text-center text-neutral-500">
              Listening Module Placeholder
            </div>
          }
        />
        <Route
          path="/writing"
          element={
            <div className="p-10 border border-dashed border-neutral-800 rounded-xl text-center text-neutral-500">
              Writing Module Placeholder
            </div>
          }
        />
        <Route
          path="/speaking"
          element={
            <div className="p-10 border border-dashed border-neutral-800 rounded-xl text-center text-neutral-500">
              Speaking Module Placeholder
            </div>
          }
        />
        <Route path="/magic-e" element={<PhonicsPage type="magic-e" />} />
        <Route path="/digraphs" element={<DigraphsPage />} />
        <Route path="/greetings" element={<GreetingsPage />} />
        <Route path="/numbers" element={<NumbersPage />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/shapes" element={<ShapesPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="/feelings" element={<FeelingsPage />} />
        <Route path="/describing" element={<DescribingPage />} />
        <Route
          path="/silent-letters"
          element={<PhonicsPage type="silent-letters" />}
        />
        <Route path="/months" element={<MonthsPage />} />
        <Route path="/nationalities" element={<NationalitiesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
