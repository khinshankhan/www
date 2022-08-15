import path from "path";
import { GatsbyNode, CreateNodeArgs } from "gatsby";
import { FileSystemNode } from "gatsby-source-filesystem";
import { Layouts, defaultSubtitle } from "./src/types/Layouts";
import { AllMdxNode, ArticleNode } from "./src/types/Nodes";
import { MdxCreationNode } from "./src/types/queries";
import { queryFilter } from "./src/utils/query";
import { slugify } from "./src/utils/string";

export const onCreateNode: GatsbyNode["onCreateNode"] = (args) => {
  if (args.node.internal.type === `Mdx`) {
    const { node, actions, getNode } = args as CreateNodeArgs<AllMdxNode>;
    const { createNodeField } = actions;

    if (!node.parent) return;
    const { sourceInstanceName, relativePath, extension } = getNode(node.parent) as FileSystemNode;

    const extensionlessRelativePath = relativePath.slice(0, (extension.length + 1) * -1);
    const cleanedRelativePath = extensionlessRelativePath.endsWith(`index`)
      ? extensionlessRelativePath.slice(0, -5)
      : extensionlessRelativePath;

    const slug = slugify(
      { slug: node.frontmatter.slug, filePath: cleanedRelativePath },
      // TODO: don't add source to files under pages/*
      node.frontmatter.slug ? `` : sourceInstanceName
    );

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });

    createNodeField({
      name: `source`,
      node,
      value: sourceInstanceName,
    });

    // TODO: set up favored layouts based on source
    const layout = node.frontmatter.layout ?? `article`;
    createNodeField({
      name: `layout`,
      node,
      value: layout,
    });

    createNodeField({
      name: `subtitle`,
      node,
      value: node.frontmatter.spoiler ?? defaultSubtitle[layout],
    });

    createNodeField({
      name: `status`,
      node,
      value: node.frontmatter.status ?? `published`,
    });
  }
};

interface ResultData {
  articles: {
    nodes: MdxCreationNode<ArticleNode>[];
  };
}

const articleTemplate = path.resolve(`src/templates/article.tsx`);
const templateLayouts: { [key in Layouts]: string } = {
  article: articleTemplate,
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const query = `
    {
      articles: allMdx(
        filter: ${queryFilter}
        sort: {
          fields: [frontmatter___planted, frontmatter___tended, frontmatter___title]
          order: [DESC, DESC, ASC]
        }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
          }
          internal {
            contentFilePath
          }
        }
      }
    }
`;
  const result = await graphql<ResultData>(query);
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the createPages query results`,
      result.errors
    );
    return;
  }

  if (result.data === undefined) {
    reporter.panicOnBuild(
      `There was an issue loading the createPages query results`,
      result.errors
    );
    return;
  }

  const {
    data: { articles },
  } = result;

  articles.nodes.forEach((article) => {
    createPage({
      path: article.fields.slug,
      component: `${templateLayouts.article}?__contentFilePath=${article.internal.contentFilePath}`,
      context: {
        slug: article.fields.slug,
      },
    });
  });
};
