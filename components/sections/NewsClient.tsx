"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useLocale, useTranslations } from "next-intl";
import { pickByLocale } from "@/lib/i18nField";
import type { NewsItem } from "@/lib/data/news";

type Props = {
  items: NewsItem[];
};

export default function NewsSection({ items }: Props) {
  const locale = useLocale();
  const t = useTranslations("news");
  const isEmpty = items.length === 0;

  return (
    <section id="news" className="section">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <motion.h2
              className="h2 mb-3"
              variants={fadeIn(0.1)}
              initial="hidden"
              animate="show"
              viewport={{ once: true, amount: 0.8 }}
            >
              {t("title")}
            </motion.h2>
            <p className="p">{t("description")}</p>
          </div>

          <a
            href="https://www.instagram.com/lyno.cafe.tokyo/"
            target="_blank"
            className="text-xs text-white/60 underline underline-offset-4 decoration-brand"
          >
            {t("more")}
          </a>
        </div>

        {isEmpty ? (
          <p className="p">{t("empty")}</p>
        ) : (
          <div className="space-y-4">
            {items.map((n) => {
              const title = pickByLocale(locale, n.title_ja, n.title_en);
              const body = pickByLocale(locale, n.body_ja, n.body_en);

              return (
                <article
                  key={`${n.date}-${title}`}
                  className="border border-brand rounded-2xl bg-white/5 p-4"
                >
                  <p className="text-xs text-white/50">{n.date}</p>
                  <h3 className="mt-1 text-sm font-medium">{title}</h3>

                  {body && (
                    <p className="mt-1 text-xs text-white/70">
                      {body}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}