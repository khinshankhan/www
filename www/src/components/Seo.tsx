import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

interface ISeoProps {
  title?: string;
}

export const Seo: FC<ISeoProps> = ({ title, children }) => {
  const siteTitle = `Khinshan Khan`;

  return (
    <Helmet title={title} defaultTitle={siteTitle} titleTemplate={`%s | ${siteTitle}`}>
      <html lang="en-US" />
      {children}
    </Helmet>
  );
};

export default Seo;
