import React from "react";
import { Box } from "@chakra-ui/react";
import DisplayTags from "./DisplayTags";

const Search = ({ ...props }) => (
  <Box {...props}>
    <DisplayTags />
  </Box>
);

export default Search;
