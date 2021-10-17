import { CreateNodeArgs } from "gatsby";
import path from "path";

export const onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions;

  if (node.internal.type !== `Mdx`) return;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName as string;

  const fileAbsPath = node.fileAbsolutePath as string;
  const file = path.basename(fileAbsPath, path.extname(fileAbsPath));
  const fileDir = path.dirname(fileAbsPath);
  const p = file === `index` ? fileDir : `${fileDir}/${file}`;

  let fileSlug = p.substring(p.indexOf(source));
  // TODO: refactor to allow for theme options of source paths to ignore
  if (source === `pages`) {
    fileSlug = fileSlug.substring(source.length + 1);
  }

  createNodeField({ node, name: `slug`, value: `${fileSlug}` });
};
