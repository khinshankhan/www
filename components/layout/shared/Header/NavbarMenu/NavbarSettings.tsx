import React from "react";
import { styled } from "lib/theme";
import { ToggleTheme } from "components/toggle";
import { Li } from "./shared";

const Ul = styled("ul", {
  display: "flex",

  flexDirection: "row",
  alignItems: "center",
  "@isDesktop": {
    flexDirection: "flex-end",
  },
});

export function NavbarSettings() {
  return (
    <Ul>
      <Li>
        <ToggleTheme />
      </Li>
    </Ul>
  );
}

export default NavbarSettings;
