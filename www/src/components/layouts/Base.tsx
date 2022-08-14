import React from "react";
import { BoxProps, Box, FlexProps, Flex } from "@chakra-ui/react";
import type { FCC } from "src/types/react";
import { Header, Footer } from "./common";

export const pageAnimationTransition = `background-image 50s ease-in-out`;

export interface IBaseLayoutProps extends BoxProps {
  topProps?: FlexProps;
}

export const BaseLayout: FCC<IBaseLayoutProps> = ({
  children,
  topProps,
  ...props
}): JSX.Element => {
  // TODO: figure out how/ when to combine animation transitions
  // could be a simple concat?
  const { sx, ...restTopProps } = topProps ?? {};

  return (
    <>
      <Flex
        id="page"
        direction="column"
        minH="96vh"
        sx={{
          WebkitTransition: pageAnimationTransition,
          transition: pageAnimationTransition,
          ...sx,
        }}
        {...restTopProps}
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
