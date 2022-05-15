import React from "react";
import { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { Heading, InternalLink } from "src/components/common";
import { ToggleColorMode } from "src/components/toggles";

type MenuStack = ComponentWithAs<"div", StackProps>;

export interface IUseNavProps {
  NavbarLinksStack: MenuStack;
  SettingsToggleStack: MenuStack;
  items: { title: string; href: string }[];
}

const useNav = ({ NavbarLinksStack, SettingsToggleStack, items }: IUseNavProps) => {
  const NavbarLinks = () => (
    <NavbarLinksStack as="ul" id="navbar-links" listStyleType="none" spacing={4}>
      {items.map((item) => (
        <Heading as="li" key={item.title} variant="mainNav">
          <InternalLink
            href={item.href}
            aria-label={`Navigate to ${item.title.toLowerCase()}`}
            variant="internal"
          >
            {item.title}
          </InternalLink>
        </Heading>
      ))}
    </NavbarLinksStack>
  );

  const SettingToggles = () => (
    <SettingsToggleStack as="menu" id="setting-toggles" m={0} p={0}>
      <ToggleColorMode />
    </SettingsToggleStack>
  );

  return { NavbarLinks, SettingToggles };
};

export default useNav;
