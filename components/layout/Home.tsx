import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { styled } from "lib/theme";
import { HomeHeader } from "./Header";

const Main = styled("main");

export const HomeLayout: FCC = ({ children }) => {
  return (
    <Fragment>
      <HomeHeader />

      <Main id="content" className="page-container">
        {children}
      </Main>
    </Fragment>
  );
};

export default HomeLayout;
