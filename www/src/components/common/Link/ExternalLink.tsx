import React from "react";
import { LinkProps as ChakraLinkProps, chakra, Link as ChakraLink } from "@chakra-ui/react";

export interface IExternalLinkProps extends ChakraLinkProps {
  href: string;
  children?: any;
  [key: string]: any;
}

export const ExternalLink = ({ href, ...props }: IExternalLinkProps) => (
  <ChakraLink
    as={chakra.a}
    href={href}
    target={`_blank`}
    rel={`noreferrer noopener`}
    variant="external"
    {...props}
  />
);

export default ExternalLink;
