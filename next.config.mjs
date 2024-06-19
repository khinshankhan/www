// @ts-check

/**
 * @typedef {import('next').NextConfig} NextConfig
 */

/** @type {NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",
  images: { unoptimized: true },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // apparently turbopack is broken with esm only https://github.com/vercel/next.js/issues/64525
  transpilePackages: ["next-mdx-remote"],
}

/**
 * Composes the configuration with a series of functions.
 * @param {NextConfig} initial The initial configuration.
 * @param {((config: NextConfig) => NextConfig)[]} fns The array of functions to compose.
 * @returns {NextConfig} The composed configuration.
 */
const compose = (initial, fns) => fns.reduce((acc, fn) => fn(acc), initial)

// Using ESM syntax for exporting the configuration.
export default () => {
  const plugins = []
  const config = compose(nextConfig, plugins)

  return config
}
