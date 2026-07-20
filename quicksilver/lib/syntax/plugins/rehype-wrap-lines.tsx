/* eslint-disable */
// @ts-nocheck

// TODO: review and rewrite this logic with new available types and constructs

// Inspired by https://github.com/radix-ui/website/blob/52578d3c5956b26c117ad8328ee40ecc6170b648/utils/rehype-highlight-line.mjs

import type { Root as HastRoot, RootContent } from "hast"

// Split multiline token elements before assigning line numbers.
function endsWithNewline(node: RootContent): boolean {
  if (node.type === "text") return node.value.endsWith("\n")
  if ("children" in node && node.children.length > 0) {
    return endsWithNewline(node.children[node.children.length - 1])
  }
  return false
}

function splitMultilineNodes(nodes: RootContent[]): RootContent[] {
  return nodes.flatMap((node) => {
    if (node.type === "text") {
      const pieces = node.value.match(/[^\n]*\n|[^\n]+/g) ?? []
      return pieces.map((value) => ({ ...node, value }))
    }
    if (!("children" in node) || node.children.length === 0) return [node]

    const groups: RootContent[][] = [[]]
    for (const kid of splitMultilineNodes(node.children)) {
      groups[groups.length - 1].push(kid)
      if (endsWithNewline(kid)) groups.push([])
    }
    if (groups[groups.length - 1].length === 0) groups.pop()

    return groups.map((children) => ({ ...node, children }))
  })
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
        if (node.value.indexOf("\n") === -1) {
          const currentNode = { ...node, lineNumber }
          result.nodes.push(currentNode)
          return result
        }

        const lines = node.value.split("\n")
        for (let i = 0; i < lines.length; i++) {
          if (i !== 0) lineNumber++
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

      if ("children" in node) {
        const currentNode = { ...node, lineNumber }
        const processed = lineNumberify(node.children, lineNumber)
        // @ts-expect-error: RootContent children do not include lineNumber
        currentNode.children = processed.nodes
        lineNumber = processed.lineNumber
        result.lineNumber = lineNumber
        result.nodes.push(currentNode)
        return result
      }

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
  const allLines = Array.from(new Set(ast.map((x) => x.lineNumber)))

  let i = 0
  const wrapped = allLines.reduce<RootContent[]>((nodes, marker) => {
    const line = marker
    const children = []
    for (; i < ast.length; i++) {
      if (ast[i].lineNumber < line) {
        nodes.push(ast[i])
        continue
      }

      if (ast[i].lineNumber === line) {
        children.push(ast[i])
        continue
      }

      if (ast[i].lineNumber > line) {
        break
      }
    }

    nodes.push({
      type: "element",
      tagName: "span",
      properties: {
        dataLine: line,
        className: determineClasses(line),
      },
      // @ts-expect-error: children carry lineNumber metadata
      children: children,
      lineNumber: line,
    })

    return nodes
  }, [])

  return wrapped
}

export function rehypeWrapLines(ast: HastRoot, determineClasses: DetermineClasses = () => "line") {
  const split = splitMultilineNodes(ast.children)
  const numbered = lineNumberify(split).nodes

  return wrapLines(numbered, determineClasses)
}

export default rehypeWrapLines
