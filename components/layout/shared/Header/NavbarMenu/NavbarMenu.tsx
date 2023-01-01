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

  transition: "visibility 0s, opacity 0.5s ease-in-out, max-height 0.5s ease-in-out",
  visibility: "visible",
  opacity: "1",
  maxHeight: "500px",
  "&[class*='closed']": {
    visibility: "collapse",
    opacity: "0",
    maxHeight: "0",
    overflow: "hidden",
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
    <Menu className={className}>
      <NavbarLinks />
      <NavbarSettings />
    </Menu>
  );
}

export default NavbarMenu;
