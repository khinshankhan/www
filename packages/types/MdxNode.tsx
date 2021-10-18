import { Node } from "gatsby";

export interface MdxNode extends Node {
  sourceInstanceName: string;
  fileAbsolutePath: string;
}
