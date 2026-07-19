"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"
import { cn } from "@/quicksilver/lib/classname"
import { Field } from "@base-ui/react/field"
import { focusRing } from "./focus.variants"
import { Close, Search } from "./icons"
import { Input } from "./input"
import { type InputVariantProps } from "./input.variants"
import { searchFieldVariants, type SearchFieldVariantProps } from "./search-field.variants"

/** Noun for the searched items; drives the placeholder, count, and status copy. */
export interface SearchEntity {
  singular: string
  plural: string
}

interface SearchFieldContextValue {
  entity: SearchEntity
  query: string
  total: number
  matched: number
  isSearching: boolean
  inputId: string
  inputRef: React.RefObject<HTMLInputElement | null>
  setQuery: (value: string) => void
}

const SearchFieldContext = createContext<SearchFieldContextValue | null>(null)

function useSearchField(part: string) {
  const ctx = useContext(SearchFieldContext)
  if (!ctx) {
    throw new Error(`<SearchField.${part}> must be used within <SearchField.Root>`)
  }
  return ctx
}

export interface SearchFieldRootProps {
  entity: SearchEntity
  total: number
  matched: number
  /** Controlled query value. Omit (with defaultValue) for uncontrolled use. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
  children: ReactNode
}

export function SearchFieldRoot({
  entity,
  total,
  matched,
  value,
  defaultValue = "",
  onValueChange,
  className,
  children,
}: SearchFieldRootProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const [uncontrolledQuery, setUncontrolledQuery] = useState(defaultValue)
  const isControlled = value !== undefined
  const query = isControlled ? value : uncontrolledQuery

  const setQuery = useCallback(
    (next: string) => {
      if (!isControlled) {
        setUncontrolledQuery(next)
      }
      onValueChange?.(next)
    },
    [isControlled, onValueChange]
  )

  const isSearching = query.trim() !== ""

  const ctx = useMemo<SearchFieldContextValue>(
    () => ({ entity, query, total, matched, isSearching, inputId, inputRef, setQuery }),
    [entity, query, total, matched, isSearching, inputId, setQuery]
  )

  return (
    <SearchFieldContext.Provider value={ctx}>
      <Field.Root
        render={(props) => <search {...props} />}
        className={cn("flex flex-col gap-6", className)}
      >
        <Field.Label htmlFor={inputId} className="sr-only">
          {`Search ${entity.plural}`}
        </Field.Label>
        {children}
      </Field.Root>
    </SearchFieldContext.Provider>
  )
}

export interface SearchFieldInputProps
  extends SearchFieldVariantProps, Pick<InputVariantProps, "inputSize"> {
  /** Key that focuses the input from anywhere (default "/"). Set to null to disable. */
  shortcutKey?: string | null
  className?: string
  /** Slot rendered at the trailing edge (count, clear, hint). */
  children?: ReactNode
}

export function SearchFieldInput({
  variant,
  inputSize = "lg",
  shortcutKey = "/",
  className,
  children,
}: SearchFieldInputProps) {
  const { entity, query, inputId, inputRef, setQuery } = useSearchField("Input")

  // focus the field on `shortcutKey`, but not while typing elsewhere (never swallow a real key)
  useEffect(() => {
    if (!shortcutKey) {
      return
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== shortcutKey || e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) {
        return
      }
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [shortcutKey, inputRef])

  return (
    <div className={cn(searchFieldVariants({ variant }), className)}>
      <Search
        aria-hidden="true"
        className="size-5 shrink-0 text-foreground-muted transition-colors duration-300 group-focus-within:text-accent-11"
      />
      <Input
        variant="bare"
        inputSize={inputSize}
        id={inputId}
        ref={inputRef}
        type="search"
        value={query}
        onValueChange={(next) => setQuery(next)}
        placeholder={`Search ${entity.plural}...`}
        autoComplete="off"
        spellCheck={false}
        // drops the input's default intrinsic min-width so it can shrink in a flex row
        // (otherwise it overflows on narrow screens, notably in Firefox)
        size={1}
        className="peer flex-1 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {children}
    </div>
  )
}

export function SearchFieldCount({ className }: { className?: string }) {
  const { total, matched, isSearching } = useSearchField("Count")
  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-xs shrink-0 font-mono tabular-nums transition-colors duration-300",
        isSearching && matched > 0 ? "text-accent-11" : "text-foreground-muted",
        className
      )}
    >
      {isSearching ? `${matched}/${total}` : total}
    </span>
  )
}

export function SearchFieldClear({ className }: { className?: string }) {
  const { isSearching, inputRef, setQuery } = useSearchField("Clear")
  if (!isSearching) {
    return null
  }
  return (
    <button
      type="button"
      aria-label="Clear search"
      onClick={() => {
        setQuery("")
        inputRef.current?.focus()
      }}
      className={cn(
        "shrink-0 rounded-md p-1 text-foreground-muted transition-colors duration-200",
        "hover:bg-surface-4 hover:text-accent-11",
        focusRing,
        "focus-visible:text-accent-11",
        className
      )}
    >
      <Close aria-hidden="true" className="size-4" />
    </button>
  )
}

export function SearchFieldShortcutHint({
  label = "/",
  className,
}: {
  label?: string
  className?: string
}) {
  const { isSearching } = useSearchField("ShortcutHint")
  if (isSearching) {
    return null
  }
  return (
    <kbd
      aria-hidden="true"
      className={cn(
        "text-xs hidden shrink-0 rounded border border-solid border-surface-7 px-1.5 py-0.5 font-mono leading-none text-foreground-muted transition-opacity duration-200 select-none peer-focus:opacity-40 sm:inline-block",
        className
      )}
    >
      {label}
    </kbd>
  )
}

export function SearchFieldStatus() {
  const { entity, query, total, matched, isSearching } = useSearchField("Status")
  const trimmed = query.trim()
  const statusText = !isSearching
    ? `${total} ${entity.plural}`
    : matched === 0
      ? `No ${entity.plural} match "${trimmed}"`
      : `${matched} of ${total} ${entity.plural} match "${trimmed}"`
  return (
    <p className="sr-only" aria-live="polite">
      {statusText}
    </p>
  )
}

export function SearchFieldResults({ className, ...props }: ComponentProps<"ul">) {
  const { entity, matched } = useSearchField("Results")
  if (matched === 0) {
    return null
  }
  return (
    <ul
      aria-label={entity.plural.replace(/^\w/, (c) => c.toUpperCase())}
      className={cn("flex flex-col gap-8", className)}
      {...props}
    />
  )
}

/**
 * Why the results are empty:
 * - `no-results`: there are items, but none match the current query.
 * - `no-items`: the collection itself is empty (nothing to search).
 */
export type SearchEmptyReason = "no-results" | "no-items"

export interface SearchEmptyState {
  reason: SearchEmptyReason
  query: string
  total: number
}

export function SearchFieldEmpty({
  className,
  children,
}: {
  className?: string
  /** A node, or a render function that receives the empty state to branch on the reason. */
  children?: ReactNode | ((state: SearchEmptyState) => ReactNode)
}) {
  const { matched, total, query } = useSearchField("Empty")
  if (matched > 0) {
    return null
  }
  const state: SearchEmptyState = {
    reason: total === 0 ? "no-items" : "no-results",
    query: query.trim(),
    total,
  }
  // wrap-anywhere so a long unbroken query echoed here can't push layout wide
  return (
    <div className={cn("wrap-anywhere", className)}>
      {typeof children === "function" ? children(state) : children}
    </div>
  )
}

export const SearchField = {
  Root: SearchFieldRoot,
  Input: SearchFieldInput,
  Count: SearchFieldCount,
  Clear: SearchFieldClear,
  ShortcutHint: SearchFieldShortcutHint,
  Status: SearchFieldStatus,
  Results: SearchFieldResults,
  Empty: SearchFieldEmpty,
}
