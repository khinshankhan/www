// TODO: exclude common extensions that aren't files
const COMMON_URL_EXTENSIONS = [`html`];

export const hasExtension = (name: string) => /\.[0-9a-z]+$/i.test(name);

export const getExtension = (name: string) => {
  const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(name) ?? [];
  return extension;
};

export const isUrlFile = (url: string) => {
  if (!hasExtension(url)) return false;
  const ext = getExtension(url);

  if (COMMON_URL_EXTENSIONS.includes(ext)) return false;
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
