import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useCms } from "@/lib/cms/CmsProvider";
import { LoginPanel } from "@/components/cms/LoginPanel";
import { CMS_AREAS, slugify, type CmsEvent, type CmsGallery, type CmsNews } from "@/lib/cms/types";
import { SITE_PAGES } from "@/lib/cms/pages";
import { Pencil, Plus, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Painel de conteúdo — Instituto Hércules Galló" },
      { name: "description", content: "Área restrita para gerenciar novidades, agenda, galerias e áreas editáveis do site." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Painel de conteúdo — Instituto Hércules Galló" },
      { property: "og:description", content: "Área restrita de administração do site do Instituto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Tab = "paginas" | "novidades" | "agenda" | "galerias" | "dev";

function AdminPage() {
  const { ready, user, mode } = useCms();
  const [tab, setTab] = useState<Tab>("paginas");

  if (!ready) {
    return <main className="mx-auto max-w-md p-10 text-sm text-muted-foreground">Carregando painel…</main>;
  }

  if (!user) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-md items-center p-6">
        <div className="w-full rounded-2xl bg-marfim p-8 shadow-xl">
          <LoginPanel />
        </div>
      </main>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "paginas", label: "Páginas do site" },
    { id: "novidades", label: "Novidades" },
    { id: "agenda", label: "Agenda" },
    { id: "galerias", label: "Galerias" },
    { id: "dev", label: "Áreas editáveis" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
      <header>
        <p className="text-[11px] uppercase tracking-[0.35em] text-ocre">Painel de conteúdo</p>
        <h1 className="mt-3 font-serif text-4xl text-terracotta">Gerenciar o site</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "php"
            ? "Conectado ao servidor (MySQL na Locaweb)."
            : "Modo preview: as alterações ficam neste navegador até a publicação no servidor PHP."}
        </p>
      </header>

      <nav className="mt-8 flex flex-wrap gap-2 border-b border-border pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.id ? "bg-terracotta text-marfim" : "text-foreground hover:bg-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-10">
        {tab === "paginas" && <PagesManager />}
        {tab === "novidades" && <NewsManager />}
        {tab === "agenda" && <EventsManager />}
        {tab === "galerias" && <GalleriesManager />}
        {tab === "dev" && <DevSettings />}
      </div>
    </main>
  );
}

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm";
const cardCls = "rounded-2xl border border-border bg-marfim p-5";

/* ------------------------------ Páginas ------------------------------ */

function PagesManager() {
  const { settings } = useCms();

  return (
    <section>
      <h2 className="font-serif text-2xl text-terracotta">Páginas do site</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Clique em uma página para abri-la no editor visual. Nele você altera os textos direto na tela
        (com negrito e itálico) e clica em qualquer imagem para trocar, cortar, redimensionar ou excluir.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SITE_PAGES.map((p) => {
          const locked = settings.areas[p.area] === false;
          return (
            <li key={p.path}>
              <Link
                to="/editor"
                search={{ path: p.path }}
                className={`${cardCls} flex h-full flex-col gap-2 transition-shadow hover:shadow-[0_20px_45px_-25px_rgba(48,32,32,0.6)] ${
                  locked ? "opacity-60" : ""
                }`}
              >
                <span className="text-[11px] uppercase tracking-[0.25em] text-ocre">
                  {locked ? "Edição bloqueada" : "Editar página"}
                </span>
                <span className="font-serif text-xl text-terracotta">{p.label}</span>
                <span className="text-sm text-muted-foreground">{p.hint}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-medium text-terracotta">
                  <Pencil size={13} /> Abrir editor
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-marfim"
    >
      <Plus size={16} /> {label}
    </button>
  );
}

/* ---------------------------- Novidades ---------------------------- */

const emptyNews = (): CmsNews => ({
  id: "",
  data: new Date().toISOString().slice(0, 10),
  titulo: "",
  categoria: "Notícia",
  resumo: "",
  imagem: "",
  conteudo: [],
  imagens: [],
});

function NewsManager() {
  const { news, saveNews, deleteNews, upload } = useCms();
  const [draft, setDraft] = useState<CmsNews | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    try {
      await saveNews({ ...draft, id: draft.id || slugify(draft.titulo) });
      toast.success("Notícia salva.");
      setDraft(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao salvar.");
    }
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-terracotta">Novidades ({news.length})</h2>
        <AddButton label="Adicionar notícia" onClick={() => setDraft(emptyNews())} />
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {news.map((n) => (
          <li key={n.id} className={cardCls}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-ocre">{n.categoria} · {n.data}</p>
            <h3 className="mt-2 font-serif text-lg text-terracotta">{n.titulo}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{n.resumo}</p>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setDraft(n)} className="rounded-full border border-terracotta px-3 py-1.5 text-xs text-terracotta">
                Editar
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm(`Excluir "${n.titulo}"?`)) return;
                  await deleteNews(n.id);
                  toast.success("Notícia excluída.");
                }}
                className="inline-flex items-center gap-1 rounded-full border border-destructive px-3 py-1.5 text-xs text-destructive"
              >
                <Trash2 size={12} /> Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {draft && (
        <Dialog title={draft.id ? "Editar notícia" : "Nova notícia"} onClose={() => setDraft(null)}>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input className={inputCls} placeholder="Título" value={draft.titulo} required onChange={(e) => setDraft({ ...draft, titulo: e.target.value })} />
            <div className="flex gap-3">
              <input className={inputCls} type="date" value={draft.data} onChange={(e) => setDraft({ ...draft, data: e.target.value })} />
              <input className={inputCls} placeholder="Categoria" value={draft.categoria} onChange={(e) => setDraft({ ...draft, categoria: e.target.value })} />
            </div>
            <textarea className={inputCls} rows={2} placeholder="Resumo" value={draft.resumo} onChange={(e) => setDraft({ ...draft, resumo: e.target.value })} />
            <textarea
              className={inputCls}
              rows={8}
              placeholder="Texto completo (uma linha em branco separa os parágrafos)"
              value={draft.conteudo.join("\n\n")}
              onChange={(e) => setDraft({ ...draft, conteudo: e.target.value.split(/\n{2,}/).filter(Boolean) })}
            />
            <ImageField label="Imagem de capa" value={draft.imagem} onChange={(v) => setDraft({ ...draft, imagem: v })} upload={upload} />
            <ImageListField
              label="Galeria da notícia"
              images={draft.imagens}
              onChange={(imgs) => setDraft({ ...draft, imagens: imgs })}
              upload={upload}
            />
            <button type="submit" className="mt-2 rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-marfim">Salvar notícia</button>
          </form>
        </Dialog>
      )}
    </section>
  );
}

/* ------------------------------ Agenda ------------------------------ */

const emptyEvent = (): CmsEvent => ({
  id: "",
  data: new Date().toISOString().slice(0, 10),
  titulo: "",
  categoria: "Exposição",
  resumo: "",
  local: "",
});

function EventsManager() {
  const { events, saveEvent, deleteEvent } = useCms();
  const [draft, setDraft] = useState<CmsEvent | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    try {
      await saveEvent({ ...draft, id: draft.id || slugify(draft.titulo) });
      toast.success("Evento salvo.");
      setDraft(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao salvar.");
    }
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-terracotta">Agenda ({events.length})</h2>
        <AddButton label="Adicionar evento" onClick={() => setDraft(emptyEvent())} />
      </div>

      <ul className="grid gap-4 md:grid-cols-2">
        {events.map((ev) => (
          <li key={ev.id} className={cardCls}>
            <p className="text-[11px] uppercase tracking-[0.25em] text-ocre">{ev.categoria} · {ev.data}</p>
            <h3 className="mt-2 font-serif text-lg text-terracotta">{ev.titulo}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{ev.local}</p>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{ev.resumo}</p>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setDraft(ev)} className="rounded-full border border-terracotta px-3 py-1.5 text-xs text-terracotta">
                Editar
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm(`Excluir "${ev.titulo}"?`)) return;
                  await deleteEvent(ev.id);
                  toast.success("Evento excluído.");
                }}
                className="inline-flex items-center gap-1 rounded-full border border-destructive px-3 py-1.5 text-xs text-destructive"
              >
                <Trash2 size={12} /> Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {draft && (
        <Dialog title={draft.id ? "Editar evento" : "Novo evento"} onClose={() => setDraft(null)}>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input className={inputCls} placeholder="Título" required value={draft.titulo} onChange={(e) => setDraft({ ...draft, titulo: e.target.value })} />
            <div className="flex gap-3">
              <input className={inputCls} type="date" value={draft.data} onChange={(e) => setDraft({ ...draft, data: e.target.value })} />
              <select className={inputCls} value={draft.categoria} onChange={(e) => setDraft({ ...draft, categoria: e.target.value })}>
                {["Exposição", "Concerto", "Encontro", "Educativo"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <input className={inputCls} placeholder="Local" value={draft.local} onChange={(e) => setDraft({ ...draft, local: e.target.value })} />
            <textarea className={inputCls} rows={4} placeholder="Resumo" value={draft.resumo} onChange={(e) => setDraft({ ...draft, resumo: e.target.value })} />
            <button type="submit" className="mt-2 rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-marfim">Salvar evento</button>
          </form>
        </Dialog>
      )}
    </section>
  );
}

/* ----------------------------- Galerias ----------------------------- */

const emptyGallery = (): CmsGallery => ({
  id: "",
  data: new Date().toISOString().slice(0, 10),
  titulo: "",
  descricao: "",
  capa: "",
  imagens: [],
});

function GalleriesManager() {
  const { galleries, saveGallery, deleteGallery, upload } = useCms();
  const [draft, setDraft] = useState<CmsGallery | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    try {
      const capa = draft.capa || draft.imagens[0] || "";
      await saveGallery({ ...draft, capa, id: draft.id || slugify(draft.titulo) });
      toast.success("Galeria salva.");
      setDraft(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao salvar.");
    }
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-terracotta">Galerias ({galleries.length})</h2>
        <AddButton label="Adicionar galeria" onClick={() => setDraft(emptyGallery())} />
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {galleries.map((g) => (
          <li key={g.id} className={cardCls}>
            {g.capa && <img src={g.capa} alt={g.titulo} loading="lazy" className="mb-3 aspect-[4/3] w-full rounded-lg object-cover" />}
            <p className="text-[11px] uppercase tracking-[0.25em] text-ocre">{g.data} · {g.imagens.length} fotos</p>
            <h3 className="mt-2 font-serif text-lg text-terracotta">{g.titulo}</h3>
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setDraft(g)} className="rounded-full border border-terracotta px-3 py-1.5 text-xs text-terracotta">
                Editar
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm(`Excluir a galeria "${g.titulo}"?`)) return;
                  await deleteGallery(g.id);
                  toast.success("Galeria excluída.");
                }}
                className="inline-flex items-center gap-1 rounded-full border border-destructive px-3 py-1.5 text-xs text-destructive"
              >
                <Trash2 size={12} /> Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {draft && (
        <Dialog title={draft.id ? "Editar galeria" : "Nova galeria"} onClose={() => setDraft(null)}>
          <form onSubmit={submit} className="flex flex-col gap-3">
            <input className={inputCls} placeholder="Título" required value={draft.titulo} onChange={(e) => setDraft({ ...draft, titulo: e.target.value })} />
            <input className={inputCls} type="date" value={draft.data} onChange={(e) => setDraft({ ...draft, data: e.target.value })} />
            <textarea className={inputCls} rows={3} placeholder="Descrição" value={draft.descricao} onChange={(e) => setDraft({ ...draft, descricao: e.target.value })} />
            <ImageField label="Capa (opcional — usa a 1ª foto)" value={draft.capa} onChange={(v) => setDraft({ ...draft, capa: v })} upload={upload} />
            <ImageListField label="Imagens da galeria" images={draft.imagens} onChange={(imgs) => setDraft({ ...draft, imagens: imgs })} upload={upload} />
            <button type="submit" className="mt-2 rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-marfim">Salvar galeria</button>
          </form>
        </Dialog>
      )}
    </section>
  );
}

/* --------------------------- Painel do dev --------------------------- */

function DevSettings() {
  const { settings, saveSettings } = useCms();

  async function toggle(id: string, value: boolean) {
    try {
      await saveSettings({ areas: { ...settings.areas, [id]: value } });
      toast.success("Configuração salva.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao salvar.");
    }
  }

  return (
    <section>
      <h2 className="font-serif text-2xl text-terracotta">Áreas liberadas para edição</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Desmarque uma área para bloquear a edição visual daquela parte do site. O bloqueio vale para
        textos, imagens e galerias dentro da área.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CMS_AREAS.map((a) => {
          const on = settings.areas[a.id] !== false;
          return (
            <li key={a.id} className={`${cardCls} flex items-center justify-between gap-4`}>
              <span className="text-sm font-medium">{a.label}</span>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={`Permitir edição em ${a.label}`}
                onClick={() => toggle(a.id, !on)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-terracotta" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-marfim transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------ Auxiliares ------------------------------ */

function Dialog({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-foreground/60 p-4 backdrop-blur-sm">
      <div className="relative mx-auto my-8 w-full max-w-2xl rounded-2xl bg-marfim p-6 shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Fechar" className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
        <h3 className="mb-5 font-serif text-2xl text-terracotta">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  upload,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  upload: (f: File) => Promise<string>;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.2em] text-ocre">{label}</span>
      <div className="flex items-center gap-3">
        {value && <img src={value} alt="" className="h-16 w-24 rounded-md object-cover" />}
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          className="text-xs"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setBusy(true);
            try {
              onChange(await upload(file));
            } catch (err) {
              toast.error(err instanceof Error ? err.message : "Falha no upload.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </div>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="self-start text-xs text-destructive underline"
        >
          Remover imagem
        </button>
      )}
    </div>
  );
}

function ImageListField({
  label,
  images,
  onChange,
  upload,
}: {
  label: string;
  images: string[];
  onChange: (imgs: string[]) => void;
  upload: (f: File) => Promise<string>;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-[0.2em] text-ocre">
        {label} ({images.length})
      </span>
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <div key={`${src}-${i}`} className="relative">
            <img src={src} alt="" className="aspect-square w-full rounded-md object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, idx) => idx !== i))}
              aria-label={`Excluir imagem ${i + 1}`}
              className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-foreground/85 text-marfim hover:bg-destructive"
            >
              <Trash2 size={11} />
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        accept="image/*"
        multiple
        disabled={busy}
        className="text-xs"
        onChange={async (e) => {
          const files = e.target.files;
          if (!files?.length) return;
          setBusy(true);
          try {
            const urls: string[] = [];
            for (const f of Array.from(files)) urls.push(await upload(f));
            onChange([...images, ...urls]);
          } catch (err) {
            toast.error(err instanceof Error ? err.message : "Falha no upload.");
          } finally {
            setBusy(false);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}
