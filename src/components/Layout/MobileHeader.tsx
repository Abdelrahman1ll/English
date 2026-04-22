import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface MobileHeaderProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly onClose: () => void;
}

export function MobileHeader({ isOpen, onToggle, onClose }: MobileHeaderProps) {
  return (
    <div className="lg:hidden h-16 border-b border-white/10 bg-[#1a1a1a] flex items-center justify-between px-6 z-40 shrink-0">
      <Link to="/" onClick={onClose} className="flex items-center gap-2">
        <h1 className="text-xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">
          English Master
        </h1>
      </Link>
      <button
        onClick={onToggle}
        className="p-2 text-neutral-400 hover:text-white transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
