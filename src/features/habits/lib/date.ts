const longDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "2-digit",
  month: "long",
});

const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  day: "2-digit",
  month: "short",
});

export function getCurrentLongDate(date = new Date()) {
  return longDateFormatter.format(date);
}

export function getCurrentShortDate(date = new Date()) {
  const parts = shortDateFormatter.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value.replace(".", "") ?? "";
  return `${getPart("weekday")} ${getPart("day")} ${getPart("month")}`;
}

export interface CurrentWeekDay {
  key: string;
  label: string;
  day: number;
  isToday: boolean;
  isFuture: boolean;
}

export function getDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function parseDateKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getCurrentWeekDays(): CurrentWeekDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monday = new Date(today);
  const dayFromMonday = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - dayFromMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return {
      key: getDateKey(date),
      label: ["S", "T", "Q", "Q", "S", "S", "D"][index],
      day: date.getDate(),
      isToday: date.getTime() === today.getTime(),
      isFuture: date.getTime() > today.getTime(),
    };
  });
}

export function getConsecutiveDayCount(keys: string[]) {
  const savedDays = new Set(keys);
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  if (!savedDays.has(getDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);

  let count = 0;
  while (savedDays.has(getDateKey(cursor))) {
    count += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return count;
}

export function getLongestDaySequence(keys: string[]) {
  const timestamps = [...new Set(keys)]
    .map((key) => new Date(`${key}T00:00:00Z`).getTime())
    .filter(Number.isFinite)
    .sort((first, second) => first - second);

  let longest = 0;
  let current = 0;
  let previous: number | null = null;

  timestamps.forEach((timestamp) => {
    current = previous !== null && timestamp - previous === 86_400_000 ? current + 1 : 1;
    longest = Math.max(longest, current);
    previous = timestamp;
  });

  return longest;
}
