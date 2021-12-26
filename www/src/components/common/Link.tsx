import React from "react";
import { chakra, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import {
  BsBoxArrowUpRight as BoxArrowUpRight,
  BsBoxArrowInDown as BoxArrowInDown,
} from "react-icons/bs";

// TODO: handle title
export type ILinkProps = {
  href: string;
  title?: string;
  children?: string;
};

const Link = ({ href, children, ...props }: ILinkProps) => {
  // TODO: decide how to handle href-less links
  // NOTE: this currently treats relative paths as external links as well
  const foreign = !(href && /^\/(?!\/)/.test(href));
  const file = /\.[0-9a-z]+$/i.test(href);
  const relative = !(foreign || file);

  const LinkComponent = relative ? GatsbyLink : chakra.a;
  const target = foreign ? `_blank` : undefined;
  const rel = foreign ? `noreferrer noopener` : undefined;
  const VisualIcon = !foreign && file ? BoxArrowInDown : BoxArrowUpRight;

  return (
    <ChakraLink
      as={LinkComponent}
      to={(relative && href) || undefined}
      href={(!relative && href) || undefined}
      target={target}
      rel={rel}
      {...props}
    >
      {children} {!relative && <Icon as={VisualIcon} />}
    </ChakraLink>
  );
};

export default Link;
