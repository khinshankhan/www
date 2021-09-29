import React, { ReactNode, useState } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import Logo from "src/assets/logo";
import { GiHamburgerMenu as Hamburger } from "react-icons/gi";
import { AiOutlineClose as Close } from "react-icons/ai";

interface IMobileProps {
  children?: ReactNode;
}

const Mobile = ({ children }: IMobileProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <header>
      <Flex align="center" justify="space-between" pt="4" pb="4" mt="4" mb="5">
        <Logo />
        <IconButton
          aria-label={`${open ? `Close` : `Open`} navigation`}
          variant="ghost"
          icon={
            open ? <Close fontSize="2rem" /> : <Hamburger fontSize="2rem" />
          }
          onClick={toggleOpen}
        />
      </Flex>
      <Flex
        as="nav"
        sx={{ height: `87vh` }}
        display={open ? `flex` : `none`}
        align="center"
        justify="center"
      >
        {children}
      </Flex>
    </header>
  );
};

export default Mobile;
