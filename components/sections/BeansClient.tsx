"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { pickByLocale } from "@/lib/i18nField";
import type { Bean } from "@/lib/data/beans";

type Props = { items: Bean[] };

function formatDripPrice(v?: string): string {
  if (!v) return "";
  const trimmed = v.trim();
  if (!trimmed) return "";
  if (trimmed.toLowerCase() === "ask") return "ASK";
  if (/^\d+$/u.test(trimmed)) return `¥${trimmed}`;
  return trimmed;
}

export default function BeansClient({ items }: Props) {
  const t = useTranslations("beans");
  const isEmpty = items.length === 0;
  const locale = useLocale();

  return (
    <section id="beans" className="section section-y">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* タイトル */}
        <motion.h2
          className="h2 mb-2"
          variants={fadeIn(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
          {t("title")}
        </motion.h2>

        <p className="mb-8 p">{t("description")}</p>

        {isEmpty ? (
          <p className="p text-white/60">{t("empty")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((b) => {
              const dripLabel = formatDripPrice(b.priceDrip);
              const notes = pickByLocale(locale, b.notes_ja, b.notes_en);

              return (
                <article
                  key={b.id}
                  className="rounded-3xl border border-brand bg-white/5 p-5"
                >
                  {/* 名前 */}
                  <h3 className="h3 text-lg mb-2">{b.name}</h3>

                  {/* 基本情報（origin 等をラベル付きで分離） */}
                  <div className="space-y-1 text-xs text-white/60">
                    {b.origin && (
                      <div>
                        <span className="text-white/40">{t("origin")}:</span>{" "}
                        {b.origin}
                      </div>
                    )}

                    {b.variety && (
                      <div>
                        <span className="text-white/40">{t("variety")}:</span>{" "}
                        {b.variety}
                      </div>
                    )}

                    {b.process && (
                      <div>
                        <span className="text-white/40">{t("process")}:</span>{" "}
                        {b.process}
                      </div>
                    )}

                    {b.roast && (
                      <div>
                        <span className="text-white/40">{t("roast")}:</span>{" "}
                        {b.roast}
                      </div>
                    )}

                    {b.roaster && (
                        <p className="mt-3 text-xs text-white/50">
                        {t("roaster")} {b.roaster}
                        </p>
                    )}
                  </div>

                  {/* フレーバー */}
                  {b.flavor && (
                    <p className="mt-3 text-xs text-white/70">{b.flavor}</p>
                  )}

                  {/* ノート */}
                  {notes && (
                    <p className="mt-3 text-sm text-white/80 leading-relaxed">
                      {notes}
                    </p>
                  )}



                  {/* 価格・在庫 */}
                  <div className="mt-4 space-y-1 text-xs text-white/70">
                    {dripLabel && (
                      <div>
                        {t("drip")}: {dripLabel}
                      </div>
                    )}

                    {b.price100 != null && (
                      <div>
                        {t("priceUnit100")}: ¥{b.price100}
                      </div>
                    )}

                    {b.price40 != null && (
                      <div>
                        {t("priceUnit40")}: ¥{b.price40}
                      </div>
                    )}

                    {!b.in_stock && (
                      <div className="text-red-300">{t("soldOut")}</div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}