import type { ReactNode } from "react";
import { Plus } from "lucide-react";

interface AppPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  onAdd?: () => void;
}

export function AppPageHeader({ title, subtitle, actions, onAdd }: AppPageHeaderProps) {
  return (
    <header className="flex min-h-12 items-center justify-between border-b-2 border-[#F5C000] pb-2">
      <div className="min-w-0"><h1 className="truncate text-xl font-black leading-none tracking-[-0.04em] text-white">{title}</h1>{subtitle && <p className="mt-1.5 truncate text-[10px] text-zinc-600">{subtitle}</p>}</div>
      {(actions || onAdd) && <div className="flex shrink-0 items-center gap-2">{actions}{onAdd && <button type="button" onClick={onAdd} aria-label="Adicionar livro" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5C000] text-black transition-colors hover:bg-[#FFD33D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Plus className="h-5 w-5" strokeWidth={3} /></button>}</div>}
    </header>
  );
}
