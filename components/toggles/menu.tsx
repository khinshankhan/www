import React from "react";
import { CSS } from "lib/theme";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { IconButton } from "components/primitives";

export interface IMenuToggleProps {
  className?: string;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  css?: CSS;
}
export const MenuToggle = ({
  className = "",
  isOpen,
  onClick = () => {},
  ...props
}: IMenuToggleProps) => {
  const MenuIcon = isOpen ? Cross1Icon : HamburgerMenuIcon;
  const action = isOpen ? "Close" : "Open";

  return (
    <IconButton
      className={className}
      aria-label={`${action} navigation menu`}
      onClick={onClick}
      {...props}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default MenuToggle;
