import React from "react";
import { useDisclosure, Container, Collapse, Flex, HStack, VStack } from "@chakra-ui/react";
import { Logo } from "src/assets";
import { ToggleNavbarMenu } from "src/components/toggles";
import useNav from "./useNav";

export interface IMobileHeaderProps {
  items: { title: string }[];
}
export const MobileHeader = ({ items }: IMobileHeaderProps) => {
  const { NavbarLinks, SettingToggles } = useNav({
    NavbarLinksStack: VStack,
    SettingsToggleStack: HStack,
    items,
  });
  const { isOpen, onToggle } = useDisclosure();

  const borderStyles = {
    ...(isOpen && { pb: 4, borderBottom: 1, borderStyle: `solid`, borderColor: `dividerColor` }),
  };
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

        <ToggleNavbarMenu isOpen={isOpen} onClick={onToggle} fontSize="1.563rem" />
      </Flex>

      <Flex
        as="menu"
        id="navbar-content"
        flex={0}
        justify="center"
        align="center"
        direction="row"
        {...borderStyles}
      >
        <Collapse in={isOpen} animateOpacity>
          <NavbarLinks />
          <SettingToggles />
        </Collapse>
      </Flex>
    </Container>
  );
};

export default MobileHeader;
