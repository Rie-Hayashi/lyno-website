"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { drawerMotion, overlayMotion } from "@/lib/motion";
import LocaleSwitch from "@/components/LocaleSwitch";

type MenuItem = { href: `#${string}`; label: string };

const LINKS: MenuItem[] = [
  { href: "#about", label: "about" },
  { href: "#menu", label: "menu" },
  { href: "#beans", label: "beans" },
  { href: "#news", label: "news" },
  { href: "#access", label: "access" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const tHeader = useTranslations("header");
  const tCommon = useTranslations("common");

  // ドロワーオープン中はスクロールロック
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = open ? "hidden" : prev || "";
    return () => {
      root.style.overflow = prev || "";
    };
  }, [open]);

  // Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="header-shell">
      <div className="header-inner">
        <div className="header-container">
          {/* Brand + Locale */}
          <div className="flex items-center gap-4">
            <Link href="#hero" className="brand-root">
              <span className="brand-text">{tCommon("brand")}</span>
            </Link>

            <LocaleSwitch />
          </div>

          {/* PC nav */}
          <nav className="nav-desktop">
            {LINKS.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {tHeader(item.label)}
              </a>
            ))}
          </nav>

          {/* SP: ハンバーガー */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={toggle}
            className="hamburger"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* ドロワー */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              aria-hidden
              className="header-overlay"
              variants={overlayMotion}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={close}
            />

            {/* Drawer */}
            <motion.aside
              id="header-drawer"
              role="dialog"
              aria-modal="true"
              className="header-drawer"
              variants={drawerMotion}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="header-drawer-top">
                <motion.button
                  type="button"
                  onClick={close}
                  className="drawer-close"
                  whileTap={{ scale: 0.9 }}
                >
                  <span />
                  <span />
                </motion.button>
              </div>

              <nav className="header-drawer-inner">
                {LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="header-drawer-link"
                  >
                    {tHeader(item.label)}
                  </a>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}