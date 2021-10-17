import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { chakra } from "@chakra-ui/react";

const InternalLink = chakra(GatsbyLink, {
  baseStyle: {
    color: `#BB72EC`,
    _hover: {
      color: `#F40057`,
      textDecoration: `underline`,
    },
  },
});

const ExternalLink = chakra(chakra.a, {
  baseStyle: {
    color: `aqua`,
    _hover: {
      color: `#F40057`,
      textDecoration: `underline`,
    },
  },
});

type ILinkProps = {
  href: string;
  title?: string;
  /*   type: string; */
  /*   children: [{ type: string; value: string }]; */
};

const a = (props: ILinkProps) => {
  const { href } = props;

  const foreignLink = href && href.startsWith(`http`);
  const Link = foreignLink ? ExternalLink : InternalLink;

  return (
    <Link to={href} target={foreignLink ? `_blank` : undefined} {...props} />
  );
};

export default a;
