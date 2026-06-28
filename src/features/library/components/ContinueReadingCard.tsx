import { ArrowRight } from "lucide-react";
import { BookCover } from "@/features/library/components/BookCover";
import type { LibraryBook } from "@/features/library/types";

export function ContinueReadingCard({ book, onContinue }: { book: LibraryBook; onContinue: () => void }) {
  const progress = Math.round((book.currentPage / book.totalPages) * 100);
  return (
    <section className="rounded-2xl border border-blue-500/25 bg-[#111827] p-3" aria-labelledby="continue-reading-title">
      <p id="continue-reading-title" className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600">↻ Continue lendo</p>
      <div className="mt-3 flex gap-3"><BookCover color={book.cover} coverUrl={book.coverUrl} title={book.title} className="h-20 w-14" /><div className="min-w-0 flex-1"><h2 className="truncate text-sm font-black text-white">{book.title}</h2><p className="text-[10px] text-zinc-600">{book.author}</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-[#ffd400]" style={{ width: `${progress}%` }} /></div><div className="mt-1.5 flex items-center justify-between gap-2"><span className="text-[9px] text-zinc-600">{book.currentPage} de {book.totalPages} págs</span><button type="button" onClick={onContinue} className="flex min-h-8 items-center gap-1 rounded-full bg-[#ffd400] px-3 text-[10px] font-black text-black hover:bg-[#ffe13d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Continuar <ArrowRight className="h-3 w-3" /></button></div></div></div>
    </section>
  );
}
