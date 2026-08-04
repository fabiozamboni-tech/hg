import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import { MosaicGallery } from "@/components/site/MosaicGallery";
import { GALERIAS, formatBR } from "@/lib/galerias";
import { useGalleryItem } from "@/lib/cms/useContent";
import { CmsArea } from "@/lib/cms/CmsProvider";
import { EditableGallery } from "@/components/cms/EditableGallery";
import { useCms } from "@/lib/cms/CmsProvider";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/galeria/$id")({
  loader: ({ params }) => {
    // Galerias criadas no CMS não existem na lista estática: resolvemos no cliente.
    const galeria = GALERIAS.find((g) => g.id === params.id) ?? null;
    return { galeria, id: params.id };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.galeria) {
      return { meta: [{ title: "Galeria não encontrada" }, { name: "robots", content: "noindex" }] };
    }
    const g = loaderData.galeria;
    return {
      meta: [
        { title: `${g.titulo} — Galeria — Instituto Hércules Galló` },
        { name: "description", content: g.descricao },
        { property: "og:title", content: g.titulo },
        { property: "og:description", content: g.descricao },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: GaleriaDetalhe,
});

function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-6 pt-32">
      <div className="text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-ocre">Galeria</p>
        <h1 className="font-serif text-3xl mt-3">Galeria não encontrada.</h1>
        <Link to="/galeria" className="inline-block mt-6 text-sm px-5 py-2.5 rounded-xl bg-terracotta text-marfim">Voltar</Link>
      </div>
    </section>
  );
}

function GaleriaDetalhe() {
  const { galeria: fallback, id } = Route.useLoaderData();
  const empty = { id, titulo: "", descricao: "", data: "", capa: "", imagens: [] };
  const g = useGalleryItem(id, fallback ?? empty);
  const { saveGallery, ready } = useCms();
  if (!fallback && !g.titulo) {
    return ready ? <NotFound /> : null;
  }
  return (
    <CmsArea id="galeria">
      <header className="relative h-[55vh] min-h-[380px] overflow-hidden -mt-20 border-b border-border">
        <img src={g.capa} alt={g.titulo} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/25" />
        <div className="relative z-10 h-full mx-auto max-w-5xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">Galeria · {formatBR(g.data)}</p>
            <h1 className="font-serif text-marfim text-4xl md:text-5xl mt-4 leading-[1.1]">{g.titulo}</h1>
            <p className="mt-4 max-w-2xl text-marfim/85">{g.descricao}</p>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
        <section className="relative mx-auto max-w-6xl px-6 lg:px-10 py-20">
          <EditableGallery
            id={`galeria-${g.id}`}
            images={g.imagens}
            alt={g.titulo}
            onChange={(imagens) => saveGallery({ ...g, imagens, capa: g.capa || imagens[0] || "" })}
          />
          <div className="mt-16">
            <Link to="/galeria" className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:brightness-110">
              <ArrowLeft size={16} /> Voltar para galerias
            </Link>
          </div>
        </section>
      </div>
    </CmsArea>
  );
}