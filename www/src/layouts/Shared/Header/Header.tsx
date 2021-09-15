import React, { Fragment } from "react";
import ToggleMode from "src/components/ToggleMode";

const Header = (): JSX.Element => (
  <Fragment>
    Hello from HEADER
    <br />
    <ToggleMode />
    <br />
  </Fragment>
);

export default Header;
