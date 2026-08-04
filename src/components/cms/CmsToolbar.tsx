import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, LayoutDashboard, LogOut, Pencil, Settings2, X } from "lucide-react";
import { toast } from "sonner";
import { useCms } from "@/lib/cms/CmsProvider";
import { LoginPanel } from "./LoginPanel";

/**
 * Barra flutuante do CMS. Fica invisível para visitantes; o login abre com
 * Ctrl/Cmd + Shift + E ou pela rota /admin.
 */
export function CmsToolbar() {
  const { ready, user, editMode, setEditMode, logout, mode } = useCms();
  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const embedded =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("embed") === "1";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        setOpenLogin((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Dentro do editor visual (/editor) a barra fica no shell, não na página.
  if (!ready || embedded) return null;

  if (!user) {
    return openLogin ? (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/60 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-sm rounded-2xl bg-marfim p-6 shadow-2xl">
          <button
            type="button"
            onClick={() => setOpenLogin(false)}
            aria-label="Fechar"
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
          <LoginPanel onDone={() => setOpenLogin(false)} />
        </div>
      </div>
    ) : null;
  }

  return (
    <>
      <div className="fixed bottom-4 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border/60 bg-marfim/95 px-2 py-2 shadow-[0_20px_50px_-20px_rgba(48,32,32,0.6)] backdrop-blur">
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            editMode ? "bg-terracotta text-marfim" : "text-foreground hover:bg-accent"
          }`}
        >
          {editMode ? <Eye size={16} /> : <Pencil size={16} />}
          {editMode ? "Visualizar" : "Editar página"}
        </button>

        <Link
          to="/admin"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <LayoutDashboard size={16} /> Painel
        </Link>

        <button
          type="button"
          onClick={() => setOpenProfile(true)}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
          title={`${user.username} · ${mode === "php" ? "servidor" : "preview local"}`}
        >
          <Settings2 size={16} />
        </button>

        <button
          type="button"
          onClick={async () => {
            await logout();
            toast.success("Sessão encerrada.");
          }}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
          title="Sair"
        >
          <LogOut size={16} />
        </button>
      </div>

      {openProfile && <ProfileDialog onClose={() => setOpenProfile(false)} />}
    </>
  );
}

function ProfileDialog({ onClose }: { onClose: () => void }) {
  const { user, changePassword, changeEmail } = useCms();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [busy, setBusy] = useState(false);

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await changePassword(current, next);
      toast.success("Senha alterada.");
      setCurrent("");
      setNext("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao alterar a senha.");
    } finally {
      setBusy(false);
    }
  }

  async function saveEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await changeEmail(email);
      toast.success("E-mail de recuperação atualizado.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao salvar o e-mail.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-foreground/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-marfim p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>
        <h2 className="font-serif text-2xl text-terracotta">Perfil</h2>
        <p className="mt-1 text-sm text-muted-foreground">Usuário: {user?.username}</p>

        <form onSubmit={savePassword} className="mt-6 flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-[0.25em] text-ocre">Alterar senha</h3>
          <input
            type="password"
            placeholder="Senha atual"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            type="password"
            placeholder="Nova senha (mín. 6 caracteres)"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            minLength={6}
            required
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-marfim disabled:opacity-60"
          >
            Salvar senha
          </button>
        </form>

        <form onSubmit={saveEmail} className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
          <h3 className="text-xs uppercase tracking-[0.25em] text-ocre">E-mail de recuperação</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-md border border-terracotta px-4 py-2 text-sm font-medium text-terracotta disabled:opacity-60"
          >
            Salvar e-mail
          </button>
        </form>
      </div>
    </div>
  );
}
