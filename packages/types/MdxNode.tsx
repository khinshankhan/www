import { Node } from "gatsby";

export interface MdxNode extends Node {
  sourceInstanceName: string;
  fileAbsolutePath: string;
}

export interface EnhancedMdxNode extends MdxNode {
  fields: {
    slug: string;
    source: string;
  };
}
