import React, { Fragment } from "react";
import { styled } from "lib/theme";
import ToggleTheme from "components/toggle/theme";

const Box = styled("div", {});

export default function Home() {
  return (
    <Fragment>
      <Box css={{ background: "salmon" }}>Hello there.</Box>
      <ToggleTheme />
    </Fragment>
  );
}
