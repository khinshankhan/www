import path from "path";
import { GatsbyNode, CreateNodeArgs, Node } from "gatsby";
import { FileSystemNode } from "gatsby-source-filesystem";
import { queryFilter } from "./src/utils/query";
import { slugify } from "./src/utils/string";

type Layouts = `article`;

type WritingNode = Node & {
  frontmatter: {
    title: string;
    slug?: string;
    spoiler?: string;

    layout?: Layouts;
    status?: string;

    planted: string;
    tended: string;

    categories?: string[];
    tags?: string[];
  };
};

type NodeRefinedFields = {
  fields: {
    slug: string;
    source: string;
    layout: Layouts;
    status: string;
  };
};

type MdxNode = WritingNode;

export const onCreateNode: GatsbyNode["onCreateNode"] = (args) => {
  if (args.node.internal.type === `Mdx`) {
    const { node, actions, getNode } = args as CreateNodeArgs<MdxNode>;
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
    createNodeField({
      name: `layout`,
      node,
      value: node.frontmatter.layout ?? `article`,
    });

    createNodeField({
      name: `status`,
      node,
      value: node.frontmatter.status ?? `published`,
    });
  }
};

interface ResultData {
  writings: {
    nodes: (WritingNode & NodeRefinedFields)[];
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
      writings: allMdx(
        filter: ${queryFilter}
        sort: { fields: frontmatter___planted, order: DESC }
      ) {
        nodes {
          fields {
            slug
            layout
          }
          frontmatter {
            title
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
    data: { writings },
  } = result;

  writings.nodes.forEach((article) => {
    createPage({
      path: article.fields.slug,
      component: templateLayouts[article.fields.layout],
      context: {
        slug: article.slug,
      },
    });
  });
};
