import {
  DEFAULT_SETTINGS,
  type CmsBackend,
  type CmsEvent,
  type CmsGallery,
  type CmsNews,
  type CmsSettings,
  type CmsUser,
} from "./types";

/** Base da API PHP hospedada na Locaweb. */
export const API_BASE: string =
  (import.meta.env.VITE_CMS_API_BASE as string | undefined)?.replace(/\/$/, "") || "/api";

const endpoint = (action: string) => `${API_BASE}/api.php?action=${encodeURIComponent(action)}`;

async function call<T>(action: string, body?: unknown): Promise<T> {
  const res = await fetch(endpoint(action), {
    method: body === undefined ? "GET" : "POST",
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let json: Record<string, unknown>;
  try {
    json = (await res.json()) as Record<string, unknown>;
  } catch {
    throw new Error("Resposta inválida do servidor.");
  }
  if (!res.ok || json.ok !== true) {
    throw new Error(String(json.error ?? "Falha na operação."));
  }
  return json as T;
}

export const phpBackend: CmsBackend = {
  mode: "php",

  async session() {
    const r = await call<{ user: CmsUser | null }>("session");
    return r.user ?? null;
  },
  async login(username, password) {
    const r = await call<{ user: CmsUser }>("login", { username, password });
    return r.user;
  },
  async logout() {
    await call("logout", {});
  },
  async changePassword(current, next) {
    await call("change-password", { current, next });
  },
  async changeEmail(email) {
    const r = await call<{ user: CmsUser }>("change-email", { email });
    return r.user;
  },
  async forgotPassword(username) {
    await call("forgot-password", { username });
  },

  async getContent() {
    const r = await call<{ content: Record<string, string> }>("content");
    return r.content ?? {};
  },
  async saveContent(key, value) {
    await call("content-save", { key, value });
  },
  async resetContent(key) {
    await call("content-reset", { key });
  },

  async getSettings() {
    const r = await call<{ settings: { cms?: CmsSettings } }>("settings");
    return { areas: { ...DEFAULT_SETTINGS.areas, ...(r.settings?.cms?.areas ?? {}) } };
  },
  async saveSettings(settings) {
    await call("settings-save", { key: "cms", value: settings });
  },

  async listNews() {
    const r = await call<{ news: CmsNews[] }>("news");
    return r.news ?? [];
  },
  async saveNews(item) {
    const r = await call<{ id: string }>("news-save", item);
    return { ...item, id: r.id };
  },
  async deleteNews(id) {
    await call("news-delete", { id });
  },

  async listEvents() {
    const r = await call<{ events: CmsEvent[] }>("events");
    return r.events ?? [];
  },
  async saveEvent(item) {
    const r = await call<{ id: string }>("event-save", item);
    return { ...item, id: r.id };
  },
  async deleteEvent(id) {
    await call("event-delete", { id });
  },

  async listGalleries() {
    const r = await call<{ galleries: CmsGallery[] }>("galleries");
    return r.galleries ?? [];
  },
  async saveGallery(item) {
    const r = await call<{ id: string }>("gallery-save", item);
    return { ...item, id: r.id };
  },
  async deleteGallery(id) {
    await call("gallery-delete", { id });
  },

  async upload(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(endpoint("upload"), { method: "POST", credentials: "include", body: form });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; error?: string };
    if (!res.ok || !json.ok || !json.url) throw new Error(json.error ?? "Falha no upload.");
    return json.url;
  },
};

/** Detecta se a API PHP existe no servidor atual. */
export async function phpAvailable(): Promise<boolean> {
  try {
    const res = await fetch(endpoint("session"), { credentials: "include" });
    if (!res.ok) return false;
    const json = (await res.json()) as { ok?: boolean };
    return json.ok === true;
  } catch {
    return false;
  }
}