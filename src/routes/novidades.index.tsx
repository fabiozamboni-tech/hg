import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import { useNews } from "@/lib/cms/useContent";
import { CmsArea } from "@/lib/cms/CmsProvider";
import heroNovidades from "@/assets/arquivo-3.jpg";

export const Route = createFileRoute("/novidades/")({
  head: () => ({
    meta: [
      { title: "Novidades — Instituto Hércules Galló" },
      { name: "description", content: "Notícias, comunicados e bastidores do Instituto Hércules Galló em Galópolis." },
      { property: "og:title", content: "Novidades — Instituto Hércules Galló" },
      { property: "og:description", content: "Últimas notícias do Instituto e da restauração das casas históricas de Galópolis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Novidades,
});

function formatBR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function Novidades() {
  const items = useNews();
  return (
    <CmsArea id="novidades">
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img src={heroNovidades} alt="Arquivo fotográfico" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/55 to-foreground/25" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Novidades</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Últimas do <span className="italic">Instituto</span>.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
        <section className="relative mx-auto max-w-6xl px-6 lg:px-10 py-20 md:py-24">
          <div className="grid gap-8 md:grid-cols-2">
            {items.map((n, i) => (
              <Reveal key={n.id} delay={i * 80}>
                <Link
                  to="/novidades/$id"
                  params={{ id: n.id }}
                  className="group block h-full overflow-hidden rounded-2xl bg-marfim shadow-[0_20px_50px_-30px_rgba(48,32,32,0.4)] transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={n.imagem} alt={n.titulo} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-ocre">{n.categoria} · {formatBR(n.data)}</p>
                    <h2 className="mt-3 font-serif font-bold text-2xl leading-snug text-terracotta group-hover:brightness-110">{n.titulo}</h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{n.resumo}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </CmsArea>
  );
}