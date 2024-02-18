import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [],
};
export default config;
