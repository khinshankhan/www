import { defineDocumentType } from "contentlayer/source-files";
import { fields, getComputedFields } from "../utils";

const computedFields = getComputedFields<"Listing">({
  prefix: `listings`,
  subtitle: `Another fun list 🙃`,
});

export const Listing = defineDocumentType(() => ({
  name: `Listing`,
  contentType: `mdx`,
  filePathPattern: `listings/**/*.md`,
  fields,
  computedFields,
}));
