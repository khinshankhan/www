import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { Flex, Container } from "components/primitives";
import Header from "./header";

export const BaseLayout: FCC = ({ children }) => {
  return (
    <Fragment>
      <Flex flexDirection="column" css={{ minHeight: "96vh" }}>
        <Header />

        <Container variant="page" as="main">
          {children}
        </Container>
      </Flex>
      <div>Footer</div>
    </Fragment>
  );
};

export default BaseLayout;
