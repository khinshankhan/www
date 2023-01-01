import type { FCC } from "types/react";
import React, { Fragment } from "react";
import { styled } from "lib/theme";
import { Box, Flex, Heading } from "lib/theme/components";
import { Header, Footer } from "./shared";

const ContentHeader = styled("header", {
  zIndex: 1,
  paddingTop: "56px",
  paddingBottom: "56px",
  "@isDesktop": {
    paddingBottom: "224px",
  },
  textAlign: "center",
});

const Article = styled("article", {
  backgroundColor: "$background",
  marginTop: "24px",
  zIndex: 2,
  "@isDesktop": {
    marginTop: "-128px",
    paddingTop: "24px",
    paddingLeft: "32px",
    paddingRight: "32px",
  },
});

interface IHeaderProps {
  title?: string;
  subtitle?: string;
}

export const PageLayout: FCC<IHeaderProps> = ({
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
            <Heading.h1 className="h2" css={{ paddingBottom: "24px" }}>
              {title}
            </Heading.h1>
            <Box as="p" className="main-nav">
              {subtitle}
            </Box>
          </ContentHeader>

          <Article id="article" className="page-container">
            {children}
          </Article>
        </Box>
      </Flex>
      <Footer />
    </Fragment>
  );
};

export default PageLayout;
