import React, { useEffect } from "react";
import {
  useDisclosure,
  Box,
  Collapse,
  Container,
  Flex,
  HStack,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { LogoButton } from "components/icons";
import { ToggleNavbarMenu } from "components/toggles";
import { useMobile } from "hooks";
import NavbarLinks from "./NavbarLinks";
import SettingToggles from "./SettingsToggles";

const pages = [
  {
    href: `/about`,
    label: `About`,
  },
  {
    href: `/writing`,
    label: `Writing`,
  },
  {
    href: `/projects`,
    label: `Projects`,
  },
  {
    href: `/contact`,
    label: `Contact`,
  },
];

// NOTE: mobile header should be updated to pass in HStack for more than 1 setting toggle
export const Header = () => {
  const { isMobile } = useMobile();
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    onClose();
  }, [isMobile, onClose]);

  return (
    <Container variant="page">
      <Flex as="nav" id="main-nav" role="navigation" minH="55px" pt="4" pb="2.5" align="center">
        <Flex id="main-logo" flex={1} justify="start">
          <LogoButton size={55} />
        </Flex>
        {isMobile ? (
          <ToggleNavbarMenu isOpen={isOpen} onClick={onToggle} fontSize={35} />
        ) : (
          <HStack
            as="menu"
            id="navbar-content"
            flex={0}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            <NavbarLinks Stack={HStack} items={pages}>
              <SettingToggles Stack={Stack} />
            </NavbarLinks>
          </HStack>
        )}
      </Flex>

      {isMobile && (
        <Collapse in={isOpen} animateOpacity>
          <Box borderTop={1} borderBottom={1} borderStyle="solid" mt={1} mb={4} p={4}>
            {/* TODO: replace collapse with an internal version */}
            <NavbarLinks Stack={VStack} items={pages}>
              <SettingToggles Stack={Stack} />
            </NavbarLinks>
          </Box>
        </Collapse>
      )}
    </Container>
  );
};

export default Header;
