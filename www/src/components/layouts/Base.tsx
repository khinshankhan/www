import React, { FC } from "react";
import { BoxProps, Box, chakra } from "@chakra-ui/react";
import { Header, Footer } from "./common";

export const BaseLayout: FC<BoxProps> = ({ minH = null, children, ...props }): JSX.Element => {
  // TODO: utilize a proper formula instead of guess and check
  const minHeight = minH ?? {
    base: `calc(100vh - 85px - 134px)`,
    xs: `calc(100vh - 85px - 107px)`,
    md: `calc(100vh - 85px - 72px)`,
  };

  console.log({ minHeight });

  return (
    <chakra.div id="page">
      <Header />
      <Box id="content" variant="page" minH={minHeight} {...props}>
        {children}
      </Box>
      <Footer />
    </chakra.div>
  );
};

export default BaseLayout;
