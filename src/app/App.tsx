import { Navigate, Route, Routes } from "react-router-dom";
import { HabitsPage } from "@/features/habits";
import { LibraryPage } from "@/features/library";
import { CupPage } from "@/features/cup";
import { EditionPage } from "@/features/edition";
import { MorePage } from "@/features/more";
import { AppShell } from "@/shared/components/layout/AppShell";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/inicio" replace />} />
        <Route path="habitos" element={<HabitsPage />} />
        <Route path="biblioteca" element={<LibraryPage />} />
        <Route path="inicio" element={<EditionPage />} />
        <Route path="copa" element={<CupPage />} />
        <Route path="mais" element={<MorePage />} />
        <Route path="*" element={<Navigate to="/inicio" replace />} />
      </Route>
    </Routes>
  );
}
