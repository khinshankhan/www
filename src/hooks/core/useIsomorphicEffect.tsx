import { useEffect, useLayoutEffect } from "react"
import { isBrowser } from "@/hooks/core/env"

/**
 * Custom hook that uses either `useLayoutEffect` or `useEffect` based on the environment (client-side or server-side).
 * Based off https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 */
export const useIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect
