import React, { MouseEvent } from "react";
import Button from "./Button";

export type TagHandler = (
  event: MouseEvent<HTMLButtonElement>,
  tag: string
) => void;

interface ITagProps {
  tag: string;
  handler: TagHandler;
  [key: string]: any;
}

const Tag = ({ tag, handler, ...props }: ITagProps) => {
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    handler(event, tag);
  };

  return (
    <Button onClick={onClick} size="sm" mt="2" mb="2" {...props}>
      {tag}
    </Button>
  );
};

export default Tag;
