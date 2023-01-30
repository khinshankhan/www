import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { Box, Flex } from "components/primitives";

export const BaseLayout: FCC = () => {
  return (
    <Fragment>
      <Flex flexDirection="column" css={{ minHeight: "96vh" }}>
        <div>header</div>

        <Box as="main">page</Box>
      </Flex>
      <div>Footer</div>
    </Fragment>
  );
};

export default BaseLayout;
