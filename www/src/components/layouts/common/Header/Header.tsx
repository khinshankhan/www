import React, { useEffect } from "react";
import {
  BoxProps,
  useDisclosure,
  Box,
  Collapse,
  Container,
  Flex,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Logo } from "src/assets";
import { ToggleNavbarMenu } from "src/components/toggles";
import useHeaderData from "src/data/useHeaderData";
import { useMobile } from "src/hooks";
import NavbarLinks from "./navs/NavbarLinks";
import SettingToggles from "./navs/SettingToggles";

// NOTE: mobile header should be updated to pass in HStack for more than 1 setting toggle
const Header = (props: BoxProps) => {
  const { navs } = useHeaderData();
  const { isMobile } = useMobile();
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    onClose();
  }, [isMobile, onClose]);

  return (
    <Box top={0} pos="sticky" zIndex="sticky" {...props}>
      <Container variant="page">
        <Flex as="nav" id="main-nav" minH="55px" pt="4" pb="2.5" align="center">
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
              <NavbarLinks Stack={HStack} items={navs.header.pages} />
              <SettingToggles Stack={Stack} />
            </HStack>
          )}
        </Flex>

        {isMobile && (
          <Collapse in={isOpen} animateOpacity>
            {/* TODO: replace collapse with an internal version */}
            <NavbarLinks
              Stack={VStack}
              items={navs.header.pages}
              borderTop={1}
              borderBottom={1}
              borderStyle="solid"
              borderColor="dividerColor"
              mb={4}
              p={4}
            />
            <SettingToggles Stack={Stack} />
          </Collapse>
        )}
      </Container>
    </Box>
  );
};

export default Header;
