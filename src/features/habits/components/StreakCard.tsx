import { useState } from "react";
import { Flame, Trophy } from "lucide-react";
import { getCurrentWeekDays } from "@/features/habits/lib/date";
import { Card } from "@/shared/components/ui/Primitives";

const STORAGE_KEY = "the-news-accessed-days";

function getInitialAccessedDays() {
  const weekDays = getCurrentWeekDays();
  const pastDays = weekDays.filter((day) => !day.isFuture && !day.isToday).map((day) => day.key);

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedDays = saved ? JSON.parse(saved) as string[] : [];
    return new Set([...pastDays, ...savedDays]);
  } catch {
    return new Set(pastDays);
  }
}

export function StreakCard() {
  const weekDays = getCurrentWeekDays();
  const [accessedDays, setAccessedDays] = useState<Set<string>>(getInitialAccessedDays);
  const activeDays = weekDays.filter((day) => accessedDays.has(day.key)).length;

  function registerToday(key: string) {
    const day = weekDays.find((item) => item.key === key);
    if (!day?.isToday || accessedDays.has(key)) return;

    const next = new Set(accessedDays).add(key);
    setAccessedDays(next);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // O estado continua funcional quando o armazenamento estiver indisponível.
    }
  }

  return (
    <Card className="border-[#4a3c00] bg-gradient-to-r from-[#211b00] to-[#161300] p-3">
      <div className="flex items-start justify-between">
        <div className="flex gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500"><Flame className="h-5 w-5" /></span><div><h2 className="text-base font-black text-[#ffd400]">{activeDays} {activeDays === 1 ? "dia" : "dias"}</h2><p className="text-[9px] text-zinc-600">Recorde: 12 dias</p></div></div>
        <span className="flex items-center gap-1 rounded-full border border-[#695600] px-2 py-1 text-[9px] font-bold text-[#ffd400]"><Trophy className="h-3 w-3" /> Top 10%</span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {weekDays.map((day) => (
          <div key={day.key} className="text-center">
            <button
              type="button"
              onClick={() => registerToday(day.key)}
              disabled={!day.isToday || accessedDays.has(day.key)}
              aria-label={day.isToday ? `Registrar acesso de hoje, dia ${day.day}` : `Dia ${day.day} indisponível`}
              aria-pressed={accessedDays.has(day.key)}
              className={`block h-10 w-full rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] ${accessedDays.has(day.key) ? "border-[#6b5800] bg-[#6b5800]" : "border-[#2e2800] bg-[#1a1807]"} ${day.isToday && !accessedDays.has(day.key) ? "cursor-pointer border-[#ffd400]/60 hover:bg-[#332b00]" : "cursor-default"}`}
            />
            <span className={`mt-1 block text-[7px] ${day.isToday ? "font-bold text-[#ffd400]" : "text-zinc-700"}`}>{day.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
