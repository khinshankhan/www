import React, { FC } from "react";
import { useDisclosure, Box, Collapse, Container, Flex, HStack, VStack } from "@chakra-ui/react";
import { Logo } from "src/assets";
import { ToggleNavbarMenu } from "src/components/toggles";
import { useMobile } from "src/hooks";
import NavbarLinks from "./navs/NavbarLinks";

// TODO: replace soon hrefs as features get built out
// TODO: replace this with a call to gatsby to get config based values
const MENU_ITEMS = [
  {
    title: `About`,
    href: `/404`,
  },
  {
    title: `Writing`,
    href: `/404`,
  },
  {
    title: `Portfolio`,
    href: `/404`,
  },
  {
    title: `Contact`,
    href: `/404`,
  },
];

const Header: FC = () => {
  const { isMobile } = useMobile();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box pos="sticky" backdropFilter="blur(8px)" top={0} zIndex="sticky" bg="bgAlpha" mb={4}>
      <Container variant="page">
        <Flex as="nav" id="main-nav" minH="55px" pt="4" pb="2" align="center">
          <Flex id="main-logo" flex={1} justify="start">
            <Logo size="55" />
          </Flex>
          {isMobile ? (
            <ToggleNavbarMenu isOpen={isOpen} onClick={onToggle} fontSize="1.563rem" />
          ) : (
            <HStack
              as="menu"
              id="navbar-content"
              flex={0}
              justify="flex-end"
              direction="row"
              spacing={6}
            >
              <NavbarLinks Stack={HStack} items={MENU_ITEMS} />
            </HStack>
          )}
        </Flex>

        {isMobile && (
          <Flex
            as="menu"
            id="navbar-content"
            flex={0}
            justify="center"
            align="center"
            direction="row"
          >
            <Collapse in={isOpen} animateOpacity>
              <NavbarLinks Stack={VStack} items={MENU_ITEMS} mb={4} />
            </Collapse>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default Header;