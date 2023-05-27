import { notFound } from "next/navigation"
import { MdxContent } from "@/components/mdx"
import { getPageFromParams, type PageProps } from "./utils"

export { generateStaticParams } from "./utils"

export default async function PageView({ params }: PageProps) {
  const page = await getPageFromParams(params)
  if (!page) {
    notFound()
  }

  return <MdxContent code={page.body.code} />
}
