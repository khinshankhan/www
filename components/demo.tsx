"use client"

import { type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Check, Close, Pause, Play, RotateCW } from "@/quicksilver/react/primitives/icons"
import { TabsIndicator, TabsList, TabsRoot, TabsTab } from "@/quicksilver/react/primitives/tabs"

export function DemoStatusIcon({ ok, shadow = false }: { ok: boolean; shadow?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full border p-0.5",
        shadow && "shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)]",
        ok
          ? "accent-theme-success border-accent-7/20 bg-accent-8 text-accent-12"
          : "accent-theme-danger border-accent-7/20 bg-accent-8 text-accent-12"
      )}
    >
      {ok ? (
        <Check className="size-3.5 shrink-0 stroke-[2.4]" />
      ) : (
        <Close className="size-3.5 shrink-0 stroke-[2.4]" />
      )}
    </span>
  )
}

export function DemoFrame({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className="not-prose my-8 w-full max-w-full">
      <div
        className={cn(
          "accent-theme-default overflow-hidden rounded-lg border border-surface-4/45 bg-background-1 text-foreground",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function DemoStage({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn("px-6 py-10 sm:px-10 sm:py-12", className)}>{children}</div>
}

export function DemoGrid({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("grid min-w-0 gap-10 sm:grid-cols-2 sm:gap-8", className)}>{children}</div>
  )
}

export function DemoRail({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("border-t border-surface-4/55 bg-background-1 px-6 py-5 sm:px-10", className)}
    >
      {children}
    </div>
  )
}

export function DemoToolbar({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center border-b border-surface-4/55 px-6 py-4 sm:px-10",
        className
      )}
    >
      {children}
    </div>
  )
}

export function DemoViewport({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("flex min-h-[17rem] items-center justify-center px-6 py-8 sm:px-10", className)}
    >
      {children}
    </div>
  )
}

export function DemoSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: {
  options: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <TabsRoot
      className={className}
      render={<div />}
      onValueChange={(nextValue) => onChange(nextValue as T)}
      value={value}
    >
      <TabsList variant="segmented">
        <TabsIndicator variant="segmented" />
        {options.map((option) => (
          <TabsTab key={option.value} value={option.value} variant="segmented">
            {option.label}
          </TabsTab>
        ))}
      </TabsList>
    </TabsRoot>
  )
}

export function DemoPlayPauseIcon({
  isRunning,
  className = "",
}: {
  isRunning: boolean
  className?: string
}) {
  return isRunning ? (
    <Pause
      className={cn(
        "size-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
        className
      )}
    />
  ) : (
    <Play
      className={cn(
        "size-4 shrink-0 transition-transform duration-200 group-hover:scale-110",
        className
      )}
    />
  )
}

export function DemoResetIcon({ className = "" }: { className?: string }) {
  return (
    <RotateCW
      className={cn(
        "size-4 shrink-0 transition-transform duration-200 group-hover:rotate-[-20deg]",
        className
      )}
    />
  )
}
