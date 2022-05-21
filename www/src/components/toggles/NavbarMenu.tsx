import React, { FC } from "react";
import { IconButtonProps, IconButton } from "@chakra-ui/react";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import { GiHamburgerMenu as Hamburger } from "react-icons/gi";

interface IToggleNavbarMenuProps extends Omit<IconButtonProps, "aria-label"> {
  "aria-label"?: string;
  fontSize?: string;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const ToggleNavbarMenu: FC<IToggleNavbarMenuProps> = ({
  fontSize = `1.563rem`,
  isOpen = false,
  onClick = undefined,
  "aria-label": ariaLabel = `Toggle Navigation`,
  ...props
}) => {
  const MenuIcon = isOpen ? CloseIcon : Hamburger;

  return (
    <IconButton
      onClick={onClick}
      variant="ghost"
      icon={<MenuIcon fontSize={fontSize} />}
      {...props}
      aria-label={ariaLabel}
    />
  );
};

export default ToggleNavbarMenu;
