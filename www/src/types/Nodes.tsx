import { Node } from "gatsby";
import { Layouts } from "./Layouts";

export type AllMdxNode = Node & {
  frontmatter: {
    title: string;
    slug?: string;

    layout?: Layouts;
    status?: string;

    planted: string;
    tended: string;
  };
};

export interface AllEnhancedMdxFields {
  fields: {
    slug: string;
    source: string;
    layout: Layouts;
    status: string;
  };
}

export type AllEnhancedMdxNode = AllMdxNode & AllEnhancedMdxFields;

export type ArticleNode = AllEnhancedMdxNode & {
  frontmatter: {
    spoiler?: string;

    categories?: string[];
    tags?: string[];
  };
};

export type MdxNode = ArticleNode;
