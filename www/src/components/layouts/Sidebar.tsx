import React, { FC } from "react";
import { BoxProps, ContainerProps, HeadingProps, Box, Container } from "@chakra-ui/react";
import { Heading } from "src/components/common";
import { useDimensions } from "src/hooks";

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

interface ISidebarContainerProps {
  separate?: boolean;
}

export const SidebarContainer: FC<ISidebarContainerProps> = ({ separate = false, children }) => {
  const { innerHeight } = useDimensions();

  return (
    <Container
      as="aside"
      pos="sticky"
      maxW={{ base: `90%`, md: `210px` }}
      mb={{ base: `16`, md: 0 }}
      p={{ md: 0 }}
      ml={{ md: 4 }}
      mr={{ md: 5 }}
    >
      <Box
        as="nav"
        maxW={{ base: `90%`, md: `210px` }}
        position={{ base: `relative`, md: separate ? `fixed` : `sticky` }}
        h={{ base: `100%`, md: separate ? `${(innerHeight ?? 0) * (5 / 9)}px` : `100%` }}
        overflowY={{ base: `hidden`, md: separate ? `auto` : `hidden` }}
      >
        {children}
      </Box>
    </Container>
  );
};

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
    maxH="100%"
    h="100%"
    margin={0}
    overflow="hidden"
    {...props}
  >
    {children}
  </Box>
);

export default WithSidebar;
