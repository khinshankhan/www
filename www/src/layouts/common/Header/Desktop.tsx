import React from "react";
import { Container, Flex, HStack } from "@chakra-ui/react";
import { Logo } from "src/assets";
import Heading from "src/components/common/Heading";
import Link from "src/components/common/Link";
import { ToggleColorMode, ToggleDirection, TogglePolicyMenu } from "src/components/toggles";

export interface IDesktopHeaderProps {
  items: { title: string }[];
}
export const DesktopHeader = ({ items }: IDesktopHeaderProps) => (
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

      <HStack as="menu" id="navbar-content" flex={0} justify="flex-end" direction="row" spacing={6}>
        <HStack as="ul" id="navbar-links" listStyleType="none" spacing={4}>
          {items.map((item) => (
            <Heading as="li" key={item.title} variant="mainNav">
              {/* TODO: replace href with item.href once pages are ready */}
              <Link
                href={`/`}
                aria-label={`Navigate to ${item.title.toLowerCase()}`}
                variant="mainNav"
              >
                {item.title}
              </Link>
            </Heading>
          ))}
        </HStack>

        <HStack as="menu" id="setting-toggles" m={0} p={0}>
          <ToggleColorMode />
          <ToggleDirection />
          <TogglePolicyMenu />
        </HStack>
      </HStack>
    </Flex>
  </Container>
);

export default DesktopHeader;
