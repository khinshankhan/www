import React, { useState, useEffect } from "react";
import Link from "next/link";
import { media, styled } from "lib/theme";
import clsx from "clsx";

// TODO: move this out to config
const links = [
  { title: "About", to: "/about" },
  { title: "Writings", to: "/writings" },
  { title: "Projects", to: "/projects" },
  { title: "Contact", to: "/contact" },
];

const Ul = styled("ul", {
  display: "flex",

  flexDirection: "column",
  [media("isDesktop")]: {
    flexDirection: "row",
  },
});

const Li = styled("li", {
  display: "inline-block",
  margin: "16px",
  textAlign: "center",
  textTransform: "uppercase",
});

export function Links() {
  const [onLink, setOnLink] = useState("");
  useEffect(() => {
    const initialRender = () => {
      setOnLink(window.location.pathname);
    };

    initialRender();
  }, []);

  return (
    <Ul>
      {links.map((link) => (
        <Li key={link.to}>
          <Link
            className={clsx("main-nav", onLink === link.to && "on")}
            href={link.to}
            aria-label={`Navigate to ${link.title}`}
          >
            {link.title}
          </Link>
        </Li>
      ))}
    </Ul>
  );
}

export default Links;
