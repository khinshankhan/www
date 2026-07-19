"use client"

import React, { memo, useDeferredValue, useMemo, useState } from "react"
import { headerHeight } from "@/components/layouts/elements/header"
import { cn } from "@/quicksilver/lib/classname"
import { ScrollFadeIn } from "@/quicksilver/react/patterns/motion/scroll-fade-in"
import { EmptyState } from "@/quicksilver/react/primitives/empty-state"
import { Search, Star } from "@/quicksilver/react/primitives/icons"
import { Link } from "@/quicksilver/react/primitives/link"
import { SearchField } from "@/quicksilver/react/primitives/search-field"
import { H3, Span } from "@/quicksilver/react/primitives/text"

// Just the list fields, so article bodies never reach the client. `description` is
// remark-processed on the server (see page.tsx).
export interface WritingSummary {
  slug: string
  title: string
  description: string
  tags: string[]
}

const ARTICLE = { singular: "article", plural: "articles" } as const

function matches(post: WritingSummary, query: string) {
  return [post.title, post.description, ...post.tags].join(" ").toLowerCase().includes(query)
}

// memoized so a keystroke only re-renders changed cards, not the whole list
const WritingCard = memo(function WritingCard({ post }: { post: WritingSummary }) {
  return (
    <li className="link-box w-full overflow-hidden rounded-lg border border-solid border-accent-8 bg-background-1 transition-all duration-500 ease-in-out group-hover:shadow-accent-8 hover:-translate-y-1 hover:border-accent-11 hover:bg-surface-5/25 hover:shadow-[0px_0px_10px_1px]">
      <div className="flex grow flex-col gap-2 p-4">
        <H3 className="line-clamp-2 md:line-clamp-1">
          <Link href={post.slug} className="link-overlay">
            {post.title}
          </Link>
        </H3>
        <Span className="line-clamp-3 text-foreground-muted md:line-clamp-2">
          {post.description}
        </Span>
      </div>
    </li>
  )
})

export function WritingsSearch({
  posts,
  banner,
}: {
  posts: WritingSummary[]
  /** Optional content shown below the search field and above the results (e.g. a notice). */
  banner?: React.ReactNode
}) {
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)

  const trimmed = deferredQuery.trim().toLowerCase()
  const filtered = useMemo(
    () => (trimmed === "" ? posts : posts.filter((post) => matches(post, trimmed))),
    [posts, trimmed]
  )

  return (
    <SearchField.Root
      entity={ARTICLE}
      total={posts.length}
      matched={filtered.length}
      value={query}
      onValueChange={setQuery}
    >
      <SearchField.Status />

      {/* sticky console; full-bleed background (100vmax shadow + clip-path) so cards scrolling
          under it can't peek their hover glow out beside it */}
      <div
        className={cn(
          "sticky top-(--h) z-30 bg-background-2 py-3",
          "shadow-[0_0_0_100vmax_var(--color-background-2)] [clip-path:inset(0_-100vmax)]",
          headerHeight
        )}
      >
        <SearchField.Input>
          <SearchField.Count />
          <SearchField.Clear />
          <SearchField.ShortcutHint />
        </SearchField.Input>

        <ScrollFadeIn startPx={260} rangePx={400}>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-surface-7 shadow-[0_0_0_100vmax_var(--color-surface-7)] [clip-path:inset(0_-100vmax)]"
          />
        </ScrollFadeIn>
      </div>

      {banner}

      <SearchField.Empty>
        {({ reason, query: q, total }) =>
          reason === "no-items" ? (
            <EmptyState.Root>
              <EmptyState.Icon>
                <Star />
              </EmptyState.Icon>
              <EmptyState.Title>No Articles Yet</EmptyState.Title>
              <EmptyState.Description>
                They&rsquo;re on their way. Check back soon.
              </EmptyState.Description>
            </EmptyState.Root>
          ) : (
            <EmptyState.Root>
              <EmptyState.Icon>
                <Search />
              </EmptyState.Icon>
              <EmptyState.Title>No matches for &ldquo;{q}&rdquo;</EmptyState.Title>
              <EmptyState.Description>
                None of the {total} articles match that search.
              </EmptyState.Description>
              <EmptyState.Actions>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-14 text-accent-11 underline underline-offset-4 transition-colors hover:text-accent-12"
                >
                  Clear search
                </button>
              </EmptyState.Actions>
            </EmptyState.Root>
          )
        }
      </SearchField.Empty>

      <SearchField.Results>
        {filtered.map((post) => (
          <WritingCard key={post.slug} post={post} />
        ))}
      </SearchField.Results>
    </SearchField.Root>
  )
}
