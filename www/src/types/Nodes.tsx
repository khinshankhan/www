import { Node } from "gatsby";
import type { FileSystemNode } from "gatsby-source-filesystem";
import { Layouts } from "./Layouts";

export type CoverData = {
  src?: FileSystemNode;
  url?: string;
  alt?: string;
};

export type Cover = {
  cover?: CoverData;
};

export type AllMdxNode = Node & {
  frontmatter: Cover & {
    title: string;
    slug?: string;
    spoiler?: string;

    layout?: Layouts;
    status?: string;

    planted: string;
    tended: string;
  };

  excerpt: string;
};

// TODO: figure out excerpts
export interface AllEnhancedMdxFields {
  fields: {
    layout: Layouts;
    slug: string;
    source: string;
    status: string;
    subtitle: string;
  };
}

export type AllEnhancedMdxNode = AllMdxNode & AllEnhancedMdxFields;

export type ArticleNode = AllEnhancedMdxNode & {
  frontmatter: {
    tags?: string[];
  };
};

export type MdxNode = ArticleNode;
