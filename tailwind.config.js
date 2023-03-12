const config = require("./lib/theme/config")

function rawHsla(variable, alpha) {
  return `hsla(var(--${variable}), ${alpha})`
}
function hsla(variable) {
  return rawHsla(variable, "<alpha-value>")
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
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
      collapsibleOpen: "collapsibleSlideDown 300ms ease-out",
      collapsibleClose: "collapsibleSlideUp 300ms ease-out",
    },
    keyframes: {
      spin: {
        to: {
          transform: "rotate(360deg)",
        },
      },
      ping: {
        "75%, 100%": {
          transform: "scale(2)",
          opacity: "0",
        },
      },
      pulse: {
        "50%": {
          opacity: ".5",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
        },
        "50%": {
          transform: "none",
          animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
        },
      },
      collapsibleSlideUp: {
        from: {
          height: "var(--radix-collapsible-content-height)",
        },
        to: {
          height: "0",
        },
      },
      collapsibleSlideDown: {
        from: {
          height: "0",
        },
        to: {
          height: "var(--radix-collapsible-content-height)",
        },
      },
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

      boxShadow: {
        tocBase: `inset 4px 0px 0px 0px ${rawHsla("link", 1)}`,
        tocOn: `inset 4px 0px 0px 0px ${rawHsla("link-on", 1)}`,
        subtleRing: `0px 0px 0px 1.5px`,
        ring: `0px 0px 0px 2px`,
      },
    },
  },
  plugins: [require("tailwindcss-hyphens")],
}
