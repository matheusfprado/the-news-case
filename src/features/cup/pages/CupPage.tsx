import { useState } from "react";
import { Bell, Bookmark, CalendarDays, ChevronRight, ExternalLink, Radio, Trophy } from "lucide-react";
import { cupArticles, fifaScheduleUrl, upcomingMatches, type CupMatch } from "@/features/cup/data/cup";
import { Card } from "@/shared/components/ui/Primitives";
import { isStringArray } from "@/shared/lib/validators";
import { usePersistentState } from "@/shared/hooks/usePersistentState";

type CupTab = "jogos" | "chave" | "notícias";

function TeamBadge({ code, highlight = false }: { code: string; highlight?: boolean }) {
  return <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-black ${highlight ? "border-[#F5C000] bg-[#F5C000] text-black" : "border-zinc-700 bg-zinc-900 text-zinc-300"}`}>{code}</span>;
}

function MatchCard({ match, reminder, onToggleReminder }: { match: CupMatch; reminder: boolean; onToggleReminder: () => void }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#292929] px-3 py-2"><span className="text-xs font-bold text-zinc-400">Jogo {match.matchNumber} · {match.date}</span><span className="text-xs font-black uppercase tracking-wider text-zinc-500">Mata-mata</span></div>
      <div className="p-3">
        <div className="flex items-center gap-3"><TeamBadge code={match.homeCode} highlight={match.homeCode === "BRA"} /><strong className="min-w-0 flex-1 text-sm text-white">{match.home}</strong><span className="text-xs font-black text-zinc-500">X</span><strong className="min-w-0 flex-1 text-right text-sm text-white">{match.away}</strong><TeamBadge code={match.awayCode} /></div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500"><CalendarDays className="h-3.5 w-3.5" /> {match.venue}</p>
        <button type="button" onClick={onToggleReminder} aria-pressed={reminder} className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] ${reminder ? "border-[#F5C000] bg-[#F5C000]/10 text-[#F5C000]" : "border-[#292929] text-zinc-300"}`}><Bell className={`h-4 w-4 ${reminder ? "fill-current" : ""}`} />{reminder ? "Lembrete ativado" : "Lembrar deste jogo"}</button>
      </div>
    </Card>
  );
}

export function CupPage() {
  const [tab, setTab] = useState<CupTab>("jogos");
  const [reminders, setReminders] = usePersistentState<string[]>("the-news-cup-reminders-v1", [], isStringArray);
  const [savedArticles, setSavedArticles] = usePersistentState<string[]>("the-news-saved-articles-v1", [], isStringArray);

  function toggleInList(id: string, setValues: (updater: (current: string[]) => string[]) => void) {
    setValues((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="animate-enter">
      <header className="flex min-h-14 items-center gap-2 border-b border-[#F5C000]/30 pb-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5C000] text-black"><Trophy className="h-5 w-5" /></span><div><h1 className="text-xl font-black text-white">Copa</h1><p className="text-xs font-bold text-emerald-400">2026 · mata-mata</p></div></header>

      <section className="mt-4 border-l-4 border-[#F5C000] bg-[#171717] px-4 py-5">
        <span className="text-xs font-black uppercase tracking-wider text-[#F5C000]">Fase eliminatória</span>
        <h2 className="mt-2 text-2xl font-black leading-7 tracking-[-0.04em] text-white">Mata-mata da Copa 2026</h2>
        <p className="mt-2 text-sm leading-5 text-zinc-400">Agenda dos próximos jogos e chaveamento.</p>
      </section>

      <div className="mt-3 grid grid-cols-3 border-b border-[#292929]" role="tablist" aria-label="Conteúdo da Copa">{(["jogos", "chave", "notícias"] as const).map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={`min-h-11 border-b-2 px-2 text-sm font-bold capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] ${tab === item ? "border-[#F5C000] text-white" : "border-transparent text-zinc-500"}`}>{item}</button>)}</div>

      {tab === "jogos" && <section className="mt-3 space-y-2"><div className="flex items-center justify-between"><h2 className="text-base font-black text-white">Próximos jogos</h2><span className="flex items-center gap-1 text-xs font-bold text-red-400"><Radio className="h-3.5 w-3.5" /> Agenda oficial</span></div>{upcomingMatches.map((match) => <MatchCard key={match.id} match={match} reminder={reminders.includes(match.id)} onToggleReminder={() => toggleInList(match.id, setReminders)} />)}<a href={fifaScheduleUrl} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#292929] text-sm font-bold text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]">Ver calendário completo da FIFA <ExternalLink className="h-4 w-4" /></a></section>}

      {tab === "chave" && <section className="mt-3"><h2 className="text-base font-black text-white">Chaveamento</h2><p className="mt-1 text-sm text-zinc-400">Os vencedores avançam para as oitavas seguintes.</p><div className="mt-3 space-y-2">{upcomingMatches.map((match) => <Card key={match.id} className="flex items-center gap-3 p-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-xs font-black text-violet-300">M{match.matchNumber}</span><div className="min-w-0 flex-1"><strong className="block truncate text-sm text-white">{match.home} x {match.away}</strong><span className="text-xs text-zinc-500">Vencedor avança</span></div><ChevronRight className="h-5 w-5 text-zinc-600" /></Card>)}</div><Card className="mt-3 border-dashed p-4 text-center"><Trophy className="mx-auto h-6 w-6 text-[#F5C000]" /><strong className="mt-2 block text-sm text-white">Próxima fase</strong><p className="mt-1 text-xs text-zinc-500">Os confrontos serão preenchidos após os resultados.</p></Card></section>}

      {tab === "notícias" && <section className="mt-3"><h2 className="text-base font-black text-white">Notícias da Copa</h2><div className="mt-2">{cupArticles.map((article) => { const saved = savedArticles.includes(article.id); return <article key={article.id} className="flex gap-3 border-b border-[#292929] py-4"><div className="min-w-0 flex-1"><span className="text-xs font-black uppercase tracking-wider text-[#F5C000]">Copa 2026</span><h3 className="mt-2 text-sm font-black leading-5 text-white">{article.title}</h3><p className="mt-1 text-xs leading-5 text-zinc-400">{article.summary}</p></div><button type="button" onClick={() => toggleInList(article.id, setSavedArticles)} aria-label={saved ? "Remover dos salvos" : "Salvar notícia"} aria-pressed={saved} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${saved ? "text-[#F5C000]" : "text-zinc-500"}`}><Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} /></button></article>; })}</div></section>}
    </div>
  );
}
