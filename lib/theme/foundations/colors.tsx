import { blackA, whiteA, slate, slateA, mauve, mauveDark } from "@radix-ui/colors";

// consider these to be mostly light theme
export const colors = {
  ...blackA,
  ...whiteA,
  ...slate,
  ...slateA,
  ...mauve,

  plumblossom: "#F2A0A1",
  sakurarose: "#FFB7C5",
};

// override any light theme same key names
// try to keep shared colors within colors
export const darkColors = {
  ...mauveDark,
};
