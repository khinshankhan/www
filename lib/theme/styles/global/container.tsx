export const containerStyles = {
  ".collapsible": {
    transition: "visibility 0s, opacity 0.5s ease-in-out, max-height 0.5s ease-in-out",
    visibility: "visible",
    opacity: 1,
    "&[class*='closed']": {
      transition: "visibility 0.5s, opacity 0.5s ease-in-out, max-height 0.5s ease-in-out",
      visibility: "collapse",
      opacity: 0,
      maxHeight: 0,
      overflow: "hidden",
    },
  },

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
