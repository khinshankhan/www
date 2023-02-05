import { useState, useEffect } from "react";
import { theme } from "lib/theme";
import { IconButton, Tooltip } from "components/primitives";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

interface ICopyToClipboardToggleProps {
  text: string;
}

export const CopyToClipboardToggle = ({ text }: ICopyToClipboardToggleProps) => {
  const [count, setCount] = useState(0);
  const [clicked, setClick] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClick(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, clicked, setClick]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 850);
    return () => clearTimeout(timer);
  }, [count, clicked, setShowTooltip]);

  async function onClick() {
    // TODO: account for potential errors
    // TODO: account for lack of clipboard api support(?)
    await navigator.clipboard.writeText(text);
    setClick(true);
    setShowTooltip(true);
    setCount((c) => c + 1);
  }

  const Icon = clicked ? CheckIcon : CopyIcon;
  const color = clicked ? theme.colors.success10 : theme.colors.placeholder;
  return (
    <Tooltip content={"Copied!"} disableHoverableContent={false} open={showTooltip} side="left">
      <IconButton
        aria-label={clicked ? "Copied!" : "Click to copy code"}
        onClick={onClick}
        css={{ color }}
      >
        <Icon style={{ color: "inherit" }} />
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardToggle;
