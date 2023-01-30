import type { FCC } from "types/react";
import type { ReactNode } from "react";
import React, { Fragment } from "react";
import { Flex, Container } from "components/primitives";
import Headroom from "react-headroom";
import Header from "./header";
import Footer from "./footer";

interface IBaseLayoutProps {
  pastMin?: ReactNode;
}

export const BaseLayout: FCC<IBaseLayoutProps> = ({ pastMin = null, children }) => {
  return (
    <Fragment>
      <Flex flexDirection="column" css={{ minHeight: "96vh" }}>
        <Headroom>
          <Header />
        </Headroom>

        <Container variant="page" as="main">
          {children}
        </Container>
      </Flex>
      {pastMin}
      <Footer />
    </Fragment>
  );
};

export default BaseLayout;
