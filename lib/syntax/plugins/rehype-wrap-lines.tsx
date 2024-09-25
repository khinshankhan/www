// Inspired by https://github.com/radix-ui/website/blob/52578d3c5956b26c117ad8328ee40ecc6170b648/utils/rehype-highlight-line.mjs

import { RootContent, type Root as HastRoot } from "hast"
import { toHtml as hastToHtml } from "hast-util-to-html"
import parse from "rehype-parse"
import { unified } from "unified"

// https://github.com/gatsbyjs/gatsby/pull/26161/files
const MULTILINE_TOKEN_SPAN = /<span class="token ([^"]+)">[^<]*\n[^<]*<\/span>/g

function applyMultilineFix(ast: HastRoot) {
  const html = hastToHtml(ast).replace(MULTILINE_TOKEN_SPAN, (match, token) =>
    match.replace(/\n/g, `</span>\n<span class="token ${token}">`)
  )

  const hast = unified().use(parse, { emitParseErrors: true, fragment: true }).parse(html)
  return hast.children
}

interface LineNumberifyResult {
  nodes: (RootContent & { lineNumber: number })[]
  lineNumber: number
}

const lineNumberify = function lineNumberify(
  ast: RootContent[],
  lineNum: number = 1
): LineNumberifyResult {
  let lineNumber = lineNum

  return ast.reduce<LineNumberifyResult>(
    (result, node) => {
      if (node.type === "text") {
        // no newline, just assign line number
        if (node.value.indexOf("\n") === -1) {
          const currentNode = { ...node, lineNumber }
          result.nodes.push(currentNode)
          return result
        }

        // split the text by newlines and assign line numbers accordingly
        const lines = node.value.split("\n")
        for (let i = 0; i < lines.length; i++) {
          // increment line number *after* the first line (first line = initial carry over number)
          if (i !== 0) lineNumber++
          // skip empty last line
          if (i === lines.length - 1 && lines[i].length === 0) continue

          result.nodes.push({
            type: "text",
            value: i === lines.length - 1 ? lines[i] : `${lines[i]}\n`,
            lineNumber,
          })
        }

        result.lineNumber = lineNumber
        return result
      }

      // if the node has children, recursively apply lineNumberify
      if ("children" in node) {
        const currentNode = { ...node, lineNumber }
        const processed = lineNumberify(node.children, lineNumber)
        // @ts-expect-error: too lazy to rewrite RootContent children to expect lineNumber recursively
        currentNode.children = processed.nodes
        result.lineNumber = processed.lineNumber
        result.nodes.push(currentNode)
        return result
      }

      // push the node as it is if it's not a text or an element with children
      result.nodes.push({ ...node, lineNumber })
      return result
    },
    { nodes: [], lineNumber }
  )
}

type DetermineClasses = (index: number) => string

function wrapLines(
  ast: (RootContent & { lineNumber: number })[],
  determineClasses: DetermineClasses
) {
  // get all unique line numbers from the AST nodes
  const allLines = Array.from(new Set(ast.map((x) => x.lineNumber)))

  let i = 0
  const wrapped = allLines.reduce<RootContent[]>((nodes, marker) => {
    const line = marker
    const children = []
    // collect all children for the current line
    // multiple children tend to belong to 1 line
    for (; i < ast.length; i++) {
      // NOTE: a bit confused here, will circle back to it
      if (ast[i].lineNumber < line) {
        nodes.push(ast[i])
        continue
      }

      // collect nodes belonging to the current line
      if (ast[i].lineNumber === line) {
        children.push(ast[i])
        continue
      }

      // process next line in the next iteration
      if (ast[i].lineNumber > line) {
        break
      }
    }

    // this is the line element, opt to use a span to avoid any loss of flow
    nodes.push({
      type: "element",
      tagName: "span",
      properties: {
        dataLine: line,
        className: determineClasses(line),
      },
      // @ts-expect-error: children has lineNumber attached to it (which is probably fine as hast just ignored unknown properties unless they're data properties)
      children: children,
      lineNumber: line,
    })

    return nodes
  }, [])

  return wrapped
}

export function rehypeWrapLines(ast: HastRoot, determineClasses: DetermineClasses = () => "line") {
  const formattedAst = applyMultilineFix(ast)
  const numbered = lineNumberify(formattedAst).nodes

  return wrapLines(numbered, determineClasses)
}

export default rehypeWrapLines
