import type { LanguageFn } from "lowlight"

export const mermaidLanguage: LanguageFn = (hljs) => {
  const DIRECTION = {
    scope: "literal",
    match: /\b(?:TB|TD|BT|RL|LR)\b/,
  }

  const ARROW = {
    scope: "operator",
    match: /<?[-.=x]+>?/,
  }

  const LABEL_DELIMITER = {
    scope: "punctuation",
    match: /[[]{}()|]/,
  }

  const BACKTICK_STRING = {
    scope: "string",
    begin: /`/,
    end: /`/,
    contains: [hljs.BACKSLASH_ESCAPE],
  }

  return {
    name: "Mermaid",
    aliases: ["mmd"],
    keywords: {
      keyword: [
        "graph",
        "flowchart",
        "sequenceDiagram",
        "classDiagram",
        "stateDiagram",
        "stateDiagram-v2",
        "erDiagram",
        "journey",
        "gantt",
        "pie",
        "gitGraph",
        "mindmap",
        "timeline",
        "quadrantChart",
        "requirementDiagram",
        "sankey-beta",
        "architecture",
        "block-beta",
        "xychart-beta",
        "subgraph",
        "end",
        "direction",
        "classDef",
        "class",
        "style",
        "linkStyle",
        "click",
        "call",
        "section",
        "title",
        "participant",
        "actor",
        "as",
        "loop",
        "alt",
        "else",
        "opt",
        "par",
        "and",
        "break",
        "critical",
        "option",
        "rect",
        "note",
        "over",
        "activate",
        "deactivate",
      ].join(" "),
      literal: [
        "showData",
        "pieTitle",
        "accTitle",
        "accDescr",
        "accDescrMultiline",
        "dateFormat",
        "axisFormat",
        "tickInterval",
        "todayMarker",
      ].join(" "),
    },
    contains: [
      hljs.COMMENT(/%%/, /$/),
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.APOS_STRING_MODE,
      BACKTICK_STRING,
      hljs.NUMBER_MODE,
      DIRECTION,
      ARROW,
      LABEL_DELIMITER,
    ],
  }
}
