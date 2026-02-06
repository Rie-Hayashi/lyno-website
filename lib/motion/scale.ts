import { Variants } from "framer-motion";

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  },
});