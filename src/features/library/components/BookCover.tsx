import { BookOpen } from "lucide-react";
import type { LibraryBook } from "@/features/library/types";

const covers: Record<LibraryBook["cover"], string> = {
  blue: "bg-blue-950",
  green: "bg-emerald-950",
  purple: "bg-violet-950",
  orange: "bg-orange-950",
};

export function BookCover({ color, coverUrl, title, className = "" }: { color: LibraryBook["cover"]; coverUrl?: string; title?: string; className?: string }) {
  if (coverUrl) return <img src={coverUrl} alt={`Capa de ${title ?? "livro"}`} loading="lazy" className={`shrink-0 rounded object-cover ${className}`} />;
  return <div className={`flex shrink-0 items-center justify-center rounded ${covers[color]} ${className}`} aria-hidden="true"><BookOpen className="h-5 w-5 text-white/25" /></div>;
}
