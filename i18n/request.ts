import { getRequestConfig } from "next-intl/server";

const DEFAULT_LOCALE = "ja";
const SUPPORTED_LOCALES = ["ja", "en"] as const;

export default getRequestConfig(async ({ locale }) => {
  const safeLocale =
    (SUPPORTED_LOCALES as readonly string[]).includes(locale ?? "")
      ? (locale as (typeof SUPPORTED_LOCALES)[number])
      : DEFAULT_LOCALE;

  const messages = (await import(`../messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages
  };
});