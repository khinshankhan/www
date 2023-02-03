import type { FCC } from "types/react";
import type { ReactNode } from "react";
import React from "react";
import { theme, media, styled } from "lib/theme";
import { Box } from "components/primitives";
import { ISidebarProps } from "./sidebar";
import Sidebar from "./sidebar";

const ContentHeader = styled("header", {
  textAlign: "center",
  paddingTop: "56px",
  paddingBottom: "56px",
  backgroundColor: theme.colors.bg,
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

interface IPageSkeletonLayoutProps extends ISidebarProps {
  title: string;
  subtitle: string;
  sidebar?: ReactNode;
}

export const PageSkeletonLayout: FCC<IPageSkeletonLayoutProps> = ({
  title,
  subtitle,
  sidebar,
  direction,
  children,
}) => {
  return (
    <Box as="main">
      <ContentHeader>
        <h1 style={{ paddingBottom: "24px" }}>{title}</h1>
        <p className="main-nav">{subtitle}</p>
      </ContentHeader>

      <PageWrapper>
        <Sidebar sidebar={sidebar} direction={direction}>
          <Content id="article">{children}</Content>
        </Sidebar>
      </PageWrapper>
    </Box>
  );
};

export default PageSkeletonLayout;
