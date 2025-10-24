import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",
  images: { unoptimized: true },
  // apparently turbopack is broken with esm only https://github.com/vercel/next.js/issues/64525
  transpilePackages: ["next-mdx-remote"],
}

export default nextConfig
