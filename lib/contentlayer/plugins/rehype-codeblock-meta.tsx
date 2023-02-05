import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export function rehypeCodeblockMeta() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }

      node.properties["data-raw"] = toString(node);
    });
  };
}

export default rehypeCodeblockMeta;
