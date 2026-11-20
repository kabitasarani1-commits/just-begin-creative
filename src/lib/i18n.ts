import { BN } from "./bn";
import { useDB, useStoredLang } from "./store";

export type Lang = "en" | "bn";

export function translate(lang: Lang, text: string) {
  return lang === "bn" ? (BN[text] ?? text) : text;
}

/** English strings are the keys; Bengali comes from the BN dictionary. */
export function useT() {
  const stored = useStoredLang();
  const db = useDB();
  const lang: Lang = stored ?? db.settings.defaultLang;
  const t = (text: string) => translate(lang, text);
  return { t, lang };
}
