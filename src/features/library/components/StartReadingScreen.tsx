import { useEffect, useState } from "react";
import { BarChart3, Clock3, Pause, Play, Smartphone } from "lucide-react";
import { AppScreen } from "@/features/library/components/AppScreen";
import type { LibraryBook, ReadingSession } from "@/features/library/types";

function formatTimer(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

interface StartReadingScreenProps {
  book: LibraryBook;
  session?: ReadingSession;
  onSessionChange: (session: ReadingSession) => void;
  onClose: () => void;
  onUpdateProgress: () => void;
}

export function StartReadingScreen({ book, session, onSessionChange, onClose, onUpdateProgress }: StartReadingScreenProps) {
  const currentSession = session ?? { elapsedSeconds: 0, startedAt: null };
  const running = currentSession.startedAt !== null;
  const [now, setNow] = useState(Date.now());
  const activeSeconds = currentSession.startedAt ? Math.max(0, Math.floor((now - currentSession.startedAt) / 1000)) : 0;
  const seconds = currentSession.elapsedSeconds + activeSeconds;

  useEffect(() => {
    if (!running) return;
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  function toggleTimer() {
    if (currentSession.startedAt) {
      const elapsedSeconds = currentSession.elapsedSeconds + Math.max(0, Math.floor((Date.now() - currentSession.startedAt) / 1000));
      onSessionChange({ elapsedSeconds, startedAt: null });
      return;
    }

    onSessionChange({ elapsedSeconds: currentSession.elapsedSeconds, startedAt: Date.now() });
  }

  return (
    <AppScreen title="Iniciar leitura" onClose={onClose}>
      <div className="border-b border-[#3b3415] pb-4"><h2 className="text-sm font-bold text-white">{book.title}</h2><p className="mt-1 text-xs text-zinc-500">{book.author}</p></div>
      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-[#33290e] px-3 py-3 text-xs text-[#F5C000]"><Clock3 className="h-4 w-4 shrink-0" aria-hidden="true" /><strong>Sessão: {Math.floor(seconds / 60)}/15 min</strong><span className="text-[#d6a900]">— meta de 15 min</span></div>
      <div className="mx-auto mt-5 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-[#3b3415] bg-[#18181f]"><strong className="text-3xl font-black tabular-nums text-white">{formatTimer(seconds)}</strong><span className="mt-2 text-[11px] text-zinc-500">{running ? "Em andamento" : "Pronto para iniciar"}</span></div>
      <button type="button" onClick={toggleTimer} className="mt-5 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#F5C000] text-sm font-black text-black transition-colors hover:bg-[#FFD33D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{running ? <Pause className="h-5 w-5 fill-black" aria-hidden="true" /> : <Play className="h-5 w-5 fill-black" aria-hidden="true" />}{running ? "Pausar leitura" : seconds > 0 ? "Continuar leitura" : "Iniciar leitura"}</button>
      {seconds > 0 && <button type="button" onClick={onUpdateProgress} className="mt-2 min-h-11 w-full rounded-xl border border-[#F5C000]/40 text-xs font-bold text-[#F5C000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]">Atualizar progresso</button>}
      <div className="mt-3 space-y-3 rounded-xl border border-[#292929] bg-[#18181f] p-4 text-xs text-zinc-400"><p className="flex items-center gap-2"><Pause className="h-4 w-4 shrink-0 text-[#F5C000]" aria-hidden="true" /> Pause a qualquer momento e volte depois</p><p className="flex items-center gap-2"><Smartphone className="h-4 w-4 shrink-0 text-[#F5C000]" aria-hidden="true" /> O timer continua após fechar esta tela</p><p className="flex items-center gap-2"><BarChart3 className="h-4 w-4 shrink-0 text-[#F5C000]" aria-hidden="true" /> O tempo é salvo automaticamente neste navegador</p></div>
    </AppScreen>
  );
}
