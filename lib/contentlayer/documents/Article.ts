import { defineDocumentType } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: `Article`,
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
}));
