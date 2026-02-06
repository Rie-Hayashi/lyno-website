import { Variants } from "framer-motion";

export const slideFromLeft = (delay = 0): Variants => ({
  hidden: { x: -30, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, delay, ease: "easeOut" },
  },
});

export const slideFromRight = (delay = 0): Variants => ({
  hidden: { x: 40, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  },
});