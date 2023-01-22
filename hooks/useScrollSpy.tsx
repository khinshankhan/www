// based off https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/hooks/use-scrollspy.ts
import { useState, useRef, useEffect } from "react";

export const useScrollSpy = (
  selectors: string[],
  options?: IntersectionObserverInit,
  retain = true
) => {
  const [activeIds, setActiveIds] = useState<string[]>([]);

  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const elements = selectors.map((selector) => document.querySelector(selector));

    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      const newActiveIds: string[] = [];
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          newActiveIds.push(entry.target.getAttribute("id") ?? "");
        }
      });

      if (!retain) {
        setActiveIds(newActiveIds);
      } else if (newActiveIds.length > 0) {
        setActiveIds(newActiveIds);
      }
    }, options);

    elements.forEach((el) => {
      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [selectors, options]);

  return activeIds;
};

export default useScrollSpy;
