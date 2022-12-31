import React, { useEffect, useState } from "react";
import { Header } from "./Header";

const scrollTolerance = 15;

export function HomeHeader() {
  const [headerClass, setHeaderClass] = useState("");

  const handleHeaderClass = () => {
    setHeaderClass((prev) => {
      if (prev === "" && window.scrollY > scrollTolerance) {
        return "shared-nav-bg";
      }
      if (prev === "shared-nav-bg" && window.scrollY <= scrollTolerance) {
        return "";
      }

      return prev;
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderClass);
    return () => window.removeEventListener("scroll", handleHeaderClass);
  }, []);

  return <Header className={headerClass} />;
}

export default HomeHeader;
