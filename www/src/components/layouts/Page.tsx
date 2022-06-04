import React, { FC } from "react";
import { ContainerProps, Container } from "@chakra-ui/react";
import Layout from "./Base";

export const PageLayout: FC<ContainerProps> = ({ children, ...props }) => (
  <Layout {...props}>
    <Container maxW="95%" p={0}>
      {children}
      <br />
    </Container>
  </Layout>
);

export default PageLayout;
