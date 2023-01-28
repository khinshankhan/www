import { globalCss, theme } from "../stitches.config";

// Reset browser defaults which may differ across browsers reducing inconsistencies
// From https://meyerweb.com/eric/tools/css/reset/
// And apply sane-ness, based off https://www.joshwcomeau.com/css/custom-css-reset/
// more based on https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/css-reset/src/css-reset.tsx
// the rest will be set in normalize since some styles are only meant for content
export const ResetStyles = globalCss({
  /* HTML5 display-role reset for older browsers */
  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section": {
    display: "block",
  },

  "ol, ul": {
    listStyle: "none",
  },

  "blockquote, q": {
    quotes: "none",
  },
  "blockquote:before, blockquote:after, q:before, q:after": {
    content: "''",
    "@supports (content: none)": {
      content: "none",
    },
  },

  table: {
    borderCollapse: "collapse",
    borderSpacing: "0",
  },

  "*": {
    margin: 0,
    padding: 0,
    border: 0,
    font: "inherit",
  },

  "*, *::before, *::after": {
    borderColor: theme.colors.border,
    borderWidth: 0,
    borderStyle: "solid",
    // https://css-tricks.com/international-box-sizing-awareness-day/
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    boxSizing: "border-box",
  },

  html: {
    height: "100%",
    WebkitTextSizeAdjust: "100%",
    WebkitFontSmoothing: "antialiased",
    textRendering: "optimizeLegibility",
    MozOsxFontSmoothing: "grayscale",
    touchAction: "manipulation",
    scrollBehavior: "smooth",
  },

  body: {
    height: "100%",
    position: "relative",
    minHeight: "100%",

    WebkitFontFeatureSettings: "'kern'",
    MozFontFeatureSettings: "'kern'",
    fontFeatureSettings: "'kern'",
  },

  "img, picture, svg, video, canvas, audio, iframe, embed, object": {
    display: "block",
    maxWidth: "100%",
    height: "auto",
  },

  "input, button, textarea, select": {
    font: "inherit",
  },

  "p, h1, h2, h3, h4, h5, h6": {
    overflowWrap: "break-word",
  },

  "#root, #__next": {
    isolation: "isolate",
  },
});
