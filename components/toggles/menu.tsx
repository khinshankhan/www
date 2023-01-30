import React from "react";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { IconButton } from "components/primitives";

interface IMenuToggleProps {
  className?: string;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const MenuToggle = ({ className = "", isOpen, onClick = () => {} }: IMenuToggleProps) => {
  const MenuIcon = isOpen ? Cross1Icon : HamburgerMenuIcon;
  const action = isOpen ? "Close" : "Open";

  return (
    <IconButton className={className} aria-label={`${action} navigation menu`} onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
};

export default MenuToggle;
