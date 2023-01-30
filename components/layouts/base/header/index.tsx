import React, { useEffect } from "react";
import { useMobile, useDisclosure } from "hooks";
import { styled, theme } from "lib/theme";
import clsx from "clsx";
import { Container } from "components/primitives";
import { HomeToggle, MenuToggle } from "components/toggles";
import Menu from "./menu";

const SemanticHeader = styled("header", {
  backgroundColor: theme.colors.navOpaqueBg,
  "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
    backgroundColor: theme.colors.navBg,
    WebkitBackdropFilter: "blur(10px)",
    backdropFilter: "blur(10px)",
  },
});

const Nav = styled(Container, {
  backgroundColor: theme.colors.bg,
  w: "100%",
  minHeight: "55px",
  paddingTop: "16px",
  paddingBottom: "10px",

  display: "flex",
  direction: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

interface IHeaderProps {
  logoSize?: string;
}

export function Header({ logoSize = undefined }: IHeaderProps) {
  const { isMobile } = useMobile();
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    onClose();
  }, [isMobile, onClose]);

  return (
    <SemanticHeader role="navigation">
      <Nav as="nav" variant="page">
        <HomeToggle size={logoSize} />
        <Menu className="hide-mobile" />
        <MenuToggle className="hide-desktop" isOpen={isOpen} onClick={onToggle} />
      </Nav>
      <Menu className={clsx("hide-desktop", !isOpen && "closed")} />
    </SemanticHeader>
  );
}

export default Header;
