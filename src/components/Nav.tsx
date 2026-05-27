'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  CalendarDays,
  ShoppingBasket,
  Sparkles,
  Home,
  Menu,
  X,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import useUser from "@/utils/useUser";

const LINKS = [
  { href: "/", label: "Trang chủ", icon: Home, exact: true },
  { href: "/cong-thuc", label: "Công thức", icon: BookOpen },
  { href: "/kham-pha", label: "Khám phá", icon: Compass },
  { href: "/thuc-don-tuan", label: "Thực đơn tuần", icon: CalendarDays },
  { href: "/di-cho", label: "Đi chợ", icon: ShoppingBasket },
  { href: "/ai", label: "AI Trợ lý", icon: Sparkles },
];

function isActive(href: string, pathname: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Nav() {
  const { data: user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || "/";

  return (
    <header
      className="sticky top-0 z-30 border-b border-[#E9DFDA] bg-[#FAF4F1]/90 backdrop-blur"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9F6C3E] text-white">
            <BookOpen size={18} />
          </span>
          <span className="font-playfair-display text-xl font-semibold text-[#664226]">
            Bếp của Luật
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => {
            const Icon = l.icon;
            const active = isActive(l.href, pathname, l.exact);
            return (
              <a
                key={l.href}
                href={l.href}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#F3EAE4] text-[#664226]"
                    : "text-[#664226]/70 hover:bg-[#F3EAE4] hover:text-[#664226]"
                }`}
              >
                <Icon size={16} />
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <div className="flex items-center gap-2">
              <a
                href="/cong-thuc/them"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#9F6C3E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8B5A30]"
              >
                + Thêm công thức
              </a>
              <div className="flex items-center gap-2 rounded-full border border-[#D9C9BF] bg-white px-3 py-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3EAE4] text-[#9F6C3E]">
                  <UserIcon size={14} />
                </span>
                <span className="max-w-[120px] truncate text-xs text-[#664226]">
                  {user.name || user.email}
                </span>
                <a
                  href="/account/logout"
                  className="text-[#9F6C3E] hover:text-[#8B5A30]"
                  title="Đăng xuất"
                >
                  <LogOut size={14} />
                </a>
              </div>
            </div>
          ) : (
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
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((s) => !s)}
          className="rounded-full border border-[#D9C9BF] bg-white p-2 text-[#664226] lg:hidden"
          aria-label="Mở menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[#E9DFDA] bg-[#FAF4F1] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {LINKS.map((l) => {
              const Icon = l.icon;
              const active = isActive(l.href, pathname, l.exact);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium ${
                    active
                      ? "bg-[#F3EAE4] text-[#664226]"
                      : "text-[#664226]/80 hover:bg-[#F3EAE4]"
                  }`}
                >
                  <Icon size={16} />
                  {l.label}
                </a>
              );
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-[#E9DFDA] pt-3">
              {user ? (
                <>
                  <a
                    href="/cong-thuc/them"
                    className="inline-flex items-center justify-center rounded-full bg-[#9F6C3E] px-4 py-2 text-sm font-medium text-white"
                  >
                    + Thêm công thức
                  </a>
                  <a
                    href="/account/logout"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D9C9BF] bg-white px-4 py-2 text-sm font-medium text-[#664226]"
                  >
                    <LogOut size={14} /> Đăng xuất
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/account/signin"
                    className="inline-flex items-center justify-center rounded-full border border-[#D9C9BF] bg-white px-4 py-2 text-sm font-medium text-[#664226]"
                  >
                    Đăng nhập
                  </a>
                  <a
                    href="/account/signup"
                    className="inline-flex items-center justify-center rounded-full bg-[#9F6C3E] px-4 py-2 text-sm font-medium text-white"
                  >
                    Đăng ký
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
