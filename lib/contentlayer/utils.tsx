import type { ComputedFields, FieldDefs } from "contentlayer/source-files";
import { chopOffWord } from "../utils/string";

const getSlug = (prefix: string, chopPrefix = true) => {
  const cleanPath = chopOffWord(prefix, false);
  return (doc: { givenSlug?: string; _raw: { flattenedPath: string } }) =>
    doc.givenSlug ?? chopPrefix
      ? cleanPath(doc._raw.flattenedPath).slice(1)
      : doc._raw.flattenedPath;
};

interface IFieldsProps {
  subtitle: string;
  status?: string;
  intersect?: boolean;
}
export const getFields = ({
  subtitle,
  status = "published",
  intersect = true,
}: IFieldsProps): FieldDefs => ({
  title: {
    type: "string",
    required: true,
  },
  subtitle: {
    type: "string",
    default: subtitle,
  },
  givenSlug: {
    type: "string",
  },

  tended: {
    type: "date",
    required: true,
  },

  status: {
    type: "enum",
    options: ["draft", "published"],
    default: status,
  },

  categories: {
    type: "list",
    of: {
      type: "string",
    },
  },

  intersect: {
    type: "boolean",
    default: intersect,
  },
});

interface IComputedFieldsProps {
  prefix: string;
  chopPrefix?: boolean;
}
export const getComputedFields = <T extends string>({
  prefix,
  chopPrefix = true,
}: IComputedFieldsProps): ComputedFields<T> => {
  const slugify = getSlug(prefix, chopPrefix);

  return {
    slug: {
      type: "string",
      resolve: slugify,
    },
  };
};
