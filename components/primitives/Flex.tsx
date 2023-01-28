import { styled } from "lib/theme";
import { createProperties } from "./util";

export const Flex = styled("div", {
  display: "flex",

  variants: {
    flexDirection: {
      ...createProperties("flexDirection", [
        "row",
        "row-reverse",
        "column",
        "column-reverse",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
      ] as const),
    },
    justifyContent: {
      ...createProperties("justifyContent", [
        "center",
        "start",
        "end",
        "flex-start",
        "flex-end",
        "left",
        "right",
        "normal",
        "space-between",
        "space-around",
        "space-evenly",
        "stretch",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
      ] as const),
    },
    alignItems: {
      ...createProperties("alignItems", [
        "normal",
        "stretch",
        "center",
        "start",
        "end",
        "flex-start",
        "flex-end",
        "baseline",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
      ] as const),
    },
    flexWrap: {
      ...createProperties("flexWrap", [
        "nowrap",
        "wrap",
        "wrap-reverse",
        "inherit",
        "initial",
        "revert",
        "revert-layer",
        "unset",
      ] as const),
    },
  },
  defaultVariants: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "stretch",
    flexWrap: "noWrap",
  },
});

export default Flex;
