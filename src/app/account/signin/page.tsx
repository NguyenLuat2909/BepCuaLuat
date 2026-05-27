'use client'
import { useState, useEffect } from "react";
import { BookOpen, Mail, Lock } from "lucide-react";
import useAuth from "@/utils/useAuth";

export default function SignInPage() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
      });
      // Redirect on success
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.");
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div
        className="flex min-h-screen w-full items-center justify-center p-4"
        style={{ backgroundColor: "#FAF4F1" }}
      >
        <div className="h-[500px] w-full max-w-5xl rounded-3xl border border-[#E9DFDA] bg-white animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-4"
      style={{ backgroundColor: "#FAF4F1" }}
    >
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E9DFDA] bg-white shadow-none md:grid-cols-2">
        {/* Illustration column */}
        <div
          className="hidden flex-col justify-between p-10 md:flex"
          style={{ backgroundColor: "#F3EAE4" }}
        >
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9F6C3E] text-white">
              <BookOpen size={18} />
            </span>
            <span className="font-playfair-display text-xl font-semibold text-[#664226]">
              Bếp của Luật
            </span>
          </a>
          <div>
            <h2 className="font-playfair-display text-3xl font-semibold leading-tight text-[#664226]">
              Chào mừng bạn trở lại
              <br />
              gian bếp ấm áp ✿
            </h2>
            <p className="mt-4 text-sm text-[#9F6C3E]/80">
              Sổ tay công thức, thực đơn tuần và danh sách đi chợ — tất cả gọn
              gàng trong một chỗ riêng của bạn.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["🥘", "🍜", "🥗", "🍰", "🍵"].map((e, i) => (
              <span
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D9C9BF] bg-white text-2xl"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Form column */}
        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col justify-center p-8 md:p-12"
        >
          <h1 className="font-playfair-display text-3xl font-semibold text-[#664226]">
            Đăng nhập
          </h1>
          <p className="mt-1 text-sm text-[#9F6C3E]/80">
            Quay lại sổ tay nấu ăn của bạn.
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#664226]">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-3 focus-within:border-[#9F6C3E]">
                <Mail size={16} className="text-[#9F6C3E]" />
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ban@vidu.com"
                  className="w-full bg-transparent text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#664226]">
                Mật khẩu
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-3 focus-within:border-[#9F6C3E]">
                <Lock size={16} className="text-[#9F6C3E]" />
                <input
                  required
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mật khẩu của bạn"
                  className="w-full bg-transparent text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50"
                  suppressHydrationWarning
                />
              </div>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#9F6C3E] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#8B5A30] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F6C3E] focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "Đang đăng nhập…" : "Đăng nhập"}
            </button>

            <p className="text-center text-sm text-[#9F6C3E]/80">
              Chưa có tài khoản?{" "}
              <a
                href="/account/signup"
                className="font-medium text-[#9F6C3E] hover:text-[#8B5A30]"
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
