import React from "react";
import Link from "next/link";
import { styled } from "lib/theme";
import { Flex } from "lib/theme/components";
import { HomeToggle, ToggleTheme } from "components/toggle";

const links = [
  { title: "About", to: "/about" },
  { title: "Writing", to: "/writing" },
  { title: "Projects", to: "/projects" },
  { title: "Contact", to: "/contact" },
];

const SemanticHeader = styled("header", {
  w: "100%",
  minHeight: "55px",

  top: "0",
  position: "sticky",
  zIndex: "$sticky",
});

const Nav = styled("nav", {
  w: "100%",
  minHeight: "55px",
  paddingTop: "16px",
  paddingBottom: "10px",

  display: "flex",
  direction: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const Li = styled("li", {
  display: "inline-block",
  margin: "16px",
  textAlign: "center",
});

const NavbarMenu = ({ mobile }: { mobile: boolean }) => (
  <Flex
    as="menu"
    flexDirection={mobile ? "column" : "row"}
    justifyContent={mobile ? "center" : "space-between"}
    alignItems={mobile ? "center" : "flex-end"}
  >
    <Flex as="ul" flexDirection={mobile ? "column" : "row"}>
      {links.map((link) => (
        <Li key={link.to}>
          <Link className="main-nav" href={link.to}>
            {link.title}
          </Link>
        </Li>
      ))}
    </Flex>

    <Flex as="ul" flexDirection="row" alignItems={mobile ? "center" : "flex-end"}>
      <Li>
        <ToggleTheme />
      </Li>
    </Flex>
  </Flex>
);

interface IHeaderProps {
  className?: string;
  logoSize?: string;
}
export default function Header({ className = "shared-nav-bg", logoSize = `50px` }: IHeaderProps) {
  return (
    <SemanticHeader role="navigation" className={className}>
      <Nav className="page-container">
        <HomeToggle size={logoSize} />
        <NavbarMenu mobile={false} />
      </Nav>
    </SemanticHeader>
  );
}
