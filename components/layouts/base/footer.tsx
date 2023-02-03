import React from "react";
import { useRouter } from "next/router";
import { theme } from "lib/theme";
import { Box, Container, Text } from "components/primitives";

const fullname = "Khinshan Khan";
const startYear = 2017;

export const Footer = () => {
  const router = useRouter();
  // only show separator for home
  // since the bg color on other pages will be different
  const showSeparator = router.pathname === "/";

  return (
    <>
      {showSeparator && (
        <Container
          css={{
            backgroundColor: theme.colors.logoFg,
            width: "70%",
            height: "2px",
            marginTop: "20px",
          }}
          role="presentation"
        />
      )}
      <Box
        as="footer"
        className="nav-bg"
        css={{
          backgroundColor: theme.colors.bg,
          marginTop: showSeparator ? "0px" : "20px",
          paddingTop: "28px",
          paddingBottom: "35px",
        }}
      >
        <Text css={{ textAlign: "center" }}>
          &copy; {startYear}+, {fullname}. All rights reserved.
        </Text>
      </Box>
    </>
  );
};

export default Footer;
