import { config } from "./stitches.config";

// type safe way of using media queries
export const media = (token: keyof typeof config.media | "initial") => `@${token}`;

// use multiple media tokens together
export const combineSelectors = (...media: string[]) => media.filter(Boolean).join(", ");

// Adapted from https://github.com/LekoArts/portfolio-v2/blob/main/www/src/styles/selectors.t
// Who adapted from https://github.com/chakra-ui/chakra-ui/
// MIT License - Copyright (c) 2019 Segun Adebayo
const pseudoSelectors = {
  hover: `&:hover, &[data-hover]`,
  active: `&:active, &[data-active]`,
  focus: `&:focus, &[data-focus]`,
  focusWithin: `&:focus-within`,
  focusVisible: `&:focus-visible, &[data-focus-visible]`,
  disabled: `&[disabled], &[aria-disabled=true], &[data-disabled]`,
  readOnly: `&[aria-readonly=true], &[readonly], &[data-readonly]`,
  before: `&::before`,
  after: `&::after`,
  empty: `&:empty`,
  selected: `&[aria-selected=true], &[data-selected]`,
  hidden: `&[hidden], &[data-hidden]`,
  even: `&:nth-of-type(even)`,
  odd: `&:nth-of-type(odd)`,
  first: `&:first-of-type`,
  last: `&:last-of-type`,
  notFirst: `&:not(:first-of-type)`,
  notLast: `&:not(:last-of-type)`,
};

export const mediaSelectors = {
  ...pseudoSelectors,
  at: combineSelectors(
    pseudoSelectors.active,
    pseudoSelectors.hover,
    pseudoSelectors.focus,
    pseudoSelectors.focusVisible
  ),

  // based off paco next-themes in pages/_app.tsx
  // NOTE: only usable in global css on html since html property gets data-theme
  // I suppose some components could have controllable light dark variants(?)
  light: `.light, &.light`,
  dark: `.dark, &.dark`,
};

// like combineMedia but restrict to selectors
export const selectMedia = (...selectors: (keyof typeof mediaSelectors)[]) =>
  selectors
    .filter(Boolean)
    .map((selector) => mediaSelectors[selector])
    .join(", ");
