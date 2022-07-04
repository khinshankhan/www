import sindresorhusSlugify, { Options } from "@sindresorhus/slugify";
import { singleSlashRegex } from "./regex";

export const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const capitalize = (s: string, splitter = ` `, rejoin = ` `) =>
  s.toLowerCase().split(splitter).map(upperFirst).join(rejoin);

type SlugifySource =
  | { slug: undefined; title: undefined }
  | { slug: string; title?: string }
  | { slug: undefined; title: string };

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
  if (!source.slug && !source.title) {
    return `/${sindresorhusSlugify(prefix, slugifyOptions)}`;
  }

  const slug = source.slug ?? sindresorhusSlugify(source.title, slugifyOptions);
  const p = sindresorhusSlugify(prefix, slugifyOptions);

  return `/${p}/${slug}`.replace(singleSlashRegex, `/`);
};
