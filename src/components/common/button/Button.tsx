import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "glass" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(
          // Base
          "inline-flex items-center justify-center rounded-xl",
          "font-semibold transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50",
          "disabled:pointer-events-none disabled:opacity-50",

          // Sizes
          {
            "h-9 px-3 text-sm": size === "sm",
            "h-10 px-5 text-sm": size === "md",
            "h-12 px-7 text-base": size === "lg",
          },

          // Variants
          {
            // Water Gradient
            "bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/25 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/40":
              variant === "primary",

            // Glass
            "border border-white/15 bg-white/10 text-white backdrop-blur-xl hover:border-white/25 hover:bg-white/15":
              variant === "glass",

            // Glass Outline
            "border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 backdrop-blur-xl hover:border-cyan-400/60 hover:bg-cyan-400/10":
              variant === "outline",

            // Ghost
            "bg-transparent text-white/75 hover:bg-white/10 hover:text-white":
              variant === "ghost",
          },

          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;