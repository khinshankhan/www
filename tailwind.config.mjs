import defaultTheme from "tailwindcss/defaultTheme"

function rawHsla(variable, alpha) {
  return `hsla(var(--${variable}), ${alpha})`
}
function hsla(variable) {
  return rawHsla(variable, "<alpha-value>")
}

/** @type {import('tailwindcss').Config} */
const config = {
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
        transparent: hsla("transparent"),
        black: hsla("black"),
        white: hsla("white"),
        knockout: hsla("knockout"),
        nav: hsla("nav"),
        background: hsla("background"),
        foreground: hsla("foreground"),
        card: {
          DEFAULT: hsla("card"),
          foreground: hsla("card-foreground"),
        },
        popover: {
          DEFAULT: hsla("popover"),
          foreground: hsla("popover-foreground"),
        },
        primary: {
          DEFAULT: hsla("primary"),
          foreground: hsla("primary-foreground"),
        },
        secondary: {
          DEFAULT: hsla("secondary"),
          foreground: hsla("secondary-foreground"),
        },
        muted: {
          DEFAULT: hsla("muted"),
          foreground: hsla("muted-foreground"),
        },
        accent: {
          DEFAULT: hsla("accent"),
          foreground: hsla("accent-foreground"),
        },
        border: hsla("border"),
        input: hsla("input"),
        ring: hsla("ring"),
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
        info: {
          DEFAULT: hsla("info"),
          foreground: hsla("info-foreground"),
          border: hsla("info-border"),
        },
        success: {
          DEFAULT: hsla("success"),
          foreground: hsla("success-foreground"),
          border: hsla("success-border"),
        },
        critical: {
          DEFAULT: hsla("critical"),
          foreground: hsla("critical-foreground"),
          border: hsla("critical-border"),
        },
        warning: {
          DEFAULT: hsla("warning"),
          foreground: hsla("warning-foreground"),
          border: hsla("warning-border"),
        },
        danger: {
          DEFAULT: hsla("danger"),
          foreground: hsla("danger-foreground"),
          border: hsla("danger-border"),
        },
      },
      backgroundSize: {
        "link-hide": "0% 0.05em",
        "link-show": "100% 0.05em",
        full: "100%",
      },
      transitionTimingFunction: {
        "arrow-ease": "cubic-bezier(0.87, 0, 0.13, 1)",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config