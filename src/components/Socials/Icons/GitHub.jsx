import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import SocialIcon from "../SocialIcon";

const GitHub = ({ link }) => {
  return (
    <SocialIcon link={link}>
      <GitHubIcon />
    </SocialIcon>
  );
};

export default GitHub;
