import { useCms } from "./CmsProvider";
import type { CmsEvent, CmsGallery, CmsNews } from "./types";

/** Notícias vindas do CMS, mais recentes primeiro. */
export function useNews(): CmsNews[] {
  const { news } = useCms();
  return [...news].sort((a, b) => (a.data < b.data ? 1 : -1));
}

export function useNewsItem(id: string, fallback: CmsNews): CmsNews {
  const { news } = useCms();
  return news.find((n) => n.id === id) ?? fallback;
}

/** Eventos da agenda, do CMS. */
export function useEvents(): { upcoming: CmsEvent[]; past: CmsEvent[] } {
  const { events } = useCms();
  const today = new Date().toISOString().slice(0, 10);
  return {
    upcoming: events.filter((e) => e.data >= today).sort((a, b) => a.data.localeCompare(b.data)),
    past: events.filter((e) => e.data < today).sort((a, b) => b.data.localeCompare(a.data)),
  };
}

/** Galerias cadastradas, mais recentes primeiro. */
export function useGalleries(): CmsGallery[] {
  const { galleries } = useCms();
  return [...galleries].sort((a, b) => (a.data < b.data ? 1 : -1));
}

export function useGalleryItem(id: string, fallback: CmsGallery): CmsGallery {
  const { galleries } = useCms();
  return galleries.find((g) => g.id === id) ?? fallback;
}
