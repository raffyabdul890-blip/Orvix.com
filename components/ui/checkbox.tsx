import * as React from "react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        "mt-0.5 size-4 shrink-0 cursor-pointer rounded border-ink-200 accent-brand-600 focus-visible:ring-2 focus-visible:ring-brand-400",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };
