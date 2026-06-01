"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-[#22C55E] focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-[#22C55E] text-[#0A0A0A] hover:bg-[#16A34A] active:scale-95 shadow-lg shadow-[#22C55E]/25 hover:shadow-[#22C55E]/40":
              variant === "primary",
            "bg-[#0F1E3D] text-[#E8E8ED] border border-white/10 hover:border-[#22C55E]/40 hover:bg-[#22C55E]/10":
              variant === "secondary",
            "border border-[#22C55E]/50 text-[#22C55E] hover:bg-[#22C55E] hover:text-[#0A0A0A] bg-transparent":
              variant === "outline",
            "text-[#E8E8ED] hover:text-[#22C55E] bg-transparent": variant === "ghost",
          },
          {
            "text-xs px-4 py-2": size === "sm",
            "text-sm px-6 py-3": size === "md",
            "text-base px-8 py-4": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
