import React, { FC, useEffect } from "react";
import {
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Collapse,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Pill, PillGroup } from "src/components/blocks";
import { Heading } from "src/components/common";
import { SidebarContainer, SidebarTitle } from "src/components/layouts";
import { ToggleFilterOptions } from "src/components/toggles";
import { useMobile } from "src/hooks";

interface ISearchSidebarProps {
  organizedTags: { selected: string[]; available: string[] };
  toggle: (tag: string) => void;
}

// TODO: use some sort of state management solution
export const SearchSidebar: FC<ISearchSidebarProps> = ({ organizedTags, toggle }) => {
  const { isMobile } = useMobile();
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure({ defaultIsOpen: !isMobile });

  useEffect(() => {
    if (isMobile) {
      onClose();
    } else {
      onOpen();
    }
  }, [isMobile]);

  return (
    <SidebarContainer>
      <Flex
        borderBottom={{ base: 1, md: 0 }}
        borderStyle="solid"
        borderColor="dividerColor"
        mb={{ base: 5, md: 0 }}
        pb={{ base: 1, md: 0 }}
        w="100%"
      >
        <SidebarTitle as="h2" variant="h4">
          Filters
        </SidebarTitle>
        <Spacer />
        <ToggleFilterOptions mr={1} display={{ md: `none` }} isOpen={isOpen} onClick={onToggle} />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
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
      </Collapse>
    </SidebarContainer>
  );
};

export default SearchSidebar;
