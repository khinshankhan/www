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

  excerpt: string;
  timeToRead: number;
};

// TODO: figure out excerpts
export interface AllEnhancedMdxFields {
  fields: {
    layout: Layouts;
    slug: string;
    source: string;
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
