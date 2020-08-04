import React from "react";
import { Link as GatsbyLink } from "gatsby";
import IconButton from "@material-ui/core/IconButton";

const Anchor = ({ children, to }) => <a href={to}>{children}</a>;

const SocialIcon = ({ children, link }) => {
  const Link = link.startsWith("/") ? GatsbyLink : Anchor;

  return (
    <>
      <Link to={link}>
        <IconButton>{children}</IconButton>
      </Link>
    </>
  );
};

export default SocialIcon;
