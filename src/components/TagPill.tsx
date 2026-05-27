import React from "react";

interface TagPillProps {
  label: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function TagPill({
  label,
  active = false,
  onClick,
  className = "",
}: TagPillProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer select-none";
  const activeCls = "bg-[#9F6C3E] text-white border border-[#9F6C3E]";
  const inactiveCls =
    "bg-white text-[#664226] border border-[#D9C9BF] hover:bg-[#F3EAE4]";

  if (!onClick) {
    return (
      <span
        className={`${base} ${active ? activeCls : "bg-[#F3EAE4] text-[#664226] border border-[#E9DFDA] cursor-default"} ${className}`}
      >
        #{label}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${active ? activeCls : inactiveCls} ${className}`}
    >
      #{label}
    </button>
  );
}
