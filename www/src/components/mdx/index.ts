import a from "./a";
import deleteMb from "./deleteMb";
import headings from "./headings";
import li from "./li";
import ol from "./ol";
import p from "./p";
import ul from "./ul";

export const components = {
  p,
  ...headings,
  ul,
  ol,
  li,
  a,
  deleteMb,
};
