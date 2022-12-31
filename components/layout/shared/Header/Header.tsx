import React, { useEffect } from "react";
import { useMobile, useDisclosure } from "hooks";
import { styled } from "lib/theme";
import { ToggleHome, ToggleNavbarMenu } from "components/toggle";
import NavbarMenu from "./NavbarMenu";

const SemanticHeader = styled("header", {
  w: "100%",
  minHeight: "55px",

  top: "0",
  position: "sticky",
  zIndex: "$sticky",
});

const Nav = styled("nav", {
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
  className?: string;
  logoSize?: string;
}
export function Header({ className = "shared-nav-bg", logoSize = `50px` }: IHeaderProps) {
  const { isMobile } = useMobile();
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: false });

  useEffect(() => {
    onClose();
  }, [isMobile]);

  return (
    <SemanticHeader role="navigation" className={className}>
      <Nav className="page-container">
        <ToggleHome size={logoSize} />
        {!isMobile && <NavbarMenu />}
        {isMobile && <ToggleNavbarMenu isOpen={isOpen} onClick={onToggle} />}
      </Nav>
      {isOpen && <NavbarMenu />}
    </SemanticHeader>
  );
}

export default Header;
