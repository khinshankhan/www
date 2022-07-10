import { ArticleNode } from "./Nodes";
import { Subset } from "./utils";

export type WritingCardNode = Subset<
  ArticleNode,
  {
    frontmatter: {
      title: string;
      spoiler?: string;

      planted: string;
      tended: string;

      tags?: string[];
    };
    fields: {
      slug: string;
      status: string;
    };
  }
>;
