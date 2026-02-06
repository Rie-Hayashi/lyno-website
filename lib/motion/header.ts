// src/lib/motion/header.ts
import type { Variants } from "framer-motion";

export const hamburgerTop: Variants = {
  closed: { y: 0, rotate: 0 },
  open: {
    y: 6,
    rotate: 45,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const hamburgerMiddle: Variants = {
  closed: { opacity: 1 },
  open: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export const hamburgerBottom: Variants = {
  closed: { y: 0, rotate: 0 },
  open: {
    y: -6,
    rotate: -45,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// Drawer（右スライド）
export const drawerMotion: Variants = {
  closed: { x: "100%" },
  open: {
    x: "0%",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

// Overlay
export const overlayMotion: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { duration: 0.35 },
  },
};