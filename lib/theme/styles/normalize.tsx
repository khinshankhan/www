export const normalizeStyles = {
  "#content > :where(h2, h3, h4, h5, h6, p, ol, ul)": {
    marginBottom: "20px",
  },
  "#content > ol, ul": {
    listStyle: "inside",
  },
  "#content > p+:where(ol, ul)": {
    marginTop: "-20px",
  },
  "#content > :where(ol, ul) > li > p": {
    marginBottom: 0,
  },
  "#content > p:nth-of-type(1)::first-letter": {
    fontWeight: `$black`,
    "@xs": {
      color: `$mauve12`,
      float: `left`,
      lineHeight: `3.375rem`,
      fontSize: `5rem`,
      "@lg": {
        fontSize: `6rem`,
      },
    },
  },
};

export default normalizeStyles;
