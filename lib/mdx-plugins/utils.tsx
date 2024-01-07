import type { Node as MdastNode } from "mdast";

// NOTE: types are dumb, hProperties is not in the mdast types
export function setNodeProperty<T extends MdastNode>(
  node: T,
  attribute: string,
  value: string,
) {
  node.data = node.data || {};
  // @ts-expect-error: hProperties is not in the mdast types
  node.data.hProperties = node.data.hProperties || {};

  // @ts-expect-error: [attribute] does not exist on node since we're adding it
  node.data[attribute] = value;
  // @ts-expect-error: hProperties is not in the mdast types
  node.data.hProperties[attribute] = value;

  return node;
}
