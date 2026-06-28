import { useState } from "react";
import { DailyHabits } from "@/features/habits/components/DailyHabits";
import { HabitOverview } from "@/features/habits/components/HabitOverview";
import { StreakCard } from "@/features/habits/components/StreakCard";
import { WeeklyProgress } from "@/features/habits/components/WeeklyProgress";
import { initialHabitTasks } from "@/features/habits/data/habits";
import { getCurrentLongDate } from "@/features/habits/lib/date";
import { AppPageHeader } from "@/shared/components/layout/AppPageHeader";

export function HabitsPage() {
  const [tasks, setTasks] = useState(initialHabitTasks);

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  return (
    <div className="animate-enter">
      <AppPageHeader title="Seus Hábitos" subtitle={getCurrentLongDate()} />
      <div className="mt-2 space-y-2">
        <HabitOverview />
        <div className="space-y-2">
          <DailyHabits tasks={tasks} onToggle={toggleTask} />
          <WeeklyProgress />
          <StreakCard />
        </div>
      </div>
    </div>
  );
}
