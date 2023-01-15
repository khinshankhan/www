import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { styled } from "lib/theme";
import { Box, Flex } from "components/primitives";
import { Header, Footer } from "./shared";
import { Sidebar } from "./Sidebar";

const ContentHeader = styled("header", {
  textAlign: "center",
  zIndex: 1,
  paddingTop: "56px",
  paddingBottom: "56px",
});

const Content = styled("article", {
  backgroundColor: "$background",
  zIndex: 2,
  marginTop: "24px",
  paddingTop: 0,
  "@sm": {
    paddingTop: "8px",
  },
});

interface IPageLayoutProps {
  title?: string;
  subtitle?: string;
}

export const PageLayout: FCC<IPageLayoutProps> = ({
  title = "mhm yes",
  subtitle = "hello there",
  children,
}) => {
  return (
    <Fragment>
      <Flex flexDirection="column" css={{ minHeight: "96vh" }}>
        <Header />

        <Box as="main">
          <ContentHeader className="nav-bg">
            <h1 style={{ paddingBottom: "24px" }}>{title}</h1>
            <Box as="p" className="main-nav">
              {subtitle}
            </Box>
          </ContentHeader>

          <Sidebar direction="right">
            <Content id="article">{children}</Content>
          </Sidebar>
        </Box>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default PageLayout;
