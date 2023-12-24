import React from "react";
import { cn } from "@/lib/utils";

export function Divider({
  text,
  gradient = "from-zinc-950/0 via-zinc-950/30 to-zinc-950/0 dark:from-white/0 dark:via-white/30 dark:to-white/0",
  width = "w-full",
  className = "",
  bg = "bg-white dark:bg-zinc-950",
  textColor = "",
}: {
  text?: React.ReactNode;
  gradient?: string;
  width?: string;
  className?: string;
  bg?: string;
  textColor?: string;
}) {
  return (
    <div role="separator" className="relative">
      <div
        className={cn(
          "h-px mx-auto bg-gradient-to-r",
          gradient,
          width,
          className,
        )}
      ></div>

      {text && (
        <div className="flex justify-center -translate-y-3">
          <div className={cn("px-2", bg)}>
            <span className={cn("text-xs uppercase transform", textColor)}>
              {text}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
