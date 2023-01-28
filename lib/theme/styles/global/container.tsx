export const containerStyles = {
  // based off https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/layout/src/link-box.tsx
  ".link-overlay": {
    position: "static",
    "&:before": {
      content: "''",
      cursor: "inherit",
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      width: "100%",
      height: "100%",
    },
  },
  ".link-box": {
    isolation: "isolate",
    position: "relative",
    // elevate elements that are interactable
    // also give special linkbox-elevate class privledge as a catchall
    "a[href]:not(.link-overlay), button, .linkbox-elevate": {
      position: "relative",
      zIndex: 1,
    },
  },
};

export default containerStyles;
