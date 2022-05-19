import React, { FC } from "react";
import { Box, Button } from "@chakra-ui/react";

export const PillGroup: FC = ({ children, ...props }) => (
  <Box display="flex" flexWrap="wrap" {...props}>
    {children}
  </Box>
);

export const Pill: FC = ({ children, ...props }) => (
  <Button size="sm" colorScheme="yellow" zIndex={1} m={1} {...props}>
    {children}
  </Button>
);
