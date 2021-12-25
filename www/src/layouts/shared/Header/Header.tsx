import { defaultFontBody } from "constants/fonts";
import React from "react";
import { Button, Container, IconButton, Stack } from "@chakra-ui/react";
import { Link } from "gatsby";
import { FaCookie as Cookie } from "react-icons/fa";
import ToggleColorMode from "src/components/ToggleColorMode";
import ToggleDirection from "src/components/ToggleDirection";
import useMobile from "src/hooks/useMobile";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

interface INavigationProps {
  mobile: boolean;
}

const Navigation = ({ mobile }: INavigationProps): JSX.Element => (
  <Stack as="nav" isInline={!mobile} spacing={mobile ? `20` : `3`}>
    <Button
      variant="ghost"
      fontSize={mobile ? `2xl` : `1.125rem`}
      as={Link}
      to={`/about`}
      fontFamily={`'Inter', ui-serif, ${defaultFontBody}`}
    >
      ABOUT
    </Button>
    <Button
      variant="ghost"
      fontSize={mobile ? `2xl` : `1.125rem`}
      as={Link}
      to={`/portfolio`}
      fontFamily={`'Inter', ui-serif, ${defaultFontBody}`}
    >
      PORTFOLIO
    </Button>
    <Button
      variant="ghost"
      fontSize={mobile ? `2xl` : `1.125rem`}
      as={Link}
      to={`/writing`}
      fontFamily={`'Inter', ui-serif, ${defaultFontBody}`}
    >
      WRITING
    </Button>
    <Stack isInline spacing="2" align="center" justify="center">
      <ToggleColorMode size={mobile ? 30 : 24} />
      <ToggleDirection fontSize={mobile ? `1.563rem` : `1.563rem`} />
      <IconButton
        aria-label={`View storage policy`}
        variant="ghost"
        icon={<Cookie fontSize={mobile ? `1.953rem` : `1.563rem`} />}
      />
    </Stack>
  </Stack>
);

const Header = (): JSX.Element => {
  const mobilep = useMobile();
  const Nav = mobilep ? Mobile : Desktop;

  return (
    <Container as="nav" id="navbar">
      <Nav>
        <Navigation mobile={mobilep} />
      </Nav>
    </Container>
  );
};

export default Header;
