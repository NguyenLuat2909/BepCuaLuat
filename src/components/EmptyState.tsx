import React from "react";
import { BookOpen, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  imageUrl?: string;
  className?: string;
}

export default function EmptyState({
  title = "Chưa có gì ở đây",
  description = "Bắt đầu thêm món ăn đầu tiên của bạn nhé!",
  icon: Icon = BookOpen,
  action,
  imageUrl,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#D9C9BF] bg-white/60 px-6 py-12 text-center ${className}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="mb-4 h-32 w-32 rounded-full object-cover"
        />
      ) : (
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#F3EAE4] text-[#9F6C3E]">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="font-playfair-display text-xl font-semibold text-[#664226]">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-[#9F6C3E]/80">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
