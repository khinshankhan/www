"use client"

import React, { Children, isValidElement, useState, type ReactNode } from "react"
import { cn, existPredicate } from "@/lib/utils"
import { Button } from "@/components/primitives/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/primitives/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives/dropdown-menu"
import { SvgIcon } from "@/components/primitives/svg-icon"

export function CodeblockSwitcher({ children }: { children: ReactNode }) {
  // @ts-expect-error: fragile but it'll be used lightly so we can account for edge cases later
  const filenames = Children.map(children, (child) => {
    if (!isValidElement(child)) return null
    return child.props["data-filename"] as string
  }).filter(existPredicate)

  const [selectedFilename, setSelectedFilename] = useState(filenames[0])

  return (
    <div className="relative">
      <div className="flex flex-row items-center justify-end">
        <div className="hide-mobile">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Select active file for codeblock."
                variant="secondary"
                className="group w-full pr-1"
              >
                <span>{selectedFilename}</span>
                <SvgIcon id="chevron-down" className="animated-arrow" aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filenames.map((filename) => (
                <DropdownMenuItem
                  key={filename}
                  disabled={filename === selectedFilename}
                  onClick={() => setSelectedFilename(filename)}
                  className="flex justify-between"
                >
                  {filename}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hide-desktop">
          <Drawer shouldScaleBackground>
            <DrawerTrigger asChild>
              <Button
                aria-label="Select active file for codeblock."
                variant="secondary"
                className="group w-full"
              >
                <span>{selectedFilename}</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="text-center sm:text-center">
                  <DrawerTitle>Codeblock Switcher</DrawerTitle>
                  <DrawerDescription>Select active file for codeblock.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <DrawerFooter>
                    {filenames.map((filename) => (
                      <DrawerClose key={filename} asChild>
                        <Button
                          variant="outline"
                          disabled={filename === selectedFilename}
                          onClick={() => setSelectedFilename(filename)}
                          className="flex justify-between"
                        >
                          {filename}
                        </Button>
                      </DrawerClose>
                    ))}
                  </DrawerFooter>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null

        return (
          <div className={cn(child.props["data-filename"] !== selectedFilename && "hidden")}>
            {child}
          </div>
        )
      })}
    </div>
  )
}

export default CodeblockSwitcher
