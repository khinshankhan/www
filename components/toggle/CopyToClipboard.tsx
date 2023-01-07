import type { RefObject } from "react";
import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "lib/theme/components";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

interface ICopyToClipboardToggleProps {
  ctx: RefObject<HTMLElement>;
}

export const CopyToClipboardToggle = ({ ctx }: ICopyToClipboardToggleProps) => {
  const [clicked, setClick] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClick(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [clicked, setClick]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 1750);
    return () => clearTimeout(timer);
  }, [clicked, setShowTooltip]);

  async function onClick() {
    // TODO: account for potential errors
    // TODO: account for lack of clipboard api support(?)
    await navigator.clipboard.writeText(ctx.current?.textContent ?? "Failed to copy");
    setClick(true);
    setShowTooltip(true);
  }

  const Icon = clicked ? CheckIcon : CopyIcon;
  const color = clicked ? "$green10" : "$text";
  return (
    <Tooltip content={"Copied!"} disableHoverableContent={false} open={showTooltip} side="left">
      <IconButton
        aria-label={clicked ? "Copied!" : "Click to copy code"}
        onClick={onClick}
        css={{ float: "right", color }}
      >
        <Icon style={{ color: "inherit" }} />
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardToggle;
