import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { Pill, PillGroup } from "src/components/blocks";
import { Heading } from "src/components/common";
import { SidebarContainer, SidebarTitle } from "src/components/layouts";

interface ISearchSidebarProps {
  selectedTags: string[];
  availableTags: string[];
}

// TODO: use some sort of state management solution
export const SearchSidebar: FC<ISearchSidebarProps> = ({ selectedTags, availableTags }) => (
  <SidebarContainer>
    <SidebarTitle as="h2" variant="h4">
      Filters
    </SidebarTitle>

    <SidebarTitle as="h3" variant="h5">
      Tags
    </SidebarTitle>

    <Accordion defaultIndex={[0]} allowMultiple w="100%">
      <AccordionItem>
        <Heading.h2 as="h5" fontFamily="body">
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Selected
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading.h2>
        <AccordionPanel pb={4}>
          <PillGroup mb={4}>
            {selectedTags.map((tag) => (
              <Pill key={tag} selected>
                {tag}
              </Pill>
            ))}
          </PillGroup>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <Heading.h2 as="h5" fontFamily="body">
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Available
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading.h2>
        <AccordionPanel pb={4}>
          <PillGroup mb={4}>
            {availableTags.map((tag) => (
              <Pill key={tag} selected>
                {tag}
              </Pill>
            ))}
          </PillGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </SidebarContainer>
);

export default SearchSidebar;
