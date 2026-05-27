import React from "react";
import { Search, X } from "lucide-react";
import { MEAL_TYPES, DIFFICULTY_OPTIONS, RECIPE_TAGS } from "@/data/constants";

interface FilterState {
  search?: string;
  meal_type?: string;
  difficulty?: string;
  tag?: string;
  favorite?: string;
  visibility?: string;
  max_time?: string;
}

interface FilterBarProps {
  filters: FilterState;
  onChange?: (newFilters: FilterState) => void;
  onReset?: () => void;
}

export default function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  const update = (patch: Partial<FilterState>) => onChange?.({ ...filters, ...patch });
  const hasFilters =
    filters.search ||
    filters.meal_type ||
    filters.difficulty ||
    filters.tag ||
    filters.favorite ||
    filters.visibility ||
    filters.max_time;

  return (
    <div className="rounded-3xl border border-[#E9DFDA] bg-white p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5">
          <Search size={16} className="text-[#9F6C3E]" />
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Tìm theo tên món…"
            className="w-full bg-transparent text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filters.meal_type || ""}
            onChange={(e) => update({ meal_type: e.target.value })}
            className="rounded-full border border-[#D9C9BF] bg-white px-3 py-2 text-xs text-[#664226] outline-none focus:border-[#9F6C3E]"
          >
            <option value="">Tất cả bữa</option>
            {MEAL_TYPES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            value={filters.difficulty || ""}
            onChange={(e) => update({ difficulty: e.target.value })}
            className="rounded-full border border-[#D9C9BF] bg-white px-3 py-2 text-xs text-[#664226] outline-none focus:border-[#9F6C3E]"
          >
            <option value="">Mọi độ khó</option>
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>

          <select
            value={filters.max_time || ""}
            onChange={(e) => update({ max_time: e.target.value })}
            className="rounded-full border border-[#D9C9BF] bg-white px-3 py-2 text-xs text-[#664226] outline-none focus:border-[#9F6C3E]"
          >
            <option value="">Mọi thời gian</option>
            <option value="15">≤ 15 phút</option>
            <option value="30">≤ 30 phút</option>
            <option value="60">≤ 60 phút</option>
          </select>

          <select
            value={filters.visibility || ""}
            onChange={(e) => update({ visibility: e.target.value })}
            className="rounded-full border border-[#D9C9BF] bg-white px-3 py-2 text-xs text-[#664226] outline-none focus:border-[#9F6C3E]"
          >
            <option value="">Tất cả</option>
            <option value="private">Riêng tư</option>
            <option value="public">Công khai</option>
          </select>

          <button
            type="button"
            onClick={() => update({ favorite: filters.favorite ? "" : "1" })}
            className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${
              filters.favorite
                ? "bg-[#9F6C3E] text-white"
                : "border border-[#D9C9BF] bg-white text-[#664226] hover:bg-[#F3EAE4]"
            }`}
          >
            ♥ Yêu thích
          </button>

          {hasFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs text-[#9F6C3E] hover:bg-[#F3EAE4]"
            >
              <X size={12} /> Xoá lọc
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="text-xs text-[#9F6C3E]/70 mr-1 self-center">Tag:</span>
        {RECIPE_TAGS.map((tag) => {
          const active = filters.tag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => update({ tag: active ? "" : tag })}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? "bg-[#9F6C3E] text-white"
                  : "border border-[#D9C9BF] bg-white text-[#664226] hover:bg-[#F3EAE4]"
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
