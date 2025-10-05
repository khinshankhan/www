/**
 * True when running outside of a traditional browser context.
 * Evaluates to `true` on the server and `false` in the browser.
 */
export const isServer = typeof window === "undefined" || typeof navigator === "undefined"

/**
 * Convenience inverse of {@link isServer}. True in the browser.
 */
export const isBrowser = !isServer
