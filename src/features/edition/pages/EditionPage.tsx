import { useMemo, useState } from "react";
import { Bookmark, Check, ChevronDown, Clock3 } from "lucide-react";
import { editionArticles, editionCategories, type ArticleCategory, type EditionArticle } from "@/features/edition/data/articles";
import { BrandHeader } from "@/shared/components/layout/BrandHeader";
import { Card, Progress } from "@/shared/components/ui/Primitives";
import { isStringArray } from "@/shared/lib/validators";
import { usePersistentState } from "@/shared/hooks/usePersistentState";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
const SAVED_KEY = "the-news-saved-articles-v1";
const READ_KEY = "the-news-read-articles-v1";

function ArticleCard({ article, saved, read, expanded, onOpen, onSave }: { article: EditionArticle; saved: boolean; read: boolean; expanded: boolean; onOpen: () => void; onSave: () => void }) {
  return (
    <article className="border-b border-[#292929] py-4 last:border-b-0">
      <div className="flex gap-3 p-3">
        <button type="button" onClick={onOpen} aria-expanded={expanded} className="min-w-0 flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]">
          <span className="flex items-center gap-2"><span className="text-xs font-black uppercase tracking-wider text-[#F5C000]">{article.category}</span>{read && <span className="flex items-center gap-1 text-xs font-bold text-emerald-400"><Check className="h-3.5 w-3.5" /> Lida</span>}</span>
          <h2 className="mt-3 text-base font-black leading-5 text-white">{article.title}</h2>
          <p className="mt-2 text-sm leading-5 text-zinc-400">{article.summary}</p>
          <span className="mt-3 flex items-center gap-1 text-xs text-zinc-500"><Clock3 className="h-3.5 w-3.5" /> {article.readingMinutes} min de leitura <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} /></span>
        </button>
        <button type="button" onClick={onSave} aria-label={saved ? `Remover ${article.title} dos salvos` : `Salvar ${article.title}`} aria-pressed={saved} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] ${saved ? "text-[#F5C000]" : "text-zinc-500"}`}><Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} /></button>
      </div>
      {expanded && <div className="border-l-2 border-[#F5C000] px-3 py-1">{article.content.map((paragraph) => <p key={paragraph} className="mt-2 text-sm leading-6 text-zinc-300 first:mt-0">{paragraph}</p>)}</div>}
    </article>
  );
}

export function EditionPage() {
  const [category, setCategory] = useState<ArticleCategory | "salvos">("destaques");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = usePersistentState<string[]>(SAVED_KEY, [], isStringArray);
  const [readIds, setReadIds] = usePersistentState<string[]>(READ_KEY, [], isStringArray);
  const visibleArticles = useMemo(() => editionArticles.filter((article) => category === "destaques" ? true : category === "salvos" ? savedIds.includes(article.id) : article.category === category), [category, savedIds]);
  const progress = Math.round((readIds.filter((id) => editionArticles.some((article) => article.id === id)).length / editionArticles.length) * 100);

  function openArticle(id: string) {
    setExpandedId((current) => current === id ? null : id);
    setReadIds((current) => current.includes(id) ? current : [...current, id]);
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="animate-enter">
      <BrandHeader eyebrow={dateFormatter.format(new Date())} />
      <section className="mt-4 border-b border-[#292929] pb-4">
        <span className="text-xs font-black uppercase tracking-wider text-[#F5C000]">Edição de hoje</span>
        <h1 className="mt-2 text-2xl font-black leading-7 tracking-[-0.04em] text-white">As principais notícias do dia</h1>
        <p className="mt-2 text-sm leading-5 text-zinc-400">Brasil, mundo, negócios, tecnologia e esportes.</p>
        <div className="mt-4 flex items-center gap-3"><Progress value={progress} className="flex-1" /><span className="text-xs font-bold text-zinc-300">{progress}% lido</span></div>
      </section>

      <div className="-mx-3 mt-3 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Categorias da edição">
        <div className="flex w-max gap-5 border-b border-[#292929]">{editionCategories.map((item) => <button key={item.value} type="button" role="tab" aria-selected={category === item.value} onClick={() => setCategory(item.value)} className={`min-h-11 border-b-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] ${category === item.value ? "border-[#F5C000] text-white" : "border-transparent text-zinc-500"}`}>{item.label}{item.value === "salvos" && savedIds.length > 0 ? ` ${savedIds.length}` : ""}</button>)}</div>
      </div>

      <section className="mt-1" aria-live="polite">
        {visibleArticles.map((article) => <ArticleCard key={article.id} article={article} saved={savedIds.includes(article.id)} read={readIds.includes(article.id)} expanded={expandedId === article.id} onOpen={() => openArticle(article.id)} onSave={() => toggleSaved(article.id)} />)}
        {visibleArticles.length === 0 && <Card className="p-8 text-center"><Bookmark className="mx-auto h-7 w-7 text-zinc-600" /><h2 className="mt-3 text-base font-bold text-white">Nenhuma notícia salva</h2><p className="mt-2 text-sm text-zinc-400">Use o marcador nas notícias para encontrá-las aqui.</p></Card>}
      </section>
    </div>
  );
}
