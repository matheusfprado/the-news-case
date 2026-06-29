import { CheckCircle2, Flame, TrendingUp, type LucideIcon } from "lucide-react";
import { Card } from "@/shared/components/ui/Primitives";

interface SummaryItem { value: string; label: string; icon: LucideIcon; color: string; background: string }

export function HabitOverview({ currentStreak, completed, total, weeklyAverage, isToday }: { currentStreak: number; completed: number; total: number; weeklyAverage: number; isToday: boolean }) {
  const items: SummaryItem[] = [
    { value: `${currentStreak} ${currentStreak === 1 ? "dia" : "dias"}`, label: "sequência", icon: Flame, color: "text-orange-500", background: "bg-orange-500/10" },
    { value: `${completed}/${total}`, label: isToday ? "hoje" : "dia", icon: CheckCircle2, color: "text-emerald-400", background: "bg-emerald-500/10" },
    { value: `${weeklyAverage}%`, label: "semana", icon: TrendingUp, color: "text-sky-400", background: "bg-sky-500/10" },
  ];
  return (
    <section aria-label="Resumo dos hábitos" className="grid grid-cols-3 gap-2">
      {items.map(({ value, label, icon: Icon, color, background }) => (
        <Card key={label} className="flex min-h-[88px] flex-col items-center justify-center rounded-xl p-2 text-center">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${background} ${color}`}><Icon className="h-4 w-4" /></span>
          <strong className="mt-1 text-sm font-black text-white">{value}</strong>
          <span className="text-[9px] text-zinc-600">{label}</span>
        </Card>
      ))}
    </section>
  );
}
