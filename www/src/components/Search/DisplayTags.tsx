import React from "react";
import { useSearchInfo } from "src/contexts/SearchInfo";
import { HStack } from "@chakra-ui/react";
import headings from "src/components/mdx/headings";
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
      {tags.length > 0 && <headings.h4>Selected Tags:</headings.h4>}
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} handler={handler} selected />
      ))}
    </HStack>
  );
};

export default DisplayTags;
