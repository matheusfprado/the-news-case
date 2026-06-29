import { useMemo, useState } from "react";
import { BarChart3, Users } from "lucide-react";
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
import type { LibraryBook, LibraryStatus, ReadingSession, ReadingSessions } from "@/features/library/types";
import { AppPageHeader } from "@/shared/components/layout/AppPageHeader";
import { usePersistentState } from "@/shared/hooks/usePersistentState";

const BOOKS_STORAGE_KEY = "the-news-library-books-v1";
const SESSIONS_STORAGE_KEY = "the-news-reading-sessions-v1";

function isLibraryBook(value: unknown): value is LibraryBook {
  if (typeof value !== "object" || value === null) return false;
  const book = value as Partial<LibraryBook>;
  return typeof book.id === "string" && typeof book.title === "string" && typeof book.author === "string"
    && typeof book.currentPage === "number" && Number.isFinite(book.currentPage) && book.currentPage >= 0
    && typeof book.totalPages === "number" && Number.isFinite(book.totalPages) && book.totalPages > 0
    && ["Lendo", "Quero Ler", "Estante", "Abandonados"].includes(book.status ?? "")
    && ["blue", "green", "purple", "orange"].includes(book.cover ?? "")
    && (book.coverUrl === undefined || typeof book.coverUrl === "string");
}

function isLibrary(value: unknown): value is LibraryBook[] {
  return Array.isArray(value) && value.every(isLibraryBook);
}

function isReadingSessions(value: unknown): value is ReadingSessions {
  return typeof value === "object" && value !== null && Object.values(value).every((session) => {
    if (typeof session !== "object" || session === null) return false;
    const candidate = session as Partial<ReadingSession>;
    return typeof candidate.elapsedSeconds === "number" && Number.isFinite(candidate.elapsedSeconds) && candidate.elapsedSeconds >= 0
      && (candidate.startedAt === null || (typeof candidate.startedAt === "number" && Number.isFinite(candidate.startedAt)));
  });
}

export function LibraryPage() {
  const [books, setBooks] = usePersistentState<LibraryBook[]>(BOOKS_STORAGE_KEY, initialLibraryBooks, isLibrary);
  const [sessions, setSessions] = usePersistentState<ReadingSessions>(SESSIONS_STORAGE_KEY, {}, isReadingSessions);
  const [filter, setFilter] = useState<LibraryStatus>("Lendo");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [readingBookId, setReadingBookId] = useState<string | null>(null);
  const [progressBookId, setProgressBookId] = useState<string | null>(null);
  const visibleBooks = useMemo(() => books.filter((book) => book.status === filter), [books, filter]);
  const currentBook = books.find((book) => book.status === "Lendo");
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
    const deletedSession = sessions[id];
    setBooks((current) => current.filter((item) => item.id !== id));
    setSessions((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    toast.success(`${book.title} removido`, {
      action: {
        label: "Desfazer",
        onClick: () => {
          setBooks((current) => current.some((item) => item.id === book.id) ? current : [book, ...current]);
          if (deletedSession) setSessions((current) => ({ ...current, [book.id]: deletedSession }));
        },
      },
    });
  }

  function saveProgress(currentPage: number, totalPages: number, status: LibraryStatus) {
    if (!progressBookId) return;
    setBooks((current) => current.map((book) => book.id === progressBookId ? { ...book, currentPage, totalPages, status: currentPage >= totalPages ? "Estante" : status } : book));
    setProgressBookId(null);
    toast.success("Progresso atualizado");
  }

  function updateSession(bookId: string, session: ReadingSession) {
    setSessions((current) => ({ ...current, [bookId]: session }));
  }

  return (
    <div className="animate-enter">
      <AppPageHeader
        title="Biblioteca"
        subtitle={`${books.length} ${books.length === 1 ? "livro" : "livros"} · ${new Date().getFullYear()}`}
        actions={<div className="flex items-center gap-2" aria-hidden="true"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#292929] bg-[#18181f] text-zinc-600"><BarChart3 className="h-4 w-4" /></span><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#292929] bg-[#18181f] text-zinc-600"><Users className="h-4 w-4" /></span></div>}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="mt-2 space-y-2">
        <div className="space-y-2">
          {currentBook && <ContinueReadingCard book={currentBook} onContinue={() => setReadingBookId(currentBook.id)} />}
          <ReadingStats books={books} sessions={sessions} />
        </div>
        <div className="space-y-2">
          <LibraryFilters value={filter} onChange={setFilter} />
          <section aria-live="polite" aria-label={`Livros: ${filter}`}>
            {visibleBooks.length > 0 ? <div className="space-y-2">{visibleBooks.map((book) => <LibraryBookCard key={book.id} book={book} onDelete={() => deleteBook(book.id)} onOpen={() => setProgressBookId(book.id)} />)}</div> : <div className="rounded-xl border border-dashed border-[#292929] px-4 py-8 text-center"><p className="text-sm font-bold text-zinc-400">Nenhum livro em “{filter}”</p><button type="button" onClick={() => setDialogOpen(true)} className="mt-3 inline-flex min-h-11 items-center px-3 text-xs font-bold text-[#F5C000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]">Adicionar livro</button></div>}
          </section>
          <RecommendedBooks onAdd={addRecommendedBook} />
        </div>
      </div>
      <AddBookDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onAdd={addBook} />
      {readingBook && <StartReadingScreen book={readingBook} session={sessions[readingBook.id]} onSessionChange={(session) => updateSession(readingBook.id, session)} onClose={() => setReadingBookId(null)} onUpdateProgress={() => { setReadingBookId(null); setProgressBookId(readingBook.id); }} />}
      {progressBook && <UpdateProgressScreen book={progressBook} onClose={() => setProgressBookId(null)} onSave={saveProgress} />}
    </div>
  );
}
