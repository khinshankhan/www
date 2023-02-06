import type { FCC } from "types/react";
import type { ReactNode } from "react";
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { styled, keyframes, theme } from "lib/theme";
import { Cross2Icon } from "@radix-ui/react-icons";
import { IconButton } from "./icon-button";

interface ISimplePopoverProps {
  trigger: ReactNode;
}
export const SimplePopover: FCC<ISimplePopoverProps> = ({ trigger, children }) => (
  <Popover.Root>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      <PopoverContent sideOffset={5}>
        {children}
        <IconButton as={PopoverClose} aria-label="Close">
          <Cross2Icon />
        </IconButton>
        <PopoverArrow />
      </PopoverContent>
    </Popover.Portal>
  </Popover.Root>
);

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const PopoverContent = styled(Popover.Content, {
  borderRadius: 4,
  padding: 20,
  paddingTop: 35,
  backgroundColor: theme.colors.ghostOpaqueBg,
  boxShadow: "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${theme.colors.violet7}`,
  },
});

const PopoverArrow = styled(Popover.Arrow, {
  fill: theme.colors.ghostOpaqueBg,
});

const PopoverClose = styled(Popover.Close, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 5,
  right: 5,
});
