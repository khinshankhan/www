import React, { FC } from "react";
import { IconButtonProps, IconButton } from "@chakra-ui/react";
import { Cross, Hamburger } from "components/icons";

interface IToggleNavbarMenuProps extends Omit<IconButtonProps, "aria-label"> {
  "aria-label"?: string;
  fontSize?: number;
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const ToggleNavbarMenu: FC<IToggleNavbarMenuProps> = ({
  fontSize = 24,
  isOpen = false,
  onClick = undefined,
  "aria-label": ariaLabel = `Toggle Navigation`,
  ...props
}) => {
  const MenuIcon = isOpen ? Cross : Hamburger;

  return (
    <IconButton
      onClick={onClick}
      variant="ghost"
      color="bgContrast"
      icon={<MenuIcon size={fontSize} />}
      {...props}
      aria-label={ariaLabel}
    />
  );
};

export default ToggleNavbarMenu;
