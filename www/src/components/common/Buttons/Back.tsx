import React from "react";
import type { FC, ReactNode } from "react";
import { MdArrowBack } from "react-icons/md";
import type { IHeadingAnchorProps } from "../Heading/AnchorHeadings";
import { AnchorHeadings } from "../Heading/AnchorHeadings";

export interface IBackButtonProps extends IHeadingAnchorProps {
  children: ReactNode;
}

export const BackButton: FC<IBackButtonProps> = ({ children, ...props }) => (
  <AnchorHeadings.h4 as="span" icon={MdArrowBack} iconBefore {...props}>
    {children}
  </AnchorHeadings.h4>
);

export default BackButton;
