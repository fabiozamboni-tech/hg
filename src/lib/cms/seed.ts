import { NOTICIAS } from "@/lib/noticias";
import { EVENTOS } from "@/lib/eventos";
import { GALERIAS } from "@/lib/galerias";
import type { CmsEvent, CmsGallery, CmsNews } from "./types";

/** Conteúdo atual do site, usado como carga inicial do CMS. */
export const SEED_NEWS: CmsNews[] = NOTICIAS.map((n) => ({
  id: n.id,
  data: n.data,
  titulo: n.titulo,
  categoria: n.categoria,
  resumo: n.resumo,
  imagem: n.imagem,
  conteudo: n.conteudo ?? [],
  imagens: n.imagens ?? [],
}));

export const SEED_EVENTS: CmsEvent[] = EVENTOS.map((e) => ({
  id: e.id,
  data: e.data,
  titulo: e.titulo,
  categoria: e.categoria,
  resumo: e.resumo,
  local: e.local,
}));

export const SEED_GALLERIES: CmsGallery[] = GALERIAS.map((g) => ({
  id: g.id,
  data: g.data,
  titulo: g.titulo,
  descricao: g.descricao,
  capa: g.capa,
  imagens: [...g.imagens],
}));