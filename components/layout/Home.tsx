import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { styled } from "lib/theme";
import { Flex } from "components/primitives";
import { Header, Footer } from "./shared";

const Main = styled("main");

export const HomeLayout: FCC = ({ children }) => {
  return (
    <Fragment>
      <Flex flexDirection="column" css={{ minHeight: "96vh" }}>
        <Header initialHeaderClass="" />

        <Main id="content" className="page-container">
          {children}
        </Main>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default HomeLayout;
