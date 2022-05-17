import React, { ReactNode } from "react";
import CenteredLayout from "./Centered";

interface IPageLayoutProps {
  children?: ReactNode;
  [key: string]: any;
}

const PageLayout = ({ children, ...props }: IPageLayoutProps) => (
  <CenteredLayout mt={{ base: `0%` }} maxW="90%" {...props}>
    {children}
  </CenteredLayout>
);

export default PageLayout;
