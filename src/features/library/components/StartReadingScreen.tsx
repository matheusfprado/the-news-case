import { useEffect, useState } from "react";
import { BarChart3, Clock3, Pause, Play, Smartphone } from "lucide-react";
import { AppScreen } from "@/features/library/components/AppScreen";
import type { LibraryBook } from "@/features/library/types";

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

export function StartReadingScreen({ book, onClose, onUpdateProgress }: { book: LibraryBook; onClose: () => void; onUpdateProgress: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  return (
    <AppScreen title="Iniciar Leitura" onClose={onClose}>
      <div className="border-b border-[#3b3415] pb-4"><h2 className="text-xs font-bold text-white">{book.title}</h2><p className="mt-1 text-[10px] text-zinc-500">{book.author}</p></div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#382b19] px-3 py-3 text-[10px] text-[#f5b51b]"><Clock3 className="h-4 w-4" /><strong>Meta diária: 0/15 min</strong><span>— leia mais 15 min</span></div>
      <div className="mx-auto mt-4 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[radial-gradient(circle_at_50%_80%,#383412,#1d1d24_70%)]"><strong className="text-2xl tabular-nums text-white">{formatTimer(seconds)}</strong><span className="mt-2 text-[9px] text-zinc-500">{running ? "Leitura em andamento" : "Pronto para começar"}</span></div>
      <button type="button" onClick={() => setRunning((current) => !current)} className="mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-600 text-sm font-bold text-white shadow-lg shadow-emerald-950/40">{running ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}{running ? "Pausar Leitura" : "Iniciar Leitura"}</button>
      {seconds > 0 && <button type="button" onClick={onUpdateProgress} className="mt-2 min-h-10 w-full rounded-xl border border-emerald-500/25 text-xs font-bold text-emerald-400">Atualizar progresso</button>}
      <div className="mt-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#48130f] via-[#6c1a17] to-[#ffd400] p-3"><p className="max-w-[190px] text-sm font-black leading-4 text-white">já vai preparando seu café, sem açúcar, e bora pra mais uma leitura.</p></div>
      <div className="mt-3 space-y-3 rounded-xl bg-emerald-500/10 p-4 text-[10px] text-emerald-400"><p className="flex items-center gap-2"><Pause className="h-4 w-4" /> Pause a qualquer momento e volte depois</p><p className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> O timer continua mesmo com o app fechado</p><p className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Suas métricas são salvas automaticamente</p></div>
    </AppScreen>
  );
}
