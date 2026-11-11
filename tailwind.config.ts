import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // The site palette lives in globals.css, as CSS variables.
    colors: {
      darkbg: "rgb(var(--color-bg) / <alpha-value>)",
      "main-text": "rgb(var(--color-text) / <alpha-value>)",
      tag: "rgb(var(--color-tag) / <alpha-value>)",
      accent: "rgb(var(--color-accent) / <alpha-value>)",
      white: "#ffffff",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
