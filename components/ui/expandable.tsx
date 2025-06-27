import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const expandableVariants = cva("text-xs rounded-lg border-1 p-1", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      blueCharcoal:
        "bg-blue-charcoal-400 text-gray-200 border-2 border-blue-charcoal-200",
      blue: "bg-blue-100 text-blue-900 border-2 border-blue-200",
      green: "bg-green-100 text-green-900 border-2 border-green-200",
      yellow: "bg-yellow-100 text-yellow-900 border-2 border-yellow-200",
      red: "bg-red-100 text-red-900 border-2 border-red-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const expandableContentVariants = cva(
  "text-xs rounded-lg border-1 p-1 font-bold",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        blueCharcoal:
          "bg-blue-charcoal-500 text-gray-200 border-blue-charcoal-100",
        blue: "bg-blue-500 text-blue-900 border-blue-100",
        green: "bg-green-500 text-green-900 border-green-100",
        yellow: "bg-yellow-500 text-yellow-900 border-yellow-100",
        red: "bg-red-500 text-red-900 border-red-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ExpandableProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof expandableVariants> {
  asChild?: boolean;
  title: string;
  children: React.ReactNode;
}

export interface ExpandableControlProps {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface ExpandableContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof expandableContentVariants> {
  children: React.ReactNode;
  asChild?: boolean;
}

const ExpandableControl = React.forwardRef<
  HTMLDivElement,
  ExpandableControlProps
>(({ title, open, setOpen }, ref) => {
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => setOpen(!open)}
      ref={ref}
    >
      <div className="flex h-5 w-5 items-center justify-center">
        {open ? (
          <ChevronDown className="h-3 w-3 text-primary" />
        ) : (
          <ChevronRight className="h-3 w-3 text-primary" />
        )}
      </div>
      <p className="text-xs">{title}</p>
    </div>
  );
});

const ExpandableContent = React.forwardRef<
  HTMLDivElement,
  ExpandableContentProps
>(({ children, className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn([expandableContentVariants({ variant, className })])}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
});
ExpandableContent.displayName = "ExpandableContent";

const Expandable = React.forwardRef<HTMLDivElement, ExpandableProps>(
  ({ title, children, className, variant, asChild = false, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn([expandableVariants({ variant, className })])}
        ref={ref}
        {...props}
      >
        <ExpandableControl title={title} open={open} setOpen={setOpen} />
        {open && children}
      </Comp>
    );
  }
);
Expandable.displayName = "Expandable";

export { Expandable, ExpandableContent, expandableVariants };
