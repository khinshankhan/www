import React, { type ReactNode } from "react"
import { notFound } from "next/navigation"
import { Computed } from "@/lib/contentlayer/documents"
import { SmartImage } from "@/components/ui"
import { PageSkeletonLayout, Toc } from "@/components/layouts"
import { getPageFromParams, type PageProps } from "./utils"

interface PageLayoutProps extends PageProps {
  children: ReactNode
}

export default async function PagesLayout({ children, params }: PageLayoutProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  const computed = page.computed as Computed
  // TODO: cover img should have dimensions of image
  const cover = computed.frontmatter.cover

  return (
    <PageSkeletonLayout
      title={computed.frontmatter.title}
      subtitle={computed.frontmatter.subtitle}
      path={`/data/${page._raw.sourceFilePath}`}
      sidebar={<Toc headings={computed.headings} />}
      className="normalize"
      extendedSpace={true}
      before={
        cover && (
          <div className="-mt-40 flex flex-col gap-10">
            <SmartImage
              src={cover.img}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              className="aspect-video md:!w-[75%]"
              showCaption={false}
            />
          </div>
        )
      }
    >
      {children}
    </PageSkeletonLayout>
  )
}
