import React from "react";
import Link from "next/link";
import { styled } from "lib/theme";
import ToggleTheme from "components/toggle/theme";
import Logo from "components/icon/Logo";

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
  marginLeft: "16px",
  marginRight: "16px",

  display: "flex",
  direction: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const NavbarMenu = styled("menu", {
  display: "flex",
  direction: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

const Ul = styled("ul", {
  minHeight: "55px",
});
const Li = styled("li", {
  display: "inline-block",
  margin: "16px",
  fontFamily: "$heading",
});

const logoSize = `50px`;

export default function Header() {
  return (
    <SemanticHeader role="navigation" className="shared-nav-bg">
      <Nav>
        <Link href="/">
          <Logo
            height={logoSize}
            width={logoSize}
            fgColor="var(--anchorage-colors-logoFg)"
            bgColor="var(--anchorage-colors-logoBg)"
            borderColor="var(--anchorage-colors-logoBorder)"
          />
        </Link>
        <NavbarMenu>
          <Ul>
            {links.map((link) => (
              <Li key={link.to}>
                <Link href={link.to}>{link.title}</Link>
              </Li>
            ))}
          </Ul>

          <Ul>
            <Li>
              <ToggleTheme />
            </Li>
          </Ul>
        </NavbarMenu>
      </Nav>
    </SemanticHeader>
  );
}
