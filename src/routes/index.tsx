import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroMorph } from "@/components/site/HeroMorph";
import { MosaicGallery } from "@/components/site/MosaicGallery";
import { Reveal } from "@/components/site/Reveal";
import { AnimatedSection, AnimatedItem, RevealText } from "@/components/motion";
import { CinematicTransition } from "@/components/motion";
import { ArrowRight, Clock, MapPin, Calendar } from "lucide-react";
import { formatBR } from "@/lib/eventos";
import { useEvents, useNews } from "@/lib/cms/useContent";
import { CmsArea } from "@/lib/cms/CmsProvider";
import r0 from "@/assets/restauracao-0.png.asset.json";
import r1 from "@/assets/restauracao-1.png.asset.json";
import r2 from "@/assets/restauracao-2.png.asset.json";
import r3 from "@/assets/restauracao-3.png.asset.json";
import r4 from "@/assets/restauracao-4.png.asset.json";
import r5 from "@/assets/restauracao-5.png.asset.json";
import r6 from "@/assets/restauracao-6.png.asset.json";
import r7 from "@/assets/restauracao-7.png.asset.json";
import r8 from "@/assets/restauracao-8.png.asset.json";
import bgRestauracao from "@/assets/bg-restauracao-home.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Instituto Hércules Galló — Museu de território em Galópolis" },
      { name: "description", content: "Um museu de território que preserva a imigração italiana, a arquitetura basáltica e a indústria têxtil de Galópolis, Caxias do Sul." },
      { property: "og:title", content: "Instituto Hércules Galló" },
      { property: "og:description", content: "Museu de território em Galópolis — patrimônio vivo da Serra Gaúcha." },
    ],
  }),
  component: Home,
});

function Home() {
  const proximos = useEvents().upcoming.slice(0, 3);
  const galeria = [r0.url, r1.url, r2.url, r3.url, r4.url, r5.url, r6.url, r7.url, r8.url];
  const noticias = useNews().slice(0, 4);

  return (
    <CmsArea id="home">
      <HeroMorph />

      {/* Planeje sua visita */}
      <CinematicTransition><section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-10 grid gap-6 md:grid-cols-3 text-center">
          <Reveal className="flex flex-col items-center gap-2">
            <Clock className="text-terracotta" size={22} />
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Horários</p>
            <p className="text-sm">Ter–Dom · 9h às 17h30<br/>Segundas fechado</p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col items-center gap-2">
            <MapPin className="text-terracotta" size={22} />
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Endereço</p>
            <p className="text-sm">Rua Galópolis, s/n<br/>Caxias do Sul · RS</p>
          </Reveal>
          <Reveal delay={200} className="flex flex-col items-center gap-2">
            <Calendar className="text-terracotta" size={22} />
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">Visitas guiadas</p>
            <p className="text-sm">Agendamento para grupos e escolas</p>
            <Link to="/contato" className="mt-2 inline-flex text-sm font-medium px-4 py-2 rounded-xl bg-terracotta text-marfim hover:brightness-110 shadow-sm transition-all">
              Agendar
            </Link>
          </Reveal>
        </div>
      </section></CinematicTransition>

      {/* Notícias */}
      <CinematicTransition><section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">Notícias</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3 leading-[1.1]">
                <span className="italic text-terracotta">Últimas</span> do Instituto
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/novidades" className="text-sm font-medium px-5 py-2.5 rounded-xl bg-terracotta text-marfim hover:brightness-110 shadow-sm transition-all">
                Ver todas
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {noticias.map((n, i) => (
              <Reveal key={n.id} delay={i * 100}>
                <Link
                  to="/novidades/$id"
                  params={{ id: n.id }}
                  className="group block h-full overflow-hidden rounded-2xl bg-marfim shadow-[0_20px_50px_-30px_rgba(48,32,32,0.4)] transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={n.imagem}
                      alt={n.titulo}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="font-serif font-bold text-xl leading-snug text-terracotta group-hover:brightness-110">{n.titulo}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{n.resumo}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section></CinematicTransition>

      {/* Memória preview */}
      <HorizontalGallery images={galeria} />

      {/* Últimos eventos */}
      <CinematicTransition><section className="bg-marfim text-foreground py-24 md:py-32 rounded-t-[2rem]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-terracotta">Agenda</p>
              <h2 className="font-serif text-4xl md:text-5xl mt-3">
                <span className="italic text-terracotta">Próximos</span> eventos
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <Link to="/agenda" className="text-sm font-medium px-5 py-2.5 rounded-xl bg-terracotta text-marfim hover:brightness-110 shadow-sm transition-all">
                Ver agenda completa
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {proximos.map((e, i) => (
              <Reveal key={e.id} delay={i * 120}>
                <article className="bg-foreground text-marfim rounded-2xl p-8 h-full flex flex-col shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-transform">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-terracotta">{e.categoria}</p>
                  <time className="font-serif italic text-2xl mt-2 block text-ocre">{formatBR(e.data)}</time>
                  <h3 className="font-serif text-xl mt-4 leading-snug">{e.titulo}</h3>
                  <p className="mt-3 text-sm text-marfim/75 leading-relaxed flex-1">{e.resumo}</p>
                  <p className="mt-6 text-xs tracking-wide text-marfim/60">{e.local}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section></CinematicTransition>

      {/* CTA */}
      <CinematicTransition><section className="bg-primary text-primary-foreground rounded-t-[2rem]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-8">
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Planeje sua visita</p>
            <h2 className="font-serif text-4xl md:text-5xl mt-4 leading-[1.1]">
              Venha conhecer o <span className="italic text-ocre">coração cultural</span> de Galópolis.
            </h2>
          </Reveal>
          <Reveal delay={150} className="md:col-span-4 md:text-right">
            <Link
              to="/contato"
              className="inline-flex items-center gap-3 text-sm font-medium px-7 py-4 rounded-xl bg-terracotta text-marfim hover:brightness-110 shadow-lg transition-all"
            >
              Agendar visita <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section></CinematicTransition>
    </CmsArea>
  );
}

function HorizontalGallery({ images }: { images: string[] }) {
  return (
    <section
      className="relative rounded-t-[2rem] overflow-hidden py-20 md:py-28"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, var(--foreground) 0%, oklch(0.22 0.02 30) 55%, var(--foreground) 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ocre/10 via-transparent to-foreground/60" />
      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Restauração</p>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 max-w-2xl leading-[1.1] text-marfim">
              A casa <span className="italic text-ocre">renasce</span> — memórias de uma restauração.
            </h2>
          </div>
          <Link
            to="/galeria"
            className="text-sm font-medium px-5 py-2.5 rounded-xl bg-terracotta text-marfim hover:brightness-110 shadow-sm transition-all"
          >
            Ver galeria completa
          </Link>
        </div>

        <MosaicGallery
          images={images}
          idPrefix="restauracao"
          alt="Registro da restauração das casas históricas do Instituto"
        />
      </div>
    </section>
  );
}
