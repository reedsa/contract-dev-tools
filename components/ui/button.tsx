import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-black/5 hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      theme: {
        blue: "bg-blue-100 text-blue-900 border-1 border-blue-500 hover:bg-blue-200 text-blue-600 hover:text-blue-900",
        green:
          "bg-green-100 text-green-900 border-2 border-green-500 hover:bg-green-200 text-green-600 hover:text-green-900",
        yellow:
          "bg-yellow-100 text-yellow-900 border-2 border-yellow-500 hover:bg-yellow-200 text-yellow-600 hover:text-yellow-900",
        red: "bg-red-100 text-red-900 border-2 border-red-500 hover:bg-red-200 text-red-600 hover:text-red-900",
      },
      shape: {
        default: "rounded-md",
        rounded: "rounded-full",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-3 w-3 text-xs",
        sm: "h-6 w-6",
        md: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, theme, shape, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn([
          buttonVariants({ variant, theme, shape, size, className }),
          "cursor-pointer",
        ])}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
