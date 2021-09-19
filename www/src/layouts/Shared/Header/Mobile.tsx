import React, { ReactNode, useState } from "react";
import { chakra, Flex, IconButton } from "@chakra-ui/react";
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
    <nav>
      <Flex align="center" justify="space-between" p="4" m="4" mb="5">
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
      <Flex display={open ? `flex` : `none`} align="center" justify="center">
        <chakra.div sx={{ height: `87vh` }}>{children}</chakra.div>
      </Flex>
    </nav>
  );
};

export default Mobile;
