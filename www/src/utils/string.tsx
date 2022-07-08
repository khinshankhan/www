import sindresorhusSlugify, { Options } from "@sindresorhus/slugify";
import { singleSlashRegex } from "./regex";

export const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const capitalize = (s: string, splitter = ` `, rejoin = ` `) =>
  s.toLowerCase().split(splitter).map(upperFirst).join(rejoin);

type SlugifySource =
  | { slug: undefined; filePath: undefined }
  | { slug: string; filePath?: string }
  | { slug: undefined; filePath: string };

/**
 * Creates a slug out of incoming source
 * @param source
 * @param prefix
 * @returns Slugified string
 */
export const slugify = (
  source: SlugifySource,
  prefix = ``,
  slugifyOptions: Options = {
    decamelize: false,
  }
): string => {
  if (!source.slug && !source.filePath) {
    return `/${sindresorhusSlugify(prefix, slugifyOptions)}`;
  }

  let slug = ``;
  if (source.slug === undefined) {
    slug = sindresorhusSlugify(source.filePath, slugifyOptions);
  } else {
    slug = source.slug
      .split(`/`)
      .map((slugPart) => sindresorhusSlugify(slugPart, slugifyOptions))
      .join(`/`);
  }

  const p = sindresorhusSlugify(prefix, slugifyOptions);
  return `/${p}/${slug}`.replace(singleSlashRegex, `/`);
};
