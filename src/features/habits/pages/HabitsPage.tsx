import { useMemo, useState } from "react";
import { Bell, Plus } from "lucide-react";
import { DailyHabits } from "@/features/habits/components/DailyHabits";
import { HabitOverview } from "@/features/habits/components/HabitOverview";
import { MonthlyHabitCalendar } from "@/features/habits/components/MonthlyHabitCalendar";
import { StreakCard } from "@/features/habits/components/StreakCard";
import { WeeklyProgress } from "@/features/habits/components/WeeklyProgress";
import { initialHabitTasks } from "@/features/habits/data/habits";
import { getConsecutiveDayCount, getCurrentLongDate, getCurrentWeekDays, getDateKey, parseDateKey } from "@/features/habits/lib/date";
import type { HabitHistory } from "@/features/habits/types";
import { AppPageHeader } from "@/shared/components/layout/AppPageHeader";
import { usePersistentState } from "@/shared/hooks/usePersistentState";

const HABIT_HISTORY_KEY = "the-news-habit-history-v1";
const ACCESSED_DAYS_KEY = "the-news-accessed-days-v2";

function isHabitHistory(value: unknown): value is HabitHistory {
  return typeof value === "object" && value !== null && Object.values(value).every((item) => Array.isArray(item) && item.every((id) => typeof id === "string"));
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function HabitsPage() {
  const [history, setHistory] = usePersistentState<HabitHistory>(HABIT_HISTORY_KEY, {}, isHabitHistory);
  const [accessedDays, setAccessedDays] = usePersistentState<string[]>(ACCESSED_DAYS_KEY, [], isStringArray);
  const todayKey = getDateKey();
  const [selectedKey, setSelectedKey] = useState(todayKey);
  const selectedDate = parseDateKey(selectedKey);
  const isTodaySelected = selectedKey === todayKey;
  const completedIds = history[selectedKey] ?? [];
  const tasks = initialHabitTasks.map((task) => ({ ...task, completed: completedIds.includes(task.id) }));
  const weekDays = useMemo(() => getCurrentWeekDays().map((day) => ({
    ...day,
    progress: Math.round(((history[day.key]?.length ?? 0) / initialHabitTasks.length) * 100),
  })), [history]);
  const completedSelectedDay = tasks.filter((task) => task.completed).length;
  const availableWeekDays = weekDays.filter((day) => !day.isFuture);
  const weeklyAverage = availableWeekDays.length > 0
    ? Math.round(availableWeekDays.reduce((total, day) => total + day.progress, 0) / availableWeekDays.length)
    : 0;
  const currentStreak = getConsecutiveDayCount(accessedDays);

  function toggleTask(id: string) {
    setHistory((current) => {
      const currentIds = current[selectedKey] ?? [];
      const nextIds = currentIds.includes(id) ? currentIds.filter((item) => item !== id) : [...currentIds, id];
      return { ...current, [selectedKey]: nextIds };
    });
  }

  function changeSelectedDay(offset: number) {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + offset);
    if (nextDate.getTime() > parseDateKey(todayKey).getTime()) return;
    setSelectedKey(getDateKey(nextDate));
  }

  function registerToday() {
    if (accessedDays.includes(todayKey)) return;
    setAccessedDays((current) => [...current, todayKey]);
  }

  return (
    <div className="animate-enter">
      <AppPageHeader
        title="Seus Hábitos"
        subtitle={getCurrentLongDate(selectedDate)}
        actions={<><button type="button" disabled aria-label="Notificações indisponíveis" className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-xl border border-[#292929] bg-[#18181f] text-zinc-600"><Bell className="h-4 w-4" aria-hidden="true" /></button><button type="button" disabled aria-label="Adicionar hábito indisponível" className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full bg-[#F5C000] text-black"><Plus className="h-5 w-5" strokeWidth={3} aria-hidden="true" /></button></>}
      />
      <div className="mt-2 space-y-2">
        <HabitOverview currentStreak={currentStreak} completed={completedSelectedDay} total={tasks.length} weeklyAverage={weeklyAverage} isToday={isTodaySelected} />
        <div className="space-y-2">
          <DailyHabits tasks={tasks} date={selectedDate} isToday={isTodaySelected} onPreviousDay={() => changeSelectedDay(-1)} onNextDay={() => changeSelectedDay(1)} onToggle={toggleTask} />
          <WeeklyProgress days={weekDays} average={weeklyAverage} />
          <StreakCard days={weekDays} accessedDays={accessedDays} currentStreak={currentStreak} onRegisterToday={registerToday} />
          <MonthlyHabitCalendar history={history} selectedKey={selectedKey} onSelectDate={setSelectedKey} />
        </div>
      </div>
    </div>
  );
}
