import React, { type ReactNode } from "react"
import { notFound } from "next/navigation"
import { Computed } from "@/lib/contentlayer/documents"
import { Link, SmartImage } from "@/components/ui"
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
  const cover = computed.frontmatter.cover
  const tags = computed.tags

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
              className="aspect-video md:!w-[75%]"
              showCaption={false}
            />
          </div>
        )
      }
      after={
        tags?.length !== 0 && (
          <>
            <div className="flex flex-row items-center justify-center">
              <div className="md:w-[70%]">
                <hr />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-2">
              {tags.map((e) => (
                <Link key={e} href="/">
                  {e}
                </Link>
              ))}
            </div>
          </>
        )
      }
    >
      {children}
    </PageSkeletonLayout>
  )
}
