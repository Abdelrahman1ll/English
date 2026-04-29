import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect, type PropsWithChildren } from "react";
import { House, ArrowUp, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useLevel } from "../../context/LevelContext";
import { useSpeech } from "../../hooks/useSpeech";
import { usePractice } from "../../context/PracticeContext";
import { PracticeWidget } from "../PracticeWidget";
import { NavItem } from "./NavItem";
import { MobileHeader } from "./MobileHeader";
import { BottomDock } from "./BottomDock";

export function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const pathSegment = location.pathname.split("/")[1];
  const levelId = ["A1", "A2", "B1", "B2", "C1"].includes(pathSegment)
    ? pathSegment
    : undefined;
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  const { currentLevel, setLevel } = useLevel();
  const { activeWord, practiceMode, setPracticeMode } = usePractice();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { speak } = useSpeech();

  // One-time audio unlock for mobile browsers
  useEffect(() => {
    const unlock = () => {
      speak("");
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
    window.addEventListener("click", unlock);
    window.addEventListener("touchstart", unlock);
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [speak]);

  useEffect(() => {
    if (levelId && currentLevel?.id !== levelId) setLevel(levelId);
  }, [levelId, currentLevel, setLevel]);

  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTop = 0;
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;
    const handleScroll = () => {
      setShowScrollTop(mainEl.scrollTop > 400);
    };
    mainEl.addEventListener("scroll", handleScroll);
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  const levelModules = levelId ? currentLevel?.modules || [] : [];
  const categories = [
    { key: "words", label: "Words & Letters" },
    { key: "sentences", label: "Sentences" },
    { key: "grammar", label: "Grammar" },
    { key: "tests", label: "Tests" },
  ] as const;

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-hidden relative">
      <MobileHeader
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-40 border-r border-white/10 p-4 flex flex-col gap-6 bg-[#1a1a1a] transition-all duration-300 ${isCollapsed ? "lg:w-20" : "lg:w-72"} ${isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-4 top-10 w-8 h-8 bg-[#1a1a1a] hover:bg-blue-600 rounded-lg items-center justify-center border border-white/10 text-neutral-400 hover:text-white transition-all z-50 shadow-2xl"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
        <div
          className={`px-2 transition-all duration-300 ${isCollapsed ? "lg:opacity-0 lg:scale-75 lg:h-0 overflow-hidden" : "opacity-100"}`}
        >
          <Link to="/" className="block hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
              English Master
            </h1>
          </Link>
          {levelId && currentLevel && (
            <div className="flex items-center gap-2 mt-2">
              <div
                className={`px-2 py-0.5 rounded-md bg-linear-to-r ${currentLevel.color} text-[10px] font-black text-white uppercase tracking-wider`}
              >
                {currentLevel.id}
              </div>
              <p className="text-xs text-neutral-400 font-bold uppercase">
                {currentLevel.title}
              </p>
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto overflow-x-hidden pr-2 pb-32 scrollbar-thin">
          {levelId && currentLevel && (
            <NavItem
              to={`/${currentLevel.id}/home`}
              icon={House}
              label="Home"
              isCollapsed={isCollapsed}
            />
          )}
          {categories.map((cat) => {
            const items = levelModules.filter((m) => m.category === cat.key);
            if (items.length === 0) return null;
            return (
              <div key={cat.key} className="flex flex-col gap-1.5">
                <div
                  className={`px-3 mb-1.5 transition-all duration-300 ${isCollapsed ? "h-px bg-white/5 w-full" : "flex items-center gap-2"}`}
                >
                  {!isCollapsed && (
                    <h2 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                      {cat.label}
                    </h2>
                  )}
                </div>
                {items.map((m) => (
                  <NavItem
                    key={m.to}
                    to={m.to}
                    icon={m.icon}
                    label={m.title}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            );
          })}
        </nav>
      </aside>

      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto relative scroll-smooth bg-neutral-950/50"
      >
        <div className="max-w-5xl mx-auto p-6 pb-32 sm:p-8 sm:pb-32 lg:p-12">
          {children}
          <div
            className={`fixed bottom-24 lg:bottom-10 right-6 lg:right-10 z-50 transition-all duration-300 ${
              showScrollTop
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10 pointer-events-none"
            }`}
          >
            <button
              onClick={() =>
                mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="flex flex-col items-center gap-2 group transition-all"
            >
              <div className="p-3 bg-blue-600 border border-blue-400 shadow-xl shadow-blue-500/20 rounded-full text-white group-hover:scale-110 hover:bg-blue-500 transition-all">
                <ArrowUp size={20} />
              </div>
            </button>
          </div>
        </div>
      </main>

      {!location.pathname.includes("/mindmap") && (
        <>
          <BottomDock
            activeWord={activeWord}
            practiceMode={practiceMode}
            onSetPracticeMode={setPracticeMode}
            onBack={() => navigate(-1)}
          />
          <PracticeWidget key={`${activeWord}-${practiceMode}`} />
        </>
      )}
    </div>
  );
}
