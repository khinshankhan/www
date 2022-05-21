export type WritingNode = {
  fields: {
    slug: string;
    tags: string[];
  };
  frontmatter: {
    title: string;
  };
  excerpt: string;
  id: string;
};
