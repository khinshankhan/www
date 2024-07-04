import React from "react"
import { type ContentData } from "@/schemas/content"
import { flags } from "@/settings"
import { cn } from "@/lib/utils"
import { Link } from "@/components/primitives/link"
import { typographyVariants } from "@/components/primitives/typography"

export function WritingCard({ content, right = true }: { content: ContentData; right?: boolean }) {
  const textAlign = "text-left"

  return (
    <li className="card-link link-box flex w-full rounded-lg shadow-lg">
      <div
        className={cn(
          "flex size-full flex-col-reverse",
          right ? "md:flex-row" : "md:flex-row-reverse"
        )}
      >
        <div className="flex grow flex-col gap-1 p-6">
          <h3
            className={cn(
              typographyVariants({ variant: "h3" }),
              "line-clamp-2 md:line-clamp-1",
              textAlign
            )}
          >
            <Link href={`/${content.slug}`} className="link-overlay">
              {content.frontmatter.title}
            </Link>
          </h3>
          <span
            className={cn(
              typographyVariants({ variant: "h4" }),
              "line-clamp-2 md:line-clamp-1",
              textAlign
            )}
          >
            {content.frontmatter.subtitle}
          </span>
          <span className={cn("text-theme-muted line-clamp-3 md:line-clamp-2", textAlign)}>
            {content.frontmatter.description}
          </span>
        </div>

        {flags.showWritingImages && (
          <div className="relative -z-1 h-32 w-full flex-none sm:h-48 md:h-auto md:w-72 lg:w-96">
            <img
              alt={content.frontmatter?.coverImage?.alt}
              src={content.frontmatter.coverImage.url}
              className={cn(
                "relative inset-0 size-full rounded-t-lg object-cover md:absolute md:rounded-r-lg",
                right ? "md:clip-list-image-left" : "md:clip-list-image-right"
              )}
            />
          </div>
        )}
      </div>
    </li>
  )
}

export function WritingList({ writingContentData }: { writingContentData: ContentData[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {writingContentData.map((contentData) => {
        return <WritingCard key={contentData.slug} content={contentData} />
      })}
    </ul>
  )
}
