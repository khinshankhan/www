import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

function rawHsla(variable: string, alpha: string) {
  return `hsla(var(--${variable}), ${alpha})`
}
function hsla(variable: string) {
  return rawHsla(variable, "<alpha-value>")
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  safelist: ["dark"],
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
    fontFamily: {
      heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
    },
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
    extend: {
      transitionProperty: {
        background: "background",
      },
      colors: {
        background: hsla("background"),
        foreground: hsla("foreground"),
        muted: {
          DEFAULT: hsla("muted"),
          foreground: hsla("muted-foreground"),
        },
        popover: {
          DEFAULT: hsla("popover"),
          foreground: hsla("popover-foreground"),
        },
        accent: {
          DEFAULT: hsla("accent"),
          foreground: hsla("accent-foreground"),
        },
        border: hsla("border"),
        nav: {
          DEFAULT: hsla("nav"),
        },
        logo: {
          DEFAULT: hsla("logo"),
          foreground: hsla("logo-foreground"),
          border: hsla("logo-border"),
          shadow: hsla("logo-shadow"),
        },
        link: {
          base: hsla("link-base"),
          active: hsla("link-active"),
          on: hsla("link-on"),
        },
      },
      backgroundSize: {
        "link-hide": "0% 0.05em",
        "link-show": "100% 0.05em",
        full: "100%",
      },
    },
  },
  plugins: [],
}

export default config
