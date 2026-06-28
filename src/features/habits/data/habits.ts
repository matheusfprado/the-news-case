import type { HabitTask } from "@/features/habits/types";

export const initialHabitTasks: HabitTask[] = [
  { id: "exercise", label: "Exercício", completed: true },
  { id: "food", label: "Alimentação", completed: true },
  { id: "book", label: "Livro", completed: true },
  { id: "edition", label: "Edição", completed: true },
  { id: "sleep", label: "Sono", completed: false },
];

export const weekDays = [
  { label: "S", number: 22, completed: true },
  { label: "T", number: 23, completed: true },
  { label: "Q", number: 24, completed: true },
  { label: "Q", number: 25, completed: true },
  { label: "S", number: 26, completed: true, current: true },
  { label: "S", number: 27, completed: false },
  { label: "D", number: 28, completed: false },
];
