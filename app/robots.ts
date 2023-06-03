import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/drafts/"],
      },
    ],
    sitemap: "https://www.khinshankhan.com/sitemap.xml",
    host: "https://www.khinshankhan.com",
  }
}
