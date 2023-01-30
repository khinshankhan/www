import type { FCC } from "types/react";
import React from "react";
import { theme } from "lib/theme";
import { Box, Container } from "components/primitives";

export const PageSkeletonLayout: FCC = ({ children }) => {
  return (
    <Box css={{ backgroundColor: theme.colors.contentBg }}>
      <Container variant="page" as="main" css={{ marginTop: "20px", marginBottom: "20px" }}>
        {children}
      </Container>
    </Box>
  );
};

export default PageSkeletonLayout;
