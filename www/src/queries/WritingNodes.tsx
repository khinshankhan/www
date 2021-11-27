import { graphql, useStaticQuery } from "gatsby";

export type IWritingNode = {
  frontmatter: {
    title: string;
    planted: string;
    humanDatePlanted: string;
    categories: string[];
  };
  slug: string;
  excerpt: string;
  timeToRead: number;
  id: string;
};

export type IWritingNodeWrapper = {
  node: IWritingNode;
};

export type IListWritingNodes = {
  allMdx: {
    edges: IWritingNodeWrapper[];
  };
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
            frontmatter {
              title
              planted
              humanDatePlanted: planted(formatString: "MMM Do, YYYY")
              categories
            }
            slug
            excerpt(truncate: true, pruneLength: 300)
            timeToRead
            id
          }
        }
      }
    }
  `) as IListWritingNodes;
