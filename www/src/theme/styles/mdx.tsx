// NOTE: `#content > * >` limits to prose elements (* is container)
export const normalizeElements = {
  "#content > * > :where(h2, h3, h4, h5, h6, p, ol, ul)": {
    mb: 5,
  },
  "#content > * > p+:where(ol, ul)": {
    mt: -5,
  },
  "#content > * > :where(ol, ul) > li > p": {
    mb: 0,
  },
};

export const fancyFirstLetter = {
  "#content > * > p:nth-of-type(1)::first-letter": {
    color: `primary`,
    float: `left`,
    fontWeight: `bold`,
    fontSize: { base: `5rem`, lg: `6rem` },
    lineHeight: { base: `3.375rem` },
  },
};
