import { getContentData } from "@/lib/content"

// TODO: turn this to support `"**/page*.mdx"` when dealing with i18n
// eg page.es.mdx will be spanish
export function getContentDataFromSlug(slug: string[]) {
  const slugPath = slug.join("/")

  try {
    const filePath = `${slugPath}/page.mdx`
    return getContentData(filePath)
  } catch (e) {
    const filePath = `${slugPath}/page.md`
    return getContentData(filePath)
  }
}
