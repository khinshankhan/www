import { defineDocumentType } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: `Article`,
  contentType: `mdx`,
  filePathPattern: `articles/**/*.md`,
  fields: {
    title: {
      type: `string`,
      description: `The title of the article`,
      required: true,
    },
    subtitle: {
      type: `string`,
      description: `The text shown just below the title or the featured image`,
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
  },
  computedFields: {
    slug: {
      type: `string`,
      resolve: (doc) => doc._raw.flattenedPath.slice(8),
    },
  },
}));
