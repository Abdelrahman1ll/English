import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  House,
  type LucideIcon,
  CaseUpper,
  Calendar,
  Sparkles,
  Ghost,
  Split,
  Hand,
  Hash,
  Palette,
  Briefcase,
  Book,
  Smile,
  User,
  Shapes,
  Globe,
  ArrowUp,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
} from "lucide-react";
import type { PropsWithChildren } from "react";

const NavItem = ({
  to,
  icon: Icon,
  label,
  isCollapsed,
  onClick,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center p-3.5 sm:p-3 rounded-xl transition-all duration-200 group relative ${
        isActive
          ? "bg-blue-600/20 text-blue-400"
          : "text-neutral-400 hover:bg-white/5 hover:text-white"
      } ${isCollapsed ? "lg:justify-center" : "gap-5 lg:gap-3"}`}
      title={isCollapsed ? label : ""}
    >
      <div className="transition-all duration-200">
        <Icon size={22} className="lg:size-5" />
      </div>
      <span
        className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 text-lg lg:text-base ${isCollapsed ? "lg:hidden" : "block"}`}
      >
        {label}
      </span>
      {isCollapsed && (
        <div className="hidden lg:block absolute left-full ml-2 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
          {label}
        </div>
      )}
    </Link>
  );
};

export function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  const [, setShowScrollTop] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
      setShowScrollTop(false);
    }
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  }, [location.pathname]);

  const handleScroll = () => {
    if (mainRef.current) {
      setShowScrollTop(mainRef.current.scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="h-screen bg-neutral-950 text-white flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Mobile Top Header */}
      <div className="lg:hidden h-16 border-b border-white/10 bg-[#1a1a1a] flex items-center justify-between px-6 z-40 shrink-0">
        <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
          English Master
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
          border-r border-white/10 p-4 flex flex-col gap-8 bg-[#1a1a1a] transition-all duration-300
          ${isCollapsed ? "lg:w-20" : "lg:w-72"}
          ${isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-4 top-10 w-8 h-8 bg-neutral-800 hover:bg-blue-600 rounded-lg items-center justify-center border border-white/10 text-neutral-400 hover:text-white transition-all z-50 shadow-xl"
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
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
            English Master
          </h1>
          <p className="text-xs text-neutral-500 mt-1 font-medium tracking-wide uppercase">
            LEVEL A1 CURRICULUM
          </p>
        </div>

        <nav className="flex flex-col gap-2 flex-1 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <NavItem to="/" icon={House} label="Home" isCollapsed={isCollapsed} />
          <NavItem
            to="/alphabet"
            icon={CaseUpper}
            label="Alphabet"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/months"
            icon={Calendar}
            label="Calendar"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/magic-e"
            icon={Sparkles}
            label="Magic E"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/digraphs"
            icon={Split}
            label="Digraphs"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/greetings"
            icon={Hand}
            label="Greetings"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/numbers"
            icon={Hash}
            label="Numbers"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/colors"
            icon={Palette}
            label="Colors"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/shapes"
            icon={Shapes}
            label="Shapes"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/jobs"
            icon={Briefcase}
            label="Jobs"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/feelings"
            icon={Smile}
            label="Feelings"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/describing"
            icon={User}
            label="Describing People"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/grammar"
            icon={Book}
            label="Grammar"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/nationalities"
            icon={Globe}
            label="Languages"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/silent-letters"
            icon={Ghost}
            label="Silent Letters"
            isCollapsed={isCollapsed}
          />
          <div className="h-px bg-white/10 p-0.5 rounded my-4 mx-2" />
          <NavItem
            to="/reading"
            icon={BookOpen}
            label="Reading"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/listening"
            icon={Headphones}
            label="Listening"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/writing"
            icon={PenTool}
            label="Writing"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/speaking"
            icon={Mic}
            label="Speaking"
            isCollapsed={isCollapsed}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main
        ref={mainRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto relative scroll-smooth"
      >
        <div className="max-w-5xl mx-auto p-6 sm:p-8 lg:p-12">
          {children}

          {/* Bottom Navigation */}
          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex flex-col items-center gap-2 group transition-all"
            >
              <div className="p-4 bg-blue-600/10 group-hover:bg-blue-600/20 border border-blue-500/20 rounded-full text-blue-400 group-hover:scale-110 transition-all">
                <ArrowUp size={32} />
              </div>
              <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent uppercase tracking-tight">
                Back to Top
              </span>
            </button>
            <p className="text-neutral-500 text-sm">
              Ready for the next lesson?
            </p>
          </div>
        </div>

        {/* Floating Controls */}
        <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 flex flex-col items-end gap-3 z-30">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-3 bg-[#1a1a1a]/80 hover:bg-white/10 border border-white/10 rounded-2xl text-neutral-400 hover:text-white transition-all shadow-xl backdrop-blur-md flex items-center gap-2 group"
            title="Go Back"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-bold">Back</span>
          </button>
        </div>
      </main>
    </div>
  );
}
