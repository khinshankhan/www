import { CreateNodeArgs } from "gatsby";

export const onCreateNode = ({ node, getNode, actions }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type !== `Mdx`) return;

  const { sourceInstanceName } = getNode(node.parent);
  createNodeField({
    node,
    name: `source`,
    value: sourceInstanceName,
  });
};
