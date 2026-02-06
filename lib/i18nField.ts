export type Locale = "ja" | "en";

export function pickByLocale(
  locale: string,
  ja?: string | null,
  en?: string | null
) {
  if (locale === "en") return en || ja || "";
  return ja || en || "";
}