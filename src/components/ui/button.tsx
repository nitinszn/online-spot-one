import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium backdrop-blur-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary/20 text-primary-foreground border border-primary/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:bg-primary/30 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive/20 text-destructive-foreground border border-destructive/30 shadow-[0_8px_32px_0_rgba(239,68,68,0.15)] hover:bg-destructive/30 hover:shadow-[0_8px_32px_0_rgba(239,68,68,0.25)] hover:scale-[1.02] active:scale-[0.98]",
        outline: "bg-background/40 border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:bg-accent/30 hover:text-accent-foreground hover:border-accent/40 hover:scale-[1.02] active:scale-[0.98]",
        secondary: "bg-secondary/30 text-secondary-foreground border border-secondary/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:bg-secondary/40 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] hover:scale-[1.02] active:scale-[0.98]",
        ghost: "bg-background/10 hover:bg-accent/20 hover:text-accent-foreground border border-transparent hover:border-accent/20 hover:scale-[1.02] active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline backdrop-blur-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
