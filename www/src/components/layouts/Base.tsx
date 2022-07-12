import React, { FC } from "react";
import { BoxProps, Box, Flex } from "@chakra-ui/react";
import { Header, Footer } from "./common";

export const BaseLayout: FC<BoxProps> = ({ children, ...props }): JSX.Element => (
  <>
    <Flex id="page" direction="column" minH="96vh">
      <Header onScroll={(a) => console.log({ a })} />
      <Box id="content" {...props}>
        {children}
      </Box>
    </Flex>
    <Footer />
  </>
);

export default BaseLayout;
