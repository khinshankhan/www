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

      properties["data-raw"] = toString(node);
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
  return (tree: any) => {
    visit(tree, "element", (node, i, parent) => {
      const index = i as number;
      if (
        node.type !== "element" ||
        node?.tagName !== "div" ||
        !("codeblock" in node?.properties ?? {})
      ) {
        return;
      }

      const pre1 = node.children[0].children[0];
      const pre2 = node.children[0].children[1];

      const rootProperties = node.properties;
      pre1.properties = { ...pre1.properties, ...rootProperties };
      pre2.properties = { ...pre2.properties, ...rootProperties };

      parent.children.splice(index, 1, pre1, pre2);
      return [SKIP, index + 1];
    });
  };
}
