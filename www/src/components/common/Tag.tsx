import React, { MouseEvent } from "react";
import { ButtonProps, Button } from "@chakra-ui/react";
import { motion, MotionProps } from "framer-motion";

export type TagHandler = (tag: string, event: MouseEvent<HTMLButtonElement>) => void;

export type ITagProps = MotionProps &
  ButtonProps & {
    tag: string;
    handler?: TagHandler;
  };

export const Tag = ({ tag, handler = () => {}, ...props }: ITagProps) => {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    handler(tag, event);
  };

  return (
    // TODO: use better bgColor once more of the site is figured out
    <Button
      as={motion.button}
      onClick={onClick}
      size="sm"
      mt="2"
      mb="2"
      bgColor="brand.palette.300"
      whileTap={{ scale: 1.5 }}
      {...props}
    >
      {tag}
    </Button>
  );
};

export default Tag;
