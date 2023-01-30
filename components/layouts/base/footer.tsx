import React from "react";
import { Box, Text } from "components/primitives";

const fullname = "Khinshan Khan";
const startYear = 2017;

export const Footer = () => {
  return (
    <Box
      as="footer"
      className="nav-bg"
      css={{
        marginTop: "20px",
        paddingTop: "28px",
        paddingBottom: "35px",
      }}
    >
      <Text css={{ textAlign: "center" }}>
        &copy; {startYear}+, {fullname}. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
