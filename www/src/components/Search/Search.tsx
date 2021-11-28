import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@chakra-ui/react";
import { IWritingNodeWrapper } from "src/queries/WritingNodes";
import DisplayTags from "./DisplayTags";
import useFilterNodes from "./useFilterNodes";

interface ISearchProps {
  nodes: IWritingNodeWrapper[];
  setNodes: Dispatch<SetStateAction<IWritingNodeWrapper[]>>;
  [key: string]: any;
}

const Search = ({ nodes, setNodes, ...props }: ISearchProps) => {
  useFilterNodes({ nodes, setNodes });

  return (
    <Box {...props}>
      <DisplayTags />
    </Box>
  );
};

export default Search;
