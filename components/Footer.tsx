"use client";

import { Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/10 bg-black/80">
      <div
        className="
          mx-auto max-w-5xl px-6 py-8
          flex flex-col md:flex-row md:items-center md:justify-between
          text-xs text-white/60 gap-4
        "
      >
        {/* 左：ブランド */}
        <div>
          <p className="mt-1">
            © {year} {t("brand")}
          </p>
        </div>

        {/* 右：Instagram */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/lyno.cafe.tokyo/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2 text-white/60
              hover:text-white transition-colors
            "
          >
            <Instagram size={45} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}