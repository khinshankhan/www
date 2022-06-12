import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { GatsbyLinkProps, Link as GatsbyLink } from "gatsby";

type FixedGatsbyLinkProps = Omit<GatsbyLinkProps<{}>, "ref" | "to">;

export interface IInternalLinkProps extends FixedGatsbyLinkProps {
  href: string;
  children?: any;
  [key: string]: any;
}

export const InternalLink = ({ href, ...props }: IInternalLinkProps) => (
  <ChakraLink as={GatsbyLink} to={href} variant="internal" {...props} />
);

export default InternalLink;
