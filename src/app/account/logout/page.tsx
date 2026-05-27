'use client'
import { BookOpen, LogOut } from "lucide-react";
import useAuth from "@/utils/useAuth";

export default function LogoutPage() {
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      window.location.href = "/";
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-4"
      style={{ backgroundColor: "#FAF4F1" }}
    >
      <div className="w-full max-w-md rounded-3xl border border-[#E9DFDA] bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3EAE4] text-[#9F6C3E]">
          <BookOpen size={24} />
        </div>
        <h1 className="font-playfair-display text-2xl font-semibold text-[#664226]">
          Tạm biệt nhé!
        </h1>
        <p className="mt-2 text-sm text-[#9F6C3E]/80">
          Sổ tay nấu ăn sẽ luôn ở đây chờ bạn quay lại.
        </p>
        <button
          onClick={handleSignOut}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#9F6C3E] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#8B5A30]"
        >
          <LogOut size={16} /> Đăng xuất
        </button>
        <a
          href="/"
          className="mt-3 inline-block text-sm text-[#9F6C3E]/80 hover:text-[#9F6C3E]"
        >
          ← Quay về trang chủ
        </a>
      </div>
    </div>
  );
}
