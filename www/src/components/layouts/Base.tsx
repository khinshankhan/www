import React, { FC, useRef } from "react";
import { BoxProps, Box, chakra } from "@chakra-ui/react";
import { useDimensions } from "src/hooks";
import { Header, Footer } from "./common";

export const BaseLayout: FC<BoxProps> = ({ minH = null, children, ...props }): JSX.Element => {
  const { innerHeight } = useDimensions();
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // REVIEW: recheck this logic at a later time
  // innerHeight - navbar height - footer height
  // NOTE: bug of when mobile nav is open and suddenly switch to desktop
  const minHeight =
    minH ??
    `calc(${innerHeight ?? 0}px - ${headerRef.current?.clientHeight ?? 0}px - ${
      footerRef.current?.clientHeight ?? 0
    }px)`;

  return (
    <chakra.div id="page">
      <Header ref={headerRef} />
      <Box id="content" variant="page" minH={minHeight} {...props}>
        {children}
      </Box>
      <Footer ref={footerRef} />
    </chakra.div>
  );
};

export default BaseLayout;
