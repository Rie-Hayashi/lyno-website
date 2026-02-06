"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useLocale, useTranslations } from "next-intl";
import { pickByLocale } from "@/lib/i18nField";
import type { MenuItem } from "@/lib/data/menu";

type Props = {
  items: MenuItem[];
};

// ASK対策
function formatPrice(raw: string, askLabel: string) {
  const v = (raw || "").trim();
  if (!v) return "";
  if (v.toLowerCase() === "ask") return askLabel;
  if (/^\d+$/u.test(v)) return `¥${v}`;
  return v;
}

function Line({
  item,
  locale,
  askLabel,
}: {
  item: MenuItem;
  locale: string;
  askLabel: string;
}) {
  const name = pickByLocale(locale, item.name_ja, item.name_en);
  const desc = pickByLocale(locale, item.desc_ja, item.desc_en);
  const priceLabel = formatPrice(item.price, askLabel);

  return (
    <div className="flex items-baseline justify-between border-b border-white/10 py-2">
      <div>
        <div className="font-serif">{name}</div>

        {desc && (
          <p className="mt-1 text-xs text-white/60">
            {desc}
          </p>
        )}
      </div>

      {priceLabel && (
        <div className="ml-4 text-sm tabular-nums">{priceLabel}</div>
      )}
    </div>
  );
}

export default function MenuClient({ items }: Props) {
  const locale = useLocale();
  const t = useTranslations("menu");

  // category はデータ側が英語固定前提でフィルタ（表示ラベルだけ翻訳）
  const seasonal = items.filter((i) => i.seasonal);
  const coffee = items.filter((i) => i.category === "Coffee" && !i.seasonal);
  const teaLatte = items.filter((i) => i.category === "Tea Latte" && !i.seasonal);
  const others = items.filter((i) => i.category === "Others" && !i.seasonal);
  const option = items.filter((i) => i.category === "Option" && !i.seasonal);

  const askLabel = t("ask");

  return (
    <section id="menu" className="section section-y">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          className="h2 mb-3"
          variants={fadeIn(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
          {t("title")}
        </motion.h2>

        <p className="mb-8 p">{t("description")}</p>

        {/* Seasonal */}
        {seasonal.length > 0 && (
          <div className="mb-8">
            <h3 className="h3 font-sans tracking-[0.2em] text-brand mb-2">
              {t("seasonal")}
            </h3>
            {seasonal.map((item) => (
              <Line key={item.id} item={item} locale={locale} askLabel={askLabel} />
            ))}
          </div>
        )}

        {/* Coffee */}
        {coffee.length > 0 && (
          <div className="mb-8">
            <h3 className="h3 font-sans tracking-[0.2em] text-brand mb-2">
              {t("coffee")}
            </h3>
            {coffee.map((item) => (
              <Line key={item.id} item={item} locale={locale} askLabel={askLabel} />
            ))}
          </div>
        )}

        {/* Tea Latte */}
        {teaLatte.length > 0 && (
          <div className="mb-8">
            <h3 className="h3 font-sans tracking-[0.2em] text-brand mb-2">
              {t("teaLatte")}
            </h3>
            {teaLatte.map((item) => (
              <Line key={item.id} item={item} locale={locale} askLabel={askLabel} />
            ))}
          </div>
        )}

        {/* Others */}
        {others.length > 0 && (
          <div className="mb-8">
            <h3 className="h3 font-sans tracking-[0.2em] text-brand mb-2">
              {t("others")}
            </h3>
            {others.map((item) => (
              <Line key={item.id} item={item} locale={locale} askLabel={askLabel} />
            ))}
          </div>
        )}

        {/* Option */}
        {option.length > 0 && (
          <div>
            <h3 className="h3 font-sans tracking-[0.2em] text-brand mb-2">
              {t("option")}
            </h3>
            {option.map((item) => (
              <Line key={item.id} item={item} locale={locale} askLabel={askLabel} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}