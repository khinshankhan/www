import { visit, SKIP, EXIT } from "unist-util-visit";

export default function rehypeMarkExcerpt() {
  return (tree: any) => {
    visit(tree, "element", (node) => {
      if (node.tagName != "p") return [SKIP];

      node.properties.id = "excerpt";
      return [EXIT];
    });
  };
}
