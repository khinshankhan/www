import { defineDocumentType } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: `Article`,
  contentType: `mdx`,
  filePathPattern: `articles/**/*.md`,
  fields: {
    title: {
      type: `string`,
      required: true,
    },
    subtitle: {
      type: `string`,
    },
    slug: {
      type: `string`,
    },

    planted: {
      type: `date`,
      required: true,
    },
    tended: {
      type: `date`,
      required: true,
    },

    tags: {
      type: `list`,
      of: {
        type: `string`,
      },
      required: true,
    },

    status: {
      type: `enum`,
      options: [`draft`, `published`],
    },
  },
  computedFields: {
    slug: {
      type: `string`,
      resolve: (article) => article.slug ?? article._raw.flattenedPath.slice(8),
    },
    subtitle: {
      type: `string`,
      resolve: (article) => article.subtitle ?? `A little surprise reading 😊`,
    },
    status: {
      type: `enum`,
      options: [`draft`, `published`],
      resolve: (article) => article.status ?? `published`,
    },
  },
}));
