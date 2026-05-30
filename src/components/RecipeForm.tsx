'use client'
import React, { useState } from "react";
import { Plus, X, Heart } from "lucide-react";
import ImageUpload from "./ImageUpload";
import SoftButton from "./SoftButton";
import {
  MEAL_TYPES,
  DIFFICULTY_OPTIONS,
  RECIPE_TAGS,
  GROCERY_CATEGORIES,
} from "@/data/constants";

interface Ingredient {
  name: string;
  quantity: string;
  category: string;
}

interface RecipeFormProps {
  initial?: {
    title?: string;
    description?: string;
    cover_image_url?: string;
    meal_type?: string;
    cook_time_minutes?: number;
    servings?: number;
    difficulty?: string;
    notes?: string;
    is_public?: boolean;
    is_favorite?: boolean;
    tags?: string[];
    ingredients?: Ingredient[];
    steps?: string[];
  };
  onSubmit?: (data: any) => void;
  submitting?: boolean;
  onCancel?: () => void;
}

export default function RecipeForm({
  initial,
  onSubmit,
  submitting,
  onCancel,
}: RecipeFormProps) {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initial?.cover_image_url || "",
  );
  const [mealType, setMealType] = useState(initial?.meal_type || "");
  const [cookTime, setCookTime] = useState(
    initial?.cook_time_minutes?.toString() || "",
  );
  const [servings, setServings] = useState(initial?.servings?.toString() || "");
  const [difficulty, setDifficulty] = useState(initial?.difficulty || "de");
  const [notes, setNotes] = useState(initial?.notes || "");
  const [isPublic, setIsPublic] = useState(!!initial?.is_public);
  const [isFavorite, setIsFavorite] = useState(!!initial?.is_favorite);
  const [tags, setTags] = useState<string[]>(initial?.tags || []);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initial?.ingredients?.length
      ? initial.ingredients
      : [{ name: "", quantity: "", category: "khac" }],
  );
  const [steps, setSteps] = useState<string[]>(
    initial?.steps?.length ? initial.steps : [""],
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addIngredient = () =>
    setIngredients((arr) => [
      ...arr,
      { name: "", quantity: "", category: "khac" },
    ]);
  const removeIngredient = (i: number) =>
    setIngredients((arr) => arr.filter((_, idx) => idx !== i));
  const updateIngredient = (i: number, patch: Partial<Ingredient>) =>
    setIngredients((arr) =>
      arr.map((it, idx) => (idx === i ? { ...it, ...patch } : it) as Ingredient),
    );

  const addStep = () => setSteps((arr) => [...arr, ""]);
  const removeStep = (i: number) =>
    setSteps((arr) => arr.filter((_, idx) => idx !== i));
  const updateStep = (i: number, val: string) =>
    setSteps((arr) => arr.map((s, idx) => (idx === i ? val : s)));

  const toggleTag = (t: string) =>
    setTags((arr) =>
      arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t],
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Vui lòng nhập tên món";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const cleanIngredients = ingredients
      .filter((i) => i.name && i.name.trim())
      .map((i) => ({
        name: i.name.trim(),
        quantity: i.quantity?.trim() || "",
        category: i.category || "khac",
      }));
    const cleanSteps = steps.map((s) => s.trim()).filter(Boolean);

    onSubmit?.({
      title: title.trim(),
      description: description.trim() || null,
      cover_image_url: coverImageUrl || null,
      meal_type: mealType || null,
      cook_time_minutes: cookTime ? parseInt(cookTime, 10) : null,
      servings: servings ? parseInt(servings, 10) : null,
      difficulty: difficulty || null,
      ingredients: cleanIngredients,
      steps: cleanSteps,
      notes: notes.trim() || null,
      tags,
      is_public: isPublic,
      is_favorite: isFavorite,
    });
  };

  const fieldLabel =
    "block text-xs font-medium text-[#664226] mb-1.5 uppercase tracking-wide";
  const inputBase =
    "w-full rounded-2xl border border-[#D9C9BF] bg-white px-4 py-2.5 text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50 focus:border-[#9F6C3E]";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      {/* Left: image + meta */}
      <div className="lg:col-span-1 space-y-6">
        <div>
          <label className={fieldLabel}>Ảnh bìa</label>
          <ImageUpload value={coverImageUrl} onChange={setCoverImageUrl} />
        </div>

        <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5 space-y-4">
          <h3 className="font-playfair-display text-lg font-semibold text-[#664226]">
            Thông tin nhanh
          </h3>
          <div>
            <label className={fieldLabel}>Loại bữa</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className={inputBase}
            >
              <option value="">— Chọn —</option>
              {MEAL_TYPES.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={fieldLabel}>Thời gian (phút)</label>
              <input
                type="number"
                min="0"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                placeholder="30"
                className={inputBase}
              />
            </div>
            <div>
              <label className={fieldLabel}>Khẩu phần</label>
              <input
                type="number"
                min="1"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                placeholder="4"
                className={inputBase}
              />
            </div>
          </div>
          <div>
            <label className={fieldLabel}>Độ khó</label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_OPTIONS.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDifficulty(d.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    difficulty === d.value
                      ? "bg-[#9F6C3E] text-white"
                      : "border border-[#D9C9BF] bg-white text-[#664226] hover:bg-[#F3EAE4]"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#E9DFDA]">
            <label className="flex cursor-pointer items-center justify-between gap-2">
              <span className="text-sm text-[#664226]">
                Công khai (mọi người xem được)
              </span>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4 accent-[#9F6C3E]"
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-sm text-[#664226]">
                <Heart size={14} className="text-[#9F6C3E]" /> Yêu thích
              </span>
              <input
                type="checkbox"
                checked={isFavorite}
                onChange={(e) => setIsFavorite(e.target.checked)}
                className="h-4 w-4 accent-[#9F6C3E]"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Right: main fields */}
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5 space-y-4">
          <div>
            <label className={fieldLabel}>Tên món *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Bún chả Hà Nội"
              className={inputBase}
            />
            {errors.title ? (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            ) : null}
          </div>
          <div>
            <label className={fieldLabel}>Mô tả ngắn</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="VD: Món bún truyền thống với chả nướng thơm lừng…"
              className={inputBase}
            />
          </div>
          <div>
            <label className={fieldLabel}>Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {RECIPE_TAGS.map((t) => {
                const active = tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? "bg-[#9F6C3E] text-white"
                        : "border border-[#D9C9BF] bg-white text-[#664226] hover:bg-[#F3EAE4]"
                    }`}
                  >
                    #{t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-playfair-display text-lg font-semibold text-[#664226]">
              Nguyên liệu
            </h3>
            <button
              type="button"
              onClick={addIngredient}
              className="inline-flex items-center gap-1 rounded-full border border-[#D9C9BF] bg-white px-3 py-1.5 text-xs font-medium text-[#664226] hover:bg-[#F3EAE4]"
            >
              <Plus size={12} /> Thêm
            </button>
          </div>
          <div className="space-y-2">
            {ingredients.map((ing, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-2 rounded-2xl border border-[#E9DFDA] bg-[#FAF4F1] p-2"
              >
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) =>
                    updateIngredient(i, { name: e.target.value })
                  }
                  placeholder="Tên nguyên liệu"
                  className="col-span-12 rounded-xl border border-[#E9DFDA] bg-white px-3 py-2 text-sm text-[#664226] outline-none focus:border-[#9F6C3E] md:col-span-5"
                />
                <input
                  type="text"
                  value={ing.quantity}
                  onChange={(e) =>
                    updateIngredient(i, { quantity: e.target.value })
                  }
                  placeholder="VD: 200g"
                  className="col-span-6 rounded-xl border border-[#E9DFDA] bg-white px-3 py-2 text-sm text-[#664226] outline-none focus:border-[#9F6C3E] md:col-span-3"
                />
                <select
                  value={ing.category || "khac"}
                  onChange={(e) =>
                    updateIngredient(i, { category: e.target.value })
                  }
                  className="col-span-5 rounded-xl border border-[#E9DFDA] bg-white px-2 py-2 text-xs text-[#664226] outline-none focus:border-[#9F6C3E] md:col-span-3"
                >
                  {GROCERY_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  className="col-span-1 inline-flex items-center justify-center rounded-xl border border-[#E9DFDA] bg-white text-[#9F6C3E] hover:bg-red-50 hover:text-red-700"
                  aria-label="Xoá"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-playfair-display text-lg font-semibold text-[#664226]">
              Các bước nấu
            </h3>
            <button
              type="button"
              onClick={addStep}
              className="inline-flex items-center gap-1 rounded-full border border-[#D9C9BF] bg-white px-3 py-1.5 text-xs font-medium text-[#664226] hover:bg-[#F3EAE4]"
            >
              <Plus size={12} /> Thêm bước
            </button>
          </div>
          <div className="space-y-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F3EAE4] text-xs font-semibold text-[#9F6C3E]">
                  {i + 1}
                </span>
                <textarea
                  rows={2}
                  value={s}
                  onChange={(e) => updateStep(i, e.target.value)}
                  placeholder={`Bước ${i + 1}…`}
                  className="flex-1 rounded-2xl border border-[#E9DFDA] bg-[#FAF4F1] px-3 py-2 text-sm text-[#664226] outline-none focus:border-[#9F6C3E]"
                />
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  className="mt-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#E9DFDA] bg-white text-[#9F6C3E] hover:bg-red-50 hover:text-red-700"
                  aria-label="Xoá"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5">
          <label className={fieldLabel}>Ghi chú cá nhân</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="VD: Mẹ thường nấu món này vào tối thứ 7…"
            className={inputBase}
          />
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {onCancel ? (
            <SoftButton variant="ghost" onClick={onCancel} type="button">
              Huỷ
            </SoftButton>
          ) : null}
          <SoftButton type="submit" variant="primary" disabled={submitting}>
            {submitting
              ? "Đang lưu…"
              : initial
                ? "Lưu thay đổi"
                : "Lưu công thức"}
          </SoftButton>
        </div>
      </div>
    </form>
  );
}
