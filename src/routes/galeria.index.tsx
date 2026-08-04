import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import { formatBR } from "@/lib/galerias";
import { useGalleries } from "@/lib/cms/useContent";
import { CmsArea } from "@/lib/cms/CmsProvider";
import heroGaleria from "@/assets/arquivo-5.jpg";

export const Route = createFileRoute("/galeria/")({
  head: () => ({
    meta: [
      { title: "Galeria — Instituto Hércules Galló" },
      { name: "description", content: "Galerias de fotos das visitas, eventos e da restauração das casas do Instituto Hércules Galló." },
      { property: "og:title", content: "Galeria — Instituto Hércules Galló" },
      { property: "og:description", content: "Registros fotográficos das atividades e do acervo do Instituto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GaleriaLista,
});

function GaleriaLista() {
  const items = useGalleries();
  return (
    <CmsArea id="galeria">
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img src={heroGaleria} alt="Arquivo fotográfico do Instituto" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/55 to-foreground/25" />
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Galeria</p>
            <h1 className="font-serif text-marfim text-5xl md:text-6xl mt-4 max-w-3xl leading-[1.05]">
              Fotografias <span className="italic">do Instituto</span>.
            </h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
        <section className="relative mx-auto max-w-6xl px-6 lg:px-10 py-20 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((g, i) => (
              <Reveal key={g.id} delay={i * 80}>
                <Link
                  to="/galeria/$id"
                  params={{ id: g.id }}
                  className="group block h-full overflow-hidden rounded-2xl bg-marfim shadow-[0_20px_50px_-30px_rgba(48,32,32,0.4)] transition-transform hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={g.capa} alt={g.titulo} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-ocre">{formatBR(g.data)} · {g.imagens.length} fotos</p>
                    <h2 className="mt-3 font-serif font-bold text-xl leading-snug text-terracotta group-hover:brightness-110">{g.titulo}</h2>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{g.descricao}</p>
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