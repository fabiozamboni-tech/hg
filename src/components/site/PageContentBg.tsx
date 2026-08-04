import bgRestauracao from "@/assets/bg-restauracao-home.jpg.asset.json";

/**
 * Fundo textural reutilizado nas páginas internas — mesma imagem sépia
 * usada no bloco "Quem somos" da home, com esmaecimento nas bordas para
 * integrar ao gradiente do site.
 */
export function PageContentBg() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: `url(${bgRestauracao.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          filter: "sepia(0.35) saturate(0.7) hue-rotate(-8deg)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
      />
    </>
  );
}