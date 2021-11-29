import { graphql, useStaticQuery } from "gatsby";

export type IListWritingNodes = {
  allMdx: {
    edges: IWritingNodeWrapper[];
  };
};

export type IWritingNodeWrapper = {
  node: IWritingNode;
};

export type IWritingNode = {
  fields: {
    slug: string;
    tags: string[];
  };
  frontmatter: {
    title: string;
    planted: string;
    humanDatePlanted: string;
  };
  slug: string;
  excerpt: string;
  timeToRead: number;
  id: string;
};

export const ListWritingNodes = () =>
  useStaticQuery(graphql`
    {
      allMdx(
        filter: { fields: { source: { eq: "writing" } } }
        sort: { fields: frontmatter___planted, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
              tags
            }
            frontmatter {
              title
              planted
              humanDatePlanted: planted(formatString: "MMM Do, YYYY")
            }
            excerpt(truncate: true, pruneLength: 300)
            id
            timeToRead
          }
        }
      }
    }
  `) as IListWritingNodes;

export interface ICleanedWritingNode extends IWritingNode {
  custom: {
    tagsLookup: Set<string>;
  };
}

export const ListCleanedWritingNodes = () =>
  ListWritingNodes().allMdx.edges.map((node) => ({
    ...node.node,
    custom: { tagsLookup: new Set(node.node.fields.tags) },
  })) as ICleanedWritingNode[];
