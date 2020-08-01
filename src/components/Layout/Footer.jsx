import React from "react";
import { Link } from "gatsby";

const doNothing = (e) => {
  e.preventDefault();
  console.log("clicked");
};

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      <Link to="/" onClick={doNothing}>
        &copy;
      </Link>
      Khinshan Khan 2016 - {date.getFullYear()}
    </footer>
  );
};

export default Footer;
