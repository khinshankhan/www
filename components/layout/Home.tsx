import type { FCC } from "types/react";
import React, { Fragment, useState, useEffect } from "react";
import { styled } from "lib/theme";
import Header from "components/layout/Header";

const Main = styled("main");

const scrollTolerance = 15;
export const HomeLayout: FCC = ({ children }) => {
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

  return (
    <Fragment>
      <Header className={headerClass} />

      <Main id="content" className="page-container">
        {children}
      </Main>
    </Fragment>
  );
};

export default HomeLayout;
