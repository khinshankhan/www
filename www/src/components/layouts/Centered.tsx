import React, { ReactNode } from "react";
import { Container, VStack } from "@chakra-ui/react";
import PageLayout from "./Page";

interface ICenteredLayoutProps {
  children?: ReactNode;
}

const CenteredLayout = ({ children }: ICenteredLayoutProps) => (
  <PageLayout minH={[`70vh`, null, `75vh`, null, null, `76vh`]}>
    <br />
    <Container as={VStack} position="relative" mt={[`5%`]} spacing={[10]} maxW={[`50ch`, `80ch`]}>
      {children}
    </Container>
  </PageLayout>
);

export default CenteredLayout;
