"use client"

import * as React from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Drawer as HeadlessDrawer } from "@base-ui/react/drawer"
import {
  drawerBackdropVariants,
  drawerContentVariants,
  drawerPopupVariants,
  drawerSwipeAreaVariants,
  drawerUnderlayVariants,
  drawerViewportVariants,
  type DrawerContentVariantProps,
} from "./drawer.variants"

export const DrawerRoot = HeadlessDrawer.Root
export const DrawerTrigger = HeadlessDrawer.Trigger
export const DrawerPortal = HeadlessDrawer.Portal
export const DrawerClose = HeadlessDrawer.Close
export const DrawerTitle = HeadlessDrawer.Title
export const DrawerDescription = HeadlessDrawer.Description

export type DrawerSwipeAreaProps = React.ComponentPropsWithoutRef<typeof HeadlessDrawer.SwipeArea>

export function DrawerSwipeArea({ className, ...props }: DrawerSwipeAreaProps) {
  return (
    <HeadlessDrawer.SwipeArea className={cn(drawerSwipeAreaVariants(), className)} {...props} />
  )
}

export type DrawerBackdropProps = React.ComponentPropsWithoutRef<typeof HeadlessDrawer.Backdrop>

export const DrawerBackdrop = React.forwardRef<HTMLDivElement, DrawerBackdropProps>(
  function DrawerBackdrop({ className, ...props }, ref) {
    return (
      <HeadlessDrawer.Backdrop
        ref={ref}
        className={cn(drawerBackdropVariants(), className)}
        {...props}
      />
    )
  }
)

export type DrawerViewportProps = React.ComponentPropsWithoutRef<typeof HeadlessDrawer.Viewport>

export const DrawerViewport = React.forwardRef<HTMLDivElement, DrawerViewportProps>(
  function DrawerViewport({ className, ...props }, ref) {
    return (
      <HeadlessDrawer.Viewport
        ref={ref}
        className={cn(drawerViewportVariants(), className)}
        {...props}
      />
    )
  }
)

export type DrawerPopupProps = React.ComponentPropsWithoutRef<typeof HeadlessDrawer.Popup>

export const DrawerPopup = React.forwardRef<HTMLDivElement, DrawerPopupProps>(function DrawerPopup(
  { className, ...props },
  ref
) {
  return (
    <HeadlessDrawer.Popup ref={ref} className={cn(drawerPopupVariants(), className)} {...props} />
  )
})

export interface DrawerContentProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof HeadlessDrawer.Content>, "className">,
    DrawerContentVariantProps {
  className?: string
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  function DrawerContent({ className, size = "default", ...props }, ref) {
    return (
      <HeadlessDrawer.Content
        ref={ref}
        className={cn(drawerContentVariants({ size }), className)}
        {...props}
      />
    )
  }
)

function useDrawerOvershootUnderlay({
  enabled,
  viewportRef,
  popupRef,
  contentRef,
  underlayRef,
}: {
  enabled: boolean
  viewportRef: React.RefObject<HTMLDivElement | null>
  popupRef: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  underlayRef: React.RefObject<HTMLDivElement | null>
}) {
  React.useEffect(() => {
    if (!enabled) {
      return
    }

    let frame = 0

    const syncUnderlay = () => {
      const viewport = viewportRef.current
      const popup = popupRef.current
      const content = contentRef.current
      const underlay = underlayRef.current

      if (!viewport || !popup || !content) {
        frame = requestAnimationFrame(syncUnderlay)
        return
      }

      const viewportRect = viewport.getBoundingClientRect()
      const contentRect = content.getBoundingClientRect()
      const rawMovement = getComputedStyle(popup).getPropertyValue("--drawer-swipe-movement-y")
      const movement = Number.parseFloat(rawMovement)
      const rawTransform = popup.style.transform
      const translateYMatch = /translateY\((-?\d+(?:\.\d+)?)px\)/.exec(rawTransform)
      const translateY = translateYMatch?.[1] ? Number.parseFloat(translateYMatch[1]) : 0
      const movementGap = Math.max(0, -movement, -translateY)
      const geometryGap = Math.max(0, viewportRect.bottom - contentRect.bottom)
      const gap = Math.max(movementGap, geometryGap)

      if (underlay) {
        underlay.style.opacity = gap > 0.5 ? "1" : "0"
        underlay.style.height = `${Math.ceil(gap) + (gap > 0 ? 1 : 0)}px`
      }

      frame = requestAnimationFrame(syncUnderlay)
    }

    frame = requestAnimationFrame(syncUnderlay)

    return () => {
      cancelAnimationFrame(frame)
      const underlay = underlayRef.current
      if (underlay) {
        underlay.style.opacity = "0"
        underlay.style.height = "0px"
      }
    }
  }, [contentRef, enabled, popupRef, underlayRef, viewportRef])
}

export interface DrawerSheetProps {
  open?: boolean
  children: React.ReactNode
  showSwipeArea?: boolean
  swipeAreaProps?: Omit<DrawerSwipeAreaProps, "className">
  swipeAreaClassName?: string
  backdropProps?: Omit<DrawerBackdropProps, "className">
  backdropClassName?: string
  viewportProps?: Omit<DrawerViewportProps, "className" | "children">
  viewportClassName?: string
  popupProps?: Omit<DrawerPopupProps, "className" | "children">
  popupClassName?: string
  contentProps?: Omit<DrawerContentProps, "className" | "children">
  contentClassName?: string
  underlayClassName?: string
}

export function DrawerSheet({
  open = true,
  children,
  showSwipeArea = true,
  swipeAreaProps,
  swipeAreaClassName = "",
  backdropProps,
  backdropClassName = "",
  viewportProps,
  viewportClassName = "",
  popupProps,
  popupClassName = "",
  contentProps,
  contentClassName = "",
  underlayClassName = "",
}: DrawerSheetProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const popupRef = React.useRef<HTMLDivElement | null>(null)
  const contentRef = React.useRef<HTMLDivElement | null>(null)
  const underlayRef = React.useRef<HTMLDivElement | null>(null)

  useDrawerOvershootUnderlay({ enabled: open, viewportRef, popupRef, contentRef, underlayRef })

  return (
    <DrawerPortal>
      {showSwipeArea ? (
        <DrawerSwipeArea className={swipeAreaClassName} {...swipeAreaProps} />
      ) : null}
      <DrawerBackdrop className={backdropClassName} {...backdropProps} />
      <DrawerViewport ref={viewportRef} className={viewportClassName} {...viewportProps}>
        <DrawerPopup ref={popupRef} className={popupClassName} {...popupProps}>
          <DrawerContent ref={contentRef} className={contentClassName} {...contentProps}>
            {children}
          </DrawerContent>
        </DrawerPopup>
        <div
          ref={underlayRef}
          aria-hidden="true"
          className={cn(drawerUnderlayVariants(), underlayClassName)}
        />
      </DrawerViewport>
    </DrawerPortal>
  )
}

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Close: DrawerClose,
  Title: DrawerTitle,
  Description: DrawerDescription,
  SwipeArea: DrawerSwipeArea,
  Backdrop: DrawerBackdrop,
  Viewport: DrawerViewport,
  Popup: DrawerPopup,
  Content: DrawerContent,
  Sheet: DrawerSheet,
} as const
