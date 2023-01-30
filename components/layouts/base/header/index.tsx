import React from "react";
import { styled, theme } from "lib/theme";
import { Container } from "components/primitives";
import { HomeToggle, MenuToggle } from "components/toggles";
import Headroom from "react-headroom";

const Nav = styled("nav", {
  w: "100%",
  minHeight: "55px",
  paddingTop: "16px",
  paddingBottom: "10px",

  display: "flex",
  direction: "row",
  justifyContent: "space-between",
  alignItems: "center",

  backgroundColor: theme.colors.navOpaqueBg,
  "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
    backgroundColor: theme.colors.navBg,
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
  },
});

interface IHeaderProps {
  initialHeaderClass?: string;
  logoSize?: string;
}

export function Header({ logoSize = `50px` }: IHeaderProps) {
  return (
    <Headroom>
      <Container variant="page" as="header" role="navigation">
        <Nav>
          <HomeToggle size={logoSize} />
          <MenuToggle className="hide-desktop" isOpen={false} onClick={() => {}} />
        </Nav>
      </Container>
    </Headroom>
  );
}

export default Header;
