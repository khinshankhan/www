import type { FCC } from "types/react";
import type { ReactNode } from "react";
import React from "react";
import { media, styled } from "lib/theme";
import { Container } from "components/primitives";

export const Aside = styled("aside", {
  position: "sticky",
  maxHeight: "unset",
  top: "unset",
  marginTop: "24px",
  marginBottom: 0,
  [media("xl")]: {
    maxHeight: `300px`,
    top: "80px",
    marginTop: 0,
    marginBottom: 0,
  },
});
export const AsideContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "0rem",
  maxWidth: "100%",
  [media("xl")]: {
    marginTop: "1.8rem",
    minWidth: `200px`,
    maxWidth: `225px`,
  },
  [media("2xl")]: {
    minWidth: `225px`,
    maxWidth: `275px`,
  },
  width: "100%",
  overflow: "auto",
  alignItems: "flex-start",
});

const SidebarContainer: FCC = ({ children }) => (
  <Aside>
    <AsideContent>{children}</AsideContent>
  </Aside>
);

const LayoutStack = styled(Container, {
  display: `block`,
  [media("xl")]: {
    display: `flex`,
  },

  flexDirection: `row`,
  justifyContent: `flex`,
  "&[data-direction='right']": {
    flexDirection: `row-reverse`,
    justifyContent: `flex-end`,
  },

  gap: "5rem",
});

export interface ISidebarProps {
  direction?: "left" | "right";
  sidebar?: ReactNode;
}

export const Sidebar: FCC<ISidebarProps> = ({ direction = "left", sidebar, children }) => (
  <LayoutStack variant="page" data-direction={direction}>
    {sidebar && <SidebarContainer>{sidebar}</SidebarContainer>}
    {children}
  </LayoutStack>
);

export default Sidebar;
