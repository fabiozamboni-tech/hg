import { useRef, useState } from "react";
import { ImagePlus, Pencil } from "lucide-react";
import { toast } from "sonner";
import { MosaicGallery } from "@/components/site/MosaicGallery";
import { useCms, useCmsArea } from "@/lib/cms/CmsProvider";
import { ImageEditorModal } from "./ImageEditorModal";

type Props = {
  /** Chave única da galeria, ex.: "home.restauracao". */
  id: string;
  /** Imagens originais do site (usadas enquanto ninguém editou a galeria). */
  images: string[];
  alt?: string;
  /** Sobrescreve a persistência padrão (usado pelas galerias do módulo Galeria). */
  onChange?: (images: string[]) => Promise<void> | void;
};

/**
 * Galeria mosaico com botões de Adicionar e Excluir imagem no modo de edição.
 * Fora do modo de edição é idêntica à galeria original do site.
 */
export function EditableGallery({ id, images, alt, onChange }: Props) {
  const { content, canEdit, saveContent, upload } = useCms();
  const area = useCmsArea();
  const editable = canEdit(area);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);

  const stored = content[id];
  const list: string[] = (() => {
    if (onChange || !stored) return images;
    try {
      const parsed = JSON.parse(stored) as unknown;
      return Array.isArray(parsed) ? (parsed as string[]) : images;
    } catch {
      return images;
    }
  })();

  const persist = async (next: string[]) => {
    if (onChange) await onChange(next);
    else await saveContent(id, JSON.stringify(next));
  };

  const add = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) urls.push(await upload(file));
      await persist([...list, ...urls]);
      toast.success(urls.length > 1 ? `${urls.length} imagens adicionadas.` : "Imagem adicionada.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha ao adicionar imagem.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = async (index: number) => {
    if (!window.confirm("Excluir esta imagem da galeria?")) return;
    try {
      await persist(list.filter((_, i) => i !== index));
      toast.success("Imagem excluída.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha ao excluir imagem.");
    }
  };

  if (!editable) return <MosaicGallery images={list} idPrefix={id} alt={alt} />;

  return (
    <div className="rounded-3xl border-2 border-dashed border-terracotta/60 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.25em] text-terracotta">
          Galeria editável · {list.length} {list.length === 1 ? "imagem" : "imagens"}
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-2 text-sm font-medium text-marfim disabled:opacity-60"
        >
          <ImagePlus size={16} /> {busy ? "Enviando…" : "Adicionar imagem"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {list.map((src, i) => (
          <figure key={`${src}-${i}`} className="relative overflow-hidden rounded-xl">
            <img src={src} alt={alt ?? "Imagem da galeria"} loading="lazy" className="aspect-square w-full object-cover" />
            <button
              type="button"
              onClick={() => setEditing(i)}
              className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-foreground/85 text-marfim transition-colors hover:bg-terracotta"
              aria-label={`Editar imagem ${i + 1}`}
              title="Editar imagem (trocar, cortar, redimensionar ou excluir)"
            >
              <Pencil size={14} />
            </button>
          </figure>
        ))}
      </div>

      {editing !== null && list[editing] && (
        <ImageEditorModal
          src={list[editing]}
          upload={upload}
          onApply={async (url) => {
            await persist(list.map((s, i) => (i === editing ? url : s)));
          }}
          onDelete={() => remove(editing)}
          onClose={() => setEditing(null)}
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => add(e.target.files)}
      />
    </div>
  );
}