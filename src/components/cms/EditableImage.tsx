import { useState } from "react";
import { Pencil } from "lucide-react";
import { useCms, useCmsArea } from "@/lib/cms/CmsProvider";
import { ImageEditorModal } from "./ImageEditorModal";

type Props = {
  /** Chave única da imagem, ex.: "home.hero.slide-1". */
  id: string;
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/** Imagem trocável direto na tela quando o modo de edição está ativo. */
export function EditableImage({ id, src, alt, className, loading = "lazy" }: Props) {
  const { content, canEdit, saveContent, resetContent, upload } = useCms();
  const area = useCmsArea();
  const editable = canEdit(area);
  const [open, setOpen] = useState(false);

  const current = content[id] ?? src;

  if (!editable) return <img src={current} alt={alt} loading={loading} className={className} />;

  return (
    <span className="relative block h-full w-full group/img">
      <img src={current} alt={alt} loading={loading} className={className} />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] outline-dashed outline-2 outline-offset-[-2px] outline-terracotta/70" />
      <span className="absolute bottom-2 left-2 z-20 flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1 rounded-full bg-terracotta px-3 py-1.5 text-xs font-medium text-marfim shadow-lg disabled:opacity-60"
        >
          <Pencil size={14} /> Editar imagem
        </button>
      </span>
      {open && (
        <ImageEditorModal
          src={current}
          upload={upload}
          onApply={(url) => saveContent(id, url)}
          onReset={content[id] !== undefined ? () => resetContent(id) : undefined}
          onClose={() => setOpen(false)}
        />
      )}
    </span>
  );
}