import React from "react";
import type { Computed } from "lib/contentlayer";
import { scrollToElement } from "lib/utils/scroll";

export const getHeadingsInfo = (headingsProp: Computed["headings"]) => {
  // determine smallest heading, since headings go 1-6, 7 should be out of range
  const minLevel =
    headingsProp.length === 0
      ? 0
      : headingsProp.reduce((min, { level }) => Math.min(min, level), 7);

  // add excerpt to allow for a better 'default' intersection
  const headings = [{ id: "excerpt", level: minLevel, content: "Introduction" }, ...headingsProp];

  const maxHeight = headings
    .map((heading) => {
      // account for left padding causing less characters per line
      const paddedContent = heading.content.length + (heading.level - minLevel);
      const lines = Math.floor(paddedContent / 18) + 1;
      return lines * 35;
    })
    .reduce((a, b) => a + b, 0);

  return { minLevel, headings, maxHeight };
};

export const scrollToHeading = (event: React.MouseEvent<HTMLButtonElement>) => {
  const id = event.currentTarget.dataset.id;
  if (!id) return; // too lazy to do type assertion
  // TODO: might be sweet to toast 'successfully scroll to <content>'
  scrollToElement(`[id="${id}"]`);
};
