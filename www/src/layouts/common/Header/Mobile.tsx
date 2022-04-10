import React from "react";
import { useDisclosure, Container, Collapse, Flex, HStack, VStack } from "@chakra-ui/react";
import { Logo } from "src/assets";
import Heading from "src/components/common/Heading";
import Link from "src/components/common/Link";
import {
  ToggleColorMode,
  ToggleDirection,
  ToggleNavbarMenu,
  TogglePolicyMenu,
} from "src/components/toggles";

export interface IMobileHeaderProps {
  items: { title: string }[];
  dividerColor: string;
}
export const MobileHeader = ({ items, dividerColor }: IMobileHeaderProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const borderStyles = {
    ...(isOpen && { pb: 4, borderBottom: 1, borderStyle: `solid`, borderColor: dividerColor }),
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
        borderColor={dividerColor}
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
          <VStack as="ul" id="navbar-links" listStyleType="none" spacing={4}>
            {items.map((item) => (
              <Heading.h3 as="li" key={item.title} variant="link">
                {/* TODO: replace href with item.href once pages are ready */}
                <Link href={`/`} aria-label={`Navigate to ${item.title.toLowerCase()}`}>
                  {item.title}
                </Link>
              </Heading.h3>
            ))}
          </VStack>

          <HStack as="menu" id="setting-toggles" m={0} p={0} pt="4">
            <ToggleColorMode />
            <ToggleDirection />
            <TogglePolicyMenu />
          </HStack>
        </Collapse>
      </Flex>
    </Container>
  );
};

export default MobileHeader;
