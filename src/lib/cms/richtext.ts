/**
 * Sanitização do editor visual: apenas negrito e itálico são permitidos.
 * Tamanho, cor e família de fonte continuam sob controle do design do site.
 */
const ALLOWED = new Set(["B", "STRONG", "I", "EM", "BR"]);

export function sanitizeRich(html: string): string {
  if (typeof document === "undefined") return html;
  const root = document.createElement("div");
  root.innerHTML = html;

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) return;
      if (child.nodeType !== Node.ELEMENT_NODE) {
        child.remove();
        return;
      }
      const el = child as HTMLElement;
      walk(el);
      if (!ALLOWED.has(el.tagName)) {
        el.replaceWith(...Array.from(el.childNodes));
        return;
      }
      Array.from(el.attributes).forEach((a) => el.removeAttribute(a.name));
    });
  };

  walk(root);
  return root.innerHTML.replace(/\u00a0/g, " ").trim();
}

/** Texto puro (usado em títulos de listas, alt de imagens etc.). */
export function richToPlain(html: string): string {
  if (typeof document === "undefined") return html.replace(/<[^>]*>/g, "");
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent ?? "";
}