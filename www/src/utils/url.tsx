// https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
export const urlsAreOnSameOrigin = (origin: HTMLAnchorElement, destination: HTMLAnchorElement) =>
  origin.protocol === destination.protocol &&
  /* a.host includes both hostname and port in the expected format host:port */
  origin.host === destination.host;
