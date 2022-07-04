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

  id: string;
}

export type WritingCardNodes = WritingCardNode[];
