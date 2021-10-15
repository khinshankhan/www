import { CreateNodeArgs } from "gatsby";
import path from "path";

const onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  if (node.internal.type !== `Mdx`) return;

  const { createNode, createNodeField, createParentChildLink } = actions;

  // TODO: differentiate between different mdx templates based on source
  // const fileNode = getNode(node.parent);
  // const source = fileNode.sourceInstanceName;
  const fieldData = node.frontmatter as object;

  const mdxWritingId = createNodeId(`${node.id} >>> Mdx`);

  const file = path.basename(
    node.fileAbsolutePath as string,
    path.extname(node.fileAbsolutePath as string)
  );
  const fileSlug =
    file === `index`
      ? path.basename(path.dirname(node.fileAbsolutePath as string))
      : file;

  createNodeField({ node, name: `slug`, value: `${fileSlug}` });

  createNode({
    ...fieldData,
    id: mdxWritingId,
    parent: node.id,
    children: [],
    internal: {
      type: `MdxWriting`,
      contentDigest: createContentDigest(fieldData),
      content: JSON.stringify(fieldData),
      description: `Mdx Writing`,
    },
  });

  const currentNode = getNode(mdxWritingId);
  createParentChildLink({ parent: node, child: currentNode });
};

export default onCreateNode;
