'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Search, BookmarkPlus, Globe2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import CozyPageHeader from "@/components/CozyPageHeader";
import RecipeCard from "@/components/RecipeCard";
import EmptyState from "@/components/EmptyState";
import { GridSkeleton } from "@/components/LoadingSkeleton";
import { MEAL_TYPES } from "@/data/constants";

export default function ExplorePage() {
  const { data: user } = useUser();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mealType, setMealType] = useState("");

  const { data, isLoading } = useQuery<any>({
    queryKey: ["public-recipes", search, mealType],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (search) p.set("search", search);
      if (mealType) p.set("meal_type", mealType);
      const res = await fetch(`/api/recipes/public?${p}`);
      if (!res.ok) throw new Error("Không tải được");
      return res.json();
    },
  });

  const dupMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/recipes/${id}/duplicate`, {
        method: "POST",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Không lưu được");
      }
      return res.json();
    },
    onSuccess: (j) => {
      toast.success("Đã lưu vào sổ tay ✿");
      router.push(`/cong-thuc/${j.id}`);
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <Layout>
      <CozyPageHeader
        title="Khám phá công thức"
        subtitle="Những món ngon được chia sẻ công khai từ cộng đồng Bếp của Luật."
      />

      <div className="mt-6 rounded-3xl border border-[#E9DFDA] bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5">
            <Search size={16} className="text-[#9F6C3E]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm món công khai…"
              className="w-full bg-transparent text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50"
            />
          </div>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="rounded-full border border-[#D9C9BF] bg-white px-3 py-2 text-xs text-[#664226] outline-none focus:border-[#9F6C3E]"
          >
            <option value="">Tất cả bữa</option>
            {MEAL_TYPES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        {isLoading ? (
          <GridSkeleton count={6} />
        ) : data?.recipes?.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.recipes.map((r: any) => (
              <div key={r.id} className="relative">
                <RecipeCard recipe={r} showAuthor />
                {user ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dupMutation.mutate(r.id);
                    }}
                    className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-medium text-[#664226] hover:bg-white"
                  >
                    <BookmarkPlus size={12} /> Lưu
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Chưa có công thức công khai"
            description="Hãy là người đầu tiên chia sẻ công thức ngon đến cộng đồng nhé."
            icon={Globe2}
          />
        )}
      </div>
    </Layout>
  );
}
