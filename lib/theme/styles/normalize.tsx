export const normalizeStyles = {
  "#article > :where(h2, h3, h4, h5, h6, p, ol, ul)": {
    marginBottom: "20px",
  },
  "#article > ol, ul": {
    listStyle: "inside",
  },
  "#article > p+:where(ol, ul)": {
    marginTop: "-20px",
  },
  "#article > :where(ol, ul) > li > p": {
    marginBottom: 0,
  },
};

export default normalizeStyles;
