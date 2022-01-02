import {
  createFileSlug,
  createFileSlugField,
  ICreateFileSlugFieldProps,
} from "@anchorage/gatsby-plugin-mdx-slug-name";
import {
  createSourceField,
  ICreateSourceFieldProps,
} from "@anchorage/gatsby-plugin-mdx-source-name";
import { MdxNode } from "@anchorage/types";
import { CreateNodeArgs, Node } from "gatsby";
import { capitalize, spaceConsciousSplit } from "../../src/utils/strings";

interface IFrontmatter {
  categories?: string;
  [key: string]: any;
}

const onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}: CreateNodeArgs) => {
  if (node.internal.type !== `Mdx`) return;

  const { createNodeField } = actions;
  const { sourceInstanceName } = getNode(node.parent ?? ``) as MdxNode;
  const { fileAbsolutePath } = node as MdxNode;
  const fieldData = node.frontmatter as IFrontmatter;

  // create file slug field
  const fileSlug = createFileSlug({ sourceInstanceName, fileAbsolutePath });
  createFileSlugField({ node, actions, fileSlug } as ICreateFileSlugFieldProps);

  // create source field
  createSourceField({
    node,
    actions,
    sourceInstanceName,
  } as ICreateSourceFieldProps);

  // create tags field
  const categories = fieldData?.categories || ``;
  const tags = spaceConsciousSplit(categories);
  tags.sort();
  createNodeField({ node, name: `tags`, value: tags });

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

  createParentChildLink({ parent: node, child: getNode(mdxWritingId) as Node });
};

export default onCreateNode;
