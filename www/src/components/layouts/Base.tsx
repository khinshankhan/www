import React, { FC } from "react";
import { BoxProps, Box, chakra } from "@chakra-ui/react";
import { useDimensions } from "src/hooks";
import { Header, Footer } from "./common";

export const BaseLayout: FC<BoxProps> = ({ minH = null, children, ...props }): JSX.Element => {
  const { innerHeight } = useDimensions();
  // TODO: utilize a proper formula instead of hard coding based on apparent sizes
  const minHeight = minH ?? {
    // innerHeight - navbar height - footer height
    // it's okay for there to be scroll when navbar is open
    base: `calc(${innerHeight}px - 85px - 134px)`,
    xs: `calc(${innerHeight}px - 85px - 107px)`,
    md: `calc(${innerHeight}px - 85px - 72px)`,
  };

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
