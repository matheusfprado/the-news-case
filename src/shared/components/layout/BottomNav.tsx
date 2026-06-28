import { BookOpen, Flame, MoreHorizontal, Newspaper, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/shared/lib/utils";

const items = [
  { href: "/inicio", label: "edição", icon: Newspaper },
  { href: "/habitos", label: "Hábitos", icon: Flame },
  { href: "/copa", label: "copa", icon: Trophy },
  { href: "/biblioteca", label: "livros", icon: BookOpen },
  { href: "/mais", label: "mais", icon: MoreHorizontal },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 border-x border-t border-[#222] bg-[#111]/95 px-1 pb-[max(5px,env(safe-area-inset-bottom))] pt-1 backdrop-blur" aria-label="Navegação principal">
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <NavLink
              to={href}
              className={({ isActive }) => cn("flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[9px] font-medium text-zinc-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]", isActive && "text-[#ffd400]")}
            >
              {({ isActive }) => (
                <>
                  <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", isActive && "bg-[#ffd400] text-black")}>
                    <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.5 : 1.7} />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
