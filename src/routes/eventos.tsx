import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CinematicTransition } from "../components/site/CinematicTransition";
import { ArrowRight, Check } from "lucide-react";
import eventosImg from "../assets/eventos-mesa.jpg";
import cardapioImg from "../assets/cardapio-grid.jpg";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos — Mesa de doces finos em Caxias do Sul | Que Brigadeiro" },
      {
        name: "description",
        content:
          "Mesas de doces autorais para casamentos, aniversários e eventos corporativos em Caxias do Sul e Serra Gaúcha. Solicite seu orçamento.",
      },
      { property: "og:title", content: "Eventos Que Brigadeiro — Mesa de doces finos" },
      {
        property: "og:description",
        content: "Curadoria, styling e montagem para casamentos e eventos corporativos.",
      },
    ],
  }),
  component: Eventos,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(80),
  contato: z.string().trim().min(6, "WhatsApp ou e-mail").max(120),
  tipo: z.string().min(1, "Selecione o tipo"),
  data: z.string().max(40).optional(),
  pessoas: z.string().max(10).optional(),
  mensagem: z.string().trim().max(600).optional(),
});

function Eventos() {
  const [erro, setErro] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setErro(parsed.error.issues[0]?.message ?? "Revise os campos");
      return;
    }
    const { nome, contato, tipo, data: quando, pessoas, mensagem } = parsed.data;
    const texto =
      `Olá Marina! Quero um orçamento de evento.\n\n` +
      `Nome: ${nome}\nContato: ${contato}\nTipo: ${tipo}\n` +
      (quando ? `Data: ${quando}\n` : "") +
      (pessoas ? `Convidados: ${pessoas}\n` : "") +
      (mensagem ? `Mensagem: ${mensagem}\n` : "");
    window.open(
      `https://wa.me/5554981140507?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <>
      <CinematicTransition className="relative overflow-hidden pt-40 md:pt-56" intensity="normal">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center md:px-10">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-primary">Eventos</p>
            <h1 className="text-balance text-5xl leading-[1.02] md:text-7xl">
              Mesas que <span className="italic text-primary">encantam</span> —
              curadoria e sofisticação.
            </h1>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              Casamentos, aniversários, chás de casa nova e eventos corporativos.
              Cuidamos da seleção de sabores, apresentação e montagem no local.
            </p>
          </div>
          <img
            src={eventosImg}
            alt="Mesa de doces em casamento"
            width={1600} height={1100} loading="lazy"
            className="h-[560px] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-32 max-w-7xl px-6 md:px-10 md:mt-44" intensity="normal">
        <h2 className="max-w-3xl text-4xl leading-[1.1] md:text-5xl">
          Como <span className="italic text-primary">trabalhamos.</span>
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            { n: "01", t: "Briefing", d: "Conversamos sobre estilo, número de convidados, paleta e sabores preferidos." },
            { n: "02", t: "Curadoria", d: "Montamos uma proposta com seleção de brigadeiros, mini-doces e styling da mesa." },
            { n: "03", t: "Montagem", d: "No dia, entregamos e montamos a mesa no local com todo o cuidado." },
          ].map((s) => (
            <div key={s.n} className="border-t border-border pt-8">
              <p className="font-display text-4xl text-primary">{s.n}</p>
              <h3 className="mt-4 text-2xl">{s.t}</h3>
              <p className="mt-3 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-32 max-w-7xl px-6 md:px-10 md:mt-44" intensity="normal">
        <div className="grid gap-12 rounded-3xl bg-secondary/50 p-8 md:grid-cols-2 md:p-16">
          <div>
            <h2 className="text-balance text-4xl leading-[1.1] md:text-5xl">
              Incluso em cada evento
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "Curadoria personalizada de sabores",
                "Brigadeiros artesanais + mini-doces finos",
                "Forminhas premium coordenadas",
                "Bandejas, suportes e styling da mesa",
                "Entrega e montagem em Caxias do Sul e região",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={cardapioImg}
            alt="Doces finos para eventos"
            width={1400} height={1000} loading="lazy"
            className="h-full max-h-[440px] w-full rounded-2xl object-cover"
          />
        </div>
      </CinematicTransition>

      {/* FORM */}
      <CinematicTransition className="mx-auto my-32 max-w-4xl px-6 md:px-10 md:my-44" intensity="normal">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-14">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Solicite um orçamento
          </p>
          <h2 className="text-balance text-3xl leading-[1.1] md:text-5xl">
            Vamos conversar sobre o seu evento.
          </h2>

          <form onSubmit={onSubmit} className="mt-10 grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 md:col-span-1">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Nome</span>
              <input name="nome" required maxLength={80} className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
            </label>
            <label className="flex flex-col gap-2 md:col-span-1">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp ou e-mail</span>
              <input name="contato" required maxLength={120} className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Tipo de evento</span>
              <select name="tipo" required className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40">
                <option value="">Selecione</option>
                <option>Casamento</option>
                <option>Aniversário</option>
                <option>Corporativo</option>
                <option>Chá de bebê / casa nova</option>
                <option>Outro</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Data prevista</span>
              <input name="data" maxLength={40} placeholder="Ex: 15/03/2026" className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
            </label>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Nº aproximado de convidados</span>
              <input name="pessoas" maxLength={10} className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
            </label>
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Mensagem</span>
              <textarea name="mensagem" maxLength={600} rows={4} className="rounded-lg border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary/40" />
            </label>

            {erro && <p className="text-sm text-destructive md:col-span-2">{erro}</p>}

            <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-all hover:shadow-xl md:col-span-2">
              Enviar pelo WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </CinematicTransition>
    </>
  );
}
