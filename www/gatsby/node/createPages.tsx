import { GatsbyNode } from "gatsby";
import { PageNode, WritingNode } from "@anchorage/types";

const proseTemplate = require.resolve(`../../src/templates/prose.tsx`);

interface ResultEdges<NodeType> {
  edges: {
    next: NodeType;
    node: NodeType;
    previous: NodeType;
  }[];
}

interface ResultData {
  writings: ResultEdges<WritingNode>;
  pages: ResultEdges<PageNode>;
}

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      writings: allMdx(
        filter: { fields: { source: { eq: "writing" } }, frontmatter: { published: { eq: true } } }
        sort: { fields: frontmatter___planted, order: ASC }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      pages: allMdx(filter: { fields: { source: { eq: "page" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the createPages query results`,
      result.errors
    );
    return;
  }

  const { pages, writings } = result.data as ResultData;

  pages.edges.forEach(({ node }) => {
    createPage({
      component: proseTemplate,
      path: `/${node.fields.slug}`,
      context: {
        slug: node.fields.slug,
      },
    });
  });

  writings.edges.forEach(({ node }, index) => {
    const prev = index === writings.edges.length - 1 ? null : writings.edges[index + 1];
    const next = index === 0 ? null : writings.edges[index - 1];

    createPage({
      component: proseTemplate,
      path: `/${node.fields.slug}`,
      context: {
        slug: node.fields.slug,
        prev,
        next,
      },
    });
  });
};

export default createPages;
