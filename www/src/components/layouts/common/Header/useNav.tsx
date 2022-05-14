import React from "react";
import { ComponentWithAs, StackProps } from "@chakra-ui/react";
import { Heading, InternalLink } from "src/components/common";
import { ToggleColorMode, ToggleDirection, TogglePolicyMenu } from "src/components/toggles";

type MenuStack = ComponentWithAs<"div", StackProps>;

export interface IUseNavProps {
  NavbarLinksStack: MenuStack;
  SettingsToggleStack: MenuStack;
  items: { title: string }[];
}

const useNav = ({ NavbarLinksStack, SettingsToggleStack, items }: IUseNavProps) => {
  const NavbarLinks = () => (
    <NavbarLinksStack as="ul" id="navbar-links" listStyleType="none" spacing={4}>
      {items.map((item) => (
        <Heading as="li" key={item.title} variant="mainNav">
          {/* TODO: replace href with item.href once pages are ready */}
          <InternalLink
            href={`/`}
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
    <SettingsToggleStack as="menu" id="setting-toggles" m={0} p={0} pt="4">
      <ToggleColorMode />
      <ToggleDirection />
      <TogglePolicyMenu />
    </SettingsToggleStack>
  );

  return { NavbarLinks, SettingToggles };
};

export default useNav;
