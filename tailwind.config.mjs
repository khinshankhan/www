function hsla(variable) {
  return `hsla(var(--${variable}), <alpha-value>)`
}

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./content/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  darkMode: ["class"],
  safelist: ["light", "dark"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    screens: {
      xss: "320px",
      xs: "392px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1325px",
      "2xl": "1536px",

      // usually I think in terms of this for design
      // isMobile to isDesktop should have no gap ergo
      // -1 so it doesn't encompass 768
      isMobile: { max: "767px" },
      isDesktop: "768px",
    },
    colors: {
      background: hsla("background"),
      foreground: hsla("foreground"),
      content: {
        DEFAULT: hsla("content"),
        foreground: hsla("content-foreground"),
      },
    },
  },
}

export default config
