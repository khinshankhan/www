import type { ArticleNode, Cover } from "./Nodes";
import type { Subset } from "./utils";

export type WritingCardNode = Subset<
  ArticleNode,
  {
    fields: {
      slug: string;
      status: string;
      subtitle: string;
    };
    frontmatter: Cover & {
      title: string;

      planted: string;
      tended: string;

      tags?: string[];
    };
    excerpt: string;
  }
>;

export type MdxCreationNode<T extends ArticleNode> = Subset<
  T,
  { fields: { slug: string }; frontmatter: { title: string } }
> & {
  internal: { contentFilePath: string };
};
