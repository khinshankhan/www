import Slugger from "github-slugger";
import type { Root as MdastRoot } from "mdast";
import type { Transformer } from "unified";
import { SKIP, visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export interface TocItem {
  id: string;
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

// only need one slugger instance for the entire build
const slugger = new Slugger();

export function remarkTocExport(): Transformer<MdastRoot, MdastRoot> {
  return function transformer(tree, vfile) {
    const toc: TocItem[] = [];
    vfile.data.toc = toc;

    // slugger is reset per file so that the same heading text in different files can have the same slug
    slugger.reset();

    /**
     * NOTE:
     * "heading" is a node type in mdast representing markdown headings such as #, ##, ###, etc.
     * This node type does not refer to the <h1>, <h2>, <h3>, etc. HTML tags at the mdast level.
     * At the mdast level, <h1>, <h2>, <h3>, etc. are considered "html" nodes, and this plugin won't support them.
     */
    visit(tree, "heading", function (node) {
      const value = toString(node, { includeImageAlt: false });

      toc.push({
        id: `#${slugger.slug(value)}`,
        text: value,
        level: node.depth,
      });

      return SKIP;
    });

    vfile.data.toc = toc;
  };
}
