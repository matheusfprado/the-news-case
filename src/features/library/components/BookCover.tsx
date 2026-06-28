import { BookOpen } from "lucide-react";
import type { LibraryBook } from "@/features/library/types";

const covers: Record<LibraryBook["cover"], string> = {
  blue: "from-blue-500 to-blue-950",
  green: "from-emerald-500 to-emerald-950",
  purple: "from-violet-500 to-violet-950",
  orange: "from-orange-500 to-red-950",
};

export function BookCover({ color, coverUrl, title, className = "" }: { color: LibraryBook["cover"]; coverUrl?: string; title?: string; className?: string }) {
  if (coverUrl) return <img src={coverUrl} alt={`Capa de ${title ?? "livro"}`} loading="lazy" className={`shrink-0 rounded-md object-cover shadow-lg ${className}`} />;
  return <div className={`flex shrink-0 items-center justify-center rounded-md bg-gradient-to-br shadow-lg ${covers[color]} ${className}`} aria-hidden="true"><BookOpen className="h-5 w-5 text-white/25" /></div>;
}
