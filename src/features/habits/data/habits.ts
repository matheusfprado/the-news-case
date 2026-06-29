import type { HabitTask } from "@/features/habits/types";

export const initialHabitTasks: HabitTask[] = [
  { id: "exercise", label: "Exercício", completed: false },
  { id: "food", label: "Alimentação", completed: false },
  { id: "book", label: "Livro", completed: false },
  { id: "edition", label: "Edição", completed: false },
  { id: "sleep", label: "Sono", completed: false },
];
