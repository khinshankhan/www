import React, { MouseEvent } from "react";
import Button from "./Button";

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
    <Button onClick={onClick} size="sm" mt="2" mb="2" {...props}>
      {tag}
    </Button>
  );
};

export default Tag;
