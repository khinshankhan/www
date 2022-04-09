import React, { useMemo, useEffect } from "react";
import {
  ComponentWithAs,
  StackProps,
  useColorModeValue,
  useDisclosure,
  Box,
  Container,
  Collapse,
  Flex,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { FaCookie as Cookie } from "react-icons/fa";
import { GiHamburgerMenu as Hamburger } from "react-icons/gi";
import Logo from "src/assets/Logo";
import Heading from "src/components/common/Heading";
import Link from "src/components/common/Link";
import { ToggleColorMode, ToggleDirection } from "src/components/Toggles";
import useMobile from "src/hooks/useMobile";

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

const DirectionalMenu = (MenuStack: ComponentWithAs<"div", StackProps>) => () =>
  (
    <MenuStack flex={0} justify={`flex-end`} direction={`row`} spacing={6}>
      <MenuStack as="ul" listStyleType="none" spacing={4}>
        {MENU_ITEMS.map((item) => (
          <Heading.h3 as="li" key={item.title} variant="link">
            {/* TODO: replace href with item.href once pages are ready */}
            <Link href={`#`}>{item.title}</Link>
          </Heading.h3>
        ))}
      </MenuStack>

      <HStack>
        <ToggleColorMode />
        <ToggleDirection />
        <IconButton aria-label={`View storage policy`} variant="ghost" icon={<Cookie />} />
      </HStack>
    </MenuStack>
  );

export const Navbar = () => {
  const isMobile = useMobile();
  const { isOpen, onToggle } = useDisclosure();
  const dividerColor = useColorModeValue(`gray.200`, `white`);
  useEffect(() => {
    if (!isMobile && isOpen) onToggle();
  }, [isMobile]);

  const MenuIcon = isOpen ? CloseIcon : Hamburger;
  const MenuStack = isMobile ? VStack : HStack;
  const Menu = useMemo(() => DirectionalMenu(MenuStack), [isMobile]);

  return (
    <>
      <Container as="nav" variant="page" id="navbar" mb="4">
        <Flex
          minH="75px"
          pt="6"
          pb="8"
          borderBottom={1}
          borderStyle="solid"
          borderColor={dividerColor}
          align="center"
        >
          <Flex flex={{ base: 1 }} justify="start">
            <Logo />
          </Flex>

          <Box as="menu" id="menu">
            {isMobile ? (
              <IconButton
                aria-label={`Toggle Navigation`}
                onClick={onToggle}
                variant="ghost"
                icon={<MenuIcon fontSize={`1.563rem`} />}
              />
            ) : (
              <Box as="menu" id="menu">
                <Menu />
              </Box>
            )}
          </Box>
        </Flex>
      </Container>

      {isMobile && (
        <Container as="menu" variant="page" id="menu" mb="4">
          <Collapse in={isOpen} animateOpacity>
            <Menu />
            {isOpen && (
              <Flex pt="4" borderBottom={1} borderStyle="solid" borderColor={dividerColor} />
            )}
          </Collapse>
        </Container>
      )}
    </>
  );
};

export default Navbar;
