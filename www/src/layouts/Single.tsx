import React, { ReactNode } from "react";
import { Container, chakra } from "@chakra-ui/react";
import { Header, Footer } from "./shared";

interface ISingleLayoutProps {
  children?: ReactNode;
}

const SingleLayout = ({ children }: ISingleLayoutProps): JSX.Element => (
  <chakra.div id="page">
    <Header />
    <Container minH="67.85vh" id="content">
      {children}
    </Container>
    <Footer />
  </chakra.div>
);

export default SingleLayout;
