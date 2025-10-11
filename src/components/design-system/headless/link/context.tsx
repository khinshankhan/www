"use client"

import React from "react"

export type LinkProps = React.ComponentProps<"a">

export type LinkLikeComponent =
  | "a"
  | React.ComponentType<LinkProps>
  | React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>

interface LinkContextProps {
  ExternalComponent: LinkLikeComponent
  InternalComponent: LinkLikeComponent
  AnchorComponent: LinkLikeComponent
  MailtoComponent: LinkLikeComponent
  TelComponent: LinkLikeComponent
}

const LinkContext = React.createContext<LinkContextProps | undefined>(undefined)

export const useLinkContext = () => {
  const ctx = React.useContext(LinkContext)
  if (!ctx) {
    throw new Error("useLinkContext must be used within a LinkProvider")
  }
  return ctx
}

interface LinkProviderProps extends Partial<LinkContextProps> {
  children: React.ReactNode
}

export const LinkProvider = ({
  children,
  ExternalComponent = "a",
  InternalComponent = "a",
  AnchorComponent = "a",
  MailtoComponent = "a",
  TelComponent = "a",
}: LinkProviderProps) => {
  return (
    <LinkContext.Provider
      value={{
        ExternalComponent,
        InternalComponent,
        AnchorComponent,
        MailtoComponent,
        TelComponent,
      }}
    >
      {children}
    </LinkContext.Provider>
  )
}
