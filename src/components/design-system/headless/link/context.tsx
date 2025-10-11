"use client"

import React from "react"
import { type LinkLikeComponent } from "./types"

interface LinkContextProps {
  ExternalComponent: LinkLikeComponent
  InternalComponent: LinkLikeComponent
  HashComponent: LinkLikeComponent
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
  HashComponent = "a",
  MailtoComponent = "a",
  TelComponent = "a",
}: LinkProviderProps) => {
  return (
    <LinkContext.Provider
      value={{
        ExternalComponent,
        InternalComponent,
        HashComponent,
        MailtoComponent,
        TelComponent,
      }}
    >
      {children}
    </LinkContext.Provider>
  )
}
