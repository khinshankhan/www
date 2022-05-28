import React, { FC } from "react";
import { ContainerProps, Container, Flex, HStack } from "@chakra-ui/react";
import { Logo } from "src/assets";
import NavbarLinks from "./navs/NavbarLinks";
import SettingToggles from "./navs/SettingToggles";

export interface IDesktopHeaderProps extends ContainerProps {
  items: { title: string; href: string }[];
}
export const DesktopHeader: FC<IDesktopHeaderProps> = ({ items, ...props }) => (
  <Container as="header" variant="page" mb="4" {...props}>
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

      <HStack as="menu" id="navbar-content" flex={0} justify="flex-end" direction="row" spacing={6}>
        <NavbarLinks Stack={HStack} items={items} />
        <SettingToggles Stack={HStack} />
      </HStack>
    </Flex>
  </Container>
);

export default DesktopHeader;
