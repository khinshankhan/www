import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";

export type IInternalLinkProps = {
  href: string;
  children?: any;
  [key: string]: any;
};

export const InternalLink = ({ href, ...props }: IInternalLinkProps) => (
  <ChakraLink as={GatsbyLink} to={href} variant="internal" {...props} />
);

export default InternalLink;
