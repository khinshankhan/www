import React from "react";
import { chakra, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { BsBoxArrowUpRight as BoxArrowUpRight } from "react-icons/bs";

// TODO: handle title
export type ILinkProps = {
  href: string;
  title?: string;
  children?: string;
};

const Link = ({ href, children, ...props }: ILinkProps) => {
  const foreignLink = href && href.startsWith(`http`);
  const LinkComponent = foreignLink ? chakra.a : GatsbyLink;
  const target = foreignLink ? `_blank` : undefined;
  const rel = foreignLink ? `noreferrer noopener` : undefined;

  return (
    <ChakraLink as={LinkComponent} to={href} href={href} target={target} rel={rel} {...props}>
      {children} {foreignLink && <Icon as={BoxArrowUpRight} />}
    </ChakraLink>
  );
};

export default Link;
