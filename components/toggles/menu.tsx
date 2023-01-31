import { ReactNode } from "react";
import React from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { IconButton } from "components/primitives";

interface IMenuToggleProps {
  className?: string;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  OpenIcon?: ReactNode;
  ClosedIcon?: ReactNode;
}
export const MenuToggle = ({
  className = "",
  isOpen,
  onClick = () => {},
  OpenIcon: OpenIconProp = null,
  ClosedIcon: ClosedIconProp = null,
}: IMenuToggleProps) => {
  const OpenIcon = !!OpenIconProp ? OpenIconProp : <HamburgerMenuIcon />;
  const ClosedIcon = !!ClosedIconProp ? ClosedIconProp : <Cross1Icon />;

  const MenuIcon = isOpen ? ClosedIcon : OpenIcon;
  const action = isOpen ? "Close" : "Open";

  return (
    <IconButton className={className} aria-label={`${action} navigation menu`} onClick={onClick}>
      {MenuIcon}
    </IconButton>
  );
};

export default MenuToggle;
