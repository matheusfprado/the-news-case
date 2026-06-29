import { useEffect, useState } from "react";
import { Accessibility, Bell, Bookmark, ChevronLeft, ChevronRight, CircleHelp, Contrast, Database, Mail, RotateCcw, Settings, ShieldCheck, Trophy } from "lucide-react";
import { cupArticles, upcomingMatches } from "@/features/cup/data/cup";
import { editionArticles } from "@/features/edition/data/articles";
import { BrandHeader } from "@/shared/components/layout/BrandHeader";
import { Card } from "@/shared/components/ui/Primitives";
import { isStringArray } from "@/shared/lib/validators";
import { usePersistentState } from "@/shared/hooks/usePersistentState";
import { clearRemoteValues } from "@/shared/services/prototypeStorage";

type MoreView = "menu" | "salvos" | "lembretes" | "preferências" | "sobre";

interface Preferences {
  reduceMotion: boolean;
  highContrast: boolean;
}

const initialPreferences: Preferences = { reduceMotion: false, highContrast: false };

function isPreferences(value: unknown): value is Preferences {
  if (typeof value !== "object" || value === null) return false;
  const preferences = value as Partial<Preferences>;
  return typeof preferences.reduceMotion === "boolean" && typeof preferences.highContrast === "boolean";
}

function MenuButton({ icon: Icon, title, description, count, onClick }: { icon: typeof Bookmark; title: string; description: string; count?: number; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="flex min-h-16 w-full items-center gap-3 rounded-xl border border-[#292929] bg-[#171717] p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]"><span className="flex h-11 w-11 shrink-0 items-center justify-center text-[#F5C000]"><Icon className="h-5 w-5" /></span><span className="min-w-0 flex-1"><strong className="block text-sm text-white">{title}</strong><span className="mt-1 block text-xs text-zinc-400">{description}</span></span>{count !== undefined && count > 0 && <span className="text-xs font-black text-[#F5C000]">{count}</span>}<ChevronRight className="h-5 w-5 text-zinc-600" /></button>;
}

function Toggle({ label, description, checked, onChange, icon: Icon }: { label: string; description: string; checked: boolean; onChange: () => void; icon: typeof Contrast }) {
  return <div className="flex items-center gap-3 border-b border-[#292929] py-3 last:border-0"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-zinc-300"><Icon className="h-4 w-4" /></span><div className="min-w-0 flex-1"><strong className="text-sm text-white">{label}</strong><p className="mt-1 text-xs text-zinc-400">{description}</p></div><button type="button" role="switch" aria-checked={checked} onClick={onChange} className={`relative h-8 w-14 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] ${checked ? "bg-[#F5C000]" : "bg-zinc-700"}`}><span className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-0"}`} /></button></div>;
}

export function MorePage() {
  const [view, setView] = useState<MoreView>("menu");
  const [savedIds, setSavedIds] = usePersistentState<string[]>("the-news-saved-articles-v1", [], isStringArray);
  const [reminders, setReminders] = usePersistentState<string[]>("the-news-cup-reminders-v1", [], isStringArray);
  const [preferences, setPreferences] = usePersistentState<Preferences>("the-news-preferences-v1", initialPreferences, isPreferences);
  const savedContent = [
    ...editionArticles.map((article) => ({ id: article.id, title: article.title, type: "Edição" })),
    ...cupArticles.map((article) => ({ id: article.id, title: article.title, type: "Copa" })),
  ].filter((article) => savedIds.includes(article.id));
  const reminderMatches = upcomingMatches.filter((match) => reminders.includes(match.id));

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", preferences.reduceMotion);
    document.documentElement.classList.toggle("high-contrast", preferences.highContrast);
  }, [preferences]);

  function togglePreference(key: keyof Preferences) {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  }

  async function clearData() {
    if (!window.confirm("Apagar hábitos, biblioteca, salvos, lembretes e preferências deste navegador?")) return;
    await clearRemoteValues().catch(() => undefined);
    Object.keys(localStorage).filter((key) => key.startsWith("the-news-")).forEach((key) => localStorage.removeItem(key));
    window.location.reload();
  }

  const titles: Record<Exclude<MoreView, "menu">, string> = { salvos: "Notícias salvas", lembretes: "Lembretes da Copa", preferências: "Preferências", sobre: "Sobre" };

  return (
    <div className="animate-enter">
      {view === "menu" ? <BrandHeader eyebrow="Sua conta e preferências" /> : <header className="flex min-h-14 items-center gap-2 border-b border-[#F5C000]/30 pb-3"><button type="button" onClick={() => setView("menu")} aria-label="Voltar" className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#171717] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]"><ChevronLeft className="h-5 w-5" /></button><h1 className="text-xl font-black text-white">{titles[view]}</h1></header>}

      {view === "menu" && <>
        <Card className="mt-3 p-4"><div><h1 className="text-lg font-black text-white">Leitor the news</h1><p className="mt-1 text-sm text-zinc-400">Dados salvos no protótipo.</p></div><div className="mt-4 grid grid-cols-2 divide-x divide-[#292929] border-t border-[#292929] pt-3"><div><strong className="text-lg text-[#F5C000]">{savedContent.length}</strong><span className="block text-xs text-zinc-400">notícias salvas</span></div><div className="pl-4"><strong className="text-lg text-[#F5C000]">{reminderMatches.length}</strong><span className="block text-xs text-zinc-400">lembretes ativos</span></div></div></Card>
        <section className="mt-3 space-y-2"><MenuButton icon={Bookmark} title="Notícias salvas" description="Leia novamente quando quiser" count={savedContent.length} onClick={() => setView("salvos")} /><MenuButton icon={Trophy} title="Lembretes da Copa" description="Acompanhe os próximos jogos" count={reminderMatches.length} onClick={() => setView("lembretes")} /><MenuButton icon={Settings} title="Preferências" description="Movimento e contraste" onClick={() => setView("preferências")} /><MenuButton icon={CircleHelp} title="Sobre o aplicativo" description="Informações, privacidade e contato" onClick={() => setView("sobre")} /></section>
      </>}

      {view === "salvos" && <section className="mt-3 space-y-2">{savedContent.map((article) => <Card key={article.id} className="flex items-center gap-3 p-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5C000]/10 text-[#F5C000]"><Bookmark className="h-4 w-4 fill-current" /></span><div className="min-w-0 flex-1"><span className="text-xs font-bold text-[#F5C000]">{article.type}</span><h2 className="mt-1 text-sm font-bold leading-5 text-white">{article.title}</h2></div><button type="button" onClick={() => setSavedIds((current) => current.filter((id) => id !== article.id))} className="min-h-11 rounded-xl px-3 text-xs font-bold text-red-400">Remover</button></Card>)}{savedContent.length === 0 && <Card className="p-8 text-center"><Bookmark className="mx-auto h-7 w-7 text-zinc-600" /><h2 className="mt-3 text-base font-bold text-white">Nada salvo ainda</h2><p className="mt-2 text-sm text-zinc-400">Salve notícias na Edição ou na Copa.</p></Card>}</section>}

      {view === "lembretes" && <section className="mt-3 space-y-2">{reminderMatches.map((match) => <Card key={match.id} className="flex items-center gap-3 p-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300"><Bell className="h-5 w-5" /></span><div className="min-w-0 flex-1"><strong className="text-sm text-white">{match.home} x {match.away}</strong><p className="mt-1 text-xs text-zinc-400">{match.date} · {match.venue}</p></div><button type="button" onClick={() => setReminders((current) => current.filter((id) => id !== match.id))} className="min-h-11 rounded-xl px-3 text-xs font-bold text-red-400">Remover</button></Card>)}{reminderMatches.length === 0 && <Card className="p-8 text-center"><Trophy className="mx-auto h-7 w-7 text-zinc-600" /><h2 className="mt-3 text-base font-bold text-white">Nenhum lembrete</h2><p className="mt-2 text-sm text-zinc-400">Ative lembretes na tela da Copa.</p></Card>}</section>}

      {view === "preferências" && <Card className="mt-3 p-3"><Toggle icon={Accessibility} label="Reduzir animações" description="Minimiza movimentos e transições." checked={preferences.reduceMotion} onChange={() => togglePreference("reduceMotion")} /><Toggle icon={Contrast} label="Alto contraste" description="Reforça a separação entre textos e fundos." checked={preferences.highContrast} onChange={() => togglePreference("highContrast")} /></Card>}

      {view === "sobre" && <section className="mt-3 space-y-2"><Card className="p-4"><div className="flex items-center gap-2 text-[#F5C000]"><ShieldCheck className="h-5 w-5" /><h2 className="text-base font-black">Privacidade</h2></div><p className="mt-3 text-sm leading-6 text-zinc-300">Hábitos, livros, salvos e preferências são vinculados a um ID anônimo do navegador. Este protótipo não possui cadastro.</p></Card><a href="mailto:contato@thenewscc.com.br" className="flex min-h-14 items-center gap-3 rounded-xl border border-[#292929] bg-[#171717] px-4 text-sm font-bold text-white"><Mail className="h-5 w-5 text-[#F5C000]" /> Enviar feedback <ChevronRight className="ml-auto h-5 w-5 text-zinc-600" /></a><Card className="p-4"><div className="flex items-center gap-2"><Database className="h-5 w-5 text-red-400" /><h2 className="text-base font-black text-white">Dados do protótipo</h2></div><p className="mt-2 text-sm text-zinc-400">Você pode apagar os dados locais e sincronizados.</p><button type="button" onClick={clearData} className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 text-sm font-bold text-red-400"><RotateCcw className="h-4 w-4" /> Limpar todos os dados</button></Card></section>}
    </div>
  );
}
