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

export function getCurrentLongDate() {
  return longDateFormatter.format(new Date());
}

export function getCurrentShortDate() {
  const parts = shortDateFormatter.formatToParts(new Date());
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
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      label: ["S", "T", "Q", "Q", "S", "S", "D"][index],
      day: date.getDate(),
      isToday: date.getTime() === today.getTime(),
      isFuture: date.getTime() > today.getTime(),
    };
  });
}
