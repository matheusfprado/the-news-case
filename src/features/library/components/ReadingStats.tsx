import { BarChart3, Clock3, Flame, Target } from "lucide-react";
import { Card } from "@/shared/components/ui/Primitives";

export function ReadingStats({ bookCount }: { bookCount: number }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Card className="p-3"><p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-600"><Target className="h-3 w-3" /> Meta 2026</p><div className="mt-3 flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#ffd400] text-xs font-black text-white">{bookCount}/8</div><div><strong className="text-base text-white">8 livros</strong><p className="text-[9px] text-zinc-600">Faltam {Math.max(0, 8 - bookCount)}</p></div></div></Card>
      <Card className="p-3"><p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-600"><BarChart3 className="h-3 w-3" /> Stats</p><div className="mt-2 space-y-1.5 text-[10px] text-zinc-600"><p className="flex items-center gap-2"><span className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-700"><BarChart3 className="h-2.5 w-2.5" /></span><strong className="text-xs text-white">2.840</strong> páginas</p><p className="flex items-center gap-2"><span className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-700"><Clock3 className="h-2.5 w-2.5" /></span><strong className="text-xs text-white">28 min</strong> média/dia</p><p className="flex items-center gap-2"><span className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-700"><Flame className="h-2.5 w-2.5" /></span><strong className="text-xs text-white">37 dias</strong> sequência</p></div></Card>
    </div>
  );
}
