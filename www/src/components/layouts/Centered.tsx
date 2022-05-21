import React, { ReactNode } from "react";
import { Container, VStack } from "@chakra-ui/react";
import BaseLayout from "./Base";

interface ICenteredLayoutProps {
  pageMinH?: string | (string | null)[] | { [key: string]: string } | null;
  topSpace?: boolean;
  bottomSpace?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

export const CenteredLayout = ({
  pageMinH = { base: `70vh`, md: `75vh`, "2xl": `76vh` },
  topSpace = true,
  bottomSpace = true,
  children,
  ...props
}: ICenteredLayoutProps) => (
  <BaseLayout minH={pageMinH}>
    {topSpace && <br />}
    <Container
      as={VStack}
      spacing={10}
      mt={{ base: `0%`, md: `7%` }}
      maxW={{ base: `32ch`, xs: `50ch`, sm: `80ch` }}
      {...props}
    >
      {children}
    </Container>
    {bottomSpace && <br />}
  </BaseLayout>
);

export default CenteredLayout;
