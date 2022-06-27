import React from "react";
import { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { Heading, InternalLink } from "src/components/common";
import { PagesObject } from "src/data/useHeaderData";

export type INavbarLinksProps = {
  Stack: ComponentWithAs<"div", StackProps>;
  items: PagesObject[];
} & StackProps;

const NavbarLinks = ({ Stack: NavbarLinksStack, items, ...props }: INavbarLinksProps) => (
  <NavbarLinksStack as="ul" id="navbar-links" listStyleType="none" spacing={4} {...props}>
    {items.map(({ label, href }) => (
      <Heading as="li" key={label} variant="mainNav">
        <InternalLink href={href} aria-label={`Navigate to ${label}`}>
          {label}
        </InternalLink>
      </Heading>
    ))}
  </NavbarLinksStack>
);

export default NavbarLinks;
