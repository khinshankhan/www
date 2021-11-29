import React from "react";
import { useSearchInfo } from "src/contexts/SearchInfo";
import { HStack } from "@chakra-ui/react";
import Tag from "src/components/Tag";

const DisplayTags = () => {
  const { selectedTags, updateSelectedTags } = useSearchInfo();
  const tags = [...selectedTags];
  tags.sort();

  const handler = (event: MouseEvent, tag: string) => {
    event.preventDefault();
    updateSelectedTags(tag);
  };

  return (
    <HStack wrap="wrap">
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} handler={handler} bg={`#F40057`} />
      ))}
    </HStack>
  );
};

export default DisplayTags;
