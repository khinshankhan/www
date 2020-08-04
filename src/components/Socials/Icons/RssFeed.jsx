import React from "react";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import SocialIcon from "../SocialIcon";

const RssFeed = ({ link }) => {
  return (
    <SocialIcon link={link}>
      <RssFeedIcon />
    </SocialIcon>
  );
};

export default RssFeed;
