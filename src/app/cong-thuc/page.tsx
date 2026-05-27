'use client'
import { useState, useMemo, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import CozyPageHeader from "@/components/CozyPageHeader";
import SoftButton from "@/components/SoftButton";
import RecipeCard from "@/components/RecipeCard";
import FilterBar from "@/components/FilterBar";
import EmptyState from "@/components/EmptyState";
import { GridSkeleton } from "@/components/LoadingSkeleton";

function RecipesContent() {
  const { data: user, loading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<any>({
    search: "",
    meal_type: "",
    difficulty: "",
    tag: "",
    favorite: "",
    visibility: "",
    max_time: "",
  });

  useEffect(() => {
    if (searchParams) {
      setFilters({
        search: searchParams.get("search") || "",
        meal_type: searchParams.get("meal_type") || "",
        difficulty: searchParams.get("difficulty") || "",
        tag: searchParams.get("tag") || "",
        favorite: searchParams.get("favorite") || "",
        visibility: searchParams.get("visibility") || "",
        max_time: searchParams.get("max_time") || "",
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/signin?callbackUrl=/cong-thuc");
    }
  }, [user, loading, router]);

  const query = useMemo(() => {
    const p = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) p.set(k, v as string);
    });
    return p.toString();
  }, [filters]);

  const { data, isLoading } = useQuery({
    queryKey: ["recipes", query],
    queryFn: async () => {
      const res = await fetch(`/api/recipes?${query}`);
      if (!res.ok) throw new Error("Không tải được công thức");
      return res.json();
    },
    enabled: !!user,
  });

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
        Đang mở sổ tay…
      </div>
    );
  }

  return (
    <>
      <CozyPageHeader
        title="Sổ tay công thức"
        subtitle="Tất cả món ngon bạn đã lưu, sắp xếp gọn gàng cho căn bếp của bạn."
        actions={
          <SoftButton href="/cong-thuc/them" variant="primary">
            <Plus size={14} /> Thêm công thức
          </SoftButton>
        }
      />

      <div className="mt-6">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters({
            search: "",
            meal_type: "",
            difficulty: "",
            tag: "",
            favorite: "",
            visibility: "",
            max_time: "",
          })}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <GridSkeleton count={6} />
        ) : data?.recipes?.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.recipes.map((r: any) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Chưa có công thức nào"
            description="Sổ tay đang trống. Thêm món đầu tiên hoặc thử khám phá công thức công khai nhé."
            action={
              <div className="flex flex-wrap gap-2">
                <SoftButton href="/cong-thuc/them" variant="primary">
                  + Thêm công thức
                </SoftButton>
                <SoftButton href="/kham-pha" variant="outline">
                  Khám phá công thức
                </SoftButton>
              </div>
            }
          />
        )}
      </div>
    </>
  );
}

export default function RecipesPage() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
          Đang tải dữ liệu…
        </div>
      }>
        <RecipesContent />
      </Suspense>
    </Layout>
  );
}
