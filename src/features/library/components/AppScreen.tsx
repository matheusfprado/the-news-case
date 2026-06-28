import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface AppScreenProps { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }

export function AppScreen({ title, onClose, children, footer }: AppScreenProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 bg-[#101017]">
      <div className="mx-auto flex h-dvh w-full max-w-[430px] flex-col border-x border-white/[0.04] bg-[#101017]">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#3b3415] px-3"><h1 className="text-sm font-bold text-white">{title}</h1><button type="button" onClick={onClose} aria-label="Fechar" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b1b25] text-white hover:bg-[#252532] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd400]"><X className="h-5 w-5" /></button></header>
        <main className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</main>
        {footer && <footer className="shrink-0 border-t border-white/[0.04] bg-[#101017] p-3 pb-[max(12px,env(safe-area-inset-bottom))]">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
