"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

export interface ActiveAnchorState {
  activeId: string | null
  isActive: (id: string) => boolean
  /** All discovered anchors in DOM order */
  ids: string[]
  /** Force a manual re-scan (useful if content changes) */
  rescan: () => void
}

const ActiveAnchorsCtx = createContext<ActiveAnchorState | null>(null)

export function useActiveAnchors() {
  const ctx = useContext(ActiveAnchorsCtx)
  if (!ctx) throw new Error("useAnchors must be used within <ActiveAnchorsProvider>")
  return ctx
}

export function ActiveAnchorsProvider({
  children,
  ids,
  /** Offset where a section counts as active (px or fraction of viewport via 0-1) */
  activeOffset = 0.2, // 20% of viewport height
  /** Re-scan anchors on window resize (default true) */
  rescanOnResize = true,
}: {
  children: React.ReactNode
  ids: string[]
  activeOffset?: number // px if > 1, fraction of viewport if 0-1
  rescanOnResize?: boolean
}) {
  const [resolvedIds, setResolvedIds] = useState<string[]>(ids ?? [])
  const [activeId, setActiveId] = useState<string | null>(null)
  const nodeRefs = useRef<HTMLElement[]>([])
  const ticking = useRef(false)

  const computeThresholdPx = useCallback(() => {
    if (activeOffset <= 1) return Math.floor(window.innerHeight * activeOffset)
    return Math.floor(activeOffset)
  }, [activeOffset])

  const scan = useCallback(() => {
    const nodes: HTMLElement[] = ids
      .map((id) => document.getElementById(id) as HTMLElement | null)
      .filter((el): el is HTMLElement => !!el)

    setResolvedIds(ids.slice())
    nodeRefs.current = nodes
  }, [ids.join("-")])

  const onScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const threshold = computeThresholdPx()
      const nodes = nodeRefs.current
      let current: string | null = nodes.length ? nodes[0].id : null

      for (let i = 0; i < nodes.length; i++) {
        const rect = nodes[i].getBoundingClientRect()
        if (rect.top - threshold <= 0) {
          current = nodes[i].id // last one above threshold wins
        } else {
          break
        }
      }

      setActiveId(current)
      ticking.current = false
    })
  }, [computeThresholdPx])

  useEffect(() => {
    scan()
    onScroll()

    window.addEventListener("scroll", onScroll, { passive: true })
    if (rescanOnResize) window.addEventListener("resize", scan)

    const mutObs = new MutationObserver(() => {
      // if DOM changes might have added/removed anchors, rescan
      scan()
      onScroll()
    })
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rescanOnResize) window.removeEventListener("resize", scan)
      mutObs.disconnect()
    }
  }, [onScroll, rescanOnResize, scan])

  const value = useMemo<ActiveAnchorState>(
    () => ({
      activeId,
      isActive: (id: string) => id === activeId,
      ids: resolvedIds,
      rescan: scan,
    }),
    [activeId, resolvedIds, scan]
  )

  return <ActiveAnchorsCtx.Provider value={value}>{children}</ActiveAnchorsCtx.Provider>
}
