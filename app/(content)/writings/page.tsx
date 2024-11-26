import React from "react"
import { Heading, Text } from "@/components/base/typography"
import { SmartLink } from "@/components/composite/smart-link"
import { ContentLayout } from "@/components/template/content-layout"
import { listAllContentData } from "@/lib/content"
import { type ContentData } from "@/lib/schemas/content"
import { cn } from "@/lib/utils"

async function listWritingsContentData() {
  return await listAllContentData({
    filter: (contentData) => contentData.source === "writings",
  })
}

const showWritingCardImage = true

function WritingCard({ content, right = false }: { content: ContentData; right?: boolean }) {
  const textAlign = right ? "text-right" : "text-left"

  return (
    <li className="link-box w-full overflow-hidden rounded-lg border border-solid border-accent-8 shadow-none transition-all duration-700 ease-in-out group-hover:shadow-accent-8 hover:-translate-y-2 hover:border-accent-11 hover:bg-surface-5/25 hover:shadow-[0px_0px_10px_1px]">
      <div
        className={cn(
          "flex size-full flex-col-reverse",
          right ? "md:flex-row-reverse" : "md:flex-row"
        )}
      >
        <div className="flex flex-col gap-1 p-6">
          <Heading as="h3" variant="h3" className={cn("line-clamp-2 md:line-clamp-1", textAlign)}>
            <SmartLink href={`/${content.slug}`} className="link-overlay">
              {content.frontmatter.title}
            </SmartLink>
          </Heading>

          <Text as="span" variant="h4" className={cn("line-clamp-2 md:line-clamp-1", textAlign)}>
            {content.frontmatter.subtitle}
          </Text>

          <Text
            as="span"
            variant={null}
            className={cn("line-clamp-3 text-muted-foreground md:line-clamp-2", textAlign)}
          >
            {content.frontmatter.description}
          </Text>
        </div>

        {showWritingCardImage && (
          <div className="relative -z-1 h-32 w-full flex-none sm:h-48 md:h-auto md:w-72 lg:w-96">
            <img
              alt={content.frontmatter.coverImage.alt}
              src={content.frontmatter.coverImage.url}
              className={cn(
                "relative inset-0 size-full rounded-t-lg object-cover md:absolute md:rounded-r-lg",
                right ? "md:clip-tr-bl" : "md:clip-tl-br"
              )}
            />
          </div>
        )}
      </div>
    </li>
  )
}

export default async function Page() {
  const contentData = await listWritingsContentData()

  return (
    <ContentLayout
      title="Writings"
      subtitle="My ramblings and some thoughts"
      ghPath="/app/(content)/writings/page.tsx"
      childrenWrappingClass="flex flex-col gap-4"
    >
      <Heading as="h2" variant="h2">
        Articles
      </Heading>

      <ul className="flex flex-col gap-8">
        {contentData.map((content) => (
          <WritingCard key={content.slug} content={content} />
        ))}
      </ul>
    </ContentLayout>
  )
}
