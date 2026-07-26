import { focusRingInset } from "@/quicksilver/react/primitives/focus.variants"

/* Separate from skip-links.tsx so server components can spread these: importing from a
   "use client" module hands back a client reference rather than the values. */

export const MAIN_CONTENT_ID = "main-content"
export const TOC_CONTENT_ID = "toc-content"

/** Spread onto whichever element the "Main content" link should focus. */
export const mainContentTargetProps = {
  id: MAIN_CONTENT_ID,
  tabIndex: -1,
  className: focusRingInset,
} as const
