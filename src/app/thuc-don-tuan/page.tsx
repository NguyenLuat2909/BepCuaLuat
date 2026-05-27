'use client'
import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBasket,
  Search,
  X,
  Clock,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import CozyPageHeader from "@/components/CozyPageHeader";
import SoftButton from "@/components/SoftButton";
import EmptyState from "@/components/EmptyState";
import { MEAL_TYPES, MEAL_TYPE_LABEL, DAYS_OF_WEEK } from "@/data/constants";

function getWeekStart(d = new Date()) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const dow = date.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  date.setDate(date.getDate() + diff);
  return date;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
function formatVN(d: Date) {
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}

export default function MealPlannerPage() {
  const { data: user, loading } = useUser();
  const router = useRouter();
  const qc = useQueryClient();
  const [weekStart, setWeekStart] = useState(getWeekStart());
  const [search, setSearch] = useState("");
  const [draggingRecipe, setDraggingRecipe] = useState<any>(null);
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const [generatingAI, setGeneratingAI] = useState(false);

  // Mobile selection mode
  const [pickedRecipe, setPickedRecipe] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/signin?callbackUrl=/thuc-don-tuan");
    }
  }, [user, loading, router]);

  const weekStartStr = formatDate(weekStart);

  const { data: recipesData } = useQuery<any>({
    queryKey: ["recipes-sidebar", search],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (search) p.set("search", search);
      p.set("limit", "100");
      const res = await fetch(`/api/recipes?${p}`);
      if (!res.ok) throw new Error("Không tải được");
      return res.json();
    },
    enabled: !!user,
  });

  const { data: planData, refetch: refetchPlan } = useQuery<any>({
    queryKey: ["meal-plan", weekStartStr],
    queryFn: async () => {
      const res = await fetch(`/api/meal-plan?week_start=${weekStartStr}`);
      if (!res.ok) throw new Error("Không tải được");
      return res.json();
    },
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: async ({ recipe_id, plan_date, meal_slot, day_of_week }: { recipe_id: string; plan_date: string; meal_slot: string; day_of_week: number }) => {
      const res = await fetch("/api/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe_id, plan_date, meal_slot, day_of_week }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Không thêm được");
      }
      return res.json();
    },
    onSuccess: () => {
      refetchPlan();
      qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
      qc.invalidateQueries({ queryKey: ["dashboard-today"] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/meal-plan?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Không xoá được");
    },
    onSuccess: () => refetchPlan(),
    onError: (e: any) => toast.error(e.message),
  });

  const handleDropToSlot = (date: Date, slot: string) => {
    const recipe = draggingRecipe || pickedRecipe;
    if (!recipe) return;
    const planDate = new Date(date);
    const dow = planDate.getDay() === 0 ? 7 : planDate.getDay();
    addMutation.mutate({
      recipe_id: recipe.id,
      plan_date: formatDate(date),
      meal_slot: slot,
      day_of_week: dow,
    });
    setDraggingRecipe(null);
    setDragOverSlot(null);
    setPickedRecipe(null);
  };

  const grouped = useMemo(() => {
    const map = new Map<string, any[]>();
    const items = planData?.items || [];
    for (const it of items) {
      const date = it.plan_date.slice(0, 10);
      const key = `${date}|${it.meal_slot}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    }
    return map;
  }, [planData]);

  const handleGenerateAIPlan = async () => {
    const goal = prompt(
      "Bạn muốn thực đơn theo mục tiêu nào?\n(VD: ăn healthy, giảm cân, tăng cơ, tiết kiệm, nhanh gọn)",
      "ăn healthy",
    );
    if (!goal) return;
    setGeneratingAI(true);
    try {
      const res = await fetch("/api/ai/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Lỗi AI");
      toast.success("AI đã gợi ý xong! Mở trang AI để xem chi tiết thực đơn.");
      router.push("/ai");
    } catch (e: any) {
      toast.error(e.message || "Lỗi");
    } finally {
      setGeneratingAI(false);
    }
  };

  const handleGenerateGrocery = async () => {
    try {
      const res = await fetch("/api/grocery/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ week_start: weekStartStr }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Lỗi");
      toast.success(`Đã tạo danh sách đi chợ với ${j.count} món`);
      setTimeout(() => router.push("/di-cho"), 600);
    } catch (e: any) {
      toast.error(e.message || "Lỗi");
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
          Đang mở thực đơn…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CozyPageHeader
        title="Thực đơn tuần"
        subtitle="Kéo công thức từ sổ tay vào từng bữa trong tuần. Bữa ăn của bạn — chỉn chu trong vài phút."
        actions={
          <>
            <SoftButton
              variant="outline"
              onClick={handleGenerateAIPlan}
              disabled={generatingAI}
            >
              <Sparkles size={14} />
              {generatingAI ? "Đang gợi ý..." : "Gợi ý bằng AI"}
            </SoftButton>
            <SoftButton variant="primary" onClick={handleGenerateGrocery}>
              <ShoppingBasket size={14} /> Tạo danh sách đi chợ
            </SoftButton>
          </>
        }
      />

      {/* Week selector */}
      <div className="mt-6 flex items-center justify-between rounded-3xl border border-[#E9DFDA] bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => setWeekStart(addDays(weekStart, -7))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C9BF] bg-white text-[#664226] hover:bg-[#F3EAE4]"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="text-center">
          <div className="text-xs text-[#9F6C3E]/70">Tuần từ</div>
          <div className="font-playfair-display text-lg font-semibold text-[#664226]">
            {formatVN(weekStart)} → {formatVN(addDays(weekStart, 6))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setWeekStart(getWeekStart())}
            className="rounded-full border border-[#D9C9BF] bg-white px-3 py-1.5 text-xs font-medium text-[#664226] hover:bg-[#F3EAE4]"
          >
            Tuần này
          </button>
          <button
            type="button"
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D9C9BF] bg-white text-[#664226] hover:bg-[#F3EAE4]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {pickedRecipe ? (
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#9F6C3E] bg-[#F3EAE4] px-4 py-2">
          <span className="text-sm text-[#664226]">
            Đã chọn: <strong>{pickedRecipe.title}</strong> — bấm vào ô bữa ăn để
            thêm.
          </span>
          <button
            type="button"
            onClick={() => setPickedRecipe(null)}
            className="text-xs text-[#9F6C3E] hover:text-[#8B5A30]"
          >
            Bỏ chọn
          </button>
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Board */}
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map((d, i) => {
                const date = addDays(weekStart, i);
                const isToday = formatDate(date) === formatDate(new Date());
                return (
                  <div
                    key={d.value}
                    className={`rounded-2xl border p-3 text-center ${
                      isToday
                        ? "border-[#9F6C3E] bg-[#F3EAE4]"
                        : "border-[#E9DFDA] bg-white"
                    }`}
                  >
                    <div className="text-xs font-medium text-[#9F6C3E]/80">
                      {d.label}
                    </div>
                    <div className="font-playfair-display text-lg font-semibold text-[#664226]">
                      {formatVN(date)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slot rows */}
            {MEAL_TYPES.map((slot) => (
              <div key={slot.value} className="mt-2 grid grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map((d, i) => {
                  const date = addDays(weekStart, i);
                  const key = `${formatDate(date)}|${slot.value}`;
                  const items = grouped.get(key) || [];
                  const slotId = `${formatDate(date)}-${slot.value}`;
                  const isOver = dragOverSlot === slotId;
                  return (
                    <div
                      key={`${d.value}-${slot.value}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverSlot(slotId);
                      }}
                      onDragLeave={() => {
                        if (dragOverSlot === slotId) setDragOverSlot(null);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDropToSlot(date, slot.value);
                      }}
                      onClick={() => {
                        if (pickedRecipe) handleDropToSlot(date, slot.value);
                      }}
                      className={`min-h-[88px] rounded-2xl border p-2 transition-colors ${
                        isOver || pickedRecipe
                          ? isOver
                            ? "border-[#9F6C3E] bg-[#F3EAE4]"
                            : "border-dashed border-[#D9C9BF] bg-[#FAF4F1]/80 cursor-pointer"
                          : "border-dashed border-[#E9DFDA] bg-[#FAF4F1]/60"
                      }`}
                    >
                      <div className="mb-1 text-[10px] font-medium uppercase tracking-wide text-[#9F6C3E]/70">
                        {MEAL_TYPE_LABEL[slot.value]}
                      </div>
                      <div className="space-y-1.5">
                        {items.length === 0 ? (
                          <div className="py-2 text-center text-[10px] text-[#9F6C3E]/50">
                            Kéo món vào đây
                          </div>
                        ) : (
                          items.map((item) => (
                            <div
                              key={item.id}
                              className="group flex items-center gap-2 rounded-xl border border-[#E9DFDA] bg-white p-1.5"
                            >
                              {item.cover_image_url ? (
                                <img
                                  src={item.cover_image_url}
                                  alt=""
                                  className="h-7 w-7 flex-shrink-0 rounded-lg object-cover"
                                />
                              ) : (
                                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#F3EAE4] text-sm">
                                  🍲
                                </span>
                              )}
                              <a
                                href={`/cong-thuc/${item.recipe_id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="min-w-0 flex-1 truncate text-xs font-medium text-[#664226] hover:text-[#9F6C3E]"
                              >
                                {item.title}
                              </a>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeMutation.mutate(item.id);
                                }}
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[#9F6C3E]/60 hover:bg-[#F3EAE4] hover:text-[#9F6C3E]"
                                aria-label="Xoá"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-3xl border border-[#E9DFDA] bg-white p-4">
            <h3 className="font-playfair-display text-lg font-semibold text-[#664226]">
              Sổ tay công thức
            </h3>
            <p className="text-xs text-[#9F6C3E]/70">
              Kéo món vào ô — hoặc bấm chọn rồi bấm ô (mobile-friendly).
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-[#D9C9BF] bg-[#FAF4F1] px-3 py-2">
              <Search size={14} className="text-[#9F6C3E]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm món…"
                className="w-full bg-transparent text-xs text-[#664226] outline-none placeholder:text-[#9F6C3E]/50"
              />
            </div>
            <div className="mt-3 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {recipesData?.recipes?.length ? (
                recipesData.recipes.map((r: any) => {
                  const isPicked = pickedRecipe?.id === r.id;
                  return (
                    <div
                      key={r.id}
                      draggable
                      onDragStart={() => setDraggingRecipe(r)}
                      onDragEnd={() => {
                        setDraggingRecipe(null);
                        setDragOverSlot(null);
                      }}
                      onClick={() => setPickedRecipe(isPicked ? null : r)}
                      className={`flex cursor-grab items-center gap-3 rounded-2xl border bg-white p-3 transition-colors active:cursor-grabbing ${
                        isPicked
                          ? "border-[#9F6C3E] bg-[#F3EAE4]"
                          : "border-[#E9DFDA] hover:border-[#D9C9BF]"
                      }`}
                    >
                      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F3EAE4] text-xl">
                        {r.cover_image_url ? (
                          <img
                            src={r.cover_image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          "🍽️"
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-[#664226]">
                          {r.title}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-[#9F6C3E]/70">
                          {r.meal_type ? (
                            <span>{MEAL_TYPE_LABEL[r.meal_type] || r.meal_type}</span>
                          ) : null}
                          {r.cook_time_minutes ? (
                            <span className="inline-flex items-center gap-0.5">
                              <Clock size={10} /> {r.cook_time_minutes}p
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <GripVertical size={14} className="text-[#9F6C3E]/50" />
                    </div>
                  );
                })
              ) : (
                <EmptyState
                  title="Chưa có công thức"
                  description="Thêm công thức để có thể lên thực đơn."
                  action={
                    <SoftButton
                      href="/cong-thuc/them"
                      variant="primary"
                      size="sm"
                    >
                      + Thêm
                    </SoftButton>
                  }
                />
              )}
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
