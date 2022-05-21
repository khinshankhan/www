import React, { FC } from "react";
import { BoxProps, ContainerProps, HeadingProps, Box, Container } from "@chakra-ui/react";
import { Heading } from "src/components/common";

export const SidebarTitle: FC<HeadingProps> = ({ children, ...props }) => (
  <Heading.h2
    variant="h4"
    fontFamily="body"
    textTransform="uppercase"
    fontWeight="medium"
    letterSpacing="0.005em"
    mb={{ base: 2, md: 4 }}
    {...props}
  >
    {children}
  </Heading.h2>
);

export const SidebarContainer: FC = ({ children }) => (
  <Container
    as="aside"
    position={{ base: `relative`, md: `sticky` }}
    fontSize={[`0.875rem`, `1rem`]}
    minW="200px"
    maxHeight={{ base: `unset` }}
    maxW={{ base: `90%`, md: `210px` }}
    top="unset"
    mb={{ base: `16`, md: 0 }}
    p={{ md: 0 }}
    ml={{ md: 4 }}
    mr={{ md: 5 }}
  >
    <Box
      as="nav"
      display="flex"
      flexDir="column"
      mt={{ base: `0rem`, md: `1.8em` }}
      minW="200px"
      maxW={{ base: `100%`, md: `210px` }}
      overflow="auto"
      alignItems="flex-start"
    >
      {children}
    </Box>
  </Container>
);

export const ContentContainer: FC<ContainerProps> = ({ children, ...props }) => (
  <Container maxW={{ base: `90%`, md: `95%` }} {...props}>
    {children}
  </Container>
);

interface IWithSidebarProps extends BoxProps {
  direction?: "left" | "right";
}

export const WithSidebar: FC<IWithSidebarProps> = ({ direction = `left`, children, ...props }) => (
  <Box
    display={{ base: `block`, md: `flex` }}
    flexDirection={direction === `left` ? `row` : `row-reverse`}
    justifyContent={direction === `left` ? `flex` : `flex-end`}
    {...props}
  >
    {children}
  </Box>
);

export default WithSidebar;
