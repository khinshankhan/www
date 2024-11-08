import type { Node as MdastNode } from "mdast"

// NOTE: types are dumb, Data represents information associated by the ecosystem with the node.
// This space is guaranteed to never be specified by unist or specifications implementing unist.
// Would be nice if the types were like Record<string, unknown> instead but it's not.
// https://github.com/syntax-tree/unist/blob/main/readme.md#data
export function setNodeProperty<T extends MdastNode>(node: T, attribute: string, value: string) {
  node.data = node.data || {}
  node.data.hProperties = node.data.hProperties || {}

  // @ts-expect-error: variable attributes is not in the Data type
  node.data[attribute] = value
  node.data.hProperties[attribute] = value

  return node
}
