import { defineDocumentType, defineNestedType } from "contentlayer/source-files";

const FooterSectionItem = defineNestedType(() => ({
  name: `FooterSectionItem`,
  fields: {
    title: { type: `string`, required: true },
    link: { type: `string`, required: true },
  },
}));

const FooterSection = defineNestedType(() => ({
  name: `FooterSection`,
  fields: {
    title: { type: `string`, required: true },
    items: { type: `list`, of: FooterSectionItem, required: true },
  },
}));

const FooterSocialItem = defineNestedType(() => ({
  name: `FooterSocialItem`,
  fields: {
    // TODO: move socials enum options out
    // TODO: add more socials here
    title: { type: `enum`, options: [`github`, `linkedin`], required: true },
    link: { type: `string`, required: true },
  },
}));

const Footer = defineNestedType(() => ({
  name: `Footer`,
  fields: {
    sections: { type: `list`, of: FooterSection, required: true },
    socials: { type: `list`, of: FooterSocialItem, required: true },
  },
}));

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

    footer: {
      type: `nested`,
      of: Footer,
      default: null,
    },
  },
  extensions: {},
}));
