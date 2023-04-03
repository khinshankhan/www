import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import { screens } from "./lib/theme"

function rawHsla(variable: string, alpha: string) {
  return `hsla(var(--${variable}), ${alpha})`
}
function hsla(variable: string) {
  return rawHsla(variable, "<alpha-value>")
}

function hslaN({ variable = "", n = 1, scale = 1 }) {
  return Array.from({ length: n }, (_, index) => index + 1).reduce((stored, num) => {
    const key = num * scale
    return {
      ...stored,
      [key]: hsla(`${variable}${key}`),
    }
  }, {})
}

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens,
    zIndex: {
      auto: "auto",
      docked: "10",
      dropdown: "1000",
      sticky: "1100",
      banner: "1200",
      overlay: "1300",
      modal: "1400",
      popover: "1500",
      skipLink: "1600",
      toast: "1700",
      tooltip: "1800",
      0: "0",
      // although generally the semantic tokens should be used for zindices
      // 1 and 2 are acceptable if scoped properly imho
      1: "1",
      2: "2",
    },
    fontFamily: {
      heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        gray: hslaN({ variable: "gray", n: 12 }),
        mauve: hslaN({ variable: "mauve", n: 12 }),
        plum: hslaN({ variable: "plum", n: 12 }),
        violet: hslaN({ variable: "violet", n: 12 }),
        bluegray: hslaN({ variable: "bluegray", n: 12 }),
        theme: {
          DEFAULT: hsla("bg"),
          contentBg: hsla("content-bg"),
          placeholder: hsla("placeholder"),
          accent: hsla("accent"),
          muted: hsla("muted"),
          stark: hsla("stark"),
          ghostBg: "var(--ghost-bg)", // has specific alpha value
          cardBg: hsla("card-bg"),
        },
        logo: {
          fg: hsla("logo-fg"),
          bg: hsla("logo-bg"),
          border: hsla("logo-border"),
        },
        link: {
          base: hsla("link"),
          active: hsla("link-active"),
          on: hsla("link-on"),
        },
      },

      keyframes: {
        "collapsible-slide-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
        "collapsible-slide-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        /* https://jarv.is/notes/css-waving-hand-emoji/ */
        waving: {
          "0%": { transform: "rotate( 0.0deg)" },
          "10%": {
            transform: "rotate(14.0deg)",
          } /* The following five values can be played with to make the waving more or less extreme */,
          "20%": { transform: "rotate(-8.0deg)" },
          "30%": { transform: "rotate(14.0deg)" },
          "40%": { transform: "rotate(-4.0deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate( 0.0deg)" } /* Reset for the last half to pause */,
          "100%": { transform: "rotate( 0.0deg)" },
        },
      },
      animation: {
        "collapsible-open": "collapsible-slide-down 300ms ease-out",
        "collapsible-close": "collapsible-slide-up 300ms ease-out",
        wave: "waving 2.5s infinite",
      },
      transitionProperty: {
        background: "background",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
