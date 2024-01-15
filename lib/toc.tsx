import { remark } from "remark"
import { remarkTocExport, type TocItem } from "./mdx-plugins/remark-toc"

export async function getToc(content: string) {
  const vfile = await remark().use(remarkTocExport).process(content)

  return (vfile?.data?.toc || []) as TocItem[]
}
