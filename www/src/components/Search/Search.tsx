import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@chakra-ui/react";
import { ICleanedWritingNode } from "src/queries/WritingNodes";
import DisplayTags from "./DisplayTags";
import useFilterNodes from "./useFilterNodes";

interface ISearchProps {
  nodes: ICleanedWritingNode[];
  setNodes: Dispatch<SetStateAction<ICleanedWritingNode[]>>;
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
