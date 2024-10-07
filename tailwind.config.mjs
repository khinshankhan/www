/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./content/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  darkMode: ["class"],
  safelist: ["light", "dark"],
  plugins: [],
  theme: {
    screens: {
      xss: "20rem", // 320px
      xs: "24.5rem", // 392px
      sm: "40rem", // 640px
      md: "48rem", // 768px -- this is the boundary between mobile vs desktop
      lg: "64rem", // 1024px
      xl: "82.8125rem", // 1325px
      "2xl": "96rem", // 1536px
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
      // although generally the semantic tokens should be used for z-indices
      // 1 and 2 are acceptable if scoped properly in my humble opinion
      1: "1",
      2: "2",
    },
    extend: {},
  },
};
