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

  // default formatting for the block
  "span[data-rehype-pretty-code-fragment] > code[data-language]": {
    backgroundColor: "$codeBg",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
  },
  "div[data-rehype-pretty-code-title]":{
    textAlign: "left",
    backgroundColor: "$codeTitleBg",
    padding: "0.25rem 1.3125rem",
    borderRadius: "12px 12px 0 0",
  },
  "div[data-rehype-pretty-code-fragment]": {
    marginBottom: "20px",
  } ,
  "pre[data-language]": {
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    overflowX: "auto",
    backgroundColor: "$codeBg",
    padding: "0.25rem 1.3125rem 1.3125rem 1.3125rem",
    borderRadius: "0 0 12px 12px",
  },

  ":not(div[data-rehype-pretty-code-title]) + pre[data-language]": {
    padding: "1.3125rem",
    borderRadius: "12px",
  },

  "pre[data-language] > code": {
    display: "grid",
  },
  "pre[data-language] > code > span": {
    display: "inline-block",
    width: "100%",
  },

  "pre[data-language] > code[data-line-numbers]": {
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

  "pre[data-language] > code > span.line.highlighted": {
    backgroundColor: "$codeHighlightBg",
    borderLeft: "0.25em solid $amber6",
  },
  "pre[data-language] > code > span.line:not(.highlighted)": {
    paddingLeft: "0.25em",
  },

  "code > span.line > span[class^='word-highlighted-']": {
    color: "$codeWordHighlightFg",
    backgroundColor: "$codeWordHighlightBg",
  },
};

export default codeStyles;
