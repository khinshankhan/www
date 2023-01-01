import React from "react";
import { styled } from "lib/theme";
import { ToggleTheme } from "components/toggle";

const Ul = styled("ul", {
  display: "flex",

  flexDirection: "row",
  alignItems: "center",
  "@isDesktop": {
    flexDirection: "flex-end",
  },
});

const Li = styled("li", {
  display: "inline-block",
  // t r b l
  margin: "12px 4px 12px 4px",
  "@lg": {
    margin: "16px 4px 16px 4px",
  },
  textAlign: "center",
  textTransform: "uppercase",
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
