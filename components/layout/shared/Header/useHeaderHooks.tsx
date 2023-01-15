import { useState, useEffect } from "react";
import { useMobile, useDisclosure } from "hooks";

export function useMobileNav() {
  const { isMobile } = useMobile();
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    onClose();
  }, [isMobile, onClose]);

  return { isOpen, onToggle };
}

const togglingPaths = ["/"];
const scrollTolerance = 15;

export function useHeaderClass(initialHeaderClass = "nav-bg") {
  const [headerClass, setHeaderClass] = useState(initialHeaderClass);

  useEffect(() => {
    if (togglingPaths.includes(window.location.pathname)) {
      const handleHeaderClass = () => {
        setHeaderClass((prev) => {
          if (prev === "" && window.scrollY > scrollTolerance) {
            return "nav-bg";
          }
          if (prev === "nav-bg" && window.scrollY <= scrollTolerance) {
            return "";
          }

          return prev;
        });
      };
      window.addEventListener("scroll", handleHeaderClass);
      return () => window.removeEventListener("scroll", handleHeaderClass);
    }
  }, []);

  return { headerClass };
}
