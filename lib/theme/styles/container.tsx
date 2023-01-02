export const containerStyles = {
  ".page-container": {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",

    maxWidth: "95%",
    "@sm": {
      maxWidth: "90%",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
    },
    "@lg": {
      maxWidth: "1024px",
    },
    "@2xl": {
      maxWidth: "1325px",
    },
  },

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
};

export default containerStyles;
