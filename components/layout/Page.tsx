import type { FCC } from "types/react";
import { ReactNode } from "react";
import React, { Fragment } from "react";
import { styled } from "lib/theme";
import { Box, Flex } from "components/primitives";
import { Header, Footer } from "./shared";
import type { ISidebarProps } from "components/sidebars";
import { Sidebar } from "components/sidebars";

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
  flexGrow: 1,
});

export interface IPageLayoutProps extends ISidebarProps {
  title?: string;
  subtitle?: string | ReactNode;
}

export const PageLayout: FCC<IPageLayoutProps> = ({
  title = "mhm yes",
  subtitle = "hello there",
  direction = "right",
  sidebar,
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

          <Sidebar direction={direction} sidebar={sidebar}>
            <Content id="article">{children}</Content>
          </Sidebar>
        </Box>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default PageLayout;
