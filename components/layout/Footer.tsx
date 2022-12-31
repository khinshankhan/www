import React from "react";
import { Box, Text } from "lib/theme/components";

const fullname = "Khinshan Khan";
const startYear = 2017;

export const Footer = () => {
  return (
    <Box
      css={{
        backgroundColor: "$navStartBg",
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
