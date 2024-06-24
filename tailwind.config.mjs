import tailwindcssAnimate from "tailwindcss-animate"
import defaultTheme from "tailwindcss/defaultTheme"

function hsla(variable) {
  return `hsla(var(--${variable}) / <alpha-value>)`
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
  plugins: [tailwindcssAnimate],
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
    colors: {
      transparent: "transparent",
      black: hsla("black"),
      white: hsla("white"),
      background: hsla("background"),
      foreground: hsla("foreground"),
      border: hsla("border"),
      knockout: {
        DEFAULT: hsla("knockout"),
        foreground: hsla("knockout-foreground"),
      },
      content: {
        DEFAULT: hsla("content"),
        foreground: hsla("content-foreground"),
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
      card: {
        DEFAULT: hsla("card"),
        foreground: hsla("card-foreground"),
      },
      popover: {
        DEFAULT: hsla("popover"),
        foreground: hsla("popover-foreground"),
      },
      link: {
        foreground: hsla("link-foreground"),
        border: hsla("link-border"),
        "border-active": hsla("link-border-active"),
      },
      info: {
        DEFAULT: hsla("info"),
        foreground: hsla("info-foreground"),
        "link-border": hsla("info-link-border"),
        "link-border-active": hsla("info-link-border-active"),
        border: hsla("info-border"),
      },
      success: {
        DEFAULT: hsla("success-background"),
        foreground: hsla("success-foreground"),
        "link-border": hsla("success-link-border"),
        "link-border-active": hsla("success-link-border-active"),
        border: hsla("success-border"),
      },
      critical: {
        DEFAULT: hsla("critical-background"),
        foreground: hsla("critical-foreground"),
        "link-border": hsla("critical-link-border"),
        "link-border-active": hsla("critical-link-border-active"),
        border: hsla("critical-border"),
      },
      warning: {
        DEFAULT: hsla("warning-background"),
        foreground: hsla("warning-foreground"),
        "link-border": hsla("warning-link-border"),
        "link-border-active": hsla("warning-link-border-active"),
        border: hsla("warning-border"),
      },
      danger: {
        DEFAULT: hsla("danger-background"),
        foreground: hsla("danger-foreground"),
        "link-border": hsla("danger-link-border"),
        "link-border-active": hsla("danger-link-border-active"),
        border: hsla("danger-border"),
      },
    },
    extend: {
      transitionProperty: {
        background: "background",
      },
      backgroundPosition: {
        underline: "0 100%",
      },
      backgroundSize: {
        "subtle-underline": "100% 0.0625em",
        "stark-underline": "100% 0.078125em",
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
}

export default config
