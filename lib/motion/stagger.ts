export const stagger = (delayChildren = 0.2, staggerChildren = 0.1) => ({
    hidden: {},
    show: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  });