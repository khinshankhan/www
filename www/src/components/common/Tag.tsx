import React, { MouseEvent, useState } from "react";
import { ButtonProps, Button, FlexProps, Flex } from "@chakra-ui/react";

export type TagHandler = (tag: string, event: MouseEvent<HTMLButtonElement>) => void;

export type ITagProps = ButtonProps & {
  tag: string;
  handler?: TagHandler;
};

export const Tag = ({ tag, handler = () => {}, ...props }: ITagProps) => {
  // TODO: get back to active state for a tag
  const [active, setActive] = useState(false);
  const toggle = () => setActive((p) => !p);
  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    handler(tag, event);
    toggle();
  };

  return (
    // TODO: use better bgColor once more of the site is figured out
    <Button variant="tag" isActive={active} mt="2" mb="2" onClick={onClick} {...props}>
      {tag}
    </Button>
  );
};

export type ITagListProps = FlexProps & {
  tags: string[];
  tagProps?: ITagProps | {};
};

export const TagList = ({ tags, tagProps = {}, ...props }: ITagListProps) => (
  <Flex flexWrap="wrap" columnGap={2} rowGap={0} {...props}>
    {tags.map((tag) => (
      <Tag key={tag} tag={tag} {...tagProps} />
    ))}
  </Flex>
);

export default Tag;
