import { useState } from "react";
import { Edit3, Sprout } from "lucide-react";
import { AppScreen } from "@/features/library/components/AppScreen";
import type { LibraryBook } from "@/features/library/types";

export function UpdateProgressScreen({ book, onClose, onSave }: { book: LibraryBook; onClose: () => void; onSave: (currentPage: number, totalPages: number) => void }) {
  const [currentPage, setCurrentPage] = useState(book.currentPage);
  const [totalPages, setTotalPages] = useState(book.totalPages);
  const [editingTotal, setEditingTotal] = useState(false);
  const progress = Math.min(100, Math.round((currentPage / totalPages) * 100));
  const updatePage = (value: number) => setCurrentPage(Math.max(0, Math.min(totalPages, value)));

  return (
    <AppScreen title="Atualizar Progresso" onClose={onClose} footer={<button type="button" onClick={() => onSave(currentPage, totalPages)} className="min-h-11 w-full rounded-xl bg-[#ffd400] text-sm font-black text-black">Salvar progresso</button>}>
      <div className="border-b border-[#3b3415] pb-4"><h2 className="text-sm font-bold text-white">{book.title}</h2><p className="mt-1 text-[10px] text-zinc-500">{book.author}</p></div>
      <div className="mt-4 text-center"><Sprout className="mx-auto h-12 w-12 text-lime-400" /><strong className="mt-1 block text-4xl text-white">{progress}%</strong><p className="mt-2 text-[10px] text-zinc-500">{currentPage} de {totalPages} páginas</p></div>
      <input type="range" min={0} max={totalPages} value={currentPage} onChange={(event) => updatePage(Number(event.target.value))} aria-label="Página atual" className="mt-6 w-full accent-[#ffd400]" />
      <div className="mt-8 flex items-center justify-center gap-3"><label htmlFor="current-page" className="text-xs text-zinc-400">Página atual:</label><input id="current-page" type="number" min={0} max={totalPages} value={currentPage} onChange={(event) => updatePage(Number(event.target.value))} className="h-11 w-16 rounded-lg bg-[#181822] text-center text-sm font-bold text-white outline-none focus:ring-1 focus:ring-[#ffd400]" /><span className="text-xs text-zinc-400">/ {totalPages}</span></div>
      <div className="mt-4 rounded-xl bg-[#181822] p-3 text-center">{editingTotal ? <label className="flex items-center justify-center gap-2 text-xs text-zinc-400">Total de páginas<input autoFocus type="number" min={1} value={totalPages} onChange={(event) => setTotalPages(Math.max(1, Number(event.target.value)))} className="h-9 w-20 rounded-lg bg-[#101017] text-center text-white outline-none focus:ring-1 focus:ring-[#ffd400]" /></label> : <button type="button" onClick={() => setEditingTotal(true)} className="flex w-full items-center justify-center gap-2 text-xs text-zinc-400"><Edit3 className="h-3.5 w-3.5" /> Editar total de páginas ({totalPages})</button>}</div>
      <p className="mt-6 text-[10px] text-zinc-500">Adicionar páginas:</p><div className="mt-2 grid grid-cols-3 gap-2">{[5, 10, 25].map((amount) => <button key={amount} type="button" onClick={() => updatePage(currentPage + amount)} className="min-h-10 rounded-lg bg-[#181822] text-xs font-bold text-[#ffd400]">+{amount}</button>)}</div>
    </AppScreen>
  );
}
