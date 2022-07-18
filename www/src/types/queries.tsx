import { ArticleNode } from "./Nodes";
import { Subset } from "./utils";

export type WritingCardNode = Subset<
  ArticleNode,
  {
    fields: {
      slug: string;
      status: string;
      subtitle: string;
    };
    frontmatter: {
      title: string;

      planted: string;
      tended: string;

      tags?: string[];
    };
    excerpt: string;
    timeToRead: number;
  }
>;
