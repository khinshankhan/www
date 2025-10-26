"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

export interface ActiveAnchorState {
  activeId: string | null
  /** All discovered anchors in DOM order */
  ids: string[]
  /** Force a manual re-scan (useful if content changes) */
  rescan: () => void
}

const ActiveAnchorsContext = createContext<ActiveAnchorState | undefined>(undefined)

export function useActiveAnchors() {
  const ctx = useContext(ActiveAnchorsContext)
  if (!ctx) {
    throw new Error("useActiveAnchors must be used within a ActiveAnchorsProvider")
  }
  return ctx
}

export interface ActiveAnchorsProviderProps {
  children: ReactNode

  /** Explicit list of IDs to watch (DOM order). */
  ids: string[]
  /** Offset where a section counts as active (px or fraction of viewport via 0-1) */
  activeOffset?: number
  /** Re-scan anchors on window resize (default true) */
  rescanOnResize?: boolean
}
export function ActiveAnchorsProvider({
  children,
  ids,
  activeOffset = 0.2,
  rescanOnResize = true,
}: ActiveAnchorsProviderProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [resolvedIds, setResolvedIds] = useState<string[]>([])

  const nodeRefs = useRef<HTMLElement[]>([])
  const ticking = useRef(false)

  const offsetRef = useRef(activeOffset)
  const idsRef = useRef<string[]>(ids)

  useEffect(() => {
    offsetRef.current = activeOffset
  }, [activeOffset])
  useEffect(() => {
    idsRef.current = ids
  }, [ids])

  const computeThresholdPx = useCallback(() => {
    if (typeof window === "undefined") {
      return 0
    }

    const off = offsetRef.current
    if (off <= 1) {
      return Math.floor(window.innerHeight * off)
    }
    return Math.floor(off)
  }, [])

  const scan = useCallback(() => {
    const list = [...new Set(idsRef.current.filter(Boolean))]
    const nodes: HTMLElement[] = list
      .map((id) => (typeof document !== "undefined" ? document.getElementById(id) : null))
      .filter((el): el is HTMLElement => !!el)

    nodeRefs.current = nodes
    setResolvedIds(list)
  }, [])

  const onScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true

    requestAnimationFrame(() => {
      const threshold = computeThresholdPx()
      const nodes = nodeRefs.current

      const [first] = nodes
      let current: string | null = first?.id ?? null
      for (const node of nodes) {
        const rect = node.getBoundingClientRect()
        if (rect.top - threshold <= 0) {
          current = node.id // last one above threshold wins
        } else {
          break
        }
      }

      setActiveId(current)
      ticking.current = false
    })
  }, [computeThresholdPx])

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return
    }

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
      ids: resolvedIds,
      rescan: scan,
    }),
    [activeId, resolvedIds, scan]
  )

  return <ActiveAnchorsContext.Provider value={value}>{children}</ActiveAnchorsContext.Provider>
}
