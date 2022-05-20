import React, { FC } from "react";
import { Pill, PillGroup } from "src/components/blocks";
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

    <SidebarTitle as="h4" variant="h6">
      Selected
    </SidebarTitle>
    <PillGroup mb={4}>
      {selectedTags.map((tag) => (
        <Pill key={tag} selected>
          {tag}
        </Pill>
      ))}
    </PillGroup>

    <SidebarTitle as="h4" variant="h6">
      Available
    </SidebarTitle>
    <PillGroup mb={4}>
      {availableTags.map((tag) => (
        <Pill key={tag} selected={false}>
          {tag}
        </Pill>
      ))}
    </PillGroup>
  </SidebarContainer>
);

export default SearchSidebar;
