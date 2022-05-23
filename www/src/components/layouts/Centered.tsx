import React, { FC, ReactNode } from "react";
import { ContainerProps, Container, VStack } from "@chakra-ui/react";
import BaseLayout from "./Base";

interface ICenteredLayoutProps extends ContainerProps {
  pageMinH?: ContainerProps["minH"];
  topSpace?: boolean;
  bottomSpace?: boolean;
  children?: ReactNode;
}

export const CenteredLayout: FC<ICenteredLayoutProps> = ({
  pageMinH = { base: `70vh`, md: `75vh`, "2xl": `76vh` },
  topSpace = true,
  bottomSpace = true,
  children,
  ...props
}) => (
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
