import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useAccessibleOverlay } from "@/shared/hooks/useAccessibleOverlay";

interface AppScreenProps { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }

export function AppScreen({ title, onClose, children, footer }: AppScreenProps) {
  const screenRef = useAccessibleOverlay<HTMLDivElement>(onClose);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-[#101017]">
      <div ref={screenRef} role="dialog" aria-modal="true" aria-labelledby="app-screen-title" className="mx-auto flex h-dvh w-full max-w-[430px] flex-col border-x border-white/[0.04] bg-[#101017]">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#3b3415] px-3"><h1 id="app-screen-title" className="text-sm font-bold text-white">{title}</h1><button type="button" onClick={onClose} aria-label="Fechar" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1b1b25] text-white hover:bg-[#252532] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C000]"><X className="h-5 w-5" /></button></header>
        <main className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</main>
        {footer && <footer className="shrink-0 border-t border-white/[0.04] bg-[#101017] p-3 pb-[max(12px,env(safe-area-inset-bottom))]">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
