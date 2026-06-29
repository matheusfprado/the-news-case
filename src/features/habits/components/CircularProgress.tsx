export function CircularProgress({ value }: { value: number }) {
  return (
    <div className="relative flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full" style={{ background: `conic-gradient(#F5C000 ${value * 3.6}deg, #282828 0deg)` }} role="progressbar" aria-label={`${value}% completo`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <div className="flex h-[68px] w-[68px] flex-col items-center justify-center rounded-full bg-[#171717]">
        <strong className="text-lg font-black leading-none text-white">{value}%</strong>
        <span className="mt-1 text-[8px] text-zinc-600">completo</span>
      </div>
    </div>
  );
}
