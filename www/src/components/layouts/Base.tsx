import React, { FC } from "react";
import { BoxProps, Box, FlexProps, Flex } from "@chakra-ui/react";
import { pageAnimationTransition } from "src/theme/custom/styles";
import { Header, Footer } from "./common";

export interface IBaseLayoutProps extends BoxProps {
  topProps?: FlexProps;
}

export const BaseLayout: FC<IBaseLayoutProps> = ({ children, topProps, ...props }): JSX.Element => {
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
