import { Variants } from "framer-motion";

export const fadeIn = (delay = 0, y = 20): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  },
});