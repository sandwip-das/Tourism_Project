import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lp: {
          blue: "#0057D9",
          navy: "#002B49",
          dark: "#121212",
          gray: "#F4F5F7",
          border: "#E2E4E8",
          text: "#1D232C",
          muted: "#5B6575",
          sand: "#FFF8F0",
          amber: "#D97706",
          emerald: "#0D9488",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        sans: [
          "'Plus Jakarta Sans'",
          "'Noto Sans Bengali'",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 10px 24px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
