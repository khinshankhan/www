// @ts-check

const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
}

const compose = (initial, fns) => fns.reduce((acc, fn) => fn(acc), initial)

module.exports = () => {
  const plugins = [withContentlayer]
  const config = compose(nextConfig, plugins)

  return config
}
