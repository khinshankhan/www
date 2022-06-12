import React from "react";
import { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { Heading, InternalLink } from "src/components/common";

export type INavbarLinksProps = {
  Stack: ComponentWithAs<"div", StackProps>;
  items: { title: string; href: string }[];
} & StackProps;

const NavbarLinks = ({ Stack: NavbarLinksStack, items, ...props }: INavbarLinksProps) => (
  <NavbarLinksStack as="ul" id="navbar-links" listStyleType="none" spacing={4} {...props}>
    {items.map((item) => (
      <Heading as="li" key={item.title} variant="mainNav">
        <InternalLink href={item.href} aria-label={`Navigate to ${item.title.toLowerCase()}`}>
          {item.title}
        </InternalLink>
      </Heading>
    ))}
  </NavbarLinksStack>
);

export default NavbarLinks;
