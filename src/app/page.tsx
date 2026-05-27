'use client'
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  CalendarDays,
  ShoppingBasket,
  Heart,
  Sparkles,
  ArrowRight,
  ChefHat,
  Leaf,
  Coffee,
} from "lucide-react";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import SoftButton from "@/components/SoftButton";
import StatsCard from "@/components/StatsCard";
import RecipeCard from "@/components/RecipeCard";
import { RecipeCardSkeleton } from "@/components/LoadingSkeleton";
import EmptyState from "@/components/EmptyState";
import { MEAL_TYPE_LABEL } from "@/data/constants";

function LandingHero() {
  return (
    <Layout hideNav>
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between pb-10">
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9F6C3E] text-white">
              <BookOpen size={18} />
            </span>
            <span className="font-playfair-display text-xl font-semibold text-[#664226]">
              Bếp của Luật
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/account/signin"
              className="rounded-full px-4 py-2 text-sm font-medium text-[#664226] hover:bg-[#F3EAE4]"
            >
              Đăng nhập
            </a>
            <a
              href="/account/signup"
              className="rounded-full bg-[#9F6C3E] px-4 py-2 text-sm font-medium text-white hover:bg-[#8B5A30]"
            >
              Đăng ký
            </a>
          </div>
        </header>

        <section className="grid grid-cols-1 items-center gap-10 py-8 md:grid-cols-2 md:py-12">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9C9BF] bg-white px-3 py-1 text-xs font-medium text-[#9F6C3E]">
              <Sparkles size={12} /> Sổ tay nấu ăn cá nhân
            </span>
            <h1 className="mt-4 font-playfair-display text-4xl font-semibold leading-tight text-[#664226] md:text-6xl">
              Bếp của Luật
            </h1>
            <p className="mt-4 max-w-lg text-base text-[#9F6C3E]/90 md:text-lg">
              Sổ tay công thức và thực đơn tuần của riêng bạn — ấm áp, gọn gàng,
              và có trợ lý AI luôn sẵn sàng gợi ý món ngon.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <SoftButton href="/account/signup" variant="primary" size="lg">
                Bắt đầu nấu ăn <ArrowRight size={16} />
              </SoftButton>
              <SoftButton href="/kham-pha" variant="outline" size="lg">
                Khám phá công thức
              </SoftButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { icon: ChefHat, text: "Lưu công thức" },
                { icon: CalendarDays, text: "Lên thực đơn tuần" },
                { icon: ShoppingBasket, text: "Danh sách đi chợ" },
                { icon: Sparkles, text: "AI gợi ý món" },
              ].map((f) => {
                const I = f.icon;
                return (
                  <span
                    key={f.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E9DFDA] bg-white px-3 py-1.5 text-xs font-medium text-[#664226]"
                  >
                    <I size={12} className="text-[#9F6C3E]" />
                    {f.text}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div
              className="aspect-square w-full overflow-hidden rounded-[40px] border border-[#E9DFDA]"
              style={{ backgroundColor: "#F3EAE4" }}
            >
              <img
                src="https://raw.createusercontent.com/526f5c7f-86e3-4202-9dff-06149dab15cf/"
                alt="Bếp ấm áp của bạn"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-3xl border border-[#E9DFDA] bg-white px-4 py-3 md:flex md:items-center md:gap-2">
              <Heart size={14} className="text-[#9F6C3E]" fill="#9F6C3E" />
              <span className="text-xs font-medium text-[#664226]">
                Nấu ăn là yêu thương
              </span>
            </div>
            <div className="absolute -right-3 -top-3 hidden rounded-3xl border border-[#E9DFDA] bg-white px-4 py-3 md:flex md:items-center md:gap-2">
              <Leaf size={14} className="text-[#9F6C3E]" />
              <span className="text-xs font-medium text-[#664226]">
                Lành mạnh, đơn giản
              </span>
            </div>
          </div>
        </section>

        <section
          className="mt-12 rounded-3xl border border-[#E9DFDA] p-8 md:p-12"
          style={{ backgroundColor: "#F3EAE4" }}
        >
          <h2 className="font-playfair-display text-2xl font-semibold text-[#664226] md:text-3xl">
            Mọi thứ cho căn bếp của bạn
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#9F6C3E]/80">
            Từ lưu công thức, lên thực đơn 7 ngày bằng kéo thả, đến danh sách đi
            chợ tự tổng hợp — Bếp của Luật chăm chút từng chi tiết nhỏ.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Sổ tay công thức",
                desc: "Lưu món yêu thích, ảnh bìa, tags, ghi chú riêng — như cuốn sổ giấy nhưng đẹp hơn.",
              },
              {
                icon: CalendarDays,
                title: "Thực đơn tuần kéo thả",
                desc: "Sắp xếp món cho cả tuần chỉ trong vài phút. Bữa sáng, trưa, tối — gọn gàng.",
              },
              {
                icon: Sparkles,
                title: "Trợ lý AI",
                desc: "Gợi ý món từ nguyên liệu sẵn có, thay thế gia vị, tóm tắt công thức dài.",
              },
            ].map((f) => {
              const I = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-3xl border border-[#E9DFDA] bg-white p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EAE4] text-[#9F6C3E]">
                    <I size={18} />
                  </span>
                  <h3 className="mt-4 font-playfair-display text-lg font-semibold text-[#664226]">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#9F6C3E]/80">{f.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <SoftButton href="/account/signup" variant="primary">
              Tạo sổ tay của tôi
            </SoftButton>
            <SoftButton href="/kham-pha" variant="ghost">
              Xem công thức công khai →
            </SoftButton>
          </div>
        </section>
      </div>
    </Layout>
  );
}

function Dashboard({ user }: { user: any }) {
  const { data: stats, isLoading: statsLoading } = useQuery<any>({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) throw new Error("Không tải được thống kê");
      return res.json();
    },
  });

  const { data: featured, isLoading: featuredLoading } = useQuery<any>({
    queryKey: ["dashboard-featured"],
    queryFn: async () => {
      const res = await fetch("/api/recipes?limit=4");
      if (!res.ok) throw new Error("Không tải được công thức");
      return res.json();
    },
  });

  const { data: todayPlan } = useQuery<any>({
    queryKey: ["dashboard-today"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/today");
      if (!res.ok) throw new Error("Không tải được hôm nay");
      return res.json();
    },
  });

  const firstName = (user.name || user.email || "bạn").split(" ")[0];

  return (
    <Layout>
      {/* Hero greeting */}
      <section className="rounded-3xl border border-[#E9DFDA] bg-white p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9C9BF] bg-[#F3EAE4] px-3 py-1 text-xs font-medium text-[#9F6C3E]">
              <Coffee size={12} /> Chào buổi mới
            </span>
            <h1 className="mt-3 font-playfair-display text-3xl font-semibold text-[#664226] md:text-4xl">
              Xin chào, {firstName} ✿
            </h1>
            <p className="mt-2 max-w-xl text-sm text-[#9F6C3E]/80 md:text-base">
              Hôm nay bạn muốn nấu món gì? Lật mở sổ tay nấu ăn của bạn nào.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SoftButton href="/cong-thuc/them" variant="primary">
              + Thêm công thức
            </SoftButton>
            <SoftButton href="/ai" variant="outline">
              <Sparkles size={14} /> Gợi ý bằng AI
            </SoftButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        <StatsCard
          icon={BookOpen}
          label="Công thức đã lưu"
          value={statsLoading ? "…" : (stats?.recipes ?? 0)}
          href="/cong-thuc"
        />
        <StatsCard
          icon={CalendarDays}
          label="Món trong tuần"
          value={statsLoading ? "…" : (stats?.meals_this_week ?? 0)}
          href="/thuc-don-tuan"
        />
        <StatsCard
          icon={ShoppingBasket}
          label="Cần mua sắm"
          value={statsLoading ? "…" : (stats?.grocery_pending ?? 0)}
          href="/di-cho"
        />
        <StatsCard
          icon={Heart}
          label="Món yêu thích"
          value={statsLoading ? "…" : (stats?.favorites ?? 0)}
          href="/cong-thuc?favorite=1"
        />
      </section>

      {/* Today */}
      <section className="mt-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-playfair-display text-2xl font-semibold text-[#664226]">
              Hôm nay ăn gì?
            </h2>
            <p className="text-sm text-[#9F6C3E]/80">
              Thực đơn của ngày hôm nay theo kế hoạch tuần.
            </p>
          </div>
          <a
            href="/thuc-don-tuan"
            className="hidden text-sm font-medium text-[#9F6C3E] hover:text-[#8B5A30] md:inline"
          >
            Mở thực đơn tuần →
          </a>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {["sang", "trua", "toi"].map((slot) => {
            const item = todayPlan?.items?.find((i: any) => i.meal_slot === slot);
            return (
              <div
                key={slot}
                className="rounded-3xl border border-[#E9DFDA] bg-white p-5"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-[#9F6C3E]/70">
                  {MEAL_TYPE_LABEL[slot]}
                </div>
                {item ? (
                  <a
                    href={`/cong-thuc/${item.recipe_id}`}
                    className="mt-3 block"
                  >
                    <div className="font-playfair-display text-lg font-semibold text-[#664226]">
                      {item.title}
                    </div>
                    {item.cook_time_minutes ? (
                      <div className="mt-1 text-xs text-[#9F6C3E]/80">
                        {item.cook_time_minutes} phút
                      </div>
                    ) : null}
                  </a>
                ) : (
                  <div className="mt-3 text-sm text-[#9F6C3E]/70">
                    Chưa có món — vào{" "}
                    <a
                      href="/thuc-don-tuan"
                      className="font-medium text-[#9F6C3E] hover:text-[#8B5A30]"
                    >
                      thực đơn tuần
                    </a>{" "}
                    để thêm nhé.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured recipes */}
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-playfair-display text-2xl font-semibold text-[#664226]">
              Công thức gần đây
            </h2>
            <p className="text-sm text-[#9F6C3E]/80">
              Những món mới nhất trong sổ tay của bạn.
            </p>
          </div>
          <a
            href="/cong-thuc"
            className="hidden text-sm font-medium text-[#9F6C3E] hover:text-[#8B5A30] md:inline"
          >
            Xem tất cả →
          </a>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredLoading ? (
            <>
              <RecipeCardSkeleton />
              <RecipeCardSkeleton />
              <RecipeCardSkeleton />
              <RecipeCardSkeleton />
            </>
          ) : featured?.recipes?.length ? (
            featured.recipes.map((r: any) => <RecipeCard key={r.id} recipe={r} />)
          ) : (
            <div className="col-span-full">
              <EmptyState
                title="Sổ tay đang trống"
                description="Bắt đầu thêm công thức đầu tiên để mở sổ tay của bạn nhé."
                action={
                  <SoftButton href="/cong-thuc/them" variant="primary">
                    + Thêm công thức đầu tiên
                  </SoftButton>
                }
              />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default function HomePage() {
  const { data: user, loading } = useUser();

  if (loading) {
    return (
      <Layout hideNav>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="font-playfair-display text-xl text-[#9F6C3E]">
            Đang mở sổ tay…
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <LandingHero />;
  }

  return <Dashboard user={user} />;
}
