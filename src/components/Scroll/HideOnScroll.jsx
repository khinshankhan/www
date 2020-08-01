import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

const Hideonscroll = ({ children }) => {
  const trigger = useScrollTrigger({ threshold: 100 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default Hideonscroll;
