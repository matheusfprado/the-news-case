import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-[#292929] bg-[#171717]", className)} {...props} />;
}

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ffd400] px-4 text-sm font-bold text-black transition-colors hover:bg-[#ffe13d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]", className)} {...props} />
  ),
);
Button.displayName = "Button";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-[#ffd400]/30 bg-[#ffd400]/10 px-2.5 py-1 text-xs font-bold text-[#ffd400]", className)} {...props} />;
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn("h-12 w-full rounded-xl border border-[#292929] bg-[#171717] px-4 text-base text-white outline-none placeholder:text-zinc-600 focus:border-[#ffd400]/60 focus:ring-2 focus:ring-[#ffd400]/15", className)} {...props} />,
);
Input.displayName = "Input";

export function Progress({ value, className }: { value: number; className?: string }) {
  return <div className={cn("h-2 overflow-hidden rounded-full bg-zinc-800", className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><div className="h-full rounded-full bg-[#ffd400] transition-[width] duration-300" style={{ width: `${value}%` }} /></div>;
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-zinc-800", className)} />;
}

export function Separator({ className }: { className?: string }) {
  return <div role="separator" className={cn("h-px w-full bg-[#292929]", className)} />;
}
