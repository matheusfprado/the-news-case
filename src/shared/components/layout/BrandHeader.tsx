import type { ReactNode } from "react";

interface BrandHeaderProps {
  eyebrow?: string;
  actions?: ReactNode;
}

export function BrandHeader({ eyebrow, actions }: BrandHeaderProps) {
  return (
    <header className="flex min-h-14 items-center justify-between border-b border-[#F5C000]/30 pb-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <img src="/the-news-logo.png" alt="" className="h-9 w-9 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0">
          <strong className="block truncate text-lg font-black tracking-[-0.04em] text-white">the news</strong>
          {eyebrow && <span className="block truncate text-xs font-medium text-zinc-400">{eyebrow}</span>}
        </div>
      </div>
      {actions}
    </header>
  );
}
