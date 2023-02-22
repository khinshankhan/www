const config = require("./lib/theme/config")

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
    screens: config.screens,
    zIndex: config.zIndex,
    fontFamily: config.fontFamily,
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
