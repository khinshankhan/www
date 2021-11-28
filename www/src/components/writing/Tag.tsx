import React, { MouseEvent } from "react";
import { HStack, Button } from "@chakra-ui/react";

type IWritingTag = {
  tag: string;
};

const WritingTag = ({ tag }: IWritingTag) => {
  const handler = (event: MouseEvent) => {
    event.preventDefault();
    console.log({ tag });
  };

  return (
    <Button onClick={handler} size="sm" m="2">
      {tag}
    </Button>
  );
};

type IWritingTags = {
  categories: string[];
};

const WritingTags = ({ categories }: IWritingTags) => {
  const tags = categories;

  return (
    <HStack wrap="wrap">
      {tags.map((tag) => (
        <WritingTag key={tag} tag={tag} />
      ))}
    </HStack>
  );
};

export default WritingTags;
