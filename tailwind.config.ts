import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xss: "320px",
      xs: "392px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      heading: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      keyframes: {
        waving: {
          "0%": { transform: "rotate( 0.0deg)" },
          "10%": {
            transform: "rotate(14.0deg)",
          } /* The following five values can be played with to make the waving more or less extreme */,
          "20%": { transform: "rotate(-8.0deg)" },
          "30%": { transform: "rotate(14.0deg)" },
          "40%": { transform: "rotate(-4.0deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": {
            transform: "rotate( 0.0deg)",
          } /* Reset for the last half to pause */,
          "100%": { transform: "rotate( 0.0deg)" },
        },
      },
      animation: {
        wave: "waving 2.5s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
