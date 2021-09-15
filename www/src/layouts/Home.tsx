import React, { Fragment, ReactNode } from "react";
import Header from "./Shared/Header";

interface IHomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout = ({ children }: IHomeLayoutProps): JSX.Element => (
  <Fragment>
    <Header />
    {children}
  </Fragment>
);

export default HomeLayout;
