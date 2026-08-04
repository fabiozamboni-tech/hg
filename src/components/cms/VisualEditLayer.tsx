import { useCallback, useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCms } from "@/lib/cms/CmsProvider";
import { sanitizeRich } from "@/lib/cms/richtext";
import { SITE_PAGES } from "@/lib/cms/pages";
import { ImageEditorModal } from "./ImageEditorModal";

const TEXT_SELECTOR = "h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,dd,dt";
const KEY_ATTR = "data-cms-key";

function areaFor(pathname: string): string {
  const page = SITE_PAGES.filter((p) => p.path !== "/").find((p) => pathname.startsWith(p.path));
  if (page) return page.area;
  return pathname === "/" ? "home" : "global";
}

/**
 * Editor visual WYSIWYG genérico: percorre a página renderizada, dá uma chave
 * estável a cada texto e imagem e aplica o conteúdo salvo no CMS. Em modo de
 * edição, os textos ficam editáveis na própria tela (negrito/itálico) e cada
 * imagem ganha um botão que abre a modal de troca/corte/redimensionamento.
 */
export function VisualEditLayer() {
  const { content, canEdit, saveContent, upload, ready } = useCms();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const editing = canEdit(areaFor(pathname));
  const [imageTarget, setImageTarget] = useState<{ key: string; src: string } | null>(null);
  const contentRef = useRef(content);
  contentRef.current = content;

  /** Numera os elementos da página e devolve suas chaves estáveis. */
  const tag = useCallback(() => {
    const root = document.querySelector("main");
    if (!root) return { texts: [] as HTMLElement[], images: [] as HTMLImageElement[] };
    const counters = new Map<string, number>();
    const next = (kind: string) => {
      const n = (counters.get(kind) ?? 0) + 1;
      counters.set(kind, n);
      return `auto:${pathname}#${kind}-${n}`;
    };
    const texts: HTMLElement[] = [];
    root.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
      if (el.closest("[data-cms-skip]") || el.querySelector(TEXT_SELECTOR)) return;
      if (!el.textContent?.trim()) return;
      if (!el.getAttribute(KEY_ATTR)) el.setAttribute(KEY_ATTR, next(el.tagName.toLowerCase()));
      texts.push(el);
    });
    const images: HTMLImageElement[] = [];
    root.querySelectorAll<HTMLImageElement>("img").forEach((el) => {
      if (el.closest("[data-cms-skip]")) return;
      if (!el.getAttribute(KEY_ATTR)) el.setAttribute(KEY_ATTR, next("img"));
      images.push(el);
    });
    return { texts, images };
  }, [pathname]);

  /** Aplica o conteúdo salvo e (re)configura a edição. */
  const sync = useCallback(() => {
    const { texts, images } = tag();
    const saved = contentRef.current;

    texts.forEach((el) => {
      const key = el.getAttribute(KEY_ATTR)!;
      if (!el.dataset.cmsOriginal) el.dataset.cmsOriginal = el.innerHTML;
      const value = saved[key];
      if (value !== undefined && el.innerHTML !== value) el.innerHTML = value;
      if (editing) {
        el.setAttribute("contenteditable", "true");
        el.setAttribute("role", "textbox");
        el.dataset.cmsEditable = "1";
      } else if (el.dataset.cmsEditable) {
        el.removeAttribute("contenteditable");
        el.removeAttribute("role");
        delete el.dataset.cmsEditable;
      }
    });

    images.forEach((el) => {
      const key = el.getAttribute(KEY_ATTR)!;
      if (!el.dataset.cmsOriginal) el.dataset.cmsOriginal = el.currentSrc || el.src;
      const value = saved[key];
      if (value && el.getAttribute("src") !== value) el.setAttribute("src", value);
      el.dataset.cmsImage = editing ? "1" : "";
      if (!editing) delete el.dataset.cmsImage;
    });
  }, [tag, editing]);

  useEffect(() => {
    if (!ready) return;
    sync();
    const obs = new MutationObserver(() => {
      window.clearTimeout((window as unknown as { __cmsSync?: number }).__cmsSync);
      (window as unknown as { __cmsSync?: number }).__cmsSync = window.setTimeout(sync, 120);
    });
    const root = document.querySelector("main");
    if (root) obs.observe(root, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [ready, sync, content]);

  // Interações do modo de edição (delegadas no documento).
  useEffect(() => {
    if (!editing) return;

    const commit = async (el: HTMLElement) => {
      const key = el.getAttribute(KEY_ATTR);
      if (!key) return;
      const value = sanitizeRich(el.innerHTML);
      const previous = contentRef.current[key] ?? el.dataset.cmsOriginal ?? "";
      if (value === previous) return;
      try {
        await saveContent(key, value);
        toast.success("Texto salvo.");
      } catch (e) {
        el.innerHTML = previous;
        toast.error(e instanceof Error ? e.message : "Não foi possível salvar.");
      }
    };

    const onBlur = (e: FocusEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cms-editable]") as HTMLElement | null;
      if (el) void commit(el);
    };

    const onKey = (e: KeyboardEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cms-editable]") as HTMLElement | null;
      if (!el) return;
      const meta = e.ctrlKey || e.metaKey;
      if (meta && ["b", "i"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        document.execCommand(e.key.toLowerCase() === "b" ? "bold" : "italic");
      }
      if (meta && e.key.toLowerCase() === "u") e.preventDefault();
      if (e.key === "Escape") {
        el.innerHTML = contentRef.current[el.getAttribute(KEY_ATTR)!] ?? el.dataset.cmsOriginal ?? "";
        el.blur();
      }
    };

    const onPaste = (e: ClipboardEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cms-editable]");
      if (!el) return;
      e.preventDefault();
      document.execCommand("insertText", false, e.clipboardData?.getData("text/plain") ?? "");
    };

    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement | null)?.closest?.("img[data-cms-image]") as HTMLImageElement | null;
      if (!img) return;
      e.preventDefault();
      e.stopPropagation();
      setImageTarget({ key: img.getAttribute(KEY_ATTR)!, src: img.currentSrc || img.src });
    };

    document.addEventListener("blur", onBlur, true);
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("paste", onPaste, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("blur", onBlur, true);
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("paste", onPaste, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [editing, saveContent]);

  // Estilos do modo de edição (contorno tracejado e cursor nas imagens).
  useEffect(() => {
    const id = "cms-visual-edit-style";
    document.getElementById(id)?.remove();
    if (!editing) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      [data-cms-editable]{outline:1px dashed color-mix(in oklab, var(--color-terracotta, #c0663b) 70%, transparent);outline-offset:4px;border-radius:2px;cursor:text;}
      [data-cms-editable]:focus{outline:2px solid var(--color-terracotta, #c0663b);}
      img[data-cms-image]{outline:2px dashed color-mix(in oklab, var(--color-terracotta, #c0663b) 70%, transparent);outline-offset:-2px;cursor:pointer;}
      img[data-cms-image]:hover{filter:brightness(0.85);}
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [editing]);

  if (!imageTarget) return null;

  return (
    <ImageEditorModal
      src={imageTarget.src}
      upload={upload}
      onApply={async (url) => {
        await saveContent(imageTarget.key, url);
      }}
      onClose={() => setImageTarget(null)}
    />
  );
}
