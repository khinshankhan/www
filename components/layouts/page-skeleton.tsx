import type { FCC } from "types/react";
import React from "react";
import { theme, media, styled } from "lib/theme";
import { Box, Container } from "components/primitives";

const ContentHeader = styled("header", {
  textAlign: "center",
  paddingTop: "56px",
  paddingBottom: "56px",
});

const PageWrapper = styled("div", {
  backgroundColor: theme.colors.contentBg,
  paddingTop: "20px",
  paddingBottom: "20px",
});

const Content = styled("article", {
  marginTop: "24px",
  paddingTop: 0,
  [media("sm")]: {
    paddingTop: "8px",
  },
  flexGrow: 1,
});

interface IPageSkeletonLayoutProps {
  title: string;
  subtitle: string;
}

export const PageSkeletonLayout: FCC<IPageSkeletonLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <Box as="main">
      <ContentHeader>
        <h1 style={{ paddingBottom: "24px" }}>{title}</h1>
        <p className="main-nav">{subtitle}</p>
      </ContentHeader>

      <PageWrapper>
        <Container variant="page">
          <Content id="article">{children}</Content>
        </Container>
      </PageWrapper>
    </Box>
  );
};

export default PageSkeletonLayout;
