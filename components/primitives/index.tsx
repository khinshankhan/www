import React from "react";
import { cn } from "@/lib/utils";

export function Divider({
  text,
  lineClassName = "",
}: {
  text?: string;
  lineClassName?: string;
}) {
  return (
    <div role="separator" className="relative">
      <div
        className={cn(
          "w-full h-px mx-auto bg-gradient-to-r from-slate-950/0 via-slate-950/30 to-slate-950/0 dark:from-white/0 dark:via-white/30 dark:to-white/0",
          lineClassName,
        )}
      ></div>

      {text && (
        <div className="flex justify-center -translate-y-3">
          <div className="px-2 bg-white dark:bg-slate-950">
            <span className="text-xs uppercase transform">{text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
