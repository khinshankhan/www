import React, { Fragment } from "react";
import { styled } from "lib/theme";
import { Box } from "lib/theme/components";
import Header from "components/layout/Header";

const Main = styled("main");

export function PageLayout({ children }) {
  return (
    <Fragment>
      <Header />
      <Box
        className="shared-nav-bg"
        css={{
          paddingTop: "56px",
          paddingBottom: "48px",
          position: "relative",
          mb: "40px",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <Box
          css={{
            fontFamily: "$title",
            paddingBottom: "24px",
          }}
        >
          mhm yes
        </Box>
        <Box>hello there</Box>
      </Box>

      <Main className="page-container">{children}</Main>
    </Fragment>
  );
}

export default PageLayout;
