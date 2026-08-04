import {
  DEFAULT_SETTINGS,
  slugify,
  type CmsBackend,
  type CmsEvent,
  type CmsGallery,
  type CmsNews,
  type CmsSettings,
  type CmsUser,
} from "./types";
import { SEED_EVENTS, SEED_GALLERIES, SEED_NEWS } from "./seed";

/**
 * Backend de preview: espelha exatamente a API PHP, mas guarda tudo no
 * navegador. Usado apenas quando `api.php` não está disponível (preview /
 * localhost). Em produção na Locaweb o backend PHP assume o lugar deste.
 */
const K = {
  user: "hg_cms_user",
  session: "hg_cms_session",
  content: "hg_cms_content",
  settings: "hg_cms_settings",
  news: "hg_cms_news",
  events: "hg_cms_events",
  galleries: "hg_cms_galleries",
};

const DEFAULT_CREDENTIALS = { username: "admin", password: "nimda", email: "fabiozamboni@gmail.com" };

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* cota excedida — ignorado no modo preview */
  }
}

function account(): { username: string; password: string; email: string } {
  return read(K.user, DEFAULT_CREDENTIALS);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.readAsDataURL(file);
  });
}

export const localBackend: CmsBackend = {
  mode: "local",

  async session() {
    return read<CmsUser | null>(K.session, null);
  },

  async login(username, password) {
    const acc = account();
    if (username.trim() !== acc.username || password !== acc.password) {
      throw new Error("Usuário ou senha inválidos.");
    }
    const user: CmsUser = { username: acc.username, email: acc.email };
    write(K.session, user);
    return user;
  },

  async logout() {
    write(K.session, null);
  },

  async changePassword(current, next) {
    const acc = account();
    if (current !== acc.password) throw new Error("Senha atual incorreta.");
    if (next.length < 5) throw new Error("A nova senha deve ter ao menos 5 caracteres.");
    write(K.user, { ...acc, password: next });
  },

  async changeEmail(email) {
    const acc = account();
    write(K.user, { ...acc, email });
    const user: CmsUser = { username: acc.username, email };
    write(K.session, user);
    return user;
  },

  async forgotPassword() {
    /* No preview não há envio de e-mail; a API PHP faz o envio real. */
  },

  async getContent() {
    return read<Record<string, string>>(K.content, {});
  },

  async saveContent(key, value) {
    const all = read<Record<string, string>>(K.content, {});
    all[key] = value;
    write(K.content, all);
  },

  async resetContent(key) {
    const all = read<Record<string, string>>(K.content, {});
    delete all[key];
    write(K.content, all);
  },

  async getSettings() {
    const stored = read<CmsSettings | null>(K.settings, null);
    return {
      areas: { ...DEFAULT_SETTINGS.areas, ...(stored?.areas ?? {}) },
    };
  },

  async saveSettings(settings) {
    write(K.settings, settings);
  },

  async listNews() {
    return read<CmsNews[]>(K.news, SEED_NEWS);
  },

  async saveNews(item) {
    const list = read<CmsNews[]>(K.news, SEED_NEWS);
    const next: CmsNews = { ...item, id: item.id || slugify(item.titulo) };
    const i = list.findIndex((n) => n.id === next.id);
    if (i >= 0) list[i] = next;
    else list.unshift(next);
    write(K.news, list);
    return next;
  },

  async deleteNews(id) {
    write(K.news, read<CmsNews[]>(K.news, SEED_NEWS).filter((n) => n.id !== id));
  },

  async listEvents() {
    return read<CmsEvent[]>(K.events, SEED_EVENTS);
  },

  async saveEvent(item) {
    const list = read<CmsEvent[]>(K.events, SEED_EVENTS);
    const next: CmsEvent = { ...item, id: item.id || slugify(item.titulo) };
    const i = list.findIndex((e) => e.id === next.id);
    if (i >= 0) list[i] = next;
    else list.unshift(next);
    write(K.events, list);
    return next;
  },

  async deleteEvent(id) {
    write(K.events, read<CmsEvent[]>(K.events, SEED_EVENTS).filter((e) => e.id !== id));
  },

  async listGalleries() {
    return read<CmsGallery[]>(K.galleries, SEED_GALLERIES);
  },

  async saveGallery(item) {
    const list = read<CmsGallery[]>(K.galleries, SEED_GALLERIES);
    const next: CmsGallery = { ...item, id: item.id || slugify(item.titulo) };
    const i = list.findIndex((g) => g.id === next.id);
    if (i >= 0) list[i] = next;
    else list.unshift(next);
    write(K.galleries, list);
    return next;
  },

  async deleteGallery(id) {
    write(K.galleries, read<CmsGallery[]>(K.galleries, SEED_GALLERIES).filter((g) => g.id !== id));
  },

  async upload(file) {
    return fileToDataUrl(file);
  },
};