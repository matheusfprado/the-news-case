import { BarChart3, Clock3, Flame, Target } from "lucide-react";
import type { LibraryBook, ReadingSessions } from "@/features/library/types";
import { Card } from "@/shared/components/ui/Primitives";

export function ReadingStats({ books, sessions }: { books: LibraryBook[]; sessions: ReadingSessions }) {
  const completedBooks = books.filter((book) => book.currentPage >= book.totalPages).length;
  const readPages = books.reduce((total, book) => total + book.currentPage, 0);
  const readingMinutes = Math.floor(Object.values(sessions).reduce((total, session) => {
    const activeSeconds = session.startedAt ? Math.max(0, Math.floor((Date.now() - session.startedAt) / 1000)) : 0;
    return total + session.elapsedSeconds + activeSeconds;
  }, 0) / 60);

  return (
    <div className="grid grid-cols-2 gap-2">
      <Card className="p-3"><p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500"><Target className="h-3 w-3" /> Meta 2026</p><div className="mt-3 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#F5C000] text-xs font-black text-white">{completedBooks}/8</div><div><strong className="text-base text-white">8 livros</strong><p className="text-[9px] text-zinc-500">Faltam {Math.max(0, 8 - completedBooks)}</p></div></div></Card>
      <Card className="p-3"><p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-500"><BarChart3 className="h-3 w-3" /> Progresso</p><div className="mt-2 space-y-2 text-[10px] text-zinc-500"><p className="flex items-center gap-2"><BarChart3 className="h-3.5 w-3.5" /><strong className="text-xs text-white">{readPages}</strong> páginas</p><p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" /><strong className="text-xs text-white">{readingMinutes} min</strong> de leitura</p><p className="flex items-center gap-2"><Flame className="h-3.5 w-3.5" /><strong className="text-xs text-white">{books.filter((book) => book.status === "Lendo").length}</strong> em andamento</p></div></Card>
    </div>
  );
}
