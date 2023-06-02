import { MetadataRoute } from "next"
import { allPages as pages } from "contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
  // NOTE: this list is manually maintained for any page that isn't generated via contentlayer
  const routes = ["", "/writings", "/projects", "/contact"].map((route) => ({
    url: `https://khinshankhan.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  const pageRoutes = pages.map((page) => ({
    url: `https://khinshankhan.com/${page.slug}`,
    lastModified: page.tended,
  }))

  return [...routes, ...pageRoutes]
}
