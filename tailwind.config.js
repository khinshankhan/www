function hsla(variable) {
  return `hsla(var(--${variable}), <alpha-value>)`
}

function hslaN({ variable, n, scale = 1 }) {
  return Array.from({ length: n }, (_, index) => index + 1).reduce((stored, num) => {
    const key = num * scale
    return {
      ...stored,
      [key]: hsla(`${variable}${key}`),
    }
  }, {})
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xss: "320px",
      xs: "392px",
      sm: "640px",
      md: "768px",
      lg: "1150px",
      xl: "1325px",
      "2xl": "1536px",

      // usually I think in terms of this for design
      isMobile: { max: "768px" },
      isDesktop: "768px",
    },
    zIndex: {
      hide: -1,
      auto: "auto",
      base: 0,
      docked: 10,
      dropdown: 1000,
      sticky: 1100,
      banner: 1200,
      overlay: 1300,
      modal: 1400,
      popover: 1500,
      skipLink: 1600,
      toast: 1700,
      tooltip: 1800,
      // although generally the semantic tokens should be used for zindices
      // 1 and 2 are acceptable if scoped properly imho
      up1: 1,
      up2: 2,
    },
    extend: {
      colors: {
        gray: hslaN({ variable: "gray", n: 12 }),
        mauve: hslaN({ variable: "mauve", n: 12 }),
        plum: hslaN({ variable: "plum", n: 12 }),
        violet: hslaN({ variable: "violet", n: 12 }),
        bluegray: hslaN({ variable: "bluegray", n: 12 }),

        theme: {
          bg: hsla("bg"),
          contentBg: hsla("content-bg"),
          placeholder: hsla("placeholder"),
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
    },
  },
  plugins: [],
}
