import { useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";
import { BookCover } from "@/features/library/components/BookCover";
import type { LibraryBook } from "@/features/library/types";

interface LibraryBookCardProps { book: LibraryBook; onDelete: () => void; onOpen: () => void }

const ACTION_WIDTH = 74;

export function LibraryBookCard({ book, onDelete, onOpen }: LibraryBookCardProps) {
  const progress = Math.round((book.currentPage / book.totalPages) * 100);
  const complete = progress === 100;
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const currentOffset = useRef(0);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const moved = useRef(false);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as HTMLElement).closest("[data-delete-action]")) return;
    startX.current = event.clientX;
    startOffset.current = offset;
    currentOffset.current = offset;
    moved.current = false;
    draggingRef.current = true;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const distance = event.clientX - startX.current;
    if (Math.abs(distance) > 5) moved.current = true;
    const nextOffset = Math.max(-ACTION_WIDTH, Math.min(0, startOffset.current + distance));
    currentOffset.current = nextOffset;
    setOffset(nextOffset);
  }

  function finishDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    const nextOffset = currentOffset.current <= -ACTION_WIDTH / 2 ? -ACTION_WIDTH : 0;
    currentOffset.current = nextOffset;
    setOffset(nextOffset);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleOpen(event: ReactMouseEvent<HTMLButtonElement>) {
    if (moved.current) { event.preventDefault(); return; }
    if (offset < 0) { currentOffset.current = 0; setOffset(0); return; }
    onOpen();
  }

  return (
    <article className="overflow-hidden rounded-xl">
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        className={`flex items-stretch ${dragging ? "" : "transition-transform duration-200 ease-out"}`}
        style={{ width: `calc(100% + ${ACTION_WIDTH}px)`, transform: `translateX(${offset}px)`, touchAction: "pan-y" }}
      >
        <div className={`flex shrink-0 items-center border border-[#292929] bg-[#171717] p-2.5 ${offset < 0 ? "rounded-l-xl" : "rounded-xl"}`} style={{ width: `calc(100% - ${ACTION_WIDTH}px)` }}>
          <button type="button" onClick={handleOpen} className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]">
            <BookCover color={book.cover} coverUrl={book.coverUrl} title={book.title} className="h-[68px] w-12" />
            <span className="min-w-0 flex-1"><span className="flex items-start justify-between gap-2"><span className="min-w-0"><strong className="block truncate text-xs text-white">{book.title}</strong><span className="block truncate text-[9px] text-zinc-600">{book.author}</span></span><strong className={`shrink-0 text-sm ${complete ? "text-emerald-400" : "text-[#ffd400]"}`}>{progress}%</strong></span><span className="mt-2 block h-1 overflow-hidden rounded-full bg-zinc-800"><span className={`block h-full rounded-full ${complete ? "bg-emerald-400" : "bg-[#ffd400]"}`} style={{ width: `${progress}%` }} /></span><span className="mt-1 flex items-center justify-between"><span className="text-[8px] text-zinc-700">{book.currentPage}/{book.totalPages} págs</span>{complete && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}</span></span>
          </button>
        </div>
        <button data-delete-action type="button" onClick={onDelete} tabIndex={offset < 0 ? 0 : -1} aria-label={`Excluir ${book.title}`} style={{ width: `${ACTION_WIDTH}px`, minWidth: `${ACTION_WIDTH}px`, backgroundColor: "#f94348" }} className="self-stretch rounded-r-xl text-[8px] font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"><span className="flex h-full w-full flex-col items-center justify-center gap-1 text-center leading-none"><Trash2 className="h-[18px] w-[18px] shrink-0" strokeWidth={2} /><span>Excluir</span></span></button>
      </div>
    </article>
  );
}
