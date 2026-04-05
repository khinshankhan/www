"use client"

import { useEffect, useId, useRef, useState } from "react"
import {
  DemoFrame,
  DemoGrid,
  DemoPlayPauseIcon,
  DemoRail,
  DemoResetIcon,
  DemoSegmentedControl,
  DemoStage,
  DemoStatusIcon,
  DemoToolbar,
  DemoViewport,
} from "@/components/demo"
import { cn } from "@/quicksilver/lib/classname"
import { Button } from "@/quicksilver/react/primitives/button"
import { Checkbox } from "@/quicksilver/react/primitives/checkbox"
import { ChevronRight, Play, Star } from "@/quicksilver/react/primitives/icons"

function FontSmoothingColumn({
  title,
  description,
  ok,
  antialiased = false,
}: {
  title: string
  description: string
  ok: boolean
  antialiased?: boolean
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 px-6 py-10 sm:px-8 sm:py-12",
        antialiased && "antialiased"
      )}
    >
      <h4 className="font-heading text-[1.15rem] leading-snug font-medium tracking-tight text-foreground-strong sm:text-[1.25rem]">
        {title}
      </h4>
      <p className="max-w-[22rem] text-[1.02rem] leading-8 text-foreground-subtle">{description}</p>
      <div className="pt-2">
        <DemoStatusIcon ok={ok} />
      </div>
    </div>
  )
}

export function FontSmoothingPlayground() {
  return (
    <DemoFrame>
      <DemoStage className="p-0">
        <div className="grid min-w-0 divide-y divide-surface-4/45 md:grid-cols-2 md:divide-x md:divide-y-0">
          <FontSmoothingColumn
            description="Default font smoothing uses subpixel antialiasing on macOS."
            ok={false}
            title="Subpixel rendering"
          />
          <FontSmoothingColumn
            antialiased
            description="Grayscale antialiasing produces thinner, crisper light text."
            ok
            title="Antialiased rendering"
          />
        </div>
      </DemoStage>
    </DemoFrame>
  )
}

type AlignmentMode = "geometric" | "optical"

function PaddingBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex min-w-[4.5rem] items-center justify-center rounded-full border border-[#00c46a]/55 bg-[#082517] px-3 py-1.5 text-[1.05rem] leading-none font-medium text-[#00dd78]">
      {children}
    </div>
  )
}

function OpticalAlignmentButton({
  mode,
  showPadding,
}: {
  mode: AlignmentMode
  showPadding: boolean
}) {
  const rightPadding = mode === "optical" ? 20 : 24
  const leftPadding = 24

  return (
    <div className="flex items-center justify-center gap-5">
      {showPadding && <PaddingBadge>{leftPadding}px</PaddingBadge>}

      <div className="relative">
        <button
          className="relative inline-flex h-12 items-center justify-center gap-[10px] overflow-hidden rounded-full bg-[#232323] text-white select-none"
          style={{
            paddingLeft: `${leftPadding}px`,
            paddingRight: `${rightPadding}px`,
            paddingTop: "6px",
            paddingBottom: "6px",
          }}
          type="button"
        >
          {showPadding && (
            <>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 bg-[#22c55e]/30 select-none"
                style={{ width: `${leftPadding}px` }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 bg-[#22c55e]/30 select-none"
                style={{ width: `${rightPadding}px` }}
              />
            </>
          )}

          <span className="relative z-1 text-[1.15rem] leading-none font-medium tracking-tight">
            Button
          </span>
          <span className="relative z-1 inline-flex size-7 items-center justify-center rounded-full bg-white text-black">
            <ChevronRight className="size-4.5 stroke-[2.6]" />
          </span>
        </button>
      </div>

      {showPadding && <PaddingBadge>{rightPadding}px</PaddingBadge>}
    </div>
  )
}

export function OpticalAlignmentPlayground() {
  const [mode, setMode] = useState<AlignmentMode>("geometric")
  const [showPadding, setShowPadding] = useState(false)
  const checkboxId = useId()

  return (
    <DemoFrame>
      <DemoToolbar>
        <DemoSegmentedControl
          onChange={setMode}
          options={[
            { label: "Geometric", value: "geometric" },
            { label: "Optical", value: "optical" },
          ]}
          value={mode}
        />
      </DemoToolbar>

      <DemoViewport className="bg-background-2">
        <OpticalAlignmentButton mode={mode} showPadding={showPadding} />
      </DemoViewport>

      <DemoRail className="bg-background-1">
        <label
          className="mx-auto flex cursor-pointer items-center justify-center gap-3 text-[1.05rem] leading-none font-medium text-foreground-strong"
          htmlFor={checkboxId}
        >
          <Checkbox checked={showPadding} id={checkboxId} onCheckedChange={setShowPadding} />
          <span>Show Padding</span>
        </label>
      </DemoRail>
    </DemoFrame>
  )
}

function MarginBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex min-w-[3.25rem] items-center justify-center rounded-full border border-[#ff8400]/45 bg-[#321700] px-2.5 py-1 text-[1.05rem] leading-none font-medium text-[#ff8400]">
      {children}
    </div>
  )
}

function OpticalStarButton({ mode, showMargin }: { mode: AlignmentMode; showMargin: boolean }) {
  const offsets = mode === "optical" ? { top: 0, bottom: 2 } : { top: 0, bottom: 0 }
  const iconShift = offsets.top / 2 - offsets.bottom / 2
  const starBoxSize = 4
  const starBottomEdge = `calc(50% + ${starBoxSize / 2}rem + ${iconShift}px)`

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {showMargin && <MarginBadge>{offsets.top}px</MarginBadge>}

      <div className="relative">
        <button
          aria-label="Example star button"
          className="relative inline-flex size-28 items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#232323] text-white select-none"
          type="button"
        >
          {showMargin && offsets.bottom > 0 && (
            <div
              className="pointer-events-none absolute bg-[#ff8400]/30 select-none"
              style={{
                top: starBottomEdge,
                left: 0,
                right: 0,
                height: `${offsets.bottom}px`,
              }}
            />
          )}

          <span
            className="relative z-1 inline-flex size-28 items-center justify-center"
            style={{ transform: `translateY(${iconShift}px)` }}
          >
            <Star className="size-16 fill-[#3b82f6] stroke-none" />
          </span>
        </button>
      </div>

      {showMargin && <MarginBadge>{offsets.bottom}px</MarginBadge>}
    </div>
  )
}

export function OpticalStarAlignmentPlayground() {
  const [mode, setMode] = useState<AlignmentMode>("geometric")
  const [showMargin, setShowMargin] = useState(false)
  const checkboxId = useId()

  return (
    <DemoFrame>
      <DemoToolbar>
        <DemoSegmentedControl
          onChange={setMode}
          options={[
            { label: "Geometric", value: "geometric" },
            { label: "Optical", value: "optical" },
          ]}
          value={mode}
        />
      </DemoToolbar>

      <DemoViewport className="bg-background-2">
        <OpticalStarButton mode={mode} showMargin={showMargin} />
      </DemoViewport>

      <DemoRail className="bg-background-1">
        <label
          className="mx-auto flex cursor-pointer items-center justify-center gap-3 text-[1.05rem] leading-none font-medium text-foreground-strong"
          htmlFor={checkboxId}
        >
          <Checkbox checked={showMargin} id={checkboxId} onCheckedChange={setShowMargin} />
          <span>Show Margin</span>
        </label>
      </DemoRail>
    </DemoFrame>
  )
}

function OpticalPlayButton({ mode, showMargin }: { mode: AlignmentMode; showMargin: boolean }) {
  const offsets = mode === "optical" ? { left: 6, right: 0 } : { left: 0, right: 0 }
  const iconShift = offsets.left / 2 - offsets.right / 2

  return (
    <div className="flex items-center justify-center gap-5">
      {showMargin && <MarginBadge>{offsets.left}px</MarginBadge>}

      <div className="relative">
        <button
          aria-label="Example play button"
          className="relative inline-flex size-20 items-center justify-center overflow-hidden rounded-full bg-[#232323] text-white select-none"
          type="button"
        >
          {showMargin && offsets.left > 0 && (
            <div
              className="pointer-events-none absolute inset-y-0 bg-[#ff8400]/30 select-none"
              style={{
                left: `calc(50% - 0.75rem + ${iconShift}px - ${offsets.left}px)`,
                width: `${offsets.left}px`,
              }}
            />
          )}

          <span
            className="relative z-1 inline-flex size-20 items-center justify-center"
            style={{ transform: `translateX(${iconShift}px)` }}
          >
            <Play className="size-9 fill-current stroke-none text-white/65" />
          </span>
        </button>
      </div>

      {showMargin && <MarginBadge>{offsets.right}px</MarginBadge>}
    </div>
  )
}

export function OpticalPlayAlignmentPlayground() {
  const [mode, setMode] = useState<AlignmentMode>("geometric")
  const [showMargin, setShowMargin] = useState(false)
  const checkboxId = useId()

  return (
    <DemoFrame>
      <DemoToolbar>
        <DemoSegmentedControl
          onChange={setMode}
          options={[
            { label: "Geometric", value: "geometric" },
            { label: "Optical", value: "optical" },
          ]}
          value={mode}
        />
      </DemoToolbar>

      <DemoViewport className="bg-background-2">
        <OpticalPlayButton mode={mode} showMargin={showMargin} />
      </DemoViewport>

      <DemoRail className="bg-background-1">
        <label
          className="mx-auto flex cursor-pointer items-center justify-center gap-3 text-[1.05rem] leading-none font-medium text-foreground-strong"
          htmlFor={checkboxId}
        >
          <Checkbox checked={showMargin} id={checkboxId} onCheckedChange={setShowMargin} />
          <span>Show Margin</span>
        </label>
      </DemoRail>
    </DemoFrame>
  )
}

const START_VALUE = 1000
const END_VALUE = 1137
const DURATION_MS = 5200

function NumberPill({ value, tabular = false }: { value: number; tabular?: boolean }) {
  return (
    <div className="relative flex h-16 min-w-0 items-center justify-center overflow-hidden rounded-full border border-surface-4/55 bg-surface-a1 px-6">
      <div className="pointer-events-none absolute inset-x-5 top-3 h-px bg-surface-7/14" />
      <div className="pointer-events-none absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-surface-7/18" />
      <div className="pointer-events-none absolute inset-x-5 bottom-3 h-px bg-surface-7/14" />
      <div
        className={cn(
          "font-heading relative text-[2.2rem] leading-none font-medium tracking-[-0.06em] text-foreground-strong sm:text-[2.5rem]",
          tabular && "[font-variant-numeric:tabular-nums]"
        )}
      >
        {value}
      </div>
    </div>
  )
}

function TabularNumbersColumn({
  value,
  label,
  tabular = false,
}: {
  value: number
  label: string
  tabular?: boolean
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-5">
      <div className="text-[0.72rem] font-semibold tracking-[0.26em] text-surface-8 uppercase">
        {label}
      </div>
      <NumberPill tabular={tabular} value={value} />
      <DemoStatusIcon ok={tabular} shadow />
    </div>
  )
}

export function TabularNumbersPlayground() {
  const frameRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number | null>(null)
  const elapsedRef = useRef(0)
  const [value, setValue] = useState(START_VALUE)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const isResetDisabled = !isRunning && progress === 0 && value === START_VALUE

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  function pauseAnimation() {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = null
    lastTimestampRef.current = null
    setIsRunning(false)
  }

  function runAnimation() {
    if (isRunning) {
      return
    }

    setIsRunning(true)

    const tick = (timestamp: number) => {
      if (lastTimestampRef.current !== null) {
        elapsedRef.current =
          (elapsedRef.current + (timestamp - lastTimestampRef.current)) % DURATION_MS
      }
      lastTimestampRef.current = timestamp

      const nextProgress = elapsedRef.current / DURATION_MS
      const nextValue = Math.round(START_VALUE + (END_VALUE - START_VALUE) * nextProgress)

      setValue(nextValue)
      setProgress(nextProgress)
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
  }

  function toggleAnimation() {
    if (isRunning) {
      pauseAnimation()
      return
    }

    runAnimation()
  }

  function resetAnimation() {
    pauseAnimation()
    elapsedRef.current = 0
    setProgress(0)
    setValue(START_VALUE)
  }

  return (
    <DemoFrame className="bg-[linear-gradient(180deg,var(--color-surface-1),var(--color-background-2))]">
      <DemoStage>
        <DemoGrid>
          <TabularNumbersColumn label="Default" value={value} />
          <TabularNumbersColumn label="Tabular" tabular value={value} />
        </DemoGrid>
      </DemoStage>

      <DemoRail>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Button
              accent="secondary"
              aria-label={isRunning ? "Pause animation" : "Play animation"}
              className="group w-28 justify-center gap-2.5"
              onClick={toggleAnimation}
              size="default"
              variant="panel"
            >
              <DemoPlayPauseIcon isRunning={isRunning} />
              <span className="leading-none">{isRunning ? "Pause" : "Play"}</span>
            </Button>

            <Button
              accent="secondary"
              className="group w-28 justify-center gap-2.5"
              disabled={isResetDisabled}
              onClick={resetAnimation}
              size="default"
              variant="panel"
            >
              <DemoResetIcon />
              <span className="leading-none">Reset</span>
            </Button>
          </div>

          <div className="w-full max-w-[14rem]">
            <div className="h-px overflow-hidden bg-surface-7/25">
              <div
                aria-hidden="true"
                className="h-full bg-accent-8/75"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
      </DemoRail>
    </DemoFrame>
  )
}
