import { localBackend } from "./local";
import { phpAvailable, phpBackend } from "./remote";
import type { CmsBackend } from "./types";

let cached: Promise<CmsBackend> | undefined;

/**
 * Escolhe o backend uma única vez por sessão de navegação:
 * PHP/MySQL quando `api.php` responde (Locaweb), armazenamento local no preview.
 */
export function getBackend(): Promise<CmsBackend> {
  if (!cached) {
    cached = phpAvailable().then((ok) => (ok ? phpBackend : localBackend));
  }
  return cached;
}