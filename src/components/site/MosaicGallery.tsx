import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

type Props = {
  images: string[];
  /** Prefix used as layoutId key; must be unique per instance in a page. */
  idPrefix: string;
  alt?: string;
};

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

/**
 * Galeria mosaico com lightbox — mesmo padrão visual usado no bloco
 * "Restauração" da home. Reutilizada nas páginas Hércules Galló e Galópolis.
 */
export function MosaicGallery({ images, idPrefix, alt = "Imagem histórica" }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Trava o scroll do body enquanto o lightbox está aberto, evitando que a
  // página "pule" para o topo ao abrir a foto.
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const lightbox = (
    <AnimatePresence>
      {open !== null && (
        <motion.div
          key={`lightbox-${idPrefix}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-6 right-6 text-marfim h-11 w-11 grid place-items-center z-10"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="max-w-5xl w-full overflow-hidden rounded-2xl"
          >
            <img
              src={images[open]}
              alt={alt}
              className="max-h-[80vh] w-auto mx-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="grid grid-cols-4 auto-rows-[110px] md:auto-rows-[160px] gap-3 md:gap-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className={`${SPANS[i % SPANS.length]} group relative overflow-hidden rounded-2xl shadow-[0_25px_60px_-30px_rgba(48,32,32,0.5)] focus:outline-none focus:ring-2 focus:ring-terracotta`}
            aria-label="Ampliar imagem"
          >
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
          </button>
        ))}
      </div>

      {mounted ? createPortal(lightbox, document.body) : null}
    </>
  );
}