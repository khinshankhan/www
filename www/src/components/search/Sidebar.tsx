import React, { FC } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import { Pill, PillGroup } from "src/components/blocks";
import { Heading } from "src/components/common";
import { SidebarContainer, SidebarTitle } from "src/components/layouts";

interface ISearchSidebarProps {
  organizedTags: { selected: string[]; available: string[] };
  toggle: (tag: string) => void;
}

// TODO: use some sort of state management solution
export const SearchSidebar: FC<ISearchSidebarProps> = ({ organizedTags, toggle }) => (
  <SidebarContainer>
    <SidebarTitle as="h2" variant="h4">
      Filters
    </SidebarTitle>

    <SidebarTitle as="h3" variant="h5">
      Tags
    </SidebarTitle>

    <Accordion defaultIndex={[0, 1]} allowMultiple w="100%">
      <AccordionItem>
        <Heading.h2 as="h5" fontFamily="body">
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Selected ({organizedTags.selected.length})
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading.h2>
        <AccordionPanel pb={4}>
          {organizedTags.selected.length === 0 ? (
            <Text>None selected, not filtering by tags!</Text>
          ) : (
            <PillGroup mb={4}>
              {organizedTags.selected.map((tag) => (
                <Pill key={tag} selected onClick={() => toggle(tag)}>
                  {tag}
                </Pill>
              ))}
            </PillGroup>
          )}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <Heading.h2 as="h5" fontFamily="body">
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Available ({organizedTags.available.length})
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading.h2>
        <AccordionPanel pb={4}>
          {organizedTags.available.length === 0 ? (
            <Text>All tags seem to be selected!</Text>
          ) : (
            <PillGroup mb={4}>
              {organizedTags.available.map((tag) => (
                <Pill key={tag} onClick={() => toggle(tag)}>
                  {tag}
                </Pill>
              ))}
            </PillGroup>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </SidebarContainer>
);

export default SearchSidebar;
