import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  BoxProps,
  forwardRef,
  useDisclosure,
  Box,
  Collapse,
  Container,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";
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
    href: `/writing`,
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

interface IHeaderProps extends BoxProps {
  setRecalculate: Dispatch<SetStateAction<number>>;
}

const Header = forwardRef(({ setRecalculate, ...props }: IHeaderProps, ref = null) => {
  const { isMobile } = useMobile();
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    onClose();
  }, [isMobile, onClose]);

  useEffect(() => {
    // NOTE: timeout accounts for collapse animation
    setTimeout(() => setRecalculate((p) => p + 1), 200);
  }, [isOpen, setRecalculate]);

  return (
    <Box
      top={0}
      bg="bgOpaque"
      pos="sticky"
      zIndex="sticky"
      sx={{
        "@supports ((-webkit-backdrop-filter: blur(6px)) or (backdrop-filter: blur(6px)))": {
          backgroundColor: `bgAlpha`,
          backdropFilter: `blur(6px)`,
        },
      }}
      ref={ref}
      {...props}
    >
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
              <NavbarLinks Stack={HStack} items={MENU_ITEMS} />
            </HStack>
          )}
        </Flex>

        {isMobile && (
          <Collapse in={isOpen} animateOpacity>
            {/* TODO: replace collapse with an internal version */}
            <NavbarLinks
              Stack={VStack}
              items={MENU_ITEMS}
              borderTop={1}
              borderBottom={1}
              borderStyle="solid"
              borderColor="dividerColor"
              mb={4}
              p={4}
            />
          </Collapse>
        )}
      </Container>
    </Box>
  );
});

export default Header;
