import React from "react";
import type { LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import type { FCC } from "lib/types/react";

interface LinkProps extends NextLinkProps {
  chakraProps?: ChakraLinkProps;
}

export const Link: FCC<LinkProps> = ({ children, chakraProps = {}, ...props }) => (
  <NextLink passHref {...props}>
    <ChakraLink {...chakraProps}>{children}</ChakraLink>
  </NextLink>
);

export default Link;
