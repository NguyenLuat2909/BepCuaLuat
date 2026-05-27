import React from "react";
import { Clock, Heart, Users } from "lucide-react";
import Pill from "./Pill";
import { MEAL_TYPE_LABEL, DIFFICULTY_LABEL } from "@/data/constants";

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    description?: string;
    cover_image_url?: string;
    is_favorite?: boolean;
    is_public?: boolean;
    meal_type?: string;
    cook_time_minutes?: number;
    servings?: number;
    difficulty?: string;
    author_name?: string;
  };
  href?: string;
  showAuthor?: boolean;
  rightAction?: React.ReactNode;
}

export default function RecipeCard({
  recipe,
  href,
  showAuthor = false,
  rightAction,
}: RecipeCardProps) {
  const link = href || `/cong-thuc/${recipe.id}`;

  return (
    <a
      href={link}
      className="group flex flex-col overflow-hidden rounded-3xl border border-[#E9DFDA] bg-white transition-colors hover:border-[#D9C9BF]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EAE4]">
        {recipe.cover_image_url ? (
          <img
            src={recipe.cover_image_url}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">
            🍽️
          </div>
        )}
        {recipe.is_favorite ? (
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#9F6C3E]">
            <Heart size={14} fill="#9F6C3E" />
          </span>
        ) : null}
        {recipe.is_public ? (
          <span className="absolute left-3 top-3 rounded-full border border-[#D9C9BF] bg-white/95 px-2.5 py-1 text-[10px] font-medium text-[#664226]">
            Công khai
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-playfair-display text-lg font-semibold leading-snug text-[#664226] line-clamp-2">
          {recipe.title}
        </h3>
        {recipe.description ? (
          <p className="line-clamp-2 text-sm text-[#9F6C3E]/80">
            {recipe.description}
          </p>
        ) : null}

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {recipe.meal_type ? (
            <Pill variant="soft">
              {MEAL_TYPE_LABEL[recipe.meal_type] || recipe.meal_type}
            </Pill>
          ) : null}
          {recipe.cook_time_minutes ? (
            <Pill icon={Clock}>{recipe.cook_time_minutes}p</Pill>
          ) : null}
          {recipe.servings ? (
            <Pill icon={Users}>{recipe.servings} người</Pill>
          ) : null}
          {recipe.difficulty ? (
            <Pill>{DIFFICULTY_LABEL[recipe.difficulty] || recipe.difficulty}</Pill>
          ) : null}
        </div>

        {showAuthor && recipe.author_name ? (
          <div className="mt-1 text-xs text-[#9F6C3E]/70">
            bởi {recipe.author_name}
          </div>
        ) : null}

        {rightAction ? <div className="mt-2">{rightAction}</div> : null}
      </div>
    </a>
  );
}
