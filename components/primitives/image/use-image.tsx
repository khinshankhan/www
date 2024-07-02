// https://github.com/chakra-ui/chakra-ui/tree/main/packages/components/image

import React, { useCallback, useEffect, useRef, useState } from "react"
import { useIsomorphicEffect } from "@/hooks/media"

type NativeImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export interface UseImageProps {
  /**
   * The image `src` attribute
   */
  src?: string
  /**
   * The image `srcset` attribute
   */
  srcSet?: string
  /**
   * The image `sizes` attribute
   */
  sizes?: string
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps["onLoad"]
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?: NativeImageProps["onError"]
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   *
   * @default false
   */
  ignoreFallback?: boolean
  /**
   * The key used to set the crossOrigin on the HTMLImageElement into which the image will be loaded.
   * This tells the browser to request cross-origin access when trying to download the image data.
   */
  crossOrigin?: NativeImageProps["crossOrigin"]
  loading?: NativeImageProps["loading"]
}

type Status = "loading" | "failed" | "pending" | "loaded"

export type FallbackStrategy = "onError" | "beforeLoadOrError"

type ImageEvent = React.SyntheticEvent<HTMLImageElement, Event>

/**
 * React hook that loads an image in the browser,
 * and lets us know the `status` so we can show image
 * fallback if it is still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 *
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */
export function useImage(props: UseImageProps) {
  const {
    loading,
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    // @ts-ignore: this is a valid prop
    referrerPolicy = "",
    sizes,
    ignoreFallback,
  } = props

  const [status, setStatus] = useState<Status>("pending")

  // preemptively  fetch natural dimensions of image
  const [naturalHeight, setNaturalHeight] = useState(0)
  const [naturalWidth, setNaturalWidth] = useState(0)

  useEffect(() => {
    setStatus(src ? "loading" : "pending")
  }, [src])

  const imageRef = useRef<HTMLImageElement | null>()

  const load = useCallback(() => {
    if (!src) return

    flush()

    const img = new Image()
    img.src = src
    if (crossOrigin) img.crossOrigin = crossOrigin
    if (referrerPolicy) img.referrerPolicy = referrerPolicy
    if (srcSet) img.srcset = srcSet
    if (sizes) img.sizes = sizes
    if (loading) img.loading = loading

    img.onload = (event) => {
      flush()
      setStatus("loaded")
      onLoad?.(event as unknown as ImageEvent)
      setNaturalHeight(img.naturalHeight)
      setNaturalWidth(img.naturalWidth)
    }
    img.onerror = (error) => {
      flush()
      setStatus("failed")
      onError?.(error as any)
    }

    imageRef.current = img
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading])

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null
      imageRef.current.onerror = null
      imageRef.current = null
    }
  }

  useIsomorphicEffect(() => {
    /**
     * If user opts out of the fallback/placeholder
     * logic, let's bail out.
     */
    if (ignoreFallback) return undefined

    if (status === "loading") {
      load()
    }
    return () => {
      flush()
    }
  }, [status, load, ignoreFallback])

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return { status: ignoreFallback ? "loaded" : status, naturalHeight, naturalWidth }
}

export const shouldShowFallbackImage = (status: Status, fallbackStrategy: FallbackStrategy) =>
  (status !== "loaded" && fallbackStrategy === "beforeLoadOrError") ||
  (status === "failed" && fallbackStrategy === "onError")

export type UseImageReturn = ReturnType<typeof useImage>
