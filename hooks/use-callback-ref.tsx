// https://github.com/chakra-ui/chakra-ui/tree/main/packages/hooks/use-callback-ref
import type { DependencyList } from "react";
import { useCallback, useEffect, useRef } from "react";

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined,
  deps: DependencyList = []
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => callbackRef.current?.(...args)) as T, deps);
}

export default useCallbackRef;
