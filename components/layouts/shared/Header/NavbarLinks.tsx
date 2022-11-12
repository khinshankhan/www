import React from "react";
import type { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export type INavbarLinksProps = {
  Stack: ComponentWithAs<"div", StackProps>;
  items: { href: string; label: string }[];
} & StackProps;

const NavbarLinks = ({ Stack: NavbarLinksStack, items, ...props }: INavbarLinksProps) => (
  <NavbarLinksStack as="ul" id="navbar-links" listStyleType="none" spacing={4} {...props}>
    {items.map(({ label, href }) => (
      <Heading key={label} as="li" variant="h4">
        <NextLink href={href} aria-label={`Navigate to ${label}`} passHref>
          <Link>{label}</Link>
        </NextLink>
      </Heading>
    ))}
  </NavbarLinksStack>
);

export default NavbarLinks;
