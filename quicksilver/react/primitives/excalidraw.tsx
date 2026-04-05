"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/quicksilver/lib/classname"
import excalidrawAssetConfig from "@/excalidraw-assets.json"
import type { ImportedDataState } from "@excalidraw/excalidraw/data/types"
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types"
import { Button } from "./button"
import { CopyButton } from "./code"
import { Focus, Maximize } from "./icons"

declare global {
  interface Window {
    EXCALIDRAW_ASSET_PATH?: string
  }
}

if (typeof window !== "undefined") {
  window.EXCALIDRAW_ASSET_PATH = `/${excalidrawAssetConfig.dir}/`
}

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((module) => module.Excalidraw),
  { ssr: false }
)

export interface ExcalidrawSceneProps extends React.ComponentPropsWithoutRef<"div"> {
  code: string
}

interface ExcalidrawClipboardData {
  type: "excalidraw/clipboard"
  elements: NonNullable<ImportedDataState["elements"]>
  files?: ImportedDataState["files"]
}

interface ViewportState {
  scrollX: number
  scrollY: number
  zoom: number
}

function isClipboardScene(
  scene: ExcalidrawClipboardData | ImportedDataState
): scene is ExcalidrawClipboardData {
  return scene.type === "excalidraw/clipboard"
}

const excalidrawThemeVars = {
  ["--color-surface-lowest"]: "var(--background-1)",
  ["--color-surface-low"]: "var(--background-1)",
  ["--color-surface-mid"]: "var(--color-surface-3)",
  ["--color-surface-high"]: "var(--color-surface-4)",
  ["--color-primary"]: "var(--color-accent-9)",
  ["--color-primary-darker"]: "var(--color-accent-10)",
  ["--color-primary-darkest"]: "var(--color-accent-11)",
  ["--color-on-primary-container"]: "var(--color-accent-12)",
  ["--default-border-color"]: "color-mix(in oklab, var(--stark-contrast) 12%, transparent)",
  ["--island-bg-color"]: "color-mix(in oklab, var(--background-1) 92%, transparent)",
  ["--popup-bg-color"]: "var(--background-1)",
  ["--overlay-bg-color"]: "color-mix(in oklab, var(--background-1) 72%, transparent)",
  ["--text-primary-color"]: "var(--color-foreground)",
  ["--icon-fill-color"]: "var(--color-foreground)",
  ["--color-gray-10"]: "var(--color-foreground-strong)",
  ["--color-gray-20"]: "var(--color-foreground)",
  ["--color-gray-40"]: "var(--color-foreground-muted)",
  ["--color-gray-50"]: "var(--color-foreground-subtle)",
  ["--color-gray-60"]: "var(--color-foreground-subtle)",
  ["--color-gray-100"]: "var(--color-foreground-strong)",
} as CSSProperties

const FALLBACK_BACKGROUND = {
  dark: "#161634",
  light: "#f5f5fb",
} as const

function parseScene(code: string): ImportedDataState | null {
  try {
    const parsed = JSON.parse(code) as ImportedDataState | ExcalidrawClipboardData

    if (isClipboardScene(parsed)) {
      return {
        appState: {},
        elements: parsed.elements,
        files: parsed.files ?? {},
        scrollToContent: true,
      }
    }

    return {
      ...parsed,
      appState: parsed.appState ?? {},
      elements: parsed.elements ?? [],
      files: parsed.files ?? {},
      scrollToContent: parsed.scrollToContent ?? true,
    }
  } catch {
    return null
  }
}

function getTokenValue(name: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback
  }

  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

function resolveColor(value: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback
  }

  const probe = document.createElement("div")
  probe.style.background = value
  probe.style.position = "fixed"
  probe.style.opacity = "0"
  probe.style.pointerEvents = "none"
  document.body.append(probe)

  const resolved = window.getComputedStyle(probe).backgroundColor
  probe.remove()

  return resolved || fallback
}

function blendColors(foreground: string, background: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback
  }

  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1

  const context = canvas.getContext("2d")
  if (!context) {
    return fallback
  }

  context.clearRect(0, 0, 1, 1)
  context.fillStyle = background
  context.fillRect(0, 0, 1, 1)
  context.fillStyle = foreground
  context.fillRect(0, 0, 1, 1)

  const pixel = context.getImageData(0, 0, 1, 1).data
  const red = pixel[0] ?? 0
  const green = pixel[1] ?? 0
  const blue = pixel[2] ?? 0
  const alpha = pixel[3] ?? 255

  return `rgba(${red}, ${green}, ${blue}, ${Number((alpha / 255).toFixed(3))})`
}

function getDocumentTheme() {
  if (typeof document === "undefined") {
    return "light" as const
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function resolveViewBackgroundColor(theme: "light" | "dark") {
  if (typeof window === "undefined") {
    return FALLBACK_BACKGROUND[theme]
  }

  const fallback = FALLBACK_BACKGROUND[theme]
  const background = getTokenValue("--background-1", fallback)
  const pageBackground = window.getComputedStyle(document.body).backgroundColor || fallback
  const surfaceBackground = resolveColor(
    `color-mix(in oklab, ${background} 60%, transparent)`,
    background
  )

  return blendColors(surfaceBackground, pageBackground, background)
}

function hasViewportDrifted(current: ViewportState, baseline: ViewportState | null) {
  if (!baseline) {
    return false
  }

  return (
    Math.abs(current.scrollX - baseline.scrollX) > 1 ||
    Math.abs(current.scrollY - baseline.scrollY) > 1 ||
    Math.abs(current.zoom - baseline.zoom) > 0.01
  )
}

function ExcalidrawFallback() {
  return (
    <div className="flex h-full items-center justify-center px-4 py-6 text-sm text-foreground-subtle">
      Rendering scene...
    </div>
  )
}

function ExcalidrawResetButton({
  onClick,
  needsReset,
}: {
  onClick: () => void
  needsReset: boolean
}) {
  return (
    <Button
      aria-label="Recenter diagram"
      variant="phantom"
      size="icon-sm"
      className="absolute top-1 right-11 z-2 pointer-events-auto opacity-70 transition-opacity hover:opacity-100 md:top-1.5 lg:top-2"
      onClick={onClick}
    >
      {needsReset ? <Focus className="h-4" /> : <Maximize className="h-4" />}
    </Button>
  )
}

export function ExcalidrawScene({ code, className = "", ...props }: ExcalidrawSceneProps) {
  const scene = useMemo(() => parseScene(code), [code])
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [needsReset, setNeedsReset] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">(() => getDocumentTheme())
  const [viewBackgroundColor, setViewBackgroundColor] = useState(() =>
    resolveViewBackgroundColor(getDocumentTheme())
  )
  const fittedViewportRef = useRef<ViewportState | null>(null)

  const handleExcalidrawApi = useCallback((api: ExcalidrawImperativeAPI) => {
    setApi((current) => {
      if (current === api) {
        return current
      }

      return api
    })
  }, [])

  const fitScene = useCallback(() => {
    if (!api || !scene?.elements?.length) {
      return
    }

    api.scrollToContent(scene.elements, {
      animate: false,
      fitToViewport: true,
      viewportZoomFactor: 0.84,
    })

    requestAnimationFrame(() => {
      const appState = api.getAppState()
      fittedViewportRef.current = {
        scrollX: appState.scrollX,
        scrollY: appState.scrollY,
        zoom: appState.zoom.value,
      }
      setNeedsReset(false)
    })
  }, [api, scene])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const syncTheme = () => {
      const nextTheme = getDocumentTheme()
      setTheme(nextTheme)
      setViewBackgroundColor(resolveViewBackgroundColor(nextTheme))
    }

    syncTheme()

    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const initialData = useMemo(() => {
    if (!scene || !viewBackgroundColor) {
      return null
    }

    return {
      ...scene,
      appState: {
        ...scene.appState,
        viewBackgroundColor,
      },
    }
  }, [scene, viewBackgroundColor])

  useEffect(() => {
    if (!api || !initialData?.elements?.length) {
      return
    }

    let firstFrameId = 0
    let secondFrameId = 0

    firstFrameId = requestAnimationFrame(() => {
      secondFrameId = requestAnimationFrame(() => {
        fitScene()
      })
    })

    return () => {
      cancelAnimationFrame(firstFrameId)
      cancelAnimationFrame(secondFrameId)
    }
  }, [api, fitScene, initialData])

  useEffect(() => {
    if (!api) {
      return
    }

    const unsubscribe = api.onScrollChange((scrollX, scrollY, zoom) => {
      setNeedsReset(
        hasViewportDrifted(
          {
            scrollX,
            scrollY,
            zoom: zoom.value,
          },
          fittedViewportRef.current
        )
      )
    })

    return () => {
      unsubscribe()
    }
  }, [api])

  if (!scene) {
    return (
      <div
        className={cn(
          "border-accent-theme-danger/20 bg-accent-theme-danger/5 text-sm my-4 rounded-md border px-4 py-3 text-accent-11",
          className
        )}
        {...props}
      >
        Invalid Excalidraw JSON scene.
      </div>
    )
  }

  return (
    <div
      className={cn(
        "article-excalidraw my-4 overflow-hidden rounded-md border border-stark-contrast/10 bg-background-1/60",
        className
      )}
      style={excalidrawThemeVars}
      {...props}
    >
      {!isMounted || !viewBackgroundColor ? (
        <ExcalidrawFallback />
      ) : (
        <div className="relative isolate h-[28rem] w-full overflow-hidden rounded-md">
          <div className="pointer-events-none absolute inset-0 z-2">
            <ExcalidrawResetButton needsReset={needsReset} onClick={fitScene} />
            <CopyButton text={code} />
          </div>
          <div className="relative z-0 h-full w-full">
            <Excalidraw
              excalidrawAPI={handleExcalidrawApi}
              key={`${theme}-${viewBackgroundColor}`}
              initialData={initialData}
              theme={theme}
              viewModeEnabled
              zenModeEnabled
              UIOptions={{
                canvasActions: {
                  changeViewBackgroundColor: false,
                  clearCanvas: false,
                  export: false,
                  loadScene: false,
                  saveAsImage: false,
                  saveToActiveFile: false,
                  toggleTheme: false,
                },
                tools: {
                  image: false,
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
