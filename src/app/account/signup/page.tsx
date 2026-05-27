'use client'
import { useState } from "react";
import { BookOpen, Mail, Lock, User as UserIcon } from "lucide-react";
import useAuth from "@/utils/useAuth";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithCredentials } = useAuth();

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
      await signUpWithCredentials({
        email,
        password,
        name: name || undefined,
      });
      // Success, sign-in will be handled automatically or they can sign in.
      // Redirect to home
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-4"
      style={{ backgroundColor: "#FAF4F1" }}
    >
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-[#E9DFDA] bg-white md:grid-cols-2">
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
              Bắt đầu sổ tay
              <br />
              nấu ăn của riêng bạn ✿
            </h2>
            <p className="mt-4 text-sm text-[#9F6C3E]/80">
              Lưu công thức, lên thực đơn tuần kéo thả, tự tạo danh sách đi chợ
              và có trợ lý AI luôn sẵn sàng gợi ý.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["🌿", "🥑", "🍅", "🥕", "🫐"].map((e, i) => (
              <span
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D9C9BF] bg-white text-2xl"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          className="flex flex-col justify-center p-8 md:p-12"
        >
          <h1 className="font-playfair-display text-3xl font-semibold text-[#664226]">
            Tạo tài khoản
          </h1>
          <p className="mt-1 text-sm text-[#9F6C3E]/80">
            Miễn phí — và rất đáng yêu.
          </p>

          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#664226]">
                Tên hiển thị
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-3 focus-within:border-[#9F6C3E]">
                <UserIcon size={16} className="text-[#9F6C3E]" />
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên thân mật của bạn"
                  className="w-full bg-transparent text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50"
                />
              </div>
            </div>

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
                  placeholder="Tạo mật khẩu"
                  className="w-full bg-transparent text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50"
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
              {loading ? "Đang tạo tài khoản…" : "Đăng ký"}
            </button>

            <p className="text-center text-sm text-[#9F6C3E]/80">
              Đã có tài khoản?{" "}
              <a
                href="/account/signin"
                className="font-medium text-[#9F6C3E] hover:text-[#8B5A30]"
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
