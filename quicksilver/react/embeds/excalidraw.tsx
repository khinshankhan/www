"use client"

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import dynamic from "next/dynamic"
import excalidrawAssetConfig from "@/excalidraw-assets.json"
import { useDocumentTheme } from "@/quicksilver/hooks/use-document-theme"
import { cn } from "@/quicksilver/lib/classname"
import {
  getTokenValue,
  resolveColor,
  resolveEmbedShellBackground,
  type DocumentTheme,
} from "@/quicksilver/lib/color"
import { CopyButton } from "@/quicksilver/react/patterns/actions/copy-button"
import { Button } from "@/quicksilver/react/primitives/button"
import { Focus, Maximize } from "@/quicksilver/react/primitives/icons"
import type { ImportedDataState } from "@excalidraw/excalidraw/data/types"
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types"

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
  description: string
  title: string
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
  ["--color-surface-lowest"]: "var(--background-2)",
  ["--color-surface-low"]: "var(--background-2)",
  ["--color-surface-mid"]: "var(--color-surface-3)",
  ["--color-surface-high"]: "var(--color-surface-4)",
  ["--color-primary"]: "var(--color-accent-9)",
  ["--color-primary-darker"]: "var(--color-accent-10)",
  ["--color-primary-darkest"]: "var(--color-accent-11)",
  ["--color-on-primary-container"]: "var(--color-accent-12)",
  ["--default-border-color"]: "color-mix(in oklab, var(--stark-contrast) 12%, transparent)",
  ["--island-bg-color"]: "color-mix(in oklab, var(--background-2) 92%, transparent)",
  ["--popup-bg-color"]: "var(--background-2)",
  ["--overlay-bg-color"]: "color-mix(in oklab, var(--background-2) 72%, transparent)",
  ["--text-primary-color"]: "var(--color-foreground)",
  ["--icon-fill-color"]: "var(--color-foreground)",
  ["--color-gray-10"]: "var(--color-foreground-strong)",
  ["--color-gray-20"]: "var(--color-foreground)",
  ["--color-gray-40"]: "var(--color-foreground-muted)",
  ["--color-gray-50"]: "var(--color-foreground-subtle)",
  ["--color-gray-60"]: "var(--color-foreground-subtle)",
  ["--color-gray-100"]: "var(--color-foreground-strong)",
} as CSSProperties

const excalidrawViewportClassName = "relative isolate h-[28rem] w-full overflow-hidden rounded-md"

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

function normalizeSceneColors(scene: ImportedDataState, theme: DocumentTheme): ImportedDataState {
  if (typeof window === "undefined") {
    return scene
  }

  const foregroundStrong = resolveColor(
    getTokenValue("--color-foreground-strong", theme === "dark" ? "#f5f5fb" : "#1f2937"),
    theme === "dark" ? "#f5f5fb" : "#1f2937"
  )
  const foreground = resolveColor(
    getTokenValue("--color-foreground", theme === "dark" ? "#e5e7eb" : "#374151"),
    theme === "dark" ? "#e5e7eb" : "#374151"
  )
  const background = resolveColor(
    getTokenValue("--background-1", theme === "dark" ? "#161634" : "#ffffff"),
    theme === "dark" ? "#161634" : "#ffffff"
  )

  const normalizedElements = scene.elements?.map((element) => {
    const nextElement = { ...element }
    const strokeColor = nextElement.strokeColor.toLowerCase()
    const backgroundColor = nextElement.backgroundColor.toLowerCase()

    if (strokeColor === "#1e1e1e") {
      nextElement.strokeColor = nextElement.type === "text" ? foregroundStrong : foreground
    }

    if (
      backgroundColor === "#ffffff" &&
      (nextElement.type === "text" || nextElement.type === "arrow")
    ) {
      nextElement.backgroundColor = "transparent"
    }

    if (
      backgroundColor === "#ffffff" &&
      nextElement.type !== "text" &&
      nextElement.type !== "arrow"
    ) {
      nextElement.backgroundColor = background
    }

    return nextElement
  })

  return {
    ...scene,
    elements: normalizedElements,
  }
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
    <div className="flex h-full items-center justify-center px-4 py-6 text-14 text-foreground-subtle">
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
      className="pointer-events-auto absolute top-1 right-11 z-2 opacity-70 transition-opacity hover:opacity-100 md:top-1.5 lg:top-2"
      onClick={onClick}
    >
      {needsReset ? <Focus className="h-4" /> : <Maximize className="h-4" />}
    </Button>
  )
}

export function ExcalidrawScene({
  code,
  className,
  description,
  title,
  ...props
}: ExcalidrawSceneProps) {
  const scene = useMemo(() => parseScene(code), [code])
  const descriptionId = useId()
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [needsReset, setNeedsReset] = useState(false)
  const theme = useDocumentTheme()
  const viewBackgroundColor = useMemo(() => resolveEmbedShellBackground(theme), [theme])
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

  const initialData = useMemo(() => {
    if (!scene || !viewBackgroundColor) {
      return null
    }

    const normalizedScene = normalizeSceneColors(scene, theme)

    return {
      ...normalizedScene,
      appState: {
        ...normalizedScene.appState,
        viewBackgroundColor,
      },
    }
  }, [scene, theme, viewBackgroundColor])

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
        role="alert"
        className={cn(
          "border-accent-theme-danger/20 bg-accent-theme-danger/5 my-4 rounded-md border px-4 py-3 text-14 text-accent-11",
          className
        )}
        {...props}
      >
        Invalid Excalidraw JSON scene.
      </div>
    )
  }

  const accessibilityDescription = `${description} Interactive diagram. Pan and zoom are available. Use Recenter diagram to restore the default view.`

  return (
    <div
      className={cn(
        "article-excalidraw my-4 overflow-hidden rounded-md border border-stark-contrast/10 bg-background-1/60",
        className
      )}
      aria-describedby={descriptionId}
      aria-label={title}
      role="group"
      style={excalidrawThemeVars}
      {...props}
    >
      <p id={descriptionId} className="sr-only">
        {accessibilityDescription}
      </p>
      <div className={excalidrawViewportClassName}>
        <div className="pointer-events-none absolute inset-0 z-2">
          {!isMounted || !viewBackgroundColor ? null : (
            <ExcalidrawResetButton needsReset={needsReset} onClick={fitScene} />
          )}
          <CopyButton text={code} />
        </div>
        {!isMounted || !viewBackgroundColor ? (
          <ExcalidrawFallback />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
