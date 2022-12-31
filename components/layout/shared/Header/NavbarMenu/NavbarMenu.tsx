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
});

export function NavbarMenu() {
  return (
    <Menu>
      <NavbarLinks />
      <NavbarSettings />
    </Menu>
  );
}

export default NavbarMenu;
