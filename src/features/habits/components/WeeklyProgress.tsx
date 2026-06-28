import { Card } from "@/shared/components/ui/Primitives";

const days = [
  { label: "S", value: 68 }, { label: "D", value: 35 }, { label: "S", value: 22 },
  { label: "T", value: 78 }, { label: "Q", value: 32 }, { label: "Q", value: 65 },
  { label: "S", value: 82, current: true },
];

export function WeeklyProgress() {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between"><h2 className="text-xs font-black text-white">Esta Semana</h2><p className="text-[10px] text-zinc-700">Média <strong className="text-[#ffd400]">80%</strong></p></div>
      <div className="mt-3 flex h-14 items-end gap-1.5">
        {days.map((day, index) => (
          <div key={`${day.label}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-1">
            <span className={`w-full rounded-sm ${day.current ? "bg-[#ffd400]" : "bg-[#5b4b00]"}`} style={{ height: `${day.value}%` }} />
            <span className={`text-center text-[7px] font-bold ${day.current ? "text-[#ffd400]" : "text-zinc-700"}`}>{day.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
