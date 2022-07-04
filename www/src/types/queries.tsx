export interface MdxQuery<T> {
  allMdx: {
    nodes: T;
  };
}

export interface WritingCardNode {
  frontmatter: {
    title: string;
    spoiler?: string;
  };

  excerpt: string;
  id: string;
}

export type WritingCardNodes = WritingCardNode[];
