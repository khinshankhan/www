import { type ComponentProps, type ReactNode } from "react"
import { cn } from "@/quicksilver/lib/classname"
import { H3, Text } from "./text"

function EmptyStateRoot({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full flex-col items-center gap-6 px-4 py-16 text-center", className)}
      {...props}
    />
  )
}

function EmptyStateIcon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex size-14 items-center justify-center rounded-xl bg-accent-a3 text-accent-11 [&>svg]:size-8",
        className
      )}
    >
      {children}
    </div>
  )
}

function EmptyStateTitle({ className, ...props }: ComponentProps<typeof H3>) {
  return <H3 className={cn("text-foreground", className)} {...props} />
}

function EmptyStateDescription({ className, ...props }: ComponentProps<typeof Text>) {
  return <Text className={cn("text-foreground-muted", className)} {...props} />
}

function EmptyStateActions({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-3", className)} {...props} />
}

export const EmptyState = {
  Root: EmptyStateRoot,
  Icon: EmptyStateIcon,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Actions: EmptyStateActions,
}
