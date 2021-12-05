import React, { Dispatch, SetStateAction, useState } from "react";
import { ICleanedWritingNode } from "src/queries/WritingNodes";
import useMobile from "src/hooks/useMobile";
import { Box, HStack, Flex, Spacer, Text } from "@chakra-ui/react";
import Heading from "src/components/common/Heading";
import { FcSearch as SearchIcon } from "react-icons/fc";
import { HiFilter as FilterIcon, HiOutlineFilter as FilterOutlineIcon } from "react-icons/hi";
import Button from "src/components/common/Button";
import useFilterNodes from "./useFilterNodes";
import DisplayTags from "./DisplayTags";
import Term from "./Term";

interface ISearchProps {
  nodes: ICleanedWritingNode[];
  setNodes: Dispatch<SetStateAction<ICleanedWritingNode[]>>;
  [key: string]: any;
}

const Search = ({ nodes, setNodes, ...props }: ISearchProps) => {
  useFilterNodes({ nodes, setNodes });
  const mobilep = useMobile();
  const [show, setShow] = useState(false);
  const [term, setTerm] = useState(``);
  const toggleShow = () => setShow(!show);

  const ShowIcon = show ? FilterIcon : FilterOutlineIcon;
  const showText = show ? `Hide` : `Show`;

  return (
    <Box {...props}>
      <Box mb="2">
        <Flex>
          <HStack>
            <Heading.h3>Search</Heading.h3>
            <SearchIcon fontSize={mobilep ? `1.953rem` : `1.563rem`} />
          </HStack>
          <Spacer />
          <Button as={Button} onClick={toggleShow} variant="ghost" selected={show}>
            <ShowIcon fontSize={mobilep ? `1.953rem` : `1.563rem`} />
            <Text> {showText}</Text>
          </Button>
        </Flex>
      </Box>
      <Box>
        {show && <Term term={term} setTerm={setTerm} />}
        <Box>
          <DisplayTags />
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
