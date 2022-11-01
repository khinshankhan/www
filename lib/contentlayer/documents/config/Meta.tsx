import { defineDocumentType } from "contentlayer/source-files";

export const MetaConfig = defineDocumentType(() => ({
  name: `MetaConfig`,
  contentType: `data`,
  filePathPattern: `config/meta.yaml`,
  isSingleton: true,
  fields: {
    fullname: {
      type: `string`,
      description: `Site owner's fullname`,
      required: true,
    },
    startYear: {
      type: `number`,
      description: `Year for site's copyright`,
      required: true,
    },
  },
  extensions: {},
}));
