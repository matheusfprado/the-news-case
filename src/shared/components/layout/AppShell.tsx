import { Outlet } from "react-router-dom";
import { BottomNav } from "@/shared/components/layout/BottomNav";

export function AppShell() {
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-hidden border-x border-[#1f1f1f] bg-[#090909]">
      <main id="main-content" className="h-dvh overflow-y-auto px-3 pb-24 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
