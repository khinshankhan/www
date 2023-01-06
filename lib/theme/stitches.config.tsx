import { createStitches } from "@stitches/react";
import {
  resetStyles,
  bgStyles,
  containerStyles,
  mediaStyles,
  normalizeStyles,
  typographyStyles,
} from "./styles";
import foundations from "./foundations";
import { colors, darkColors } from "./foundations/colors";

export const media = {
  xs: "(min-width: 392px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1150px)",
  xl: "(min-width: 1325px)",
  "2xl": "(min-width: 1536px)",

  isMobile: "(max-width: 768px)",
  isDesktop: "not (max-width: 768px)",

  motion: "(prefers-reduced-motion)",
  hover: "(any-hover: hover)",

  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
};

export const { styled, css, getCssText, createTheme, globalCss } = createStitches({
  prefix: "anchorage",
  media,
  theme: {
    ...foundations,
    colors: {
      ...colors,
      text: "$gray12",
      background: "$mauve2",

      placeholder: "black",
      border: "$gray12",

      link: "$plum7",
      linkActive: "$plum8",

      logoFg: "$gray12",
      logoBg: "transparent",
      logoBorder: "$logoFg",

      navBg: "rgba(237, 242, 247, 0.99)",
      iconBg: "rgba(0, 0, 0, 0.12)",
    },
    icons: {
      // https://yoksel.github.io/url-encoder/
      // https://github.com/atisawd/boxicons/blob/master/svg/regular/bx-anchor.svg
      /*
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m22 15-3-4-3 4h1.906c-.436 2.469-2.438 4.471-4.906 4.906V13h2v-2h-2V9.336c1.543-.459 2.714-1.923 2.714-3.621C15.714 3.666 14.048 2 12 2S8.286 3.666 8.286 5.715c0 1.698 1.171 3.162 2.714 3.621V11H9v2h2v6.906C8.531 19.471 6.529 17.469 6.094 15H8l-3-4-3 4h2.073c.511 3.885 3.929 7 7.927 7s7.416-3.115 7.927-7H22zM10.286 5.715C10.286 4.77 11.055 4 12 4s1.714.77 1.714 1.715c0 .951-.801 1.785-1.714 1.785s-1.714-.834-1.714-1.785z"/></svg>
       */
      // plum8 #883894
      linkBefore: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath stroke='%23883894' fill='%23883894' d='m22 15-3-4-3 4h1.906c-.436 2.469-2.438 4.471-4.906 4.906V13h2v-2h-2V9.336c1.543-.459 2.714-1.923 2.714-3.621C15.714 3.666 14.048 2 12 2S8.286 3.666 8.286 5.715c0 1.698 1.171 3.162 2.714 3.621V11H9v2h2v6.906C8.531 19.471 6.529 17.469 6.094 15H8l-3-4-3 4h2.073c.511 3.885 3.929 7 7.927 7s7.416-3.115 7.927-7H22zM10.286 5.715C10.286 4.77 11.055 4 12 4s1.714.77 1.714 1.715c0 .951-.801 1.785-1.714 1.785s-1.714-.834-1.714-1.785z'/%3E%3C/svg%3E")`,
    },
  },
});

export const darkTheme = createTheme("dark", {
  colors: {
    ...darkColors,
    background: "rgb(23, 25, 35)",

    placeholder: "white",

    navBg: "rgba(14, 14, 26, 0.99)",
    iconBg: "rgba(255, 255, 255, 0.12)",
  },
  icons: {
    //plum8 #cf91d8
    linkBefore: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath stroke='%23cf91d8' fill='%23cf91d8' d='m22 15-3-4-3 4h1.906c-.436 2.469-2.438 4.471-4.906 4.906V13h2v-2h-2V9.336c1.543-.459 2.714-1.923 2.714-3.621C15.714 3.666 14.048 2 12 2S8.286 3.666 8.286 5.715c0 1.698 1.171 3.162 2.714 3.621V11H9v2h2v6.906C8.531 19.471 6.529 17.469 6.094 15H8l-3-4-3 4h2.073c.511 3.885 3.929 7 7.927 7s7.416-3.115 7.927-7H22zM10.286 5.715C10.286 4.77 11.055 4 12 4s1.714.77 1.714 1.715c0 .951-.801 1.785-1.714 1.785s-1.714-.834-1.714-1.785z'/%3E%3C/svg%3E")`,
  },
});

export const GlobalStyles = globalCss({
  // get rid of browser default, leaving everything unstyled
  ...resetStyles,

  // apply website styles sanely
  body: {
    background: "$background",
    color: "$text",

    fontFamily: "$body",
    lineHeight: "$base",
    fontSize: "$lg", // 18px
    "@lg": {
      fontSize: "1.3125rem", // 21px
    },
    "@2xl": {
      fontSize: "1.43775rem", // ~23px, avg 21px and $xl
    },

    "*::placeholder": {
      color: "$color$placeholder",
    },
    "*, *::before, &::after": {
      borderColor: "$color$border",
      wordWrap: "break-word",
    },

    ...mediaStyles,
    ...bgStyles,
    ...containerStyles,
    ...typographyStyles,
    ...normalizeStyles,
  },
});
