import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "var(--color-white)",  
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-noto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
