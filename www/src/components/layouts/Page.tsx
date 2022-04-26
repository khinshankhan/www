import React, { ReactNode } from "react";
import { Container, chakra } from "@chakra-ui/react";
import useMobile from "src/hooks/useMobile";
import { Header, Footer } from "./common";

interface ISingleLayoutProps {
  minH?: string | (string | null)[] | null;
  children?: ReactNode;
}
const Page = ({ minH = null, children }: ISingleLayoutProps): JSX.Element => {
  const { isMobile } = useMobile();
  const minHeight = minH ?? (isMobile ? `70vh` : `75vh`);

  return (
    <chakra.div id="page">
      <Header />
      <Container variant="page" minH={minHeight} id="content">
        {children}
      </Container>
      <Footer />
    </chakra.div>
  );
};

export default Page;
