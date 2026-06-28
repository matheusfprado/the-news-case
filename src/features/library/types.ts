export type LibraryStatus = "Lendo" | "Quero Ler" | "Estante" | "Abandonados";

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
  status: LibraryStatus;
  cover: "blue" | "green" | "purple" | "orange";
  coverUrl?: string;
}
