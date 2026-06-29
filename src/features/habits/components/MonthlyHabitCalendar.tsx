import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { initialHabitTasks } from "@/features/habits/data/habits";
import { getDateKey, parseDateKey } from "@/features/habits/lib/date";
import type { HabitHistory } from "@/features/habits/types";
import { Card } from "@/shared/components/ui/Primitives";

const weekLabels = ["D", "S", "T", "Q", "Q", "S", "S"];
const habitColors: Record<string, string> = {
  exercise: "bg-red-400",
  food: "bg-emerald-400",
  book: "bg-sky-400",
  edition: "bg-violet-400",
  sleep: "bg-indigo-400",
};

const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" });
const selectedDateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" });

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

interface MonthlyHabitCalendarProps {
  history: HabitHistory;
  selectedKey: string;
  onSelectDate: (key: string) => void;
}

export function MonthlyHabitCalendar({ history, selectedKey, onSelectDate }: MonthlyHabitCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = getDateKey(today);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}-`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekDay = new Date(year, month, 1).getDay();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const selectedIds = history[selectedKey] ?? [];

  useEffect(() => {
    const selectedDate = parseDateKey(selectedKey);
    setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedKey]);

  const monthStats = useMemo(() => {
    const entries = Object.entries(history).filter(([key]) => key.startsWith(monthPrefix));
    return {
      activeDays: entries.filter(([, ids]) => ids.length > 0).length,
      perfectDays: entries.filter(([, ids]) => ids.length === initialHabitTasks.length).length,
      totalHabits: entries.reduce((total, [, ids]) => total + ids.length, 0),
    };
  }, [history, monthPrefix]);

  function changeMonth(offset: number) {
    const nextMonth = new Date(year, month + offset, 1);
    const nextPrefix = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}-`;
    const lastActiveDay = Object.keys(history).filter((key) => key.startsWith(nextPrefix)).sort().at(-1);
    setViewDate(nextMonth);
    onSelectDate(nextMonth.getFullYear() === today.getFullYear() && nextMonth.getMonth() === today.getMonth()
      ? todayKey
      : lastActiveDay ?? getDateKey(nextMonth));
  }

  return (
    <Card className="p-3">
      <h2 className="text-xs font-black text-white">Calendário Mensal</h2>

      <div className="mt-2 flex items-center justify-between border-b border-[#292929] pb-2">
        <button type="button" onClick={() => changeMonth(-1)} aria-label="Mês anterior" className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]"><ChevronLeft className="h-5 w-5" /></button>
        <strong className="text-xs text-white">{capitalize(monthFormatter.format(viewDate))}</strong>
        <button type="button" onClick={() => changeMonth(1)} disabled={isCurrentMonth} aria-label="Próximo mês" className="flex h-11 w-11 items-center justify-center rounded-lg text-zinc-300 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] disabled:cursor-default disabled:opacity-25"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <div className="grid grid-cols-3 border-b border-[#292929] py-3 text-center">
        <div><strong className="block text-sm text-[#F5C000]">{monthStats.activeDays}</strong><span className="text-[8px] text-zinc-500">Dias ativos</span></div>
        <div><strong className="block text-sm text-emerald-400">{monthStats.perfectDays}</strong><span className="text-[8px] text-zinc-500">Dias perfeitos</span></div>
        <div><strong className="block text-sm text-white">{monthStats.totalHabits}</strong><span className="text-[8px] text-zinc-500">Total hábitos</span></div>
      </div>

      <div className="mt-2 grid grid-cols-7" aria-label={`Calendário de ${monthFormatter.format(viewDate)}`}>
        {weekLabels.map((label, index) => <span key={`${label}-${index}`} className="py-2 text-center text-[9px] font-bold text-zinc-500">{label}</span>)}
        {Array.from({ length: firstWeekDay }, (_, index) => <span key={`empty-${index}`} />)}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const date = new Date(year, month, day);
          const key = getDateKey(date);
          const completedIds = history[key] ?? [];
          const isFuture = date.getTime() > today.getTime();
          const selected = key === selectedKey;
          return (
            <button
              key={key}
              type="button"
              disabled={isFuture}
              onClick={() => onSelectDate(key)}
              aria-pressed={selected}
              aria-label={`${selectedDateFormatter.format(date)}: ${completedIds.length} de ${initialHabitTasks.length} hábitos`}
              className={`relative flex h-11 min-w-0 flex-col items-center justify-center rounded-lg text-[10px] font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000] ${selected ? "border border-[#F5C000] bg-[#F5C000]/5 text-white" : "border border-transparent text-zinc-300 hover:bg-white/[0.03]"} ${isFuture ? "opacity-25" : ""}`}
            >
              {day}
              {completedIds.length > 0 && <span className="absolute bottom-1.5 flex max-w-full gap-0.5" aria-hidden="true">{completedIds.map((id) => <span key={id} className={`h-1 w-1 rounded-full ${habitColors[id] ?? "bg-zinc-400"}`} />)}</span>}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-2 border-t border-[#292929] pt-3">
        {initialHabitTasks.map((habit) => <span key={habit.id} className="flex items-center gap-1 text-[8px] text-zinc-500"><span className={`h-1.5 w-1.5 rounded-full ${habitColors[habit.id]}`} />{habit.label}</span>)}
      </div>

      <div className="mt-3 rounded-lg bg-[#111] px-3 py-2 text-center" aria-live="polite">
        <p className="text-[9px] text-zinc-500">{capitalize(selectedDateFormatter.format(parseDateKey(selectedKey)))}</p>
        <strong className={`mt-1 block text-xs ${selectedIds.length === initialHabitTasks.length ? "text-emerald-400" : "text-[#F5C000]"}`}>{selectedIds.length === initialHabitTasks.length ? "Dia perfeito" : "Progresso do dia"} ({selectedIds.length}/{initialHabitTasks.length})</strong>
      </div>
    </Card>
  );
}
