import React from "react";
import { Container, Flex, HStack } from "@chakra-ui/react";
import { Logo } from "src/assets";
import useNav from "./useNav";

export interface IDesktopHeaderProps {
  items: { title: string }[];
}
export const DesktopHeader = ({ items }: IDesktopHeaderProps) => {
  const { NavbarLinks, SettingToggles } = useNav({
    NavbarLinksStack: HStack,
    SettingsToggleStack: HStack,
    items,
  });

  return (
    <Container as="header" variant="page" mb="4">
      <Flex
        as="nav"
        id="main-nav"
        minH="75px"
        pt="6"
        pb="8"
        borderBottom={1}
        borderStyle="solid"
        borderColor="dividerColor"
        align="center"
      >
        <Flex id="main-logo" flex={1} justify="start">
          <Logo />
        </Flex>

        <HStack
          as="menu"
          id="navbar-content"
          flex={0}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          <NavbarLinks />
          <SettingToggles />
        </HStack>
      </Flex>
    </Container>
  );
};

export default DesktopHeader;
