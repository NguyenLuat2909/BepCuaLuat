import React from "react";

interface CozyPageHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  actions?: React.ReactNode;
  className?: string;
}

export default function CozyPageHeader({
  title,
  subtitle,
  emoji,
  actions,
  className = "",
}: CozyPageHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div>
        <h1
          className="font-playfair-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#664226] tracking-tight"
          style={{ letterSpacing: "-0.01em" }}
        >
          {emoji ? <span className="mr-2">{emoji}</span> : null}
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 text-sm md:text-base text-[#9F6C3E]/80 max-w-2xl">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
