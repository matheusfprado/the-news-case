import { useEffect, useState } from "react";
import { BookOpen, Check, LibraryBig, LoaderCircle, ScanBarcode, Search, X } from "lucide-react";
import { AppModal } from "@/features/library/components/AppModal";
import { searchBooks, type BookSearchResult } from "@/features/library/services/openLibrary";
import type { LibraryBook, LibraryStatus } from "@/features/library/types";

interface AddBookDialogProps { open: boolean; onClose: () => void; onAdd: (book: LibraryBook) => void }

const shelfOptions: Array<{ value: LibraryStatus; label: string; icon: typeof BookOpen }> = [
  { value: "Lendo", label: "Lendo", icon: BookOpen },
  { value: "Quero Ler", label: "Quero Ler", icon: BookOpen },
  { value: "Estante", label: "Estante", icon: LibraryBig },
];

export function AddBookDialog({ open, onClose, onAdd }: AddBookDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [selected, setSelected] = useState<BookSearchResult | null>(null);
  const [status, setStatus] = useState<LibraryStatus>("Quero Ler");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || query.trim().length < 3) { setResults([]); setLoading(false); setError(null); return; }
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true); setError(null);
      try { setResults(await searchBooks(query.trim(), controller.signal)); }
      catch (requestError) { if (!controller.signal.aborted) setError(requestError instanceof Error ? requestError.message : "Erro ao buscar livros."); }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }, 400);
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, [open, query]);

  if (!open) return null;

  function addSelected() {
    if (!selected) return;
    onAdd({ id: `${selected.id}-${Date.now()}`, title: selected.title, author: selected.author, totalPages: selected.totalPages, currentPage: status === "Estante" ? selected.totalPages : 0, status, cover: "blue", coverUrl: selected.coverUrl });
    setQuery(""); setResults([]); setSelected(null); setStatus("Quero Ler"); onClose();
  }

  return (
    <AppModal title="Adicionar Livro" onClose={onClose} footer={selected ? <button type="button" onClick={addSelected} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#ffd400] to-[#edb91c] text-sm font-black text-black"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-[#ffd400]">+</span> Adicionar Livro</button> : undefined}>
      <div className="flex gap-2"><label className="relative min-w-0 flex-1"><span className="sr-only">Buscar livro</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" /><input autoFocus value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null); }} placeholder="Buscar por título, autor ou ISBN..." className="h-12 w-full rounded-xl bg-[#181822] pl-10 pr-10 text-xs text-white outline-none placeholder:text-zinc-500 focus:ring-1 focus:ring-[#ffd400]" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca" className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-400 text-[#181822]"><X className="h-3 w-3" /></button>}</label><button type="button" aria-label="Ler código de barras" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#181822] text-[#ffd400]"><ScanBarcode className="h-5 w-5" /></button></div>

      <div className="mt-4 space-y-2" aria-live="polite">
        {loading && <div className="flex min-h-28 items-center justify-center gap-2 text-xs text-zinc-500"><LoaderCircle className="h-4 w-4 animate-spin" /> Buscando...</div>}
        {error && <p className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-center text-xs text-red-400">{error}</p>}
        {!loading && !error && query.trim().length < 3 && <div className="flex min-h-[430px] flex-col items-center justify-center text-center"><Search className="h-12 w-12 text-zinc-400" strokeWidth={1.4} /><p className="mt-4 text-xs font-bold text-zinc-300">Busque um livro</p><p className="mt-2 text-[10px] text-zinc-500">Digite pelo menos 3 caracteres</p></div>}
        {!loading && !error && query.trim().length >= 3 && results.length === 0 && <div className="flex min-h-[430px] flex-col items-center justify-center text-center"><BookOpen className="h-10 w-10 text-zinc-700" /><p className="mt-4 text-xs font-bold text-zinc-300">Nenhum livro encontrado</p><p className="mt-2 text-[10px] text-zinc-500">Tente outro título, autor ou ISBN</p></div>}
        {!loading && query.trim().length >= 3 && results.map((book) => {
          const active = selected?.id === book.id;
          return <button key={book.id} type="button" onClick={() => setSelected(book)} className={`flex w-full items-center gap-3 rounded-xl border p-2 text-left transition-colors ${active ? "border-[#ffd400] bg-[#24220a]" : "border-transparent bg-[#181822] hover:border-zinc-700"}`}>{book.coverUrl ? <img src={book.coverUrl} alt="" className="h-[70px] w-12 shrink-0 rounded object-cover" /> : <span className="flex h-[70px] w-12 shrink-0 items-center justify-center rounded bg-zinc-900"><BookOpen className="h-4 w-4 text-zinc-700" /></span>}<span className="min-w-0 flex-1"><strong className="line-clamp-2 text-xs text-white">{book.title}</strong><span className="mt-1 block truncate text-[10px] text-zinc-500">{book.author}</span><span className="mt-1 block text-[9px] text-zinc-600">{book.totalPages} páginas</span></span>{active && <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ffd400] text-black"><Check className="h-3 w-3" strokeWidth={3} /></span>}</button>;
        })}
      </div>

      {selected && <section className="mt-4"><div className="flex items-center gap-3">{selected.coverUrl ? <img src={selected.coverUrl} alt="" className="h-20 w-14 rounded object-cover" /> : <span className="flex h-20 w-14 items-center justify-center rounded bg-zinc-900"><BookOpen className="h-5 w-5 text-zinc-700" /></span>}<div><h2 className="text-sm font-bold text-white">{selected.title}</h2><p className="mt-1 text-xs text-zinc-500">{selected.author}</p></div></div><p className="mt-4 text-[11px] text-zinc-400">Adicionar à prateleira:</p><div className="mt-2 grid grid-cols-3 gap-2">{shelfOptions.map(({ value, label, icon: Icon }) => <button key={value} type="button" onClick={() => setStatus(value)} aria-pressed={status === value} className={`flex min-h-11 items-center justify-center gap-1 rounded-lg border text-[10px] ${status === value ? "border-violet-500 bg-violet-500/5 text-violet-400" : "border-transparent bg-[#181822] text-zinc-400"}`}><Icon className="h-4 w-4" />{label}</button>)}</div></section>}
    </AppModal>
  );
}
