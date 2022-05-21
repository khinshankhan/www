import React, { ReactNode } from "react";
import { Container } from "@chakra-ui/react";
import Layout from "./Base";

interface IPageLayoutProps {
  children?: ReactNode;
  [key: string]: any;
}

export const PageLayout = ({ children, ...props }: IPageLayoutProps) => (
  <Layout {...props}>
    <Container maxW="95%" p={0}>
      {children}
      <br />
    </Container>
  </Layout>
);

export default PageLayout;
