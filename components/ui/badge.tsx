import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ink-900 text-white",
        brand: "border-brand-200 bg-brand-50 text-brand-700",
        accent: "border-accent-400/30 bg-accent-400/10 text-accent-600",
        outline: "border-ink-200 bg-white text-ink-600",
        glass:
          "border-white/15 bg-white/[0.06] text-white uppercase tracking-wide backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
