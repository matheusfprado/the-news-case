import { Construction } from "lucide-react";
import { AppPageHeader } from "@/shared/components/layout/AppPageHeader";
import { Card } from "@/shared/components/ui/Primitives";

export function PlaceholderPage({ title }: { title: string }) {
  return <div className="animate-enter"><AppPageHeader title={title} /><Card className="mt-4 flex min-h-80 flex-col items-center justify-center p-6 text-center"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Construction className="h-7 w-7" /></span><h2 className="mt-4 text-lg font-bold">Em construção</h2><p className="mt-2 max-w-64 text-sm text-zinc-500">Esta área estará disponível em breve.</p></Card></div>;
}
