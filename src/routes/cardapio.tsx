import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinematicTransition } from "../components/site/CinematicTransition";
import { ArrowRight } from "lucide-react";
import cardapioImg from "../assets/cardapio-grid.jpg";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio Gourmet — 50+ sabores de brigadeiro | Que Brigadeiro" },
      {
        name: "description",
        content:
          "Cardápio completo Que Brigadeiro: clássicos, frutados, alcoólicos, nuts e especiais. Mais de 50 sabores autorais em Caxias do Sul.",
      },
      { property: "og:title", content: "Cardápio Gourmet — Que Brigadeiro" },
      {
        property: "og:description",
        content: "50+ sabores autorais de brigadeiro gourmet feitos à mão.",
      },
    ],
  }),
  component: Cardapio,
});

type Cat = "Clássicos" | "Frutados" | "Alcoólicos" | "Nuts" | "Especiais";
const categorias: Cat[] = ["Clássicos", "Frutados", "Alcoólicos", "Nuts", "Especiais"];

const sabores: Record<Cat, string[]> = {
  Clássicos: [
    "Tradicional", "Chocolate Belga", "Meio Amargo 70%", "Leite Ninho", "Beijinho",
    "Cajuzinho", "Brigadeiro Branco", "Chocolate ao Leite", "Choco-Café", "Cocada",
  ],
  Frutados: [
    "Maracujá", "Morango", "Framboesa", "Limão Siciliano", "Manga com Pimenta",
    "Abacaxi", "Coco", "Cereja", "Damasco",
  ],
  Alcoólicos: [
    "Whisky", "Licor 43", "Champagne", "Conhaque", "Vinho do Porto",
    "Baileys", "Rum & Coco",
  ],
  Nuts: [
    "Pistache", "Avelã", "Nozes", "Amêndoa", "Castanha-do-Pará",
    "Macadâmia", "Amendoim Caramelizado", "Ferrero",
  ],
  Especiais: [
    "Crème Brûlée", "Red Velvet", "Doce de Leite Argentino", "Churros",
    "Paçoca", "Tiramisù", "Cheesecake Frutas Vermelhas", "Café Turco",
    "Matcha", "Ovomaltine", "Nutella", "Banoffee",
  ],
};

function Cardapio() {
  const [ativa, setAtiva] = useState<Cat | "Todos">("Todos");
  const lista =
    ativa === "Todos"
      ? categorias.flatMap((c) => sabores[c].map((s) => ({ sabor: s, cat: c })))
      : sabores[ativa].map((s) => ({ sabor: s, cat: ativa }));

  return (
    <>
      <CinematicTransition className="mx-auto max-w-7xl px-6 pt-40 md:px-10 md:pt-56" intensity="normal">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-primary">Cardápio Gourmet</p>
        <h1 className="max-w-4xl text-balance text-5xl leading-[1.02] md:text-7xl">
          Mais de <span className="italic text-primary">cinquenta sabores</span> para
          escolher o seu preferido.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
          Selecione uma categoria abaixo ou navegue por todos os sabores. Faça
          sua seleção e envie pelo WhatsApp — a gente prepara e entrega em Caxias.
        </p>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-16 max-w-7xl px-6 md:px-10" intensity="subtle">
        <div className="flex flex-wrap gap-2 border-y border-border py-4">
          {(["Todos", ...categorias] as const).map((c) => (
            <button
              key={c}
              onClick={() => setAtiva(c)}
              className={`rounded-full px-5 py-2 text-sm transition-all ${
                ativa === c
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-12 max-w-7xl px-6 md:px-10" intensity="subtle">
        <ul className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {lista.map(({ sabor, cat }) => (
            <li
              key={`${cat}-${sabor}`}
              className="group flex items-center justify-between bg-background p-6 transition-colors hover:bg-primary/5"
            >
              <div>
                <p className="text-lg text-foreground">{sabor}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {cat}
                </p>
              </div>
              <a
                href={`https://wa.me/5554981140507?text=${encodeURIComponent(
                  `Olá Marina, quero pedir o brigadeiro de ${sabor}.`,
                )}`}
                target="_blank" rel="noopener noreferrer"
                aria-label={`Pedir ${sabor} pelo WhatsApp`}
                className="rounded-full border border-primary/20 p-2 text-primary opacity-0 transition-all group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </CinematicTransition>

      <CinematicTransition className="mx-auto mt-32 grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:px-10 md:mt-44" intensity="normal">
        <img
          src={cardapioImg}
          alt="Diversidade de sabores Que Brigadeiro"
          width={1400} height={1000} loading="lazy"
          className="h-[480px] w-full rounded-2xl object-cover"
        />
        <div>
          <h2 className="text-balance text-4xl leading-[1.1] md:text-5xl">
            Quer montar uma caixa <span className="italic text-primary">personalizada?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Escolha 6, 12, 24 ou 48 unidades misturando os sabores que quiser.
            A gente monta com carinho e entrega pronta para presentear.
          </p>
          <a
            href="https://wa.me/5554981140507?text=Ol%C3%A1%20Marina%2C%20quero%20montar%20uma%20caixa%20personalizada"
            target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all hover:shadow-xl"
          >
            Montar minha caixa <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </CinematicTransition>
    </>
  );
}
