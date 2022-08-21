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
  // TODO: add some sort of fancy bottom border to make the spacing look more natural
  "#content > * > p:nth-of-type(1)": {
    pb: { base: 8, sm: 10 },
  },
  figure: {
    mb: 5,
  },
  "figure > figcaption": {
    mt: 2,
    textAlign: `center`,
    color: `spoilerText`,
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
