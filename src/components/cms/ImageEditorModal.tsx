import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Crop, ImageUp, RotateCcw, Trash2, X } from "lucide-react";
import { toast } from "sonner";

type Rect = { x: number; y: number; w: number; h: number };

type Props = {
  src: string;
  /** Chamado com a nova URL da imagem (já enviada ao servidor). */
  onApply: (url: string) => Promise<void> | void;
  /** Restaurar a imagem original (some quando não há edição salva). */
  onReset?: () => Promise<void> | void;
  /** Excluir a imagem (usado nas galerias). */
  onDelete?: () => Promise<void> | void;
  upload: (file: File) => Promise<string>;
  onClose: () => void;
};

/** Modal de edição de imagem: trocar, cortar, redimensionar e excluir. */
export function ImageEditorModal({ src, onApply, onReset, onDelete, upload, onClose }: Props) {
  const [working, setWorking] = useState(src);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [crop, setCrop] = useState<Rect | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    setWidth((w) => w || img.naturalWidth);
  };

  const outW = Math.max(1, Math.round(width || natural?.w || 1));
  const cropW = crop && natural ? crop.w * natural.w : natural?.w ?? 1;
  const cropH = crop && natural ? crop.h * natural.h : natural?.h ?? 1;
  const outH = Math.max(1, Math.round((outW * cropH) / Math.max(1, cropW)));

  const point = (e: React.PointerEvent) => {
    const box = boxRef.current!.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (e.clientX - box.left) / box.width)),
      y: Math.min(1, Math.max(0, (e.clientY - box.top) / box.height)),
    };
  };

  const startDrag = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragRef.current = point(e);
    setCrop(null);
  };

  const moveDrag = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const p = point(e);
    const s = dragRef.current;
    setCrop({
      x: Math.min(s.x, p.x),
      y: Math.min(s.y, p.y),
      w: Math.abs(p.x - s.x),
      h: Math.abs(p.y - s.y),
    });
  };

  const endDrag = () => {
    dragRef.current = null;
    setCrop((c) => (c && c.w > 0.02 && c.h > 0.02 ? c : null));
  };

  const pickFile = async (file?: File) => {
    if (!file) return;
    setCrop(null);
    setNatural(null);
    setWidth(0);
    setWorking(URL.createObjectURL(file));
  };

  const render = useCallback(async (): Promise<File> => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = working;
    await img.decode();
    const sx = crop ? crop.x * img.naturalWidth : 0;
    const sy = crop ? crop.y * img.naturalHeight : 0;
    const sw = crop ? crop.w * img.naturalWidth : img.naturalWidth;
    const sh = crop ? crop.h * img.naturalHeight : img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(outW));
    canvas.height = Math.max(1, Math.round((outW * sh) / sw));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Não foi possível processar a imagem.");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.92));
    if (!blob) throw new Error("Não foi possível gerar a imagem.");
    return new File([blob], `imagem-${Date.now()}.jpg`, { type: "image/jpeg" });
  }, [working, crop, outW]);

  const save = async () => {
    setBusy(true);
    try {
      const file = await render();
      const url = await upload(file);
      await onApply(url);
      toast.success("Imagem atualizada.");
      onClose();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha ao salvar a imagem.");
    } finally {
      setBusy(false);
    }
  };

  const body = (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-foreground/70 p-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-marfim p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>
        <h3 className="font-serif text-2xl text-terracotta">Editar imagem</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Arraste sobre a imagem para escolher o corte. Ajuste a largura final abaixo.
        </p>

        <div
          ref={boxRef}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          className="relative mt-4 max-h-[45vh] cursor-crosshair touch-none select-none overflow-hidden rounded-xl bg-foreground/5"
        >
          <img
            src={working}
            alt="Pré-visualização da imagem em edição"
            onLoad={onLoad}
            draggable={false}
            className="max-h-[45vh] w-full object-contain"
          />
          {crop && (
            <div
              className="pointer-events-none absolute border-2 border-terracotta bg-terracotta/10"
              style={{
                left: `${crop.x * 100}%`,
                top: `${crop.y * 100}%`,
                width: `${crop.w * 100}%`,
                height: `${crop.h * 100}%`,
              }}
            />
          )}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs uppercase tracking-[0.2em] text-ocre">
            Largura final: {outW}px × {outH}px
            <input
              type="range"
              min={200}
              max={Math.max(400, natural?.w ?? 2000)}
              step={10}
              value={outW}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="accent-[var(--color-terracotta,#b4573c)]"
            />
          </label>
          <div className="flex flex-wrap items-end gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-full border border-terracotta px-3 py-2 text-xs font-medium text-terracotta"
            >
              <ImageUp size={14} /> Trocar arquivo
            </button>
            <button
              type="button"
              onClick={() => setCrop(null)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium"
            >
              <Crop size={14} /> Limpar corte
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex flex-wrap gap-2">
            {onReset && (
              <button
                type="button"
                onClick={async () => {
                  await onReset();
                  onClose();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs"
              >
                <RotateCcw size={14} /> Restaurar original
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm("Excluir esta imagem?")) return;
                  await onDelete();
                  onClose();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-destructive px-3 py-2 text-xs text-destructive"
              >
                <Trash2 size={14} /> Excluir imagem
              </button>
            )}
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={save}
            className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-marfim disabled:opacity-60"
          >
            {busy ? "Salvando…" : "Salvar imagem"}
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(body, document.body);
}