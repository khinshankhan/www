import React from "react"
import { notFound } from "next/navigation"
import { getAllContentData } from "@/lib/content"
import { MDXContent } from "@/components/mdx"
import { getContentDataFromSlug } from "./utils"

export async function generateStaticParams() {
  const slugsParts = (await getAllContentData()).map((contentData) => {
    return {
      slug: contentData.slug.split("/"),
    }
  })

  return slugsParts
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params

  const contentData = await getContentDataFromSlug(slug)
  if (!contentData) {
    notFound()
  }

  return (
    <main className="normalize">
      <MDXContent source={contentData.content} />
    </main>
  )
}
