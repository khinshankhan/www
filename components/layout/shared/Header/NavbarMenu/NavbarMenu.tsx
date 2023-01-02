import React from "react";
import { styled } from "lib/theme";
import clsx from "clsx";
import NavbarLinks from "./NavbarLinks";
import NavbarSettings from "./NavbarSettings";

const Menu = styled("menu", {
  maxHeight: "315px",
  display: "flex",

  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "@isDesktop": {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  "@isMobile": {
    position: "relative",
    paddingBottom: "20px",
    "&[class*='closed']": {
      paddingBottom: "2px",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      margin: "auto",
      bottom: "0",
      width: "70%",
      borderBottom: "1px dotted white",
      marginBottom: "15px",
    },
  },
});

export function NavbarMenu({ className = "" }: { className?: string }) {
  return (
    <Menu className={clsx("collapsible", className)}>
      <NavbarLinks />
      <NavbarSettings />
    </Menu>
  );
}

export default NavbarMenu;
