import React from "react";
import Link from "next/link";
import { styled } from "lib/theme";

const links = [
  { title: "About", to: "/about" },
  { title: "Writing", to: "/writing" },
  { title: "Projects", to: "/projects" },
  { title: "Contact", to: "/contact" },
];

const Ul = styled("ul", {
  display: "flex",

  flexDirection: "column",
  "@isDesktop": {
    flexDirection: "row",
  },
});

const Li = styled("li", {
  display: "inline-block",
  margin: "16px",
  textAlign: "center",
  textTransform: "uppercase",
});

export function NavbarLinks() {
  return (
    <Ul>
      {links.map((link) => (
        <Li key={link.to}>
          <Link className="main-nav" href={link.to} aria-label={`Navigate to ${link.title}`}>
            {link.title}
          </Link>
        </Li>
      ))}
    </Ul>
  );
}

export default NavbarLinks;
