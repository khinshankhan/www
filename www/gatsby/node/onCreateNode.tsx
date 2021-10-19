import { CreateNodeArgs } from "gatsby";
import { MdxNode } from "@anchorage/types";
import {
  createFileSlug,
  createFileSlugField,
  ICreateFileSlugFieldProps,
} from "@anchorage/gatsby-plugin-mdx-slug-name";
import {
  createSourceField,
  ICreateSourceFieldProps,
} from "@anchorage/gatsby-plugin-mdx-source-name";
import { capitalize } from "../../src/utils/strings";

const onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  if (node.internal.type !== `Mdx`) return;

  const { sourceInstanceName } = getNode(node.parent) as MdxNode;
  const { fileAbsolutePath } = node as MdxNode;

  // create file slug field
  const fileSlug = createFileSlug({ sourceInstanceName, fileAbsolutePath });
  createFileSlugField({ node, actions, fileSlug } as ICreateFileSlugFieldProps);

  // create source field
  createSourceField({
    node,
    actions,
    sourceInstanceName,
  } as ICreateSourceFieldProps);

  const fieldData = node.frontmatter as object;
  const mdxWritingId = createNodeId(`${node.id} >>> Mdx`);
  const sourceName = capitalize(sourceInstanceName as string);

  const { createNode, createParentChildLink } = actions;
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

  createParentChildLink({ parent: node, child: getNode(mdxWritingId) });
};

export default onCreateNode;
