"use client"

import React, {
  Children,
  Dispatch,
  isValidElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { useIsomorphicEffect } from "hooks/media"
import { cn, existPredicate } from "@/lib/utils"
import * as Portal from "@radix-ui/react-portal"
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

interface SwitcherProps {
  value: string
  options: string[]
  setValue: Dispatch<SetStateAction<string>>
}

function Switcher({ value, options, setValue }: SwitcherProps) {
  const [visible, setVisible] = useState(true)

  const setNewValue = (newValue: string) => {
    setVisible(false)
    setValue(newValue)
  }

  useEffect(() => {
    setVisible(true)
  }, [value])

  if (!visible) {
    return null
  }

  return (
    <div className="flex flex-row items-center justify-end">
      <div className="hide-mobile">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Select active file for codeblock."
              variant="ghost-contrast"
              className="group w-full pr-1"
            >
              <span>{value}</span>
              <SvgIcon id="chevron-down" className="animated-arrow size-5" aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {options.map((filename) => (
              <DropdownMenuItem
                key={filename}
                disabled={filename === value}
                onClick={() => setNewValue(filename)}
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
              variant="ghost-contrast"
              className="group w-full pr-1"
            >
              <span>{value}</span>
              <SvgIcon id="chevron-down" className="animated-arrow size-5" aria-hidden />
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
                  {options.map((filename) => (
                    <DrawerClose key={filename} asChild>
                      <Button
                        variant="outline"
                        disabled={filename === value}
                        onClick={() => setNewValue(filename)}
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
  )
}

interface CodeblockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  currentFilename: string
  filenames: string[]
  selectedFilename: string
  setSelectedFilename: Dispatch<SetStateAction<string>>
}

function CodeblockWrapper({
  currentFilename,
  filenames,
  selectedFilename,
  setSelectedFilename,
  ...props
}: CodeblockWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [switcher, setSwitcher] = useState<Element | null>()

  useIsomorphicEffect(() => {
    if (!ref.current) return
    const switchers = Array.from(ref.current.querySelectorAll("[data-switcher]"))
    if (switchers.length !== 1) return

    setSwitcher(switchers[0])
  }, [])

  return (
    <div className={cn(currentFilename !== selectedFilename && "hidden")}>
      {switcher && (
        <Portal.Root container={switcher}>
          <Switcher value={selectedFilename} options={filenames} setValue={setSelectedFilename} />
        </Portal.Root>
      )}
      <div ref={ref} {...props} />
    </div>
  )
}

export function CodeblockSwitcher({ children }: { children: ReactNode }) {
  // @ts-expect-error: fragile but it'll be used lightly so we can account for edge cases later
  const filenames = Children.map(children, (child) => {
    if (!isValidElement(child)) return null
    return child.props["data-filename"] as string
  }).filter(existPredicate)

  const [selectedFilename, setSelectedFilename] = useState(filenames[0])

  return (
    <div className="relative">
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return null

        return (
          <CodeblockWrapper
            currentFilename={child.props["data-filename"] as string}
            filenames={filenames}
            selectedFilename={selectedFilename}
            setSelectedFilename={setSelectedFilename}
          >
            {child}
          </CodeblockWrapper>
        )
      })}
    </div>
  )
}

export default CodeblockSwitcher
