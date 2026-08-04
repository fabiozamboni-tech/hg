import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  Eye,
  LayoutDashboard,
  Monitor,
  Pencil,
  RotateCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useCms } from "@/lib/cms/CmsProvider";
import { LoginPanel } from "@/components/cms/LoginPanel";
import { SITE_PAGES } from "@/lib/cms/pages";

type Search = { path?: string };

export const Route = createFileRoute("/editor")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): Search => ({
    path: typeof search.path === "string" ? search.path : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Editor visual — Instituto Hércules Galló" },
      { name: "description", content: "Editor visual das páginas do site do Instituto Hércules Galló." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Editor visual — Instituto Hércules Galló" },
      { property: "og:description", content: "Área restrita: edição visual das páginas do site." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditorPage,
});

const DEVICES = [
  { id: "desktop", label: "Desktop", width: "100%", icon: Monitor },
  { id: "tablet", label: "Tablet", width: "820px", icon: Tablet },
  { id: "mobile", label: "Celular", width: "420px", icon: Smartphone },
] as const;

function EditorPage() {
  const { ready, user, settings, mode } = useCms();
  const navigate = useNavigate({ from: "/editor" });
  const { path } = Route.useSearch();
  const current = SITE_PAGES.find((p) => p.path === path) ?? SITE_PAGES[0];
  const [device, setDevice] = useState<(typeof DEVICES)[number]["id"]>("desktop");
  const [preview, setPreview] = useState(false);
  const [nonce, setNonce] = useState(0);
  const frameRef = useRef<HTMLIFrameElement>(null);

  const locked = settings.areas[current.area] === false;
  const src = useMemo(() => {
    const q = new URLSearchParams({ embed: "1" });
    if (!preview && !locked) q.set("edit", "1");
    q.set("v", String(nonce));
    return `${current.path}${current.path.includes("?") ? "&" : "?"}${q.toString()}`;
  }, [current.path, preview, locked, nonce]);

  useEffect(() => {
    setPreview(false);
  }, [current.path]);

  if (!ready) return <main className="p-10 text-sm text-muted-foreground">Carregando editor…</main>;

  if (!user) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center p-6">
        <div className="w-full rounded-2xl bg-marfim p-8 shadow-xl">
          <LoginPanel />
        </div>
      </main>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-foreground/95">
      {/* Barra superior */}
      <header className="flex flex-wrap items-center gap-3 border-b border-marfim/15 bg-foreground px-4 py-3 text-marfim">
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-marfim/80 transition-colors hover:bg-marfim/10 hover:text-marfim"
        >
          <ChevronLeft size={16} /> Painel
        </Link>

        <span className="hidden h-5 w-px bg-marfim/20 sm:block" />

        <label className="sr-only" htmlFor="editor-page">Página</label>
        <select
          id="editor-page"
          value={current.path}
          onChange={(e) => navigate({ search: { path: e.target.value } })}
          className="rounded-full border border-marfim/25 bg-transparent px-3 py-1.5 text-sm text-marfim [&>option]:text-foreground"
        >
          {SITE_PAGES.map((p) => (
            <option key={p.path} value={p.path}>
              {p.label}
            </option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-1 rounded-full border border-marfim/20 p-1">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDevice(d.id)}
              title={d.label}
              aria-label={d.label}
              aria-pressed={device === d.id}
              className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                device === d.id ? "bg-terracotta text-marfim" : "text-marfim/70 hover:bg-marfim/10"
              }`}
            >
              <d.icon size={15} />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          title="Recarregar página"
          aria-label="Recarregar página"
          className="grid h-9 w-9 place-items-center rounded-full text-marfim/80 transition-colors hover:bg-marfim/10"
        >
          <RotateCw size={16} />
        </button>

        <button
          type="button"
          disabled={locked}
          onClick={() => setPreview((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
            preview ? "bg-marfim/10 text-marfim" : "bg-terracotta text-marfim"
          }`}
        >
          {preview ? <Pencil size={15} /> : <Eye size={15} />}
          {preview ? "Voltar a editar" : "Pré-visualizar"}
        </button>
      </header>

      {/* Corpo: lista de páginas + tela */}
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-marfim/15 bg-foreground p-3 lg:block">
          <p className="px-2 pb-2 text-[11px] uppercase tracking-[0.25em] text-ocre">Páginas</p>
          <ul className="flex flex-col gap-1">
            {SITE_PAGES.map((p) => {
              const active = p.path === current.path;
              const off = settings.areas[p.area] === false;
              return (
                <li key={p.path}>
                  <button
                    type="button"
                    onClick={() => navigate({ search: { path: p.path } })}
                    className={`w-full rounded-xl px-3 py-2 text-left transition-colors ${
                      active ? "bg-terracotta text-marfim" : "text-marfim/80 hover:bg-marfim/10"
                    }`}
                  >
                    <span className="block text-sm font-medium">
                      {p.label} {off && <span className="text-[10px] uppercase">· bloqueada</span>}
                    </span>
                    <span className={`block text-[11px] ${active ? "text-marfim/80" : "text-marfim/45"}`}>
                      {p.hint}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="min-w-0 flex-1 overflow-auto bg-[color-mix(in_oklab,var(--color-foreground)_88%,black)] p-4">
          {locked && (
            <p className="mx-auto mb-3 max-w-3xl rounded-xl bg-marfim/10 px-4 py-2 text-center text-xs text-marfim">
              A edição desta página está desativada em “Áreas editáveis”.
            </p>
          )}
          <div
            className="mx-auto h-full overflow-hidden rounded-2xl bg-marfim shadow-2xl transition-[width] duration-300"
            style={{ width: DEVICES.find((d) => d.id === device)!.width, maxWidth: "100%" }}
          >
            <iframe
              ref={frameRef}
              key={src}
              src={src}
              title={`Editor visual — ${current.label}`}
              className="h-full w-full border-0"
            />
          </div>
        </main>
      </div>

      <footer className="flex items-center gap-2 border-t border-marfim/15 bg-foreground px-4 py-2 text-[11px] text-marfim/60">
        <LayoutDashboard size={12} />
        {mode === "php"
          ? "Alterações salvas no servidor assim que você sai do campo."
          : "Modo preview: alterações salvas neste navegador até a publicação no servidor."}
      </footer>
    </div>
  );
}
