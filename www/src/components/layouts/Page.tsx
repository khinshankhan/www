import React, { ReactNode } from "react";
import CenteredLayout from "./Centered";

interface IPageLayoutProps {
  children?: ReactNode;
  [key: string]: any;
}

export const PageLayout = ({ children, ...props }: IPageLayoutProps) => (
  <CenteredLayout mt={{ base: `0%` }} maxW="100%" {...props}>
    {children}
  </CenteredLayout>
);

export default PageLayout;
