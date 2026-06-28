import { Navigate, Route, Routes } from "react-router-dom";
import { HabitsPage } from "@/features/habits";
import { LibraryPage } from "@/features/library";
import { PlaceholderPage } from "@/app/pages/PlaceholderPage";
import { AppShell } from "@/shared/components/layout/AppShell";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/habitos" replace />} />
        <Route path="habitos" element={<HabitsPage />} />
        <Route path="biblioteca" element={<LibraryPage />} />
        <Route path="inicio" element={<PlaceholderPage title="Início" />} />
        <Route path="copa" element={<PlaceholderPage title="Copa" />} />
        <Route path="mais" element={<PlaceholderPage title="Mais" />} />
        <Route path="*" element={<Navigate to="/habitos" replace />} />
      </Route>
    </Routes>
  );
}
