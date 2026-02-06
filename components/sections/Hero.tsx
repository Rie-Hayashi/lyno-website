"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative h-[70vh] min-h-[480px] flex items-center"
    >
      {/* 背景 */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/Hero.jpg"
          alt="Hero Image"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-screen-xl mx-auto px-6 flex justify-end"
        variants={fadeIn(0.2)}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-right max-w-md">
          <p className="text-xs md:text-sm lg:text-lg tracking-[0.3em] text-white/70">
            {t("tagline")}
          </p>

          <h1
            className="text-7xl md:text-8xl lg:text-9xl font-sans"
          >
            {t("title")}
          </h1>

          <p className="mt-1 text-xs md:text-sm lg:text-lg text-white/70">
            {t("subtitle")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}