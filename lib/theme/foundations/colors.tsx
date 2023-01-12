import {
  mauve,
  mauveDark,
  plum,
  plumDark,
  gray,
  grayDark,
  plumA,
  plumDarkA,
  amber,
  amberDark,
  green,
  greenDark,
} from "@radix-ui/colors";

// consider these to be mostly light theme
export const colors = {
  ...gray,
  ...mauve,
  ...plumDark,
  ...plumDarkA,
  ...amberDark,
  ...green,

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
  codeTitleBg: "hsla(0, 0%, 85%, 1)",
  codeBg: "hsla(0, 0%, 100%, 1)",
  codeHighlightBg: "hsla(0, 0%, 95%, 0.95)",
  codeWordHighlightBg: "$amber12",
  codeWordHighlightFg: "$amber6",
};

// override any light theme same key names
// try to keep shared colors within colors
export const darkColors = {
  ...grayDark,
  ...mauveDark,
  ...plum,
  ...plumA,
  ...amber,
  ...greenDark,

  background: "rgb(23, 25, 35)",

  placeholder: "white",

  navBg: "rgba(14, 14, 26, 0.99)",
  iconBg: "rgba(255, 255, 255, 0.12)",
  codeTitleBg: "hsla(220, 26%, 25%, 1)",
  codeBg: "hsla(220, 26%, 14%, 1)",
  codeHighlightBg: "hsla(218, 23%, 20%, 0.95)",
};
