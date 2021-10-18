import { EnhancedMdxNode } from "./MdxNode";

export interface WritingNode extends EnhancedMdxNode {
  frontmatter: {
    planted: string;
    tended: string;
    categories: string[];
    published: boolean;
  };
}
