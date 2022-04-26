import React, { ReactNode } from "react";
import { Container, VStack } from "@chakra-ui/react";
import useMobile from "src/hooks/useMobile";
import PageLayout from "./Page";

interface ICenteredLayoutProps {
  children?: ReactNode;
}

const CenteredLayout = ({ children }: ICenteredLayoutProps) => {
  const mobilep = useMobile();
  const fromTop = mobilep ? `0%` : `7%`;

  return (
    <PageLayout minH={[`70vh`, null, `75vh`, null, null, `76vh`]}>
      <br />
      <Container
        as={VStack}
        position="relative"
        mt={fromTop}
        spacing={[10]}
        maxW={[`50ch`, `80ch`]}
      >
        {children}
      </Container>
      <br />
    </PageLayout>
  );
};

export default CenteredLayout;
