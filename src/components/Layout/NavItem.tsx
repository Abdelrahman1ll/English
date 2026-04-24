import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  readonly to: string;
  readonly icon: LucideIcon;
  readonly label: string;
  readonly isCollapsed: boolean;
  readonly onClick?: (e: React.MouseEvent) => void;
}

export function NavItem({
  to,
  icon: Icon,
  label,
  isCollapsed,
  onClick,
}: NavItemProps) {
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
}
