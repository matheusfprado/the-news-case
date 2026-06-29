import { Card } from "@/shared/components/ui/Primitives";
import type { HabitWeekDay } from "@/features/habits/types";

export function WeeklyProgress({ days, average }: { days: HabitWeekDay[]; average: number }) {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between"><h2 className="text-xs font-black text-white">Esta Semana</h2><p className="text-[10px] text-zinc-500">Média <strong className="text-[#F5C000]">{average}%</strong></p></div>
      <div className="mt-3 flex h-14 items-end gap-1.5" role="img" aria-label={`Progresso médio da semana: ${average}%`}>
        {days.map((day, index) => (
          <div key={`${day.label}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-1">
            <span className={`w-full rounded-sm ${day.isToday ? "bg-[#F5C000]" : "bg-[#5b4b00]"}`} style={{ height: `${Math.max(day.progress, 4)}%` }} title={`${day.day}: ${day.progress}%`} />
            <span className={`text-center text-[8px] font-bold ${day.isToday ? "text-[#F5C000]" : "text-zinc-500"}`}>{day.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
