import React from "react";
import { useColorModeValue, Box, Container, Flex, HStack, IconButton } from "@chakra-ui/react";
import { FaCookie as Cookie } from "react-icons/fa";
import Logo from "src/assets/Logo";
import Heading from "src/components/common/Heading";
import Link from "src/components/common/Link";
import { ToggleColorMode, ToggleDirection } from "src/components/Toggles";

// TODO: replace this with a call to gatsby to get config based values
const MENU_ITEMS = [
  {
    title: `About`,
    href: `/about`,
  },
  {
    title: `Writing`,
    href: `/writing`,
  },
  {
    title: `Portfolio`,
    href: `/portfolio`,
  },
  {
    title: `Contact`,
    href: `/contact`,
  },
];

export const Navbar = () => (
  <Container as="nav" variant="page" id="navbar" mb="4">
    <Flex
      minH={`75px`}
      pt="6"
      pb="8"
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue(`gray.200`, `white`)}
      align="center"
    >
      <Flex flex={{ base: 1 }} justify="start">
        <Logo />
      </Flex>

      <Box as="menu" id="menu">
        <HStack flex={0} justify={`flex-end`} direction={`row`} spacing={6}>
          <HStack as="ul" listStyleType="none" spacing={4}>
            {MENU_ITEMS.map((item) => (
              <Heading.h3 as="li" key={item.title} variant="link">
                {/* TODO: replace href with item.href once pages are ready */}
                <Link href={`#`}>{item.title}</Link>
              </Heading.h3>
            ))}
          </HStack>

          <HStack>
            <ToggleColorMode />
            <ToggleDirection />
            <IconButton aria-label={`View storage policy`} variant="ghost" icon={<Cookie />} />
          </HStack>
        </HStack>
      </Box>
    </Flex>
  </Container>
);

export default Navbar;
