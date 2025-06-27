import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const panelListVariants = cva("flex flex-col space-y-2 rounded-lg p-1 w-full", {
  variants: {
    variant: {
      default: "",
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

const panelListItemVariants = cva("rounded-lg p-2 cursor-pointer", {
  variants: {
    variant: {
      default: "",
    },
    theme: {
      default: "",
      blueCharcoal:
        "text-gray-300 hover:bg-blue-charcoal-400 hover:text-gray-100",
      blue: "text-blue-200 hover:bg-blue-600 hover:text-white",
      green: "text-green-200 hover:bg-green-600 hover:text-white",
      yellow: "text-yellow-200 hover:bg-yellow-600 hover:text-white",
      red: "text-red-200 hover:bg-red-600 hover:text-white",
    },
  },
});

export interface PanelListItem {
  id: string;
  text: string;
}

export interface PanelListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelListVariants> {
  items: PanelListItem[];
  icon?: React.ReactNode;
  handleClick?: (id: string) => void;
}

export interface PanelListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelListItemVariants> {
  children: React.ReactNode;
  id: string;
}

const PanelList = React.forwardRef<HTMLDivElement, PanelListProps>(
  ({ className, items, icon, handleClick }, ref) => {
    return (
      <div className={cn([panelListVariants({ className })])} ref={ref}>
        {items.map((item) => (
          <PanelListItem theme="blueCharcoal" key={item.id} id={item.id}>
            <div
              className="flex flex-row items-center space-x-2"
              onClick={() => handleClick && handleClick(item.id)}
            >
              {icon}
              <p className="text-xs">{item.text}</p>
            </div>
          </PanelListItem>
        ))}
      </div>
    );
  }
);

const PanelListItem = React.forwardRef<HTMLDivElement, PanelListItemProps>(
  ({ children, className, theme }, ref) => {
    return (
      <div
        className={cn([panelListItemVariants({ theme, className })])}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export { PanelList, panelListVariants };
