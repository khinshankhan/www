import React, { FC } from "react";
import { Box, Button, ButtonProps, Icon } from "@chakra-ui/react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

export const PillGroup: FC = ({ children, ...props }) => (
  <Box display="flex" flexWrap="wrap" {...props}>
    {children}
  </Box>
);

interface IPillProps extends ButtonProps {
  selected?: boolean;
}

export const Pill: FC<IPillProps> = ({ selected = false, children, ...props }) => {
  const styleProps = { ...(selected && { rightIcon: <Icon as={CloseIcon} /> }) };

  return (
    <Button
      isActive={selected}
      size="sm"
      colorScheme="yellow"
      zIndex={1}
      m={1}
      {...styleProps}
      {...props}
    >
      {children}
    </Button>
  );
};
