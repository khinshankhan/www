import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",
  images: { unoptimized: true },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
