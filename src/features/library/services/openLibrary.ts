interface OpenLibraryDocument {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  number_of_pages_median?: number;
}

interface OpenLibraryResponse {
  docs: OpenLibraryDocument[];
}

export interface BookSearchResult {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  coverUrl?: string;
}

const apiBaseUrl = import.meta.env.VITE_OPEN_LIBRARY_API_URL ?? "https://openlibrary.org";
const coversBaseUrl = import.meta.env.VITE_OPEN_LIBRARY_COVERS_URL ?? "https://covers.openlibrary.org";

export async function searchBooks(query: string, signal?: AbortSignal): Promise<BookSearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    fields: "key,title,author_name,cover_i,number_of_pages_median",
    limit: "8",
    lang: "pt",
  });
  const response = await fetch(`${apiBaseUrl}/search.json?${params}`, { signal });
  if (!response.ok) throw new Error("Não foi possível consultar a Open Library.");
  const data = await response.json() as OpenLibraryResponse;

  return data.docs.map((book) => ({
    id: book.key.replaceAll("/", "-"),
    title: book.title,
    author: book.author_name?.[0] ?? "Autor desconhecido",
    totalPages: book.number_of_pages_median ?? 200,
    coverUrl: book.cover_i ? `${coversBaseUrl}/b/id/${book.cover_i}-M.jpg` : undefined,
  }));
}
