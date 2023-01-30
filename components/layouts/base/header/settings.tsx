import React from "react";
import { styled } from "lib/theme";
import { ThemeToggle } from "components/toggles";

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

export function Settings() {
  return (
    <Ul>
      <Li>
        <ThemeToggle />
      </Li>
    </Ul>
  );
}

export default Settings;
