import React from "react";
import { useSearchInfo } from "src/contexts/SearchInfo";
import { HStack } from "@chakra-ui/react";
import Heading from "src/components/common/Heading";
import Tag, { TagHandler } from "src/components/common/Tag";

const DisplayTags = () => {
  const { selectedTags, updateSelectedTags } = useSearchInfo();
  const tags = [...selectedTags];
  tags.sort();

  const handler: TagHandler = (event, tag) => {
    event.preventDefault();
    updateSelectedTags(tag);
  };

  return (
    <HStack wrap="wrap">
      {tags.length > 0 && <Heading.h4>Selected Tags:</Heading.h4>}
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} handler={handler} selected />
      ))}
    </HStack>
  );
};

export default DisplayTags;
