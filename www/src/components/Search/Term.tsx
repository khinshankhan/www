import React, { Dispatch, SetStateAction } from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import headings from "src/components/mdx/headings";

interface ITermProps {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
}

const Term = ({ term, setTerm }: ITermProps) => (
  <Box>
    <headings.h6>{term}</headings.h6>
    <FormControl marginBottom="6">
      <headings.h4 as={FormLabel} mb="2">
        Search term:
      </headings.h4>
      <Box position="relative">
        <Input
          data-prop={`search-term`}
          onChange={(e) => setTerm(e.target.value)}
          type="text"
          placeholder="Enter search term (eg ketchup)"
        />
      </Box>
    </FormControl>
  </Box>
);

export default Term;
