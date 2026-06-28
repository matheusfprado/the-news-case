import { Bell, Plus } from "lucide-react";

interface AppPageHeaderProps {
  title: string;
  subtitle?: string;
  onAdd?: () => void;
}

export function AppPageHeader({ title, subtitle, onAdd }: AppPageHeaderProps) {
  return (
    <header className="flex min-h-12 items-center justify-between border-b-2 border-[#ffd400] pb-2">
      <div className="min-w-0"><h1 className="truncate text-xl font-black leading-none tracking-[-0.04em] text-white">{title}</h1>{subtitle && <p className="mt-1.5 truncate text-[10px] text-zinc-600">{subtitle}</p>}</div>
      <div className="flex items-center gap-2"><button type="button" aria-label="Notificações" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#292929] bg-[#171717] text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]"><Bell className="h-4 w-4" /></button><button type="button" onClick={onAdd} aria-label="Adicionar" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd400] text-black transition-colors hover:bg-[#ffe13d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Plus className="h-5 w-5" strokeWidth={3} /></button></div>
    </header>
  );
}
