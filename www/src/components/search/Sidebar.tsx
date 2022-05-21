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
  tags: { [key: string]: boolean };
  toggle: (tag: string) => void;
}

// TODO: use some sort of state management solution
export const SearchSidebar: FC<ISearchSidebarProps> = ({ tags, toggle }) => {
  const organizedTags = Object.entries(tags).reduce(
    (stored, [tag, status]) => {
      const active = [...stored.active];
      const available = [...stored.available];
      if (status) {
        active.push(tag);
      } else {
        available.push(tag);
      }
      return {
        active,
        available,
      };
    },
    { active: [] as string[], available: [] as string[] }
  );

  return (
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
                Selected ({organizedTags.active.length})
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading.h2>
          <AccordionPanel pb={4}>
            {organizedTags.active.length === 0 ? (
              <Text>None selected, showing all posts!</Text>
            ) : (
              <PillGroup mb={4}>
                {organizedTags.active.map((tag) => (
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
};

export default SearchSidebar;
