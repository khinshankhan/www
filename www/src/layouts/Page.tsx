import React, { ReactNode } from "react";
import { Container, chakra } from "@chakra-ui/react";
import useMobile from "src/hooks/useMobile";
import { Header, Footer } from "./common";

interface ISingleLayoutProps {
  children?: ReactNode;
}
const Page = ({ children }: ISingleLayoutProps): JSX.Element => {
  const isMobile = useMobile();

  return (
    <chakra.div id="page">
      <Header />
      <Container variant="page" minH={isMobile ? `70vh` : `75vh`} id="content">
        {children}
      </Container>
      <Footer />
    </chakra.div>
  );
};

export default Page;
