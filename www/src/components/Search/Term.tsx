import React, { Dispatch, SetStateAction } from "react";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Heading from "src/components/common/Heading";

interface ITermProps {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
}

const Term = ({ term, setTerm }: ITermProps) => (
  <Box>
    <Heading.h6>{term}</Heading.h6>
    <FormControl marginBottom="6">
      <Heading.h4 as={FormLabel} mb="2">
        Search term:
      </Heading.h4>
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
