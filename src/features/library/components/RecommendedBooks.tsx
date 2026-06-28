import { useEffect, useState } from "react";
import { BookOpen, Plus, Star } from "lucide-react";
import { searchBooks, type BookSearchResult } from "@/features/library/services/openLibrary";

export function RecommendedBooks({ onAdd }: { onAdd: (book: BookSearchResult) => void }) {
  const [books, setBooks] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    searchBooks("productivity habits focus", controller.signal)
      .then((results) => setBooks(results.filter((book) => book.coverUrl).slice(0, 3)))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section aria-labelledby="recommended-title">
      <h2 id="recommended-title" className="flex items-center gap-1 text-[10px] font-bold text-zinc-400"><Star className="h-3 w-3" /> Recomendados para você</h2>
      {loading && <div className="mt-2 grid grid-cols-3 gap-2">{[0, 1, 2].map((item) => <div key={item} className="aspect-[.72] animate-pulse rounded-lg bg-[#181822]" />)}</div>}
      {!loading && books.length > 0 && <div className="mt-2 grid grid-cols-3 gap-2">{books.map((book) => <button key={book.id} type="button" onClick={() => onAdd(book)} aria-label={`Adicionar ${book.title}`} className="group relative min-w-0 overflow-hidden rounded-lg bg-[#181822] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]">{book.coverUrl ? <img src={book.coverUrl} alt={`Capa de ${book.title}`} loading="lazy" className="aspect-[.72] w-full object-cover" /> : <span className="flex aspect-[.72] items-center justify-center"><BookOpen className="h-5 w-5 text-zinc-700" /></span>}<span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#ffd400] text-black opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Plus className="h-3.5 w-3.5" /></span><span className="block p-2"><strong className="block truncate text-[8px] text-white">{book.title}</strong><span className="block truncate text-[7px] text-zinc-600">{book.author}</span></span></button>)}</div>}
      {!loading && books.length === 0 && <p className="mt-2 rounded-lg border border-dashed border-[#292929] p-4 text-center text-[10px] text-zinc-600">Recomendações indisponíveis.</p>}
    </section>
  );
}
