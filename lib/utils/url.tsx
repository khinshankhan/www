const siteUrl = "https://khinshankhan.com";
export const isRelative = (url: string) => url.startsWith("/") || url.startsWith("#");

// NOTE: extension logic should be used with the path rather than the url itself
export const hasExtension = (ext: string) => /\.[0-9a-z]+$/i.test(ext);

export const getExtension = (name: string) => {
  const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(name) ?? [];
  return extension;
};

// TODO: exclude common extensions that aren't files
// NOTE: to some extent it will have to be manual vigilance when creating links
const COMMON_URL_EXTENSIONS = [
  // could be a file but usually renders a page
  `html`,
  `php`,
  `md`,
  // TODO: images, shoudle images be considered files?
  `png`,
  `jpg`,
  `jpeg`,
  `svg`,
  `webp`,
  `gif`,
  // common domains
  `com`,
  `dev`,
  `net`,
];

export const isUrlFile = (url: string, base = siteUrl) => {
  const baseUrl = isRelative(url) && base;
  const destination = new URL(url, baseUrl || undefined);
  const { pathname } = destination;

  if (!hasExtension(pathname)) return false;
  const ext = getExtension(pathname);

  if (COMMON_URL_EXTENSIONS.includes(ext.toLowerCase())) return false;
  return true;
};

// https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
export const onSameOrigin = (originUrl: string, destinationUrl: string, base = siteUrl) => {
  const baseOriginUrl = isRelative(originUrl) && base;
  const origin = new URL(originUrl, baseOriginUrl || undefined);
  const baseDestinationUrl = isRelative(destinationUrl) && base;
  const destination = new URL(destinationUrl, baseDestinationUrl || undefined);

  return (
    origin.protocol === destination.protocol &&
    /* a.host includes both hostname and port in the expected format host:port */
    origin.host === destination.host
  );
};

interface IMatchLinkProps {
  link1: string;
  link2: string;
  fullPath: boolean;
  excludeParams: boolean;
  base?: string;
}
// this will be called after checking same origin, so we can assume as much
export const matchLink = ({
  link1,
  link2,
  fullPath,
  excludeParams,
  base = siteUrl,
}: IMatchLinkProps) => {
  const baseAUrl = isRelative(link1) && base;
  const anchorA = new URL(link1, baseAUrl || undefined);
  const baseBUrl = isRelative(link2) && base;
  const anchorB = new URL(link2, baseBUrl || undefined);

  if (!excludeParams && anchorA.search !== anchorB.search) return false;

  const paths = [anchorA.pathname, anchorB.pathname];
  if (fullPath) {
    return paths[0] === paths[1];
  }

  paths.sort();
  return paths[1].includes(paths[0]);
};
