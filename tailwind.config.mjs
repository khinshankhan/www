import tailwindcssAnimate from "tailwindcss-animate"

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
      knockout: hsla("knockout"),
      border: hsla("border"),
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
    },
  },
}

export default config
