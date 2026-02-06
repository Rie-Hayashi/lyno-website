"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function Access() {
  const t = useTranslations("access");

  return (
    <section id="access" className="section">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 md:flex-row">
        {/* 左：テキスト */}
        <div className="md:w-1/2">
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

          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>{t("address")}</p>

            <p>
              <span className="font-semibold">{t("hours_label")}:</span>{" "}
              {t("hours_value")}
            </p>

            <a
              href="https://maps.app.goo.gl/qtQGGo45zCg1pEocA"
              target="_blank"
              className="
                inline-flex items-center justify-center rounded-full
                border border-brand px-4 py-2 text-xs mt-4
                hover:bg-brand hover:text-black transition
              "
            >
              {t("map_cta")}
            </a>
          </div>
        </div>

        {/* 右：Google Map 埋め込み */}
        <motion.div
          className="md:w-1/2"
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d713.833101792784!2d139.72918836374097!3d35.55394714192331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018610345c9a1ad%3A0x6b721b43640bda37!2sLYNO%20CAFE%20TOKYO!5e0!3m2!1sja!2sjp!4v1763388853593!5m2!1sja!2sjp"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full md:h-80"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}