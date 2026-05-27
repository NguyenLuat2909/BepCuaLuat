import React from "react";
import { LucideIcon } from "lucide-react";

interface PillProps {
  children: React.ReactNode;
  variant?: "default" | "soft" | "accent" | "pink" | "outline";
  className?: string;
  icon?: LucideIcon;
}

export default function Pill({
  children,
  variant = "default",
  className = "",
  icon: Icon,
}: PillProps) {
  const variants = {
    default: "bg-white border border-[#E9DFDA] text-[#664226]",
    soft: "bg-[#F3EAE4] border border-[#E9DFDA] text-[#664226]",
    accent: "bg-[#9F6C3E] text-white border border-[#9F6C3E]",
    pink: "bg-[#D5B4A4] text-[#664226] border border-[#D5B4A4]",
    outline: "bg-transparent border border-[#D9C9BF] text-[#664226]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${variants[variant] || variants.default} ${className}`}
    >
      {Icon ? <Icon size={12} /> : null}
      {children}
    </span>
  );
}
