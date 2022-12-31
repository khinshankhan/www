import React from "react";
import { styled } from "lib/theme";
import NavbarLinks from "./NavbarLinks";
import NavbarSettings from "./NavbarSettings";

const Menu = styled("menu", {
  display: "flex",

  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "@isDesktop": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  transition: "all 0.5s ease-in-out",
  opacity: "1",
  lineHeight: "$base",
  "&[class*='closed']": {
    overflow: "hidden",
    opacity: "0",
    lineHeight: "0",
  },
});

export function NavbarMenu({ className = "" }: { className?: string }) {
  return (
    <Menu className={className}>
      <NavbarLinks />
      <NavbarSettings />
    </Menu>
  );
}

export default NavbarMenu;
