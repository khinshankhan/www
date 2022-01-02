import path from "path";
import { MdxNode } from "@anchorage/types";
import { CreateNodeArgs } from "gatsby";

export interface ICreateSlugProps {
  sourceInstanceName: string;
  fileAbsolutePath: string;
}

export const createFileSlug = ({ sourceInstanceName, fileAbsolutePath }: ICreateSlugProps) => {
  const file = path.basename(fileAbsolutePath, path.extname(fileAbsolutePath));
  const fileDir = path.dirname(fileAbsolutePath);
  const p = file === `index` ? fileDir : `${fileDir}/${file}`;

  let fileSlug = p.substring(p.indexOf(sourceInstanceName));
  // TODO: refactor to allow for theme options of source paths to ignore
  if (sourceInstanceName === `page`) {
    fileSlug = fileSlug.substring(sourceInstanceName.length + 1);
  }

  return fileSlug;
};

export type ICreateFileSlugFieldProps = CreateNodeArgs & { fileSlug: string };
export const createFileSlugField = ({ node, actions, fileSlug }: ICreateFileSlugFieldProps) => {
  const { createNodeField } = actions;
  createNodeField({ node, name: `slug`, value: fileSlug });
};

export const onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  if (node.internal.type !== `Mdx`) return;

  const { sourceInstanceName } = getNode(node.parent ?? ``) as MdxNode;
  const { fileAbsolutePath } = node as MdxNode;
  const fileSlug = createFileSlug({ sourceInstanceName, fileAbsolutePath });
  createFileSlugField({ node, actions, fileSlug } as ICreateFileSlugFieldProps);
};
