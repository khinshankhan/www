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
  safelist: ["dark"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {
        background: hsla("background"),
        foreground: hsla("foreground"),
        nav: {
          DEFAULT: hsla("nav"),
          foreground: hsla("nav-foreground"),
        },
      },
    },
  },
}

export default config
