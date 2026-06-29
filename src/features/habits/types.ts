export interface HabitTask {
  id: string;
  label: string;
  completed: boolean;
}

export type HabitHistory = Record<string, string[]>;

export interface HabitWeekDay {
  key: string;
  label: string;
  day: number;
  isToday: boolean;
  isFuture: boolean;
  progress: number;
}
