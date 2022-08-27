import React, { ReactNode } from "react";
import { chakra, BoxProps, Box, ContainerProps, Container, Text, VStack } from "@chakra-ui/react";
import { Heading, BackButton } from "src/components/common";
import type { IBackButtonProps } from "src/components/common";
import { BaseLayout as Layout } from "src/components/layouts";
import type { IBaseLayoutProps } from "src/components/layouts";
import type { FCC } from "src/types/react";

export interface IPageLayoutProps extends Omit<IBaseLayoutProps, "title"> {
  title?: string | ReactNode;
  taglines?: string[];
  backInfo?: IBackButtonProps;
  subHeaderProps?: BoxProps;
  childrenContrainerProps?: ContainerProps;
}

export const PageLayout: FCC<IPageLayoutProps> = ({
  title = null,
  taglines = [],
  children,
  backInfo = null,
  subHeaderProps = null,
  childrenContrainerProps = null,
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const showBackButton = backInfo !== null;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const showTitle = title !== null;

  return (
    <Layout {...props}>
      {showTitle && (
        <Box
          pt={showBackButton ? 7 : 14}
          pb={12}
          className="sharedNavBg"
          position="relative"
          mb={10}
          zIndex={1}
          {...subHeaderProps}
        >
          <Container variant="page">
            {showBackButton && <BackButton pb={6} {...backInfo} />}
            <Heading.h1 align="center" fontFamily="title" pb={taglines.length === 0 ? 0 : 8}>
              {title}
            </Heading.h1>
            {taglines.length !== 0 && (
              <VStack>
                {taglines.map((tagline) => (
                  <Text as={chakra.span} key={tagline}>
                    {tagline}
                  </Text>
                ))}
              </VStack>
            )}
          </Container>
        </Box>
      )}
      <Container variant="page" pt={12} pb={12} {...childrenContrainerProps}>
        {children}
      </Container>
    </Layout>
  );
};

export default PageLayout;
