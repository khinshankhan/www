// Based off https://github.com/radix-ui/design-system/blob/master/components/Tooltip.tsx
import React from "react";
import { styled } from "../stitches.config";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Box } from "./Box";

type TooltipPrimitiveProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
type TooltipProps = TooltipPrimitiveProps &
  React.ComponentProps<typeof TooltipPrimitive.Content> & {
    children: React.ReactElement;
    content: React.ReactNode;
    multiline?: boolean;
  };

const StyledContent = styled(TooltipPrimitive.Content, {
  backgroundColor: "$iconBg",
  borderRadius: "4px",
  padding: "5px 10px",

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        pb: 7,
      },
    },
  },
});

export function Tooltip({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration = 100,
  disableHoverableContent,
  multiline,
  ...props
}: TooltipProps) {
  const rootProps = { open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent };
  return (
    <TooltipPrimitive.Root {...rootProps}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <StyledContent
          className="small"
          side="top"
          align="center"
          sideOffset={5}
          {...props}
          multiline={multiline}
        >
          <p>{content}</p>
          <Box css={{ color: "$iconBg" }}>
            <TooltipPrimitive.Arrow width={11} height={5} style={{ fill: "currentColor" }} />
          </Box>
        </StyledContent>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export default Tooltip;
