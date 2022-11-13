import React from "react";
import type { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import type { FCC } from "lib/types/react";

export type INavbarLinksProps = {
  Stack: ComponentWithAs<"div", StackProps>;
  items: { href: string; label: string }[];
} & StackProps;

const NavbarLinks: FCC<INavbarLinksProps> = ({
  Stack: NavbarLinksStack,
  items,
  children,
  ...props
}) => (
  <NavbarLinksStack as="ul" id="header-navbar" listStyleType="none" spacing={4} {...props}>
    {items.map(({ label, href }) => (
      <Heading key={label} as="li" variant="h4">
        <NextLink href={href} aria-label={`Navigate to ${label}`} passHref>
          <Link>{label}</Link>
        </NextLink>
      </Heading>
    ))}
    {children}
  </NavbarLinksStack>
);

export default NavbarLinks;
