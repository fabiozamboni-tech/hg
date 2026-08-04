import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { getBackend } from "./api";
import { SEED_EVENTS, SEED_GALLERIES, SEED_NEWS } from "./seed";
import {
  DEFAULT_SETTINGS,
  type CmsAreaId,
  type CmsEvent,
  type CmsGallery,
  type CmsNews,
  type CmsSettings,
  type CmsUser,
} from "./types";

type CmsContextValue = {
  ready: boolean;
  mode: "php" | "local";
  user: CmsUser | null;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  settings: CmsSettings;
  content: Record<string, string>;
  news: CmsNews[];
  events: CmsEvent[];
  galleries: CmsGallery[];
  login: (u: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (current: string, next: string) => Promise<void>;
  changeEmail: (email: string) => Promise<void>;
  forgotPassword: (username: string) => Promise<void>;
  saveContent: (key: string, value: string) => Promise<void>;
  resetContent: (key: string) => Promise<void>;
  saveSettings: (s: CmsSettings) => Promise<void>;
  saveNews: (n: CmsNews) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  saveEvent: (e: CmsEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  saveGallery: (g: CmsGallery) => Promise<void>;
  deleteGallery: (id: string) => Promise<void>;
  upload: (file: File) => Promise<string>;
  canEdit: (area: CmsAreaId | string) => boolean;
};

const CmsContext = createContext<CmsContextValue | null>(null);

const AreaContext = createContext<string>("global");

/** Marca a área do site em volta de um trecho editável. */
export function CmsArea({ id, children }: { id: CmsAreaId | string; children: ReactNode }) {
  return <AreaContext.Provider value={id}>{children}</AreaContext.Provider>;
}

export function useCmsArea() {
  return useContext(AreaContext);
}

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms deve ser usado dentro de <CmsProvider>.");
  return ctx;
}

export function CmsProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"php" | "local">("local");
  const [user, setUser] = useState<CmsUser | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [settings, setSettings] = useState<CmsSettings>(DEFAULT_SETTINGS);
  const [content, setContent] = useState<Record<string, string>>({});
  const [news, setNews] = useState<CmsNews[]>(SEED_NEWS);
  const [events, setEvents] = useState<CmsEvent[]>(SEED_EVENTS);
  const [galleries, setGalleries] = useState<CmsGallery[]>(SEED_GALLERIES);

  useEffect(() => {
    let alive = true;
    (async () => {
      const backend = await getBackend();
      const [session, cfg, cnt, n, e, g] = await Promise.all([
        backend.session().catch(() => null),
        backend.getSettings().catch(() => DEFAULT_SETTINGS),
        backend.getContent().catch(() => ({})),
        backend.listNews().catch(() => SEED_NEWS),
        backend.listEvents().catch(() => SEED_EVENTS),
        backend.listGalleries().catch(() => SEED_GALLERIES),
      ]);
      if (!alive) return;
      setMode(backend.mode);
      setUser(session);
      setSettings(cfg);
      setContent(cnt);
      setNews(n.length ? n : SEED_NEWS);
      setEvents(e.length ? e : SEED_EVENTS);
      setGalleries(g.length ? g : SEED_GALLERIES);
      setReady(true);
      // Abertura vinda do editor visual (/editor): já entra em modo de edição.
      if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("edit") === "1" && session) {
        setEditMode(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const login = useCallback(async (u: string, p: string) => {
    const backend = await getBackend();
    setUser(await backend.login(u, p));
  }, []);

  const logout = useCallback(async () => {
    const backend = await getBackend();
    await backend.logout();
    setUser(null);
    setEditMode(false);
  }, []);

  const changePassword = useCallback(async (current: string, next: string) => {
    const backend = await getBackend();
    await backend.changePassword(current, next);
  }, []);

  const changeEmail = useCallback(async (email: string) => {
    const backend = await getBackend();
    setUser(await backend.changeEmail(email));
  }, []);

  const forgotPassword = useCallback(async (username: string) => {
    const backend = await getBackend();
    await backend.forgotPassword(username);
  }, []);

  const saveContent = useCallback(async (key: string, value: string) => {
    const backend = await getBackend();
    await backend.saveContent(key, value);
    setContent((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetContent = useCallback(async (key: string) => {
    const backend = await getBackend();
    await backend.resetContent(key);
    setContent((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const saveSettings = useCallback(async (s: CmsSettings) => {
    const backend = await getBackend();
    await backend.saveSettings(s);
    setSettings(s);
  }, []);

  const saveNews = useCallback(async (item: CmsNews) => {
    const backend = await getBackend();
    const saved = await backend.saveNews(item);
    setNews((prev) => {
      const i = prev.findIndex((n) => n.id === saved.id);
      if (i >= 0) return prev.map((n) => (n.id === saved.id ? saved : n));
      return [saved, ...prev];
    });
  }, []);

  const deleteNews = useCallback(async (id: string) => {
    const backend = await getBackend();
    await backend.deleteNews(id);
    setNews((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const saveEvent = useCallback(async (item: CmsEvent) => {
    const backend = await getBackend();
    const saved = await backend.saveEvent(item);
    setEvents((prev) => {
      const i = prev.findIndex((e) => e.id === saved.id);
      if (i >= 0) return prev.map((e) => (e.id === saved.id ? saved : e));
      return [saved, ...prev];
    });
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    const backend = await getBackend();
    await backend.deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const saveGallery = useCallback(async (item: CmsGallery) => {
    const backend = await getBackend();
    const saved = await backend.saveGallery(item);
    setGalleries((prev) => {
      const i = prev.findIndex((g) => g.id === saved.id);
      if (i >= 0) return prev.map((g) => (g.id === saved.id ? saved : g));
      return [saved, ...prev];
    });
  }, []);

  const deleteGallery = useCallback(async (id: string) => {
    const backend = await getBackend();
    await backend.deleteGallery(id);
    setGalleries((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const upload = useCallback(async (file: File) => {
    const backend = await getBackend();
    return backend.upload(file);
  }, []);

  const canEdit = useCallback(
    (area: string) => Boolean(user) && editMode && settings.areas[area] !== false,
    [user, editMode, settings],
  );

  // Avisa quando o modo de edição é ligado sem backend PHP disponível.
  useEffect(() => {
    if (editMode && ready && mode === "local") {
      toast.info("Modo de edição (preview)", {
        description: "As alterações ficam salvas neste navegador até o site ser publicado na Locaweb.",
      });
    }
  }, [editMode, ready, mode]);

  const value = useMemo<CmsContextValue>(
    () => ({
      ready,
      mode,
      user,
      editMode,
      setEditMode,
      settings,
      content,
      news,
      events,
      galleries,
      login,
      logout,
      changePassword,
      changeEmail,
      forgotPassword,
      saveContent,
      resetContent,
      saveSettings,
      saveNews,
      deleteNews,
      saveEvent,
      deleteEvent,
      saveGallery,
      deleteGallery,
      upload,
      canEdit,
    }),
    [
      ready, mode, user, editMode, settings, content, news, events, galleries,
      login, logout, changePassword, changeEmail, forgotPassword, saveContent,
      resetContent, saveSettings, saveNews, deleteNews, saveEvent, deleteEvent,
      saveGallery, deleteGallery, upload, canEdit,
    ],
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}