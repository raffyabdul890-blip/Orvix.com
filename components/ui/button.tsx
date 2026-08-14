import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:hover:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-ink-900 text-white shadow-sm hover:scale-[1.02] hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-600/25 active:scale-[0.98]",
        brand:
          "btn-shimmer text-white shadow-sm shadow-brand-600/30 hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-600/50 hover:brightness-110 active:scale-[0.98]",
        outline:
          "border border-ink-200 bg-white text-ink-900 hover:scale-[1.02] hover:border-brand-400 hover:text-brand-700 hover:shadow-md active:scale-[0.98]",
        secondary:
          "bg-ink-100 text-ink-900 hover:scale-[1.02] hover:bg-ink-200 active:scale-[0.98]",
        ghost: "text-ink-900 hover:scale-[1.02] hover:bg-ink-100 active:scale-[0.98]",
        link: "text-brand-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-5",
        sm: "h-9 rounded-full px-4 text-sm has-[>svg]:px-3.5",
        lg: "h-13 rounded-full px-8 text-base has-[>svg]:px-7",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
