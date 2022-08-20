import { HeadingProps as ChakraHeadingProps } from "@chakra-ui/react";

export interface HeadingProps extends ChakraHeadingProps {
  // don't know why align isn't a default prop for Heading, but works
  align?: HeadingProps["alignSelf"];
}

export const headingsOptions = [`h1`, `h2`, `h3`, `h4`, `h5`, `h6`] as const;

export type HeadingsOptions = typeof headingsOptions[number];
