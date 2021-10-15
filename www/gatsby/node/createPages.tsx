import { GatsbyNode } from "gatsby";

const proseTemplate = require.resolve(`../../src/templates/prose.tsx`);

const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      writings: allMdx(
        sort: { fields: frontmatter___planted, order: ASC }
        filter: { frontmatter: { published: { eq: true } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
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

  const documents = result.data.writings.edges;
  documents.forEach(({ node }, index) => {
    const prev = index === documents.length - 1 ? null : documents[index + 1];
    const next = index === 0 ? null : documents[index - 1];

    createPage({
      component: proseTemplate,
      path: `/writing/${node.fields.slug}`,
      context: {
        slug: node.fields.slug,
        prev,
        next,
      },
    });
  });
};

export default createPages;
