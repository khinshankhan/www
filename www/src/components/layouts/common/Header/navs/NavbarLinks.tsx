import React from "react";
import { ComponentWithAs, StackProps, Text } from "@chakra-ui/react";
import { InternalLink } from "src/components/common";

export interface INavbarLinksProps extends StackProps {
  Stack: ComponentWithAs<"div", StackProps>;
  items: { title: string; href: string }[];
}

const NavbarLinks = ({ Stack: NavbarLinksStack, items, ...props }: INavbarLinksProps) => (
  <NavbarLinksStack as="ul" id="navbar-links" listStyleType="none" spacing={4} {...props}>
    {items.map((item) => (
      <Text as="li" key={item.title}>
        <InternalLink
          href={item.href}
          aria-label={`Navigate to ${item.title.toLowerCase()}`}
          variant="internal"
        >
          {item.title}
        </InternalLink>
      </Text>
    ))}
  </NavbarLinksStack>
);

export default NavbarLinks;
