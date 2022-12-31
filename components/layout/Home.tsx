import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { styled } from "lib/theme";
import { Flex } from "lib/theme/components";
import { HomeHeader } from "./Header";
import Footer from "./Footer";

const Main = styled("main");

export const HomeLayout: FCC = ({ children }) => {
  return (
    <Fragment>
      <Flex flexDirection="column" css={{ minHeight: "96vh" }}>
        <HomeHeader />

        <Main id="content" className="page-container">
          {children}
        </Main>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default HomeLayout;
