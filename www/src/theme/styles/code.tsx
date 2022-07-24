import semanticTokens from "../foundations/semantic-tokens";

const {
  colors: { codeHighlightBorderLeft },
} = semanticTokens;

const borderLeft = codeHighlightBorderLeft.default;

// NOTE: Syntax theme based Dan Abramov's theme
// (https://github.com/gaearon/overreacted.io/blob/master/src/utils/global.css)
// with small tweaks, which is on Sarah Drasner's Night Owl
// (https://github.com/sdras/night-owl-vscode-theme/) with small tweaks

// TODO: potentially make codeblocks bleed into the page edges on smaller sizes
const codeStyles = {
  "code[class*='language-'], pre[class*='language-']": {
    color: `white`,
    background: `none`,
    fontFamily: `mono`,
    fontFeatureSettings: `normal`,
    textAlign: `left`,
    whiteSpace: `pre`,
    wordSpacing: `normal`,
    wordBreak: `normal`,
    wordWrap: `normal`,
    lineHeight: 1.5,
    marginBottom: 0,

    MozTabSize: 4,
    OTabSize: 4,
    tabSize: 4,

    WebkitHyphens: `none`,
    MozHyphens: `none`,
    MsHyphens: `none`,
    hyphens: `none`,
  },

  // Code blocks
  "pre[class*='language-'] ": {
    overflow: `auto`,
    padding: `1.3125rem`,
  },
  "pre[class*='language-']::-moz-selection": {
    /* Firefox */
    background: `#27292a`, // hsl(207, 4%, 16%)
  },
  "pre[class*='language-']::selection": {
    /* Safari */
    background: `#27292a`, // hsl(207, 4%, 16%)
  },

  // Text Selection color
  // NOTE: spaces are important
  "pre[class*='language-']::-moz-selection, pre[class*='language-'] ::-moz-selection": {
    textShadow: `none`,
    background: `hsla(0, 0%, 100%, 0.15)`,
  },
  "pre[class*='language-']::selection, pre[class*='language-'] ::selection": {
    textShadow: `none`,
    background: `hsla(0, 0%, 100%, 0.15)`,
  },

  ":not(pre) > code[class*='language-']::-moz-selection, :not(pre) > code[class*='language-'] ::-moz-selection":
    {
      textShadow: `none`,
      background: `inlineCodeSelection`,
    },
  ":not(pre) > code[class*='language-']::selection, :not(pre) > code[class*='language-'] ::selection":
    {
      textShadow: `none`,
      background: `inlineCodeSelection`,
    },

  // Inline code
  ":not(pre) > code[class*='language-']": {
    borderRadius: `0.3em`,
    background: `inlineCodeBg`,
    color: `bgContrast`,
    padding: `0.15em 0.2em 0.05em`,
    whiteSpace: `normal`,
  },

  // Tokens
  ".token.attr-name": {
    color: `rgb(173, 219, 103)`,
    fontStyle: `italic`,
  },
  ".token.comment": {
    color: `rgb(128, 147, 147)`,
  },
  ".token.string, .token.url": {
    color: `rgb(173, 219, 103)`,
  },
  ".token.variable": {
    color: `rgb(214, 222, 235)`,
  },
  ".token.number": {
    color: `rgb(247, 140, 108)`,
  },
  ".token.builtin, .token.char, .token.constant, .token.function": {
    color: `rgb(130, 170, 255)`,
  },
  ".token.punctuation": {
    color: `rgb(199, 146, 234)`,
  },
  ".token.selector, .token.doctype": {
    color: `rgb(199, 146, 234)`,
    fontStyle: `italic`,
  },
  ".token.class-name": {
    color: `rgb(255, 203, 139)`,
  },
  ".token.tag, .token.operator, .token.keyword": {
    color: `#FFA7C4`,
  },
  ".token.boolean": {
    color: `rgb(255, 88, 116)`,
  },
  ".token.property": {
    color: `rgb(128, 203, 196)`,
  },
  ".token.namespace": {
    color: `rgb(178, 204, 214)`,
  },
  "pre[data-line]": {
    padding: `1em 0 1em 3em`,
    position: `relative`,
  },

  // TODO: look into a way to add border left without shifting the content
  ".gatsby-highlight-code-line": {
    backgroundColor: `codeHighlight`, // `hsla(207, 95%, 15%, 1)`,
    display: `block`,
    marginRight: `-1.3125rem`,
    marginLeft: `-1.3125rem`,
    paddingRight: `1em`,
    paddingLeft: `1.25em`,
    borderLeft: `0.25em solid ${borderLeft}`,
  },
  ".gatsby-highlight": {
    marginBottom: `1.75rem`,
    marginLeft: `-1.3125rem`,
    marginRight: `-1.3125rem`,
    borderRadius: { base: 0, sm: `10px` },
    background: `codeBg`,
    WebkitOverflowScrolling: `touch`,
    overflow: `auto`,
  },
  ".gatsby-highlight pre[class*='language-']": {
    float: `left`,
    minWidth: `100%`,
  },
};

export default codeStyles;
