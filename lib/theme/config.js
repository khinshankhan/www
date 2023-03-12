const screens = {
  xss: "320px",
  xs: "392px",
  sm: "640px",
  md: "768px",
  lg: "1150px",
  xl: "1325px",
  "2xl": "1536px",

  // usually I think in terms of this for design
  // isMobile to isDesktop should have no gap ergo
  // -1 so it doesn't encompass 768
  isMobile: { max: "767px" },
  isDesktop: "768px",
}

const zIndex = {
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
}

const fontFamily = {
  heading: [
    "var(--font-heading)",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  body: [
    "var(--font-body)",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"',
  ],
  mono: [
    "var(--font-mono)",
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace",
  ],
}

module.exports = {
  screens,
  fontFamily,
  zIndex,
}
