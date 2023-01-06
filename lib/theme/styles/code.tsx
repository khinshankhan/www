// TODO: figure out file titles
// TODO: figure out copy button
// TODO: potentially make codeblocks bleed into the page edges on smaller sizes?
export const codeStyles = {
  // out of the box rehype pretty displays both codeblocks
  "div > *[data-theme='light']": {
    display: "$display$codeLight",
  },
  "div > *[data-theme='dark']": {
    display: "$display$codeDark",
  },
  "span[data-rehype-pretty-code-fragment] > *[data-theme='light']": {
    display: "$display$inlineCodeLight",
  },
  "span[data-rehype-pretty-code-fragment] > *[data-theme='dark']": {
    display: "$display$inlineCodeDark",
  },

  // reset formatting for the block
  "span[data-rehype-pretty-code-fragment] > code[data-language]": {
    backgroundColor: "$codeBg",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
  },
  "div > pre[data-language]": {
    textAlign: "left",
    padding: "1.3125rem",
    backgroundColor: "$codeBg",
  },

  "div > pre[data-language] > code": {
    display: "grid",
  },
  "div > pre[data-language] > code > span": {
    display: "inline-block",
    width: "100%",
  },

  "div > pre[data-language] > code[data-line-numbers]": {
    counterReset: "line",
    "& > .line::before": {
      counterIncrement: "line",
      content: "counter(line)",

      display: "inline-block",
      width: "1rem",
      marginRight: "2rem",
      textAlign: "right",
      color: "gray",
    },
  },

  "div > pre[data-language] > code > span.line.highlighted": {
    backgroundColor: "$codeHighlightBg",
    borderLeft: "0.25em solid $amber6",
  },
  "div > pre[data-language] > code > span.line:not(.highlighted)": {
    paddingLeft: "0.25em",
  },
};

export default codeStyles;
