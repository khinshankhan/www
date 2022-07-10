import React, { MouseEvent } from "react";
import { Button } from "@chakra-ui/react";

export type TagHandler = (tag: string, event: MouseEvent<HTMLButtonElement>) => void;

interface ITagProps {
  tag: string;
  handler?: TagHandler;
  [key: string]: any;
}

export const Tag = ({ tag, handler = () => {}, ...props }: ITagProps) => {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    handler(tag, event);
  };

  return (
    // TODO: use better bgColor once more of the site is figured out
    <Button onClick={onClick} size="sm" mt="2" mb="2" bgColor="brand.palette.400" {...props}>
      {tag}
    </Button>
  );
};

export default Tag;
