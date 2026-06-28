import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AddBookDialog } from "@/features/library/components/AddBookDialog";
import { ContinueReadingCard } from "@/features/library/components/ContinueReadingCard";
import { LibraryBookCard } from "@/features/library/components/LibraryBookCard";
import { LibraryFilters } from "@/features/library/components/LibraryFilters";
import { ReadingStats } from "@/features/library/components/ReadingStats";
import { RecommendedBooks } from "@/features/library/components/RecommendedBooks";
import { StartReadingScreen } from "@/features/library/components/StartReadingScreen";
import { UpdateProgressScreen } from "@/features/library/components/UpdateProgressScreen";
import { initialLibraryBooks } from "@/features/library/data/library";
import type { BookSearchResult } from "@/features/library/services/openLibrary";
import type { LibraryBook, LibraryStatus } from "@/features/library/types";
import { AppPageHeader } from "@/shared/components/layout/AppPageHeader";

export function LibraryPage() {
  const [books, setBooks] = useState<LibraryBook[]>(initialLibraryBooks);
  const [filter, setFilter] = useState<LibraryStatus>("Lendo");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [readingBookId, setReadingBookId] = useState<string | null>(null);
  const [progressBookId, setProgressBookId] = useState<string | null>(null);
  const visibleBooks = useMemo(() => books.filter((book) => book.status === filter), [books, filter]);
  const currentBook = books.find((book) => book.status === "Lendo") ?? books[0];
  const readingBook = books.find((book) => book.id === readingBookId);
  const progressBook = books.find((book) => book.id === progressBookId);

  function addBook(book: LibraryBook) {
    setBooks((current) => [book, ...current]);
    setFilter(book.status);
    toast.success("Livro adicionado");
  }

  function addRecommendedBook(book: BookSearchResult) {
    addBook({ id: `${book.id}-${Date.now()}`, title: book.title, author: book.author, totalPages: book.totalPages, currentPage: 0, status: "Quero Ler", cover: "blue", coverUrl: book.coverUrl });
  }

  function deleteBook(id: string) {
    const book = books.find((item) => item.id === id);
    if (!book) return;
    setBooks((current) => current.filter((item) => item.id !== id));
    toast.success(`${book.title} removido`);
  }

  function saveProgress(currentPage: number, totalPages: number) {
    if (!progressBookId) return;
    setBooks((current) => current.map((book) => book.id === progressBookId ? { ...book, currentPage, totalPages, status: currentPage >= totalPages ? "Estante" : "Lendo" } : book));
    setProgressBookId(null);
    toast.success("Progresso atualizado");
  }

  return (
    <div className="animate-enter">
      <AppPageHeader title="Biblioteca" subtitle={`${books.length} ${books.length === 1 ? "livro" : "livros"} · ${new Date().getFullYear()}`} onAdd={() => setDialogOpen(true)} />
      <div className="mt-2 space-y-2">
        <div className="space-y-2">
          {currentBook && <ContinueReadingCard book={currentBook} onContinue={() => setReadingBookId(currentBook.id)} />}
          <ReadingStats bookCount={books.length} />
        </div>
        <div className="space-y-2">
          <LibraryFilters value={filter} onChange={setFilter} />
          <section aria-live="polite" aria-label={`Livros: ${filter}`}>
            {visibleBooks.length > 0 ? <div className="space-y-2">{visibleBooks.map((book) => <LibraryBookCard key={book.id} book={book} onDelete={() => deleteBook(book.id)} onOpen={() => setProgressBookId(book.id)} />)}</div> : <div className="rounded-xl border border-dashed border-[#292929] px-4 py-8 text-center"><p className="text-sm font-bold text-zinc-400">Nenhum livro em “{filter}”</p><button type="button" onClick={() => setDialogOpen(true)} className="mt-3 text-xs font-bold text-[#ffd400]">Adicionar livro</button></div>}
          </section>
          <RecommendedBooks onAdd={addRecommendedBook} />
        </div>
      </div>
      <AddBookDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onAdd={addBook} />
      {readingBook && <StartReadingScreen book={readingBook} onClose={() => setReadingBookId(null)} onUpdateProgress={() => { setReadingBookId(null); setProgressBookId(readingBook.id); }} />}
      {progressBook && <UpdateProgressScreen book={progressBook} onClose={() => setProgressBookId(null)} onSave={saveProgress} />}
    </div>
  );
}
