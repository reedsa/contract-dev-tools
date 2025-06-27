import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "./button";

const panelHeaderVariants = cva("", {
  variants: {
    variant: {
      default: "flex flex-col",
      inline: "flex flex-row items-center justify-between",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const panelTitleVariants = cva("text-lg font-bold m-1 mb-2 text-gray-200", {
  variants: {
    variant: {
      default: "",
    },
  },
});

const panelVariants = cva("flex flex-col", {
  variants: {
    variant: {
      default: "flex flex-col w-100 rounded-lg p-1",
      sidebar: "flex flex-col border-r-1 w-70 p-1",
    },
    theme: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      blueCharcoal:
        "bg-blue-charcoal-700 border-blue-charcoal-100 outline-blue-charcoal-600 text-blue-charcoal-100",
      blue: "bg-blue-600 border-blue-200 outline-blue-600 text-blue-100",
      green: "bg-green-600 border-green-200 outline-green-600 text-green-100",
      yellow:
        "bg-yellow-600 border-yellow-200 outline-yellow-600 text-yellow-100",
      red: "bg-red-600 border-red-200 outline-red-600 text-red-100",
    },
  },
  defaultVariants: {
    variant: "default",
    theme: "default",
  },
});

const panelActionsVariants = cva("flex flex-row items-center space-x-1", {
  variants: {
    variant: {
      default: "",
      inline: "float-end",
    },
    theme: {
      default: "",
      blueCharcoal: "",
      blue: "",
      green: "",
      yellow: "",
      red: "",
    },
  },
});

const panelActionVariants = cva("flex flex-row mb-1", {
  variants: {
    variant: {
      default: "",
      right: "",
    },
    theme: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      blueCharcoal:
        "bg-blue-charcoal-400 text-gray-400 hover:bg-blue-charcoal-200 hover:text-gray-100",
      blue: "bg-blue-600 text-blue-100 hover:bg-blue-300 hover:text-blue-600",
      green:
        "bg-green-600 text-green-100 hover:bg-green-300 hover:text-green-600",
      yellow:
        "bg-yellow-600 text-yellow-100 hover:bg-yellow-300 hover:text-yellow-600",
      red: "bg-red-600 text-red-100 hover:bg-red-300 hover:text-red-600",
    },
  },
  defaultVariants: {
    variant: "default",
    theme: "default",
  },
});

const panelContentVariants = cva("flex flex-col rounded-lg", {
  variants: {
    variant: {
      default: "",
    },
    theme: {
      default: "bg-primary text-primary-foreground",
      blueCharcoal: "bg-blue-charcoal-600 text-blue-charcoal-100",
      blue: "bg-blue-700 text-blue-100",
      green: "bg-green-700 text-green-100",
      yellow: "bg-yellow-700 text-yellow-100",
      red: "bg-red-700 text-red-100",
    },
  },
});

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  asChild?: boolean;
  title?: string;
  children: React.ReactNode;
}

export interface PanelActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelActionsVariants> {
  children: React.ReactNode;
}

export interface PanelActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof panelActionVariants> {
  children: React.ReactNode;
}

export interface PanelContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelContentVariants> {
  children: React.ReactNode;
}

export interface PanelTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelTitleVariants> {
  title: string;
}

export interface PanelHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelHeaderVariants> {
  children: React.ReactNode;
}

const PanelHeader = React.forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ children, className, variant }, ref) => {
    return (
      <div
        className={cn([panelHeaderVariants({ variant, className })])}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const PanelTitle = React.forwardRef<HTMLDivElement, PanelTitleProps>(
  ({ title, className }, ref) => {
    return (
      <p className={cn([panelTitleVariants({ className })])} ref={ref}>
        {title}
      </p>
    );
  }
);

const PanelActions = React.forwardRef<HTMLDivElement, PanelActionsProps>(
  ({ children, className, variant, theme }, ref) => {
    return (
      <div
        className={cn([panelActionsVariants({ variant, theme, className })])}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const PanelAction = React.forwardRef<HTMLDivElement, PanelActionProps>(
  ({ children, variant, theme, className }, ref) => {
    return (
      <div ref={ref}>
        <Button
          variant="ghost"
          color="blue"
          size="sm"
          className={cn([panelActionVariants({ variant, theme, className })])}
        >
          {children}
        </Button>
      </div>
    );
  }
);

const PanelContent = React.forwardRef<HTMLDivElement, PanelContentProps>(
  ({ children, className, theme }, ref) => {
    return (
      <div
        className={cn([panelContentVariants({ theme, className })])}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    { title, children, className, variant, theme, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn([panelVariants({ variant, theme, className })])}
        ref={ref}
        {...props}
      >
        {title && <p className="text-md font-bold">{title}</p>}
        {children}
      </Comp>
    );
  }
);
Panel.displayName = "Panel";

export {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelActions,
  PanelAction,
  PanelContent,
  panelVariants,
};
