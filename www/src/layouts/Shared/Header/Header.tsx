import React from "react";
import useMobile from "src/hooks/useMobile";
import { Button, Stack, IconButton } from "@chakra-ui/react";
import ToggleColorMode from "src/components/ToggleColorMode";
import ToggleDirection from "src/components/ToggleDirection";
import { FaCookie as Cookie } from "react-icons/fa";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

interface INavigationProps {
  mobile: boolean;
}

const Navigation = ({ mobile }: INavigationProps): JSX.Element => (
  <Stack as="nav" isInline={!mobile} spacing={mobile ? `20` : `3`}>
    <Button variant="ghost">About</Button>
    <Button variant="ghost">Portfolio</Button>
    <Button variant="ghost">Writing</Button>
    <Stack isInline spacing="2">
      <ToggleColorMode />
      <ToggleDirection />
      <IconButton
        aria-label={`View storage policy`}
        variant="ghost"
        icon={<Cookie fontSize="1.25rem" />}
      />
    </Stack>
  </Stack>
);

const Header = (): JSX.Element => {
  const mobilep = useMobile();
  const Nav = mobilep ? Mobile : Desktop;

  return (
    <Nav>
      <Navigation mobile={mobilep} />
    </Nav>
  );
};

export default Header;
