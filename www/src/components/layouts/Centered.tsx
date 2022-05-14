import React, { ReactNode } from "react";
import { Container, VStack } from "@chakra-ui/react";
import { useMobile } from "src/hooks";
import PageLayout from "./Page";

interface ICenteredLayoutProps {
  children?: ReactNode;
}

const CenteredLayout = ({ children }: ICenteredLayoutProps) => {
  const { isMobile } = useMobile();
  const fromTop = isMobile ? `0%` : `7%`;

  return (
    <PageLayout minH={{ base: `70vh`, md: `75vh`, "2xl": `76vh` }}>
      <br />
      <Container
        as={VStack}
        position="relative"
        mt={fromTop}
        spacing={10}
        maxW={{ base: `32ch`, xs: `50ch`, sm: `80ch` }}
      >
        {children}
      </Container>
      <br />
    </PageLayout>
  );
};

export default CenteredLayout;
