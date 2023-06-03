import { MetadataRoute } from "next"
import { allPages, allWritings } from "contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
  // NOTE: this list is manually maintained for any page that isn't generated via contentlayer
  const routes = ["", "/writings", "/projects", "/contact"].map((route) => ({
    url: `https://www.khinshankhan.com${route}`,
    // TODO: wondering if this should be overengineered
    lastModified: new Date().toISOString().split("T")[0],
  }))

  const generatedRoutes = [...allPages, ...allWritings].map((page) => ({
    url: `https://www.khinshankhan.com/${page.slug}`,
    lastModified: page.tended,
  }))

  return [...routes, ...generatedRoutes]
}
