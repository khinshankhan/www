import React from "react";
import DiscordIcon from "../CustomIcons/Discord";
import SocialIcon from "../SocialIcon";

const Discord = ({ link }) => {
  return (
    <SocialIcon link={link}>
      <DiscordIcon />
    </SocialIcon>
  );
};

export default Discord;
