import { getContentDataByFilePath } from "@/lib/content"

// TODO: turn this to support `"**/page*.mdx"` when dealing with i18n
// eg page.es.mdx will be spanish
export async function getContentDataFromSlug(slug: string[]) {
  const slugPath = slug.join("/")

  try {
    const filePath = `${slugPath}/page.mdx`
    const data = await getContentDataByFilePath(filePath)
    return data
  } catch (e) {
    const filePath = `${slugPath}/page.md`
    const data = await getContentDataByFilePath(filePath)
    return data
  }
}
