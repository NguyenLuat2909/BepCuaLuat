import React from "react";

interface SkeletonBoxProps {
  className?: string;
}

export function SkeletonBox({ className = "" }: SkeletonBoxProps) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-[#F3EAE4] ${className}`}
      style={{ minHeight: "1rem" }}
    />
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="rounded-3xl border border-[#E9DFDA] bg-white p-3">
      <SkeletonBox className="h-44 w-full rounded-2xl" />
      <SkeletonBox className="mt-4 h-5 w-3/4" />
      <SkeletonBox className="mt-2 h-4 w-1/2" />
      <div className="mt-3 flex gap-2">
        <SkeletonBox className="h-6 w-16 rounded-full" />
        <SkeletonBox className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

interface GridSkeletonProps {
  count?: number;
}

export function GridSkeleton({ count = 6 }: GridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
}
