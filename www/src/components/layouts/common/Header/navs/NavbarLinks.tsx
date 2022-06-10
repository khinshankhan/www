import React from "react";
import { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { Heading, InternalLink } from "src/components/common";

export interface INavbarLinksProps {
  Stack: ComponentWithAs<"div", StackProps>;
  items: { title: string; href: string }[];
}

const NavbarLinks = ({ Stack: NavbarLinksStack, items }: INavbarLinksProps) => (
  <NavbarLinksStack as="ul" id="navbar-links" listStyleType="none" spacing={4}>
    {items.map((item) => (
      <Heading as="li" key={item.title} variant="mainNav">
        <InternalLink
          href={item.href}
          aria-label={`Navigate to ${item.title.toLowerCase()}`}
          variant="grayInternal"
        >
          {item.title}
        </InternalLink>
      </Heading>
    ))}
  </NavbarLinksStack>
);

export default NavbarLinks;
