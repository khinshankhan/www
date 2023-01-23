import type { ComputedFields, FieldDefs } from "contentlayer/source-files";
import { chopOffWord } from "../utils/string";
import Slugger from "github-slugger";

interface IFieldsProps {
  subtitle: string;
  status?: string;
}
export const getFields = ({ subtitle, status = "published" }: IFieldsProps): FieldDefs => ({
  title: {
    type: "string",
    required: true,
  },
  subtitle: {
    type: "mdx",
    default: subtitle,
  },
  givenSlug: {
    type: "string",
  },

  planted: {
    type: "date",
    required: false,
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

  tags: {
    type: "list",
    of: {
      type: "string",
    },
  },
  categories: {
    type: "list",
    of: {
      type: "string",
    },
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
  const cleanPath = chopOffWord(prefix, false);

  return {
    frontmatter: {
      type: "json",
      resolve: (doc) => {
        const resolved = {
          title: doc.title,
          subtitle: doc.subtitle,
          // chop of tz info since it's wrong (Z)
          planted: doc.planted?.slice(0, -1),
          tended: doc.tended.slice(0, -1),
        };
        return resolved;
      },
    },

    slug: {
      type: "string",
      resolve: (doc) =>
        doc?.givenSlug ?? chopPrefix
          ? cleanPath(doc._raw.flattenedPath).slice(1)
          : doc._raw.flattenedPath,
    },
    computed: {
      type: "json",
      resolve: (doc) => {
        // use same package as rehypeSlug so toc and sluggified headings match
        // https://github.com/rehypejs/rehype-slug/blob/main/package.json#L36
        const slugs = new Slugger();

        const regexHeadings = /^(?<tag>#{1,6})[ ](?<content>[^\n]+)/gm;
        return {
          tags: [...new Set(doc?.tags as string[] | null)].sort(),
          headings: !doc?.body?.raw
            ? []
            : [...doc.body.raw.matchAll(regexHeadings)].map(([, tag, content]) => ({
                level: tag.length,
                content,
                id: slugs.slug(content, false),
              })),
        };
      },
    },
  };
};
