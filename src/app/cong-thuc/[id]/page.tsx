'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Clock,
  Users,
  ChefHat,
  Heart,
  Pencil,
  Trash2,
  Sparkles,
  BookmarkPlus,
  ArrowLeft,
  Globe2,
  Utensils,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import SoftButton from "@/components/SoftButton";
import Pill from "@/components/Pill";
import TagPill from "@/components/TagPill";
import { MEAL_TYPE_LABEL, DIFFICULTY_LABEL } from "@/data/constants";

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

export default function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { id } = params;
  const { data: user } = useUser();
  const router = useRouter();
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiContent, setAiContent] = useState<any>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const res = await fetch(`/api/recipes/${id}`);
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Không tải được công thức");
      }
      return res.json();
    },
  });

  const recipe = data?.recipe;
  const isOwner = !!data?.isOwner;

  const favMutation = useMutation({
    mutationFn: async (newVal: boolean) => {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_favorite: newVal }),
      });
      if (!res.ok) throw new Error("Không cập nhật được");
      return res.json();
    },
    onSuccess: () => {
      refetch();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Không xoá được");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Đã xoá công thức");
      router.push("/cong-thuc");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const duplicateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/recipes/${id}/duplicate`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Không lưu được");
      return res.json();
    },
    onSuccess: (j) => {
      toast.success("Đã lưu vào sổ tay của bạn ✿");
      router.push(`/cong-thuc/${j.id}`);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handleAI = async (kind: string) => {
    if (!recipe) return;
    const recipeText = buildRecipeText(recipe);
    setAiLoading(kind);
    setAiContent(null);
    try {
      const endpoint =
        kind === "summarize"
          ? "/api/ai/summarize-recipe"
          : "/api/ai/simplify-recipe";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe_text: recipeText }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "AI gặp lỗi");
      setAiContent({ kind, content: j.content });
    } catch (e: any) {
      toast.error(e.message || "Lỗi AI");
    } finally {
      setAiLoading(null);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
          Đang mở công thức…
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="rounded-3xl border border-[#E9DFDA] bg-white p-8 text-center">
          <h2 className="font-playfair-display text-2xl font-semibold text-[#664226]">
            Không tìm thấy công thức
          </h2>
          <p className="mt-2 text-sm text-[#9F6C3E]/80">
            Có thể công thức đã bị xoá hoặc đặt riêng tư.
          </p>
          <div className="mt-4">
            <SoftButton href="/cong-thuc" variant="outline">
              <ArrowLeft size={14} /> Về sổ tay
            </SoftButton>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <a
        href={isOwner ? "/cong-thuc" : "/kham-pha"}
        className="inline-flex items-center gap-1 text-sm text-[#9F6C3E] hover:text-[#8B5A30]"
      >
        <ArrowLeft size={14} /> {isOwner ? "Về sổ tay" : "Về khám phá"}
      </a>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cover */}
        <div className="lg:col-span-1">
          <div className="overflow-hidden rounded-3xl border border-[#E9DFDA] bg-[#F3EAE4]">
            {recipe.cover_image_url ? (
              <img
                src={recipe.cover_image_url}
                alt={recipe.title}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center text-[#9F6C3E]/50">
                <Utensils size={64} strokeWidth={1.5} />
              </div>
            )}
          </div>

          <div className="mt-4 rounded-3xl border border-[#E9DFDA] bg-white p-5">
            <h3 className="font-playfair-display text-lg font-semibold text-[#664226]">
              Thông tin nhanh
            </h3>
            <div className="mt-3 space-y-2 text-sm text-[#664226]">
              {recipe.meal_type ? (
                <div className="flex items-center justify-between">
                  <span className="text-[#9F6C3E]/80">Bữa</span>
                  <span className="font-medium">
                    {MEAL_TYPE_LABEL[recipe.meal_type] || recipe.meal_type}
                  </span>
                </div>
              ) : null}
              {recipe.cook_time_minutes ? (
                <div className="flex items-center justify-between">
                  <span className="text-[#9F6C3E]/80">Thời gian</span>
                  <span className="font-medium">
                    {recipe.cook_time_minutes} phút
                  </span>
                </div>
              ) : null}
              {recipe.servings ? (
                <div className="flex items-center justify-between">
                  <span className="text-[#9F6C3E]/80">Khẩu phần</span>
                  <span className="font-medium">{recipe.servings} người</span>
                </div>
              ) : null}
              {recipe.difficulty ? (
                <div className="flex items-center justify-between">
                  <span className="text-[#9F6C3E]/80">Độ khó</span>
                  <span className="font-medium">
                    {DIFFICULTY_LABEL[recipe.difficulty] || recipe.difficulty}
                  </span>
                </div>
              ) : null}
              {recipe.is_public ? (
                <div className="flex items-center justify-between">
                  <span className="text-[#9F6C3E]/80">Trạng thái</span>
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Globe2 size={12} /> Công khai
                  </span>
                </div>
              ) : null}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2 border-t border-[#E9DFDA] pt-4">
              {isOwner ? (
                <>
                  <SoftButton
                    variant="outline"
                    size="sm"
                    onClick={() => favMutation.mutate(!recipe.is_favorite)}
                  >
                    <Heart
                      size={14}
                      fill={recipe.is_favorite ? "#9F6C3E" : "none"}
                      color="#9F6C3E"
                    />
                    {recipe.is_favorite ? "Đã yêu thích" : "Yêu thích"}
                  </SoftButton>
                  <SoftButton
                    variant="outline"
                    size="sm"
                    href={`/cong-thuc/${id}/sua`}
                  >
                    <Pencil size={14} /> Sửa
                  </SoftButton>
                  <SoftButton
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (
                        confirm(
                          `Xoá công thức "${recipe.title}"? Hành động không thể hoàn tác.`,
                        )
                      ) {
                        deleteMutation.mutate();
                      }
                    }}
                  >
                    <Trash2 size={14} /> Xoá
                  </SoftButton>
                </>
              ) : user ? (
                <SoftButton
                  variant="primary"
                  size="sm"
                  onClick={() => duplicateMutation.mutate()}
                  disabled={duplicateMutation.isPending}
                >
                  <BookmarkPlus size={14} />
                  {duplicateMutation.isPending
                    ? "Đang lưu…"
                    : "Lưu về sổ tay của tôi"}
                </SoftButton>
              ) : (
                <SoftButton
                  variant="outline"
                  size="sm"
                  href={`/account/signin?callbackUrl=/cong-thuc/${id}`}
                >
                  Đăng nhập để lưu
                </SoftButton>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="font-playfair-display text-3xl font-semibold text-[#664226] md:text-4xl">
              {recipe.title}
            </h1>
            {recipe.description ? (
              <p className="mt-2 text-base text-[#9F6C3E]/90">
                {recipe.description}
              </p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recipe.meal_type ? (
                <Pill variant="soft">{MEAL_TYPE_LABEL[recipe.meal_type] || recipe.meal_type}</Pill>
              ) : null}
              {recipe.cook_time_minutes ? (
                <Pill icon={Clock}>{recipe.cook_time_minutes} phút</Pill>
              ) : null}
              {recipe.servings ? (
                <Pill icon={Users}>{recipe.servings} người</Pill>
              ) : null}
              {recipe.difficulty ? (
                <Pill icon={ChefHat}>
                  {DIFFICULTY_LABEL[recipe.difficulty] || recipe.difficulty}
                </Pill>
              ) : null}
            </div>
            {recipe.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {recipe.tags.map((t: string) => (
                  <TagPill key={t} label={t} active={false} />
                ))}
              </div>
            ) : null}
            {!isOwner && recipe.author_name ? (
              <div className="mt-2 text-xs text-[#9F6C3E]/70">
                bởi {recipe.author_name}
              </div>
            ) : null}
          </div>

          {/* Ingredients */}
          <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5">
            <h2 className="font-playfair-display text-xl font-semibold text-[#664226]">
              Nguyên liệu
            </h2>
            {Array.isArray(recipe.ingredients) && recipe.ingredients.length ? (
              <ul className="mt-3 space-y-1">
                {recipe.ingredients.map((ing: any, i: number) => (
                  <li
                    key={i}
                    className="flex items-center justify-between border-b border-[#F3EAE4] py-1.5 text-sm text-[#664226] last:border-b-0"
                  >
                    <span>
                      <span className="text-[#9F6C3E] mr-2">-</span>
                      {ing.name}
                    </span>
                    {ing.quantity ? (
                      <span className="text-xs text-[#9F6C3E]/80">
                        {ing.quantity}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#9F6C3E]/70">
                Chưa thêm nguyên liệu.
              </p>
            )}
          </div>

          {/* Steps */}
          <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5">
            <h2 className="font-playfair-display text-xl font-semibold text-[#664226]">
              Cách làm
            </h2>
            {Array.isArray(recipe.steps) && recipe.steps.length ? (
              <ol className="mt-3 space-y-3">
                {recipe.steps.map((s: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#F3EAE4] text-sm font-semibold text-[#9F6C3E]">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-[#664226]">
                      {s}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm text-[#9F6C3E]/70">
                Chưa có các bước nấu.
              </p>
            )}
          </div>

          {/* Notes */}
          {recipe.notes ? (
            <div
              className="rounded-3xl border border-[#E9DFDA] p-5"
              style={{ backgroundColor: "#F3EAE4" }}
            >
              <h2 className="font-playfair-display text-lg font-semibold text-[#664226]">
                Ghi chú cá nhân
              </h2>
              <p className="mt-2 whitespace-pre-wrap text-sm text-[#664226]">
                {recipe.notes}
              </p>
            </div>
          ) : null}

          {/* AI Actions */}
          <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-playfair-display text-lg font-semibold text-[#664226]">
                <Sparkles size={16} className="mr-1 inline text-[#9F6C3E]" />
                Trợ lý AI
              </h2>
              <span className="text-xs text-[#9F6C3E]/70">
                Gợi ý chỉ mang tính tham khảo
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={aiLoading !== null}
                onClick={() => handleAI("summarize")}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F3EAE4] px-3 py-2 text-xs font-medium text-[#664226] hover:bg-[#E9DFDA] disabled:opacity-60"
              >
                <Sparkles size={12} />
                {aiLoading === "summarize"
                  ? "Đang tóm tắt..."
                  : "Tóm tắt công thức"}
              </button>
              <button
                type="button"
                disabled={aiLoading !== null}
                onClick={() => handleAI("simplify")}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F3EAE4] px-3 py-2 text-xs font-medium text-[#664226] hover:bg-[#E9DFDA] disabled:opacity-60"
              >
                <Sparkles size={12} />
                {aiLoading === "simplify"
                  ? "Đang đơn giản hóa..."
                  : "Phiên bản dễ nấu hơn"}
              </button>
            </div>
            {aiContent ? (
              <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-[#E9DFDA] bg-[#FAF4F1] p-4 text-sm leading-relaxed text-[#664226]">
                {aiContent.content}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function buildRecipeText(r: any) {
  const lines: string[] = [];
  lines.push(`Tên món: ${r.title}`);
  if (r.description) lines.push(`Mô tả: ${r.description}`);
  if (r.servings) lines.push(`Khẩu phần: ${r.servings}`);
  if (r.cook_time_minutes) lines.push(`Thời gian: ${r.cook_time_minutes} phút`);
  if (Array.isArray(r.ingredients) && r.ingredients.length) {
    lines.push("Nguyên liệu:");
    for (const ing of r.ingredients) {
      lines.push(`- ${ing.name}${ing.quantity ? ` (${ing.quantity})` : ""}`);
    }
  }
  if (Array.isArray(r.steps) && r.steps.length) {
    lines.push("Các bước:");
    r.steps.forEach((s: string, i: number) => lines.push(`${i + 1}. ${s}`));
  }
  if (r.notes) lines.push(`Ghi chú: ${r.notes}`);
  return lines.join("\n");
}
