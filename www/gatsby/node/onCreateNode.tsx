import { CreateNodeArgs } from "gatsby";
import { capitalize } from "../../src/utils/strings";

const onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  if (node.internal.type !== `Mdx`) return;

  const { createNode, createParentChildLink } = actions;

  const { sourceInstanceName } = getNode(node.parent);
  const fieldData = node.frontmatter as object;

  const mdxWritingId = createNodeId(`${node.id} >>> Mdx`);
  const sourceName = capitalize(sourceInstanceName as string);

  createNode({
    ...fieldData,
    id: mdxWritingId,
    parent: node.id,
    children: [],
    internal: {
      type: `Mdx${sourceName}`,
      contentDigest: createContentDigest(fieldData),
      content: JSON.stringify(fieldData),
      description: `Mdx ${sourceName}`,
    },
  });

  const currentNode = getNode(mdxWritingId);
  createParentChildLink({ parent: node, child: currentNode });
};

export default onCreateNode;
