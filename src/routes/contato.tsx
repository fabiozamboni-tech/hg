import { createFileRoute } from "@tanstack/react-router";
import { CinematicTransition } from "../components/site/CinematicTransition";
import { MapPin, MessageCircle, Instagram, Clock } from "lucide-react";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Que Brigadeiro | Pio X, Caxias do Sul" },
      {
        name: "description",
        content:
          "Fale com a Que Brigadeiro em Caxias do Sul. WhatsApp (54) 98114-0507. Bairro Pio X, Serra Gaúcha. Encomendas, orçamentos e atendimento.",
      },
      { property: "og:title", content: "Contato — Que Brigadeiro" },
      { property: "og:description", content: "Bairro Pio X, Caxias do Sul. WhatsApp (54) 98114-0507." },
    ],
  }),
  component: Contato,
});

function Contato() {
  return (
    <>
      <CinematicTransition className="mx-auto max-w-7xl px-6 pt-40 md:px-10 md:pt-56" intensity="normal">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-primary">Contato</p>
        <h1 className="max-w-4xl text-balance text-5xl leading-[1.02] md:text-7xl">
          Vamos <span className="italic text-primary">adoçar</span> o seu dia?
        </h1>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-16 grid max-w-7xl gap-10 px-6 md:grid-cols-2 md:px-10" intensity="normal">
        <div className="space-y-8 rounded-3xl bg-card p-8 md:p-12">
          <a
            href="https://wa.me/5554981140507?text=Ol%C3%A1%20Marina%2C%20quero%20fazer%20um%20pedido"
            target="_blank" rel="noopener noreferrer"
            className="group flex items-start gap-4"
          >
            <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
              <p className="mt-1 text-2xl transition-colors group-hover:text-primary">
                (54) 98114-0507
              </p>
            </div>
          </a>
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Endereço</p>
              <p className="mt-1 text-2xl">Bairro Pio X</p>
              <p className="text-muted-foreground">Caxias do Sul — RS</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Atendimento</p>
              <p className="mt-1 text-2xl">Seg. a Sáb. · 9h — 19h</p>
            </div>
          </div>
          <a
            href="https://instagram.com"
            target="_blank" rel="noopener noreferrer"
            className="group flex items-start gap-4"
          >
            <Instagram className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</p>
              <p className="mt-1 text-2xl transition-colors group-hover:text-primary">
                @quebrigadeiro
              </p>
            </div>
          </a>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border">
          <iframe
            title="Que Brigadeiro em Caxias do Sul"
            src="https://www.google.com/maps?q=Bairro+Pio+X,+Caxias+do+Sul+-+RS&output=embed"
            width="100%"
            height="100%"
            style={{ minHeight: 480, border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </CinematicTransition>

      <CinematicTransition className="mx-auto my-32 max-w-4xl px-6 text-center md:px-10 md:my-44" intensity="subtle">
        <h2 className="text-balance font-display text-3xl leading-tight italic md:text-5xl">
          "Encontrar um brigadeiro bem feito é encontrar um pedaço de casa."
        </h2>
      </CinematicTransition>
    </>
  );
}
