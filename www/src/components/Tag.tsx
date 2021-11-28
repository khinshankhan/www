import React, { MouseEvent } from "react";
import { Button } from "@chakra-ui/react";

interface ITagProps {
  tag: string;
  handler: (event: MouseEvent, tag: string) => void;
  [key: string]: any;
}

const Tag = ({ tag, handler, ...props }: ITagProps) => {
  const onClick = (event: MouseEvent) => {
    handler(event, tag);
  };

  return (
    <Button onClick={onClick} size="sm" m="2" {...props}>
      {tag}
    </Button>
  );
};

export default Tag;
