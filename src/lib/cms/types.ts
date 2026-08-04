export type CmsUser = { username: string; email: string };

export type CmsNews = {
  id: string;
  data: string;
  titulo: string;
  categoria: string;
  resumo: string;
  imagem: string;
  conteudo: string[];
  imagens: string[];
};

export type CmsEvent = {
  id: string;
  data: string;
  titulo: string;
  categoria: string;
  resumo: string;
  local: string;
};

export type CmsGallery = {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  capa: string;
  imagens: string[];
};

/** Áreas do site que o desenvolvedor pode liberar ou bloquear para edição. */
export const CMS_AREAS = [
  { id: "home", label: "Home" },
  { id: "instituto", label: "Instituto" },
  { id: "hercules-gallo", label: "Hércules Galló" },
  { id: "galopolis", label: "Galópolis" },
  { id: "restauracao", label: "Restauração" },
  { id: "atividades", label: "Atividades" },
  { id: "novidades", label: "Novidades" },
  { id: "agenda", label: "Agenda" },
  { id: "galeria", label: "Galeria" },
  { id: "contato", label: "Contato" },
  { id: "global", label: "Cabeçalho e rodapé" },
] as const;

export type CmsAreaId = (typeof CMS_AREAS)[number]["id"];

export type CmsSettings = {
  /** area id -> editável */
  areas: Record<string, boolean>;
};

export const DEFAULT_SETTINGS: CmsSettings = {
  areas: Object.fromEntries(CMS_AREAS.map((a) => [a.id, true])),
};

export interface CmsBackend {
  readonly mode: "php" | "local";
  session(): Promise<CmsUser | null>;
  login(username: string, password: string): Promise<CmsUser>;
  logout(): Promise<void>;
  changePassword(current: string, next: string): Promise<void>;
  changeEmail(email: string): Promise<CmsUser>;
  forgotPassword(username: string): Promise<void>;
  getContent(): Promise<Record<string, string>>;
  saveContent(key: string, value: string): Promise<void>;
  resetContent(key: string): Promise<void>;
  getSettings(): Promise<CmsSettings>;
  saveSettings(settings: CmsSettings): Promise<void>;
  listNews(): Promise<CmsNews[]>;
  saveNews(item: CmsNews): Promise<CmsNews>;
  deleteNews(id: string): Promise<void>;
  listEvents(): Promise<CmsEvent[]>;
  saveEvent(item: CmsEvent): Promise<CmsEvent>;
  deleteEvent(id: string): Promise<void>;
  listGalleries(): Promise<CmsGallery[]>;
  saveGallery(item: CmsGallery): Promise<CmsGallery>;
  deleteGallery(id: string): Promise<void>;
  upload(file: File): Promise<string>;
}

export function slugify(text: string): string {
  return (
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || `item-${Date.now()}`
  );
}