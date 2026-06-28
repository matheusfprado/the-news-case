import { libraryFilters } from "@/features/library/data/library";
import type { LibraryStatus } from "@/features/library/types";

export function LibraryFilters({ value, onChange }: { value: LibraryStatus; onChange: (status: LibraryStatus) => void }) {
  return <div className="grid w-full grid-cols-4 gap-1.5" role="group" aria-label="Filtrar livros por status">{libraryFilters.map((status) => <button key={status} type="button" onClick={() => onChange(status)} aria-pressed={value === status} className={`h-9 min-w-0 truncate rounded-full border px-1 text-[9px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] ${value === status ? "border-[#ffd400] bg-[#ffd400] text-black" : "border-[#292929] text-zinc-600 hover:text-white"}`}>{status}</button>)}</div>;
}
