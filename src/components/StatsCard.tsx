import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  href?: string;
  accent?: string;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  hint,
  href,
  accent = "#9F6C3E",
}: StatsCardProps) {
  const inner = (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-[#E9DFDA] bg-white p-5 transition-colors hover:border-[#D9C9BF] hover:bg-[#FAF4F1]">
      <div className="flex items-center justify-between">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: "#F3EAE4", color: accent }}
        >
          {Icon ? <Icon size={18} /> : null}
        </span>
        {hint ? (
          <span className="text-xs text-[#9F6C3E]/70">{hint}</span>
        ) : null}
      </div>
      <div className="mt-6">
        <div
          className="font-playfair-display text-3xl font-semibold"
          style={{ color: "#664226" }}
        >
          {value}
        </div>
        <div className="mt-1 text-sm text-[#9F6C3E]/80">{label}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {inner}
      </a>
    );
  }
  return inner;
}
