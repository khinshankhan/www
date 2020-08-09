import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

const Hideonscroll = ({ children, threshold = 100 }) => {
  const trigger = useScrollTrigger({ threshold });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default Hideonscroll;
