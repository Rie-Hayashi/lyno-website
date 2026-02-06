"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");
  return (
    <section id="about" className="section">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 md:flex-row">
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
          <p className="p">
            {t("p1")}
          </p>
          <p className="p">
            {t("p2")}
          </p>
        </div>
        <motion.div 
          className="md:w-1/2"
          variants={fadeIn(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <img
              src="/images/shop/Lyno_inside.jpg"
              alt="Lyno interior"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
