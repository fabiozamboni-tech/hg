import { useEffect, useRef, useState, type ElementType } from "react";
import { Bold, Italic, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useCms, useCmsArea } from "@/lib/cms/CmsProvider";
import { sanitizeRich } from "@/lib/cms/richtext";

type Props = {
  /** Chave única do trecho, ex.: "home.hero.titulo". */
  id: string;
  children: string;
  as?: ElementType;
  className?: string;
  /** Permite quebras de linha (parágrafos longos). */
  multiline?: boolean;
};

/**
 * Texto editável direto na tela. Fora do modo de edição renderiza apenas o
 * texto — sem custo visual nem de acessibilidade.
 */
export function EditableText({ id, children, as, className, multiline = false }: Props) {
  const Tag = (as ?? "span") as ElementType;
  const { content, canEdit, saveContent, resetContent } = useCms();
  const area = useCmsArea();
  const editable = canEdit(area);
  const ref = useRef<HTMLElement>(null);
  const [saving, setSaving] = useState(false);

  const value = content[id] ?? children;

  // Mantém o HTML do editor sincronizado com o valor salvo sem recriar o nó
  // (o React não pode controlar o conteúdo de um contentEditable).
  useEffect(() => {
    if (editable && ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [editable, value]);

  if (!editable) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: sanitizeRich(value) }} />;
  }

  const commit = async () => {
    const next = sanitizeRich(ref.current?.innerHTML ?? "");
    if (next === value) return;
    setSaving(true);
    try {
      await saveContent(id, next);
      toast.success("Texto salvo.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Não foi possível salvar.");
      if (ref.current) ref.current.innerHTML = value;
    } finally {
      setSaving(false);
    }
  };

  const format = (cmd: "bold" | "italic") => document.execCommand(cmd);

  return (
    <span className="relative inline-block group/edit max-w-full">
      <span className="absolute -top-9 left-0 z-30 hidden gap-1 rounded-full border border-border bg-marfim px-1.5 py-1 shadow-lg group-focus-within/edit:flex">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            format("bold");
          }}
          title="Negrito"
          aria-label="Negrito"
          className="grid h-6 w-6 place-items-center rounded-full hover:bg-accent"
        >
          <Bold size={13} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            format("italic");
          }}
          title="Itálico"
          aria-label="Itálico"
          className="grid h-6 w-6 place-items-center rounded-full hover:bg-accent"
        >
          <Italic size={13} />
        </button>
      </span>
      <Tag
        ref={ref}
        className={`${className ?? ""} outline-dashed outline-1 outline-terracotta/60 outline-offset-4 rounded-sm focus:outline-2 focus:outline-terracotta ${saving ? "opacity-60" : ""}`}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label={`Editar texto: ${id}`}
        tabIndex={0}
        onBlur={commit}
        onPaste={(e: React.ClipboardEvent) => {
          e.preventDefault();
          document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          const meta = e.ctrlKey || e.metaKey;
          if (meta && ["b", "i"].includes(e.key.toLowerCase())) {
            e.preventDefault();
            format(e.key.toLowerCase() === "b" ? "bold" : "italic");
            return;
          }
          if (meta && ["u"].includes(e.key.toLowerCase())) e.preventDefault();
          if (e.key === "Enter" && !multiline) {
            e.preventDefault();
            (e.target as HTMLElement).blur();
          }
          if (e.key === "Escape") {
            if (ref.current) ref.current.innerHTML = value;
            (e.target as HTMLElement).blur();
          }
        }}
        dangerouslySetInnerHTML={{ __html: sanitizeRich(value) }}
      />
      {content[id] !== undefined && (
        <button
          type="button"
          onClick={() => resetContent(id)}
          className="absolute -top-3 -right-3 z-20 inline-flex items-center gap-1 rounded-full bg-terracotta px-2 py-0.5 text-[10px] font-medium text-marfim opacity-0 transition-opacity group-hover/edit:opacity-100"
          title="Restaurar texto original"
        >
          <RotateCcw size={10} /> restaurar
        </button>
      )}
    </span>
  );
}