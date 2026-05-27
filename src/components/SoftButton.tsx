import React from "react";

interface SoftButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  [key: string]: any;
}

export default function SoftButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  href,
  ...rest
}: SoftButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#9F6C3E] text-white hover:bg-[#8B5A30] focus-visible:ring-[#9F6C3E]",
    secondary:
      "bg-[#F3EAE4] text-[#664226] hover:bg-[#E9DFDA] focus-visible:ring-[#B89777] border border-[#D9C9BF]",
    ghost:
      "bg-transparent text-[#664226] hover:bg-[#F3EAE4] focus-visible:ring-[#B89777]",
    outline:
      "bg-white text-[#664226] border border-[#D9C9BF] hover:bg-[#FAF4F1] focus-visible:ring-[#B89777]",
    danger:
      "bg-white text-red-700 border border-red-200 hover:bg-red-50 focus-visible:ring-red-300",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
