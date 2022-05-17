import React, { ReactNode } from "react";
import { Container, VStack } from "@chakra-ui/react";
import PageLayout from "./Page";

interface ICenteredLayoutProps {
  pageMinH?: string | (string | null)[] | { [key: string]: string } | null;
  topSpace?: boolean;
  bottomSpace?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const CenteredLayout = ({
  pageMinH = { base: `70vh`, md: `75vh`, "2xl": `76vh` },
  topSpace = true,
  bottomSpace = true,
  children,
  ...props
}: ICenteredLayoutProps) => (
  <PageLayout minH={pageMinH}>
    {topSpace && <br />}
    <Container
      as={VStack}
      position="relative"
      spacing={10}
      mt={{ base: `0%`, md: `7%` }}
      maxW={{ base: `32ch`, xs: `50ch`, sm: `80ch` }}
      {...props}
    >
      {children}
    </Container>
    {bottomSpace && <br />}
  </PageLayout>
);

export default CenteredLayout;
