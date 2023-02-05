import { visit, SKIP } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { extractFilenameFromMeta } from "../../utils/regex";

export function rehypeCodeblockFilename() {
  return (tree: any) => {
    visit(tree, "element", (node, i, parent) => {
      const index = i as number;
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }

      const properties: Record<string, string> = {
        codeblock: "",
      };
      const meta = node.children[0].data?.meta;
      if (meta != null) {
        const matches = [...meta.matchAll(extractFilenameFromMeta)];
        if (matches.length > 0) {
          const match = matches[0];
          if (match && match.length > 0) {
            const [, filename] = match;
            properties["data-filename"] = filename;
          }
        }
      }

      properties["data-raw"] = node.children[0].children[0].value;

      const codeblockMetaNode = {
        type: "element",
        tagName: "div",
        properties,
        children: [node],
      };

      parent.children.splice(index, 1, codeblockMetaNode);
      return [SKIP, index + 1];
    });
  };
}

export function rehypeCodeblockMeta() {
  return (tree: any) => {};
}
