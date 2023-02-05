import { visit, SKIP, EXIT } from "unist-util-visit";

export function rehypeMarkExcerpt() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName != "p") return [SKIP];

      node.properties.id = "excerpt";
      return [EXIT];
    });
  };
}

export default rehypeMarkExcerpt;
