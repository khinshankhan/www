import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
