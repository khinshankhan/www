import { ThemeOverride } from "@chakra-ui/react";

// fairly safe fallback in case something goes wrong with fonts
// default fonts copied from chakra ui
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/foundations/typography.ts
export const defaultFonts: ThemeOverride["fonts"] = {
  heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  mono: `SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
};

export const fonts: ThemeOverride["fonts"] = {
  heading: `'Crimson Pro', ${defaultFonts.heading}`,
  body: `'Inter', ui-serif, ${defaultFonts.body}`,
  mono: defaultFonts.mono,
};
