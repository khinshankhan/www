import React, { FC } from "react";
import { BoxProps, Box, Flex } from "@chakra-ui/react";
import { Header, Footer } from "./common";

export const BaseLayout: FC<BoxProps> = ({ children, ...props }): JSX.Element => {
  const animationTransition = `background-image 50s ease-in-out`;

  return (
    <>
      <Flex
        id="page"
        direction="column"
        minH="96vh"
        sx={{
          WebkitTransition: animationTransition,
          transition: animationTransition,
        }}
      >
        <Header as="header" className="topNav sharedNavBg" />
        <Box id="content" {...props}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default BaseLayout;
