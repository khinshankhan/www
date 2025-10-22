import { useEffect, useLayoutEffect, type DependencyList, type EffectCallback } from "react"
import { isBrowser } from "@/hooks/core/env"

type UseIsomorphicEffect = (effect: EffectCallback, deps?: DependencyList) => void

/**
 * Custom hook that uses either `useLayoutEffect` or `useEffect` based on the environment (client-side or server-side).
 * Based off https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 */
export const useIsomorphicEffect: UseIsomorphicEffect = isBrowser ? useLayoutEffect : useEffect
