import type { ComputedFields, FieldDefs } from "contentlayer/source-files";
import { chopOffWord } from "../utils/string";

const getSlug = (prefix: string) => {
  const cleanPath = chopOffWord(prefix, false);
  return (doc: { slug?: string; _raw: { flattenedPath: string } }) =>
    doc.slug ?? cleanPath(doc._raw.flattenedPath).slice(1);
};

interface IFieldsProps {
  subtitle: string;
  status?: string;
}
export const getFields = ({ subtitle, status = `published` }: IFieldsProps): FieldDefs => ({
  title: {
    type: `string`,
    required: true,
  },
  subtitle: {
    type: `string`,
    default: subtitle,
  },
  slug: {
    type: `string`,
  },

  tended: {
    type: `date`,
    required: true,
  },

  status: {
    type: `enum`,
    options: [`draft`, `published`],
    default: status,
  },

  categories: {
    type: `list`,
    of: {
      type: `string`,
    },
  },

  backButton: {
    type: `boolean`,
    default: false,
  },
});

interface IComputedFieldsProps {
  prefix: string;
}
export const getComputedFields = <T extends string>({
  prefix,
}: IComputedFieldsProps): ComputedFields<T> => {
  const slugify = getSlug(prefix);

  return {
    slug: {
      type: `string`,
      resolve: slugify,
    },
  };
};
