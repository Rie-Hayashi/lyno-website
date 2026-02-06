"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  const toJa = pathname.replace(/^\/(en|ja)/, "/ja");
  const toEn = pathname.replace(/^\/(en|ja)/, "/en");

  return (
    <div className="flex items-center gap-2 text-xs tracking-widest">
      <Link
        href={toJa}
        className={
          locale === "ja"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }
        aria-label="Switch to Japanese"
      >
        JP
      </Link>
      <span className="text-white/30">/</span>
      <Link
        href={toEn}
        className={
          locale === "en"
            ? "text-white"
            : "text-white/40 hover:text-white"
        }
        aria-label="Switch to English"
      >
        EN
      </Link>
    </div>
  );
}