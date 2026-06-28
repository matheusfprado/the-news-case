import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface AppModalProps { title: string; subtitle?: string; onClose: () => void; children: ReactNode; footer?: ReactNode }

export function AppModal({ title, subtitle, onClose, children, footer }: AppModalProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-1.5" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="app-modal-title" className="flex h-[calc(100dvh-12px)] w-full max-w-[430px] flex-col overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0b0b11] shadow-2xl">
        <header className="flex min-h-14 shrink-0 items-center justify-between border-b border-[#302b16] px-4"><div><h1 id="app-modal-title" className="text-sm font-bold text-white">{title}</h1>{subtitle && <p className="mt-0.5 text-[10px] text-zinc-600">{subtitle}</p>}</div><button type="button" onClick={onClose} aria-label="Fechar" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#181821] text-white hover:bg-[#252532] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]"><X className="h-5 w-5" /></button></header>
        <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
        {footer && <footer className="shrink-0 border-t border-white/[0.04] p-3 pb-[max(12px,env(safe-area-inset-bottom))]">{footer}</footer>}
      </section>
    </div>,
    document.body,
  );
}
