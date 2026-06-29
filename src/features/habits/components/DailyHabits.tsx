import { BedDouble, BookOpen, Check, ChevronLeft, ChevronRight, Dumbbell, Newspaper, Utensils, type LucideIcon } from "lucide-react";
import { CircularProgress } from "@/features/habits/components/CircularProgress";
import { getCurrentShortDate } from "@/features/habits/lib/date";
import type { HabitTask } from "@/features/habits/types";
import { Card } from "@/shared/components/ui/Primitives";

const iconMap: Record<string, { icon: LucideIcon; color: string }> = {
  exercise: { icon: Dumbbell, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  food: { icon: Utensils, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  book: { icon: BookOpen, color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
  edition: { icon: Newspaper, color: "text-[#F5C000] bg-[#F5C000]/10 border-[#F5C000]/20" },
  sleep: { icon: BedDouble, color: "text-zinc-600 bg-zinc-900 border-zinc-800" },
};

interface DailyHabitsProps { tasks: HabitTask[]; date: Date; isToday: boolean; onPreviousDay: () => void; onNextDay: () => void; onToggle: (id: string) => void }

export function DailyHabits({ tasks, date, isToday, onPreviousDay, onNextDay, onToggle }: DailyHabitsProps) {
  const completed = tasks.filter((task) => task.completed).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={onPreviousDay} aria-label="Dia anterior" className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]"><ChevronLeft className="h-5 w-5" /></button>
        <p className="text-center text-xs font-bold text-zinc-400">{isToday ? "Hoje, " : ""}{getCurrentShortDate(date)}</p>
        <button type="button" onClick={onNextDay} disabled={isToday} aria-label="Próximo dia" className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] disabled:cursor-default disabled:opacity-25"><ChevronRight className="h-5 w-5" /></button>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <CircularProgress value={progress} />
        <div className="min-w-0 flex-1 space-y-1">
          {tasks.map((task) => {
            const config = iconMap[task.id];
            const Icon = config.icon;
            return (
              <button key={task.id} type="button" onClick={() => onToggle(task.id)} aria-pressed={task.completed} className={`flex min-h-11 w-full items-center gap-2 rounded-lg px-1 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] ${!task.completed ? "opacity-50" : ""}`}>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${config.color}`}><Icon className="h-4 w-4" /></span>
                <span className="min-w-0 flex-1 truncate text-xs font-bold text-zinc-200">{task.label}</span>
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${task.completed ? "border-emerald-400 text-emerald-400" : "border-dashed border-zinc-700 text-transparent"}`}><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
