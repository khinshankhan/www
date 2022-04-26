import React, { ReactNode } from "react";
import { Container, VStack } from "@chakra-ui/react";
import useMobile from "src/hooks/useMobile";
import PageLayout from "./Page";

interface ICenteredLayoutProps {
  children?: ReactNode;
}

const CenteredLayout = ({ children }: ICenteredLayoutProps) => {
  const { isExtraSmall, isMobile } = useMobile();
  const fromTop = isMobile ? `0%` : `7%`;
  const maxCh = isExtraSmall ? `32ch` : [`50ch`, `80ch`];

  return (
    <PageLayout minH={[`70vh`, null, `75vh`, null, null, `76vh`]}>
      <br />
      <Container as={VStack} position="relative" mt={fromTop} spacing={[10]} maxW={maxCh}>
        {children}
      </Container>
      <br />
    </PageLayout>
  );
};

export default CenteredLayout;
