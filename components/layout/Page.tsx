import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { styled } from "lib/theme";
import clsx from "clsx";
import { Box, Flex } from "lib/theme/components";
import { Header, Footer } from "./shared";

const ContentHeader = styled("header", {
  textAlign: "center",
  zIndex: 1,
  paddingTop: "56px",
  paddingBottom: "56px",

  "&[class*='intersect']": {
    "@isDesktop": {
      paddingBottom: "224px",
    },
  },
});

const Content = styled("article", {
  backgroundColor: "$background",
  zIndex: 2,
  marginTop: "24px",

  "&[class*='intersect']": {
    "@isDesktop": {
      marginTop: "-128px",
      paddingTop: "24px",
      paddingLeft: "32px",
      paddingRight: "32px",
      borderRadius: "12px 12px 0 0",
    },
  },
});

interface IPageLayoutProps {
  title?: string;
  subtitle?: string;
  intersect?: boolean;
}

export const PageLayout: FCC<IPageLayoutProps> = ({
  title = "mhm yes",
  subtitle = "hello there",
  intersect = true,
  children,
}) => {
  return (
    <Fragment>
      <Flex flexDirection="column" css={{ minHeight: "96vh" }}>
        <Header />

        <Box as="main">
          <ContentHeader className={clsx("nav-bg", intersect && "intersect")}>
            <h1 style={{ paddingBottom: "24px" }}>{title}</h1>
            <Box as="p" className="main-nav">
              {subtitle}
            </Box>
          </ContentHeader>

          <Content id="article" className={clsx("page-container", intersect && "intersect")}>
            {children}
          </Content>
        </Box>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default PageLayout;
