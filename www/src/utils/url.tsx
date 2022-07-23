// TODO: exclude common extensions that aren't files
const COMMON_URL_EXTENSIONS = [
  // could be a file but usually renders a page
  `html`,
  `php`,
  `md`,
  // images
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

export const hasExtension = (name: string) => /\.[0-9a-z]+$/i.test(name);

export const getExtension = (name: string) => {
  const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(name) ?? [];
  return extension;
};

export const isUrlFile = (url: string) => {
  const destination = document.createElement(`a`);
  destination.href = url;
  const { pathname } = destination;

  if (!hasExtension(pathname)) return false;
  const ext = getExtension(pathname);

  if (COMMON_URL_EXTENSIONS.includes(ext.toLowerCase())) return false;
  return true;
};

// https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
export const onSameOrigin = (originUrl: string, destinationUrl: string) => {
  // lifted off of gatsby-plugin-catch-links
  const destination = document.createElement(`a`);
  destination.href = originUrl;
  const origin = document.createElement(`a`);
  origin.href = destinationUrl;

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
}
// this will be called after checking same origin, so we can assume as much
export const matchLink = ({ link1, link2, fullPath, excludeParams }: IMatchLinkProps) => {
  const anchorA = document.createElement(`a`);
  anchorA.href = link1;
  const anchorB = document.createElement(`a`);
  anchorB.href = link2;

  if (!excludeParams && anchorA.search !== anchorB.search) return false;

  const paths = [anchorA.pathname, anchorB.pathname];
  if (fullPath) {
    return paths[0] === paths[1];
  }

  paths.sort();
  return paths[1].includes(paths[0]);
};
