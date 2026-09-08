import React, { type HTMLAttributes } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Link } from "@/quicksilver/react/primitives/link"
import { Paragraph } from "@/quicksilver/react/primitives/text"
import { textVariants } from "@/quicksilver/react/primitives/text.variants"
import { cva, type VariantProps } from "class-variance-authority"

const footerVariants = cva("flex w-full flex-col items-center", {
  variants: {
    // variants for positioning the footer based on hero vs page layouts
    position: {
      fixed: "fixed bottom-24",
      static: "static pt-14.5 pb-24",
    },
  },
  defaultVariants: {
    position: "static",
  },
})

type FooterVariantProps = VariantProps<typeof footerVariants>

interface FooterProps extends HTMLAttributes<HTMLDivElement>, FooterVariantProps {
  /** Repo-relative path of the page's own source, rendered as a "view on GitHub" link. */
  ghPath?: string
}

export function FooterParagraph() {
  return (
    <Paragraph variant="nav" className="text-center">
      &copy; 2017+, Khinshan Khan. All rights reserved.
    </Paragraph>
  )
}

/**
 * Only rendered for pages that declare where their source lives. Keeps the placement it had
 * when it lived in the duotone layout: centered on narrow viewports, pushed to the page's
 * right edge from `md` up.
 */
function GhLink({ ghPath }: { ghPath?: string }) {
  if (!ghPath) {
    return null
  }

  return (
    <div className="flex w-full flex-col items-center pt-14 pb-14.5">
      <div className="w-full maxw-page text-center md:px-4 md:text-end">
        <Link
          href={`https://github.com/khinshankhan/www/tree/main${ghPath}`}
          className={textVariants({ variant: "nav" })}
        >
          View page on GitHub
        </Link>
      </div>
    </div>
  )
}

export function Footer({ position, ghPath, className = "", ...props }: FooterProps) {
  return (
    <footer className={cn(footerVariants({ position }), className)} {...props}>
      <GhLink ghPath={ghPath} />
      <FooterParagraph />
    </footer>
  )
}

interface RevealFooterProps extends HTMLAttributes<HTMLElement> {
  ghPath?: string
}

/**
 * Scroll-revealed footer.
 *
 * The footer reserves its ordinary box at the end of the page, but everything it shows is
 * `position: fixed` and pinned to the viewport, so it never moves. `overflow: hidden` alone
 * would not clip a fixed descendant -- any non-`none` `clip-path` on the same element is what
 * turns it into a real clip, so the footer's box acts as a window that widens as it scrolls up.
 * `border-box` is the inert shape: it clips to the element's own box, changing nothing visually
 * while unlocking the clip.
 *
 * The whole mechanism is opt-in per breakpoint (`footer-reveal` in `app/globals.css`): below it,
 * and whenever the viewport is too short to spare the height, this renders as the ordinary static
 * footer above. See `notes/footer/footer-reveal-spec.md`.
 */
export function RevealFooter({ ghPath, className = "", ...props }: RevealFooterProps) {
  const content = (
    <React.Fragment>
      <GhLink ghPath={ghPath} />
      <FooterParagraph />
    </React.Fragment>
  )

  return (
    <footer className={cn("footer-reveal", className)} {...props}>
      {/* opaque backdrop so the window never shows the page scrolling behind it */}
      <div className="footer-reveal-layer bg-background-1" aria-hidden="true" />

      {/*
        Pinning the real copy takes it out of flow, which would collapse the footer to nothing.
        This copy stays in flow purely to reserve the box, hidden from paint and from assistive
        tech so the duplicated text is not announced twice.
      */}
      <div className="footer-reveal-spacer" aria-hidden="true">
        {content}
      </div>

      <div className="footer-reveal-inner">{content}</div>
    </footer>
  )
}
