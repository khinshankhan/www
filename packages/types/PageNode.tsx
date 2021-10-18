import { EnhancedMdxNode } from "./MdxNode";

export interface PageNode extends EnhancedMdxNode {
  frontmatter: {
    planted: string;
    tended: string;
    categories: string[];
    published: boolean;
  };
}
