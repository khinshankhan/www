// TODO: exclude common extensions that aren't files
export const isFile = (url: string) => /\.[0-9a-z]+$/i.test(url);

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
