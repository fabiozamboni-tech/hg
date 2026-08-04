import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { PageContentBg } from "@/components/site/PageContentBg";
import { NOTICIAS } from "@/lib/noticias";
import { CmsArea, useCms } from "@/lib/cms/CmsProvider";
import { EditableGallery } from "@/components/cms/EditableGallery";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/novidades/$id")({
  // A notícia pode existir apenas no CMS; o conteúdo estático é só um fallback de SEO.
  loader: ({ params }) => ({ noticia: NOTICIAS.find((n) => n.id === params.id) ?? null }),
  head: ({ loaderData }) => {
    if (!loaderData?.noticia) {
      return { meta: [{ title: "Novidades — Instituto Hércules Galló" }, { name: "robots", content: "noindex" }] };
    }
    const n = loaderData.noticia;
    return {
      meta: [
        { title: `${n.titulo} — Instituto Hércules Galló` },
        { name: "description", content: n.resumo },
        { property: "og:title", content: n.titulo },
        { property: "og:description", content: n.resumo },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: NoticiaDetalhe,
});

function formatBR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center px-6 pt-32">
      <div className="text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-ocre">Novidades</p>
        <h1 className="font-serif text-3xl mt-3">Notícia não encontrada.</h1>
        <Link to="/novidades" className="inline-block mt-6 text-sm px-5 py-2.5 rounded-xl bg-terracotta text-marfim">Voltar</Link>
      </div>
    </section>
  );
}

function NoticiaDetalhe() {
  const { id } = Route.useParams();
  const { noticia: fallback } = Route.useLoaderData();
  const { news, saveNews, canEdit, ready } = useCms();
  const n = news.find((item) => item.id === id) ?? (fallback as (typeof news)[number] | null);
  if (!n) return ready ? <NotFound /> : null;
  const imagens = n.imagens?.length ? n.imagens : [n.imagem];

  return (
    <CmsArea id="novidades">
      <header className="relative h-[60vh] min-h-[420px] overflow-hidden -mt-20 border-b border-border">
        <img src={n.imagem} alt={n.titulo} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/25" />
        <div className="relative z-10 h-full mx-auto max-w-5xl px-6 lg:px-10 flex flex-col justify-end pb-16 pt-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre">{n.categoria} · {formatBR(n.data)}</p>
            <h1 className="font-serif text-marfim text-4xl md:text-5xl mt-4 leading-[1.1]">{n.titulo}</h1>
          </Reveal>
        </div>
      </header>

      <div className="relative">
        <PageContentBg />
        <article className="relative mx-auto max-w-3xl px-6 lg:px-10 py-20">
          <Reveal>
            <p className="font-serif italic text-xl md:text-2xl text-terracotta leading-snug">{n.resumo}</p>
          </Reveal>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/85">
            {n.conteudo.map((p: string, i: number) => (
              <Reveal key={i} delay={i * 60}><p>{p}</p></Reveal>
            ))}
          </div>
        </article>

        {(imagens.length > 1 || canEdit("novidades")) && (
        <section className="relative mx-auto max-w-6xl px-6 lg:px-10 pb-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.35em] uppercase text-ocre mb-6">Galeria</p>
          </Reveal>
          <EditableGallery
            id={`noticia-${n.id}`}
            images={imagens}
            alt={n.titulo}
            onChange={(novas) => saveNews({ ...n, imagens: novas })}
          />
        </section>
        )}

        <section className="relative mx-auto max-w-6xl px-6 lg:px-10 pb-24">
          <Link to="/novidades" className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:brightness-110">
            <ArrowLeft size={16} /> Voltar para novidades
          </Link>
        </section>
      </div>
    </CmsArea>
  );
}