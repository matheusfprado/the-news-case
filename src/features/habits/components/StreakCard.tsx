import { Check, Flame, Trophy } from "lucide-react";
import { getLongestDaySequence } from "@/features/habits/lib/date";
import type { HabitWeekDay } from "@/features/habits/types";
import { Card } from "@/shared/components/ui/Primitives";

interface StreakCardProps {
  days: HabitWeekDay[];
  accessedDays: string[];
  currentStreak: number;
  onRegisterToday: () => void;
}

export function StreakCard({ days, accessedDays, currentStreak, onRegisterToday }: StreakCardProps) {
  const accessedDaySet = new Set(accessedDays);
  const record = getLongestDaySequence(accessedDays);

  return (
    <Card className="border-[#4a3c00] p-3">
      <div className="flex items-start justify-between">
        <div className="flex gap-2"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500"><Flame className="h-5 w-5" /></span><div><h2 className="text-base font-black text-[#F5C000]">{currentStreak} {currentStreak === 1 ? "dia" : "dias"}</h2><p className="text-[10px] text-zinc-500">Sequência atual</p></div></div>
        <span className="flex min-h-10 items-center gap-1 rounded-full border border-[#695600] px-3 text-[10px] font-bold text-[#F5C000]"><Trophy className="h-3 w-3" /> Recorde {record}</span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {days.map((day) => (
          <div key={day.key} className="text-center">
            <button
              type="button"
              onClick={onRegisterToday}
              disabled={!day.isToday || accessedDaySet.has(day.key)}
              aria-label={day.isToday ? `Registrar check-in de hoje, dia ${day.day}` : `Dia ${day.day}`}
              aria-pressed={accessedDaySet.has(day.key)}
              className={`flex h-11 w-full items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] disabled:cursor-default ${accessedDaySet.has(day.key) ? "border-[#6b5800] bg-[#6b5800] text-[#F5C000]" : "border-[#2e2800] bg-[#1a1807] text-transparent"} ${day.isToday && !accessedDaySet.has(day.key) ? "cursor-pointer border-[#F5C000]/60 hover:bg-[#332b00]" : ""}`}
            ><Check className="h-4 w-4" /></button>
            <span className={`mt-1 block text-[8px] ${day.isToday ? "font-bold text-[#F5C000]" : "text-zinc-500"}`}>{day.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
