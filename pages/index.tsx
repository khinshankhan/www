import React, { Fragment } from "react";
import { Box } from "lib/theme/components";
import ToggleTheme from "components/toggle/theme";

export default function Home() {
  return (
    <Fragment>
      <Box css={{ background: "salmon" }}>Hello there.</Box>
      <ToggleTheme />
    </Fragment>
  );
}
