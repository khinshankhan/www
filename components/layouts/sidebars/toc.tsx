"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { useIsomorphicEffect } from "@/hooks/core/use-isomorphic-effect"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import { checkIfElementInView, focusElement } from "@/lib/focus"
import { scrollToElement, waitForWindowScrollEnd } from "@/lib/scroll"
import { cn } from "@/quicksilver/lib/classname"
import {
  ActiveAnchorsProvider,
  useActiveAnchors,
} from "@/quicksilver/react/headless/anchor/use-active-anchors"
import { ScrollFadeIn } from "@/quicksilver/react/patterns/motion/scroll-fade-in"
import { Button, type ButtonProps } from "@/quicksilver/react/primitives/button"
import { Divider } from "@/quicksilver/react/primitives/divider"
import { ChevronRight, ListTree } from "@/quicksilver/react/primitives/icons"
import { Link } from "@/quicksilver/react/primitives/link"
import { ProgressCircle } from "@/quicksilver/react/primitives/progress-circle"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { LayoutGroup, motion } from "motion/react"
import { Collapsible } from "@base-ui/react/collapsible"

export interface Heading {
  id: string
  title: string
  depth: number
}

interface TocItemProps {
  heading: Heading
  indents: number
  onSelect?: () => void
  layoutId?: string
}
function TocItem({ heading, indents, onSelect, layoutId }: TocItemProps) {
  const { activeId } = useActiveAnchors()
  const isActive = activeId === heading.id

  return (
    <li
      data-active={isActive ? "true" : "false"}
      className="link-box relative mx-1 w-full transition-[background-color] data-[active=false]:duration-500 data-[active=true]:bg-surface-5/25 data-[active=true]:duration-1000"
    >
      {/* default sideline */}
      <span className="absolute top-0 left-0 h-full w-0.5 bg-surface-12/10" />

      {/* shared sideline that morphs between active items */}
      {isActive && layoutId && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-y-0 left-0 w-0.5 bg-accent-11 will-change-transform"
          transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
        />
      )}

      <Link
        href={`#${heading.id}`}
        data-active={isActive ? "true" : "false"}
        variant="toc"
        className={cn(
          textVariants({ variant: "xs" }),
          "ml-2 inline-block w-(--w) scroll-smooth py-0 text-left",
          indents === 0 && "ps-2",
          indents === 1 && "ps-6",
          indents === 2 && "ps-10",
          indents === 3 && "ps-14",
          indents === 4 && "ps-18",
          indents === 5 && "ps-22"
        )}
        style={
          {
            "--w": `calc(100% - 0.7rem)`,
          } as CSSProperties
        }
        onClick={async (e) => {
          /* Reasoning for this approach:
           * Since headings aren't "focusable" elements, the 'focus-within' smooth scroll won't work and we need to
           * handle the scroll ourselves. Non js users will still get the default anchor behavior ('abruptly jumping'
           * to the link) which isn't as nice but it's still usable. It's fine as opting to not use js often comes with
           * a different set of expectations. Similarly, focus element won't work for non-js users but it's a nice to have
           * for js users, which hopefully most people who need accessibility tools have on.
           */

          // prevent default anchor behavior
          e.preventDefault()

          // update the url without causing a full page reload
          // this may even handle scrolling to target smoothly
          history.pushState(null, "", `#${heading.id}`)

          // definitively scroll smoothly to the section
          scrollToElement(`#${heading.id}`, { behavior: "smooth" })
          onSelect?.()

          // wait for scroll to end, then focus the element because focusing 'jumps' the page
          await waitForWindowScrollEnd()
          const isElementInView = await checkIfElementInView(`#${heading.id}`)
          if (isElementInView) {
            focusElement(`#${heading.id} a`)
          }
        }}
      >
        {heading.title}
      </Link>
    </li>
  )
}

function TocList({
  headings,
  minDepth,
  onSelect,
  layoutId,
  shouldCenterActive = false,
}: {
  headings: Heading[]
  minDepth: number
  onSelect?: () => void
  layoutId?: string
  shouldCenterActive?: boolean
}) {
  const { activeId } = useActiveAnchors()
  const navRef = useRef<HTMLElement | null>(null)
  const tweenRef = useRef<number | null>(null)
  const [scrollMask, setScrollMask] = useState<"none" | "top" | "bottom" | "both">("none")
  // Default to the mobile cap; a tall value makes the drawer overshoot then snap on first
  // open. Raised to the real available height on desktop below.
  const [desktopMaxHeight, setDesktopMaxHeight] = useState("24rem")

  // Eased scroll for the rail's internal reposition, gentler than native smooth-scroll.
  // Cancels any in-flight tween so successive repositions don't fight.
  const tweenScrollTo = useCallback((nav: HTMLElement, to: number, duration = 420) => {
    if (tweenRef.current !== null) {
      cancelAnimationFrame(tweenRef.current)
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const from = nav.scrollTop
    const delta = to - from
    if (prefersReduced || duration <= 0) {
      nav.scrollTop = to
      return
    }

    // easeOutCubic: quick to start, soft to settle
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    const start = performance.now()

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      nav.scrollTop = from + delta * ease(t)
      if (t < 1) {
        tweenRef.current = requestAnimationFrame(step)
      } else {
        tweenRef.current = null
      }
    }

    tweenRef.current = requestAnimationFrame(step)
  }, [])

  useEffect(() => {
    return () => {
      if (tweenRef.current !== null) {
        cancelAnimationFrame(tweenRef.current)
      }
    }
  }, [])

  const centerActiveItem = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      const nav = navRef.current
      if (!nav || !activeId) {
        return
      }

      const activeItem = nav.querySelector<HTMLElement>(`li[data-active="true"]`)
      if (!activeItem) {
        return
      }

      const navHeight = nav.clientHeight
      const itemTop = activeItem.offsetTop
      const itemHeight = activeItem.offsetHeight
      const currentScrollTop = nav.scrollTop
      const itemStart = itemTop - currentScrollTop
      const itemEnd = itemStart + itemHeight

      // Keep the active item around the middle of the TOC viewport instead of hugging the edges.
      const bandTop = navHeight * 0.32
      const bandBottom = navHeight * 0.68
      const isAboveBand = itemStart < bandTop
      const isBelowBand = itemEnd > bandBottom

      if (isAboveBand || isBelowBand) {
        const targetTop = itemTop - navHeight * 0.5 + itemHeight / 2
        const maxScrollTop = Math.max(0, nav.scrollHeight - navHeight)
        const nextScrollTop = Math.max(0, Math.min(targetTop, maxScrollTop))

        if (Math.abs(nextScrollTop - currentScrollTop) > 6) {
          if (behavior === "smooth") {
            tweenScrollTo(nav, nextScrollTop)
          } else {
            nav.scrollTop = nextScrollTop
          }
        }
      }
    },
    [activeId, tweenScrollTo]
  )

  const updateScrollMask = useCallback(() => {
    const nav = navRef.current
    if (!nav) {
      return
    }

    const maxScrollTop = Math.max(0, nav.scrollHeight - nav.clientHeight)
    const scrollTop = nav.scrollTop
    const atTop = scrollTop <= 2
    const atBottom = maxScrollTop - scrollTop <= 2

    if (maxScrollTop <= 2) {
      setScrollMask("none")
      return
    }

    if (atTop) {
      setScrollMask("bottom")
      return
    }

    if (atBottom) {
      setScrollMask("top")
      return
    }

    setScrollMask("both")
  }, [])

  useEffect(() => {
    // Debounce so the rail settles once after scrolling instead of chasing every activeId
    // change with its own smooth scroll.
    const timer = setTimeout(() => centerActiveItem("smooth"), 120)
    return () => clearTimeout(timer)
  }, [activeId, centerActiveItem])

  useEffect(() => {
    if (!shouldCenterActive) {
      return
    }

    const frame = requestAnimationFrame(() => {
      centerActiveItem("auto")
    })

    return () => cancelAnimationFrame(frame)
  }, [centerActiveItem, shouldCenterActive])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) {
      return
    }

    updateScrollMask()

    nav.addEventListener("scroll", updateScrollMask, { passive: true })
    window.addEventListener("resize", updateScrollMask)

    return () => {
      nav.removeEventListener("scroll", updateScrollMask)
      window.removeEventListener("resize", updateScrollMask)
    }
  }, [headings, updateScrollMask])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) {
      return
    }

    const measure = () => {
      if (typeof window === "undefined") {
        return
      }

      if (window.innerWidth < 1280) {
        setDesktopMaxHeight((prev) => (prev === "24rem" ? prev : "24rem"))
        return
      }

      const rect = nav.getBoundingClientRect()

      // Use the rail's pinned top, not its live one: at the page end the sticky rail releases
      // and rect.top scrolls off-screen, which would over-grow the height and hide the
      // scrollbar. Pinned top = summed sticky offsets + the nav's offset below the outermost.
      let outermostSticky: HTMLElement | null = null
      let stickyOffsetSum = 0
      for (let el = nav.parentElement; el && el.tagName !== "BODY"; el = el.parentElement) {
        if (getComputedStyle(el).position === "sticky") {
          stickyOffsetSum += parseFloat(getComputedStyle(el).top) || 0
          outermostSticky = el
        }
      }
      const pinnedTop = outermostSticky
        ? stickyOffsetSum + (rect.top - outermostSticky.getBoundingClientRect().top)
        : rect.top
      const effectiveTop = Math.max(rect.top, pinnedTop)

      const viewportHeight = window.innerHeight
      const bottomGap = 8
      const availableHeight = Math.max(0, viewportHeight - effectiveTop - bottomGap)
      const next = `${Math.floor(availableHeight)}px`
      // Runs every scroll frame, so skip the re-render when the value is unchanged.
      setDesktopMaxHeight((prev) => (prev === next ? prev : next))
    }

    // Throttle to one measure per frame; measure() reads layout, so running it on every
    // scroll event janks the page scroll.
    let ticking = false
    const onScroll = () => {
      if (ticking) {
        return
      }
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        measure()
      })
    }

    measure()

    window.addEventListener("resize", onScroll)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("resize", onScroll)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="relative">
      {(scrollMask === "top" || scrollMask === "both") && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--background-2) 0%, color-mix(in oklab, var(--background-2) 92%, transparent) 38%, color-mix(in oklab, var(--background-2) 56%, transparent) 72%, transparent 100%)",
          }}
        />
      )}
      {(scrollMask === "bottom" || scrollMask === "both") && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10"
          style={{
            background:
              "linear-gradient(to top, var(--background-2) 0%, color-mix(in oklab, var(--background-2) 92%, transparent) 38%, color-mix(in oklab, var(--background-2) 56%, transparent) 72%, transparent 100%)",
          }}
        />
      )}
      <nav
        ref={navRef}
        aria-label="Table of contents"
        className="max-h-[min(24rem,calc(100svh-12rem))] [scrollbar-gutter:stable] overflow-y-auto overscroll-contain pr-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-accent-11 [&::-webkit-scrollbar-thumb]:shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-accent-12)_20%,transparent)] [&::-webkit-scrollbar-track]:bg-transparent"
        style={{ maxHeight: desktopMaxHeight }}
      >
        <ul className="list-none xl:pb-6">
          {headings.map((heading) => (
            <TocItem
              key={heading.id}
              heading={heading}
              indents={heading.depth - minDepth}
              onSelect={onSelect}
              layoutId={layoutId}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}

interface TocTitleTriggerProps extends ButtonProps {
  isOpen: boolean
  headings: Heading[]
  renderChevron?: boolean
}

const tocTitleTriggerGroupClasses =
  "group mx-auto flex w-full maxw-prose items-center justify-start gap-2 px-2 py-2"

function TocTitleTrigger({
  isOpen,
  headings,
  className = "",

  renderChevron = false,
  ...props
}: TocTitleTriggerProps) {
  const { activeId } = useActiveAnchors()
  const activeHeading =
    (activeId ? headings.find((h) => h.id === activeId) : headings[0])?.title ?? "No headings found"
  const activeIndex = headings.findIndex((h) => h.id === activeId)
  const progress = activeIndex === -1 ? 0 : ((activeIndex + 1) / headings.length) * 100

  return (
    <Button {...props} variant="ghost" className={cn(className, tocTitleTriggerGroupClasses)}>
      <ProgressCircle
        value={progress}
        className="accent-theme-default size-[1em] shrink-0 text-accent-11"
      />

      <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-left">
        <span className="sr-only xl:not-sr-only xl:truncate">On this page</span>
        <ListTree
          aria-hidden="true"
          className="size-4.5 shrink-0 text-foreground-muted xl:hidden"
        />
        <span
          title={activeHeading}
          className={cn(
            textVariants({ variant: "h5" }),
            "min-w-0 truncate text-left leading-tight text-foreground transition-[opacity,transform] duration-220 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden",
            isOpen ? "opacity-70" : "opacity-100"
          )}
        >
          {activeHeading}
        </span>
      </span>

      {renderChevron && (
        <ChevronRight className="ml-auto size-5 shrink-0 rotate-90 transition-all duration-300 ease-out group-data-[panel-open]:-rotate-90" />
      )}
    </Button>
  )
}

interface TableOfContentsProps {
  headings?: Heading[]
  className?: string
}
const tocListFrameStyle = {
  "--max-w": "min(var(--maxw-prose, 55ch), 90%)",
} as CSSProperties

function TocListFrame({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("mx-auto maxw-prose max-w-(--max-w) xl:max-w-full", className)}
      style={tocListFrameStyle}
    >
      <div className="px-1 pt-2 pb-2">{children}</div>
    </div>
  )
}

function DesktopToc({
  headings,
  minDepth,
  className = "",
}: {
  headings: Heading[]
  minDepth: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative top-0 hidden w-full bg-background-2 py-2 xl:block vh-comfy:sticky",
        /* fill the sticky column top-to-bottom so full-bleed bands can't leak through the rail's gaps */
        "vh-comfy:min-h-[calc(100svh-var(--h)-var(--h-d))]",
        /* extend the opaque rail up through the header displacement gap so bands can't leak above the title */
        "before:absolute before:inset-x-0 before:top-0 before:hidden before:h-(--h-d) before:-translate-y-full before:bg-background-2 before:content-[''] vh-comfy:before:block",
        className
      )}
    >
      <div className="mx-auto maxw-content">
        <TocTitleTrigger
          isOpen={true}
          headings={headings}
          render={(props) => <div {...props} className={tocTitleTriggerGroupClasses} />}
        />
      </div>

      <TocListFrame>
        <TocList headings={headings} minDepth={minDepth} layoutId="toc-active-indicator-desktop" />
      </TocListFrame>
    </div>
  )
}

function MobileToc({
  headings,
  minDepth,
  className = "",
  isOpen,
  setIsOpen,
  shouldCloseOnSelect,
}: {
  headings: Heading[]
  minDepth: number
  className?: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  shouldCloseOnSelect: boolean
}) {
  return (
    <Collapsible.Root
      open={isOpen}
      className={cn(
        "relative top-0 w-full bg-background-2 py-2 xl:hidden vh-comfy:sticky",
        className
      )}
    >
      <div className="mx-auto maxw-content">
        <Collapsible.Trigger
          render={(props) => (
            <TocTitleTrigger
              {...props}
              onClick={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              headings={headings}
              renderChevron={true}
            />
          )}
        />
      </div>

      <Collapsible.Panel
        /* Overlay (absolute) rather than in-flow: an in-flow expand grows the sticky root and
           the browser shifts window scroll to compensate, which is the visible jump on open. */
        className="absolute inset-x-0 top-full z-40 flex h-(--h) w-full flex-col justify-start overflow-hidden bg-background-2 opacity-100 transition-[height,opacity] duration-320 ease-[cubic-bezier(0.22,1,0.36,1)] data-[ending-style]:h-0 data-[ending-style]:opacity-0 data-[starting-style]:h-0 data-[starting-style]:opacity-0"
        style={
          {
            "--h": "var(--collapsible-panel-height)",
            "--max-w": "min(var(--maxw-prose, 55ch), 90%)",
          } as CSSProperties
        }
      >
        <motion.div
          className="px-1 pt-2 pb-2"
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -4,
          }}
          transition={{
            duration: isOpen ? 0.2 : 0.12,
            ease: [0.22, 1, 0.36, 1],
            delay: isOpen ? 0.04 : 0,
          }}
        >
          <TocListFrame className="max-w-(--max-w)">
            <TocList
              headings={headings}
              minDepth={minDepth}
              layoutId="toc-active-indicator-mobile"
              shouldCenterActive={isOpen}
              onSelect={() => {
                if (shouldCloseOnSelect) {
                  setIsOpen(false)
                }
              }}
            />
          </TocListFrame>
        </motion.div>

        {/* Rides the drawer's bottom edge as the panel's own height animates. Gone when
            closed (the panel is display:none), so the root divider below covers that case. */}
        <Divider
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 z-2 hidden w-full -translate-x-1/2 transform vh-comfy:max-xl:block"
          intensity="solid"
          style={{
            // minus 20px to account for the scrollbar, else a horizontal scroll may appear
            width: "calc(100dvw - 20px)",
          }}
        />
      </Collapsible.Panel>

      {/* Closed-state separator under the bar (revealed on scroll). Hidden while open so the
          panel's own bottom divider is the only line. */}
      {!isOpen && (
        <ScrollFadeIn startPx={150} rangePx={400}>
          <Divider
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 z-2 hidden w-full -translate-x-1/2 transform vh-comfy:max-xl:block"
            intensity="solid"
            style={{
              width: "calc(100dvw - 20px)",
            }}
          />
        </ScrollFadeIn>
      )}
    </Collapsible.Root>
  )
}

export function TOC({ headings = [], className = "" }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isXl = useBreakpoint("xl")
  useIsomorphicEffect(() => setIsOpen(isXl), [isXl])
  const minDepth = headings.length === 0 ? 1 : Math.min(...headings.map(({ depth }) => depth))
  const ids = useMemo(() => headings.map((h) => h.id), [headings])

  return (
    <ActiveAnchorsProvider ids={ids}>
      <LayoutGroup id="toc">
        <DesktopToc headings={headings} minDepth={minDepth} className={className} />
        <MobileToc
          headings={headings}
          minDepth={minDepth}
          className={className}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          shouldCloseOnSelect={!isXl}
        />
      </LayoutGroup>
    </ActiveAnchorsProvider>
  )
}
