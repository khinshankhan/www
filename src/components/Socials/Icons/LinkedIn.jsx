import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import SocialIcon from "../SocialIcon";

const LinkedIn = ({ link }) => {
  return (
    <SocialIcon link={link}>
      <LinkedInIcon />
    </SocialIcon>
  );
};

export default LinkedIn;
