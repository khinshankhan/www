import { MdxNode } from "@anchorage/types";
import { CreateNodeArgs } from "gatsby";

export type ICreateSourceFieldProps = CreateNodeArgs & { sourceInstanceName: string };
export const createSourceField = ({
  node,
  actions,
  sourceInstanceName,
}: ICreateSourceFieldProps) => {
  const { createNodeField } = actions;
  createNodeField({ node, name: `source`, value: sourceInstanceName });
};

export const onCreateNode = ({ node, getNode, actions }: CreateNodeArgs) => {
  if (node.internal.type !== `Mdx`) return;

  const { sourceInstanceName } = getNode(node.parent ?? ``) as MdxNode;
  createSourceField({
    node,
    actions,
    sourceInstanceName,
  } as ICreateSourceFieldProps);
};
