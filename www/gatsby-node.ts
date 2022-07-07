import { GatsbyNode, CreateNodeArgs, Node } from "gatsby";
import { FileSystemNode } from "gatsby-source-filesystem";
import { slugify } from "./src/utils/string";

type WritingNode = Node & {
  frontmatter: {
    slug?: string;
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

    const value = slugify(
      { slug: node.frontmatter.slug, filePath: cleanedRelativePath },
      // TODO: don't add source to files under pages/*
      node.frontmatter.slug ? `` : sourceInstanceName
    );

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
