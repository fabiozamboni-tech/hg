import { useState } from "react";
import { toast } from "sonner";
import { useCms } from "@/lib/cms/CmsProvider";

/** Formulário de login do CMS, com recuperação de senha. */
export function LoginPanel({ onDone }: { onDone?: () => void }) {
  const { login, forgotPassword } = useCms();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(username, password);
      toast.success("Bem-vindo ao CMS.");
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao entrar.");
    } finally {
      setBusy(false);
    }
  }

  async function recover() {
    try {
      await forgotPassword(username || "admin");
      toast.success("Se o usuário existir, enviamos um link de recuperação para o e-mail cadastrado.");
    } catch {
      toast.error("Não foi possível iniciar a recuperação agora.");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div>
        <h2 className="font-serif text-2xl text-terracotta">Acesso ao CMS</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Entre para editar textos, imagens, novidades, agenda e galerias.
        </p>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Usuário
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          className="rounded-md border border-input bg-background px-3 py-2"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Senha
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          className="rounded-md border border-input bg-background px-3 py-2"
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-marfim transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {busy ? "Entrando…" : "Entrar"}
      </button>

      <button
        type="button"
        onClick={recover}
        className="text-left text-xs text-muted-foreground underline-offset-4 hover:underline"
      >
        Esqueci minha senha
      </button>
    </form>
  );
}