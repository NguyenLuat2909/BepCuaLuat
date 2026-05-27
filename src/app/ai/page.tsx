'use client'
import { useState, useEffect } from "react";
import {
  Sparkles,
  Carrot,
  CalendarDays,
  Replace,
  FileText,
  Wand2,
  Info,
} from "lucide-react";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import CozyPageHeader from "@/components/CozyPageHeader";
import AiSuggestionBox from "@/components/AiSuggestionBox";
import SoftButton from "@/components/SoftButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AIPage() {
  const { data: user, loading } = useUser();
  const [planLoading, setPlanLoading] = useState(false);
  const [planText, setPlanText] = useState<string | null>(null);
  const [goal, setGoal] = useState("ăn healthy");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/signin?callbackUrl=/ai");
    }
  }, [user, loading, router]);

  const handleGeneratePlan = async () => {
    setPlanLoading(true);
    setPlanText(null);
    try {
      const res = await fetch("/api/ai/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Lỗi");
      setPlanText(j.content || JSON.stringify(j.plan, null, 2));
    } catch (e: any) {
      toast.error(e.message || "Lỗi");
    } finally {
      setPlanLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
          Đang mở trợ lý…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CozyPageHeader
        title="Trợ lý AI nấu ăn"
        subtitle="Gợi ý món, thay thế nguyên liệu, tóm tắt công thức — luôn sẵn sàng hỗ trợ căn bếp của bạn."
      />

      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-[#E9DFDA] bg-[#F3EAE4] px-4 py-3 text-xs text-[#664226]">
        <Info size={14} className="mt-0.5 flex-shrink-0 text-[#9F6C3E]" />
        <span>
          Gợi ý AI chỉ mang tính tham khảo — không thay thế tư vấn y tế hay dinh
          dưỡng chuyên nghiệp.
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AiSuggestionBox
          title="Gợi ý món từ nguyên liệu"
          description="Nhập những thứ bạn đang có, AI sẽ gợi ý món Việt phù hợp."
          endpoint="/api/ai/suggest-from-ingredients"
          buildPayload={(input) => ({ ingredients: input })}
          placeholder="VD: thịt bò, hành tây, cà chua, trứng…"
          inputType="textarea"
          rows={3}
          icon={Carrot}
        />

        <AiSuggestionBox
          title="Gợi ý thay thế nguyên liệu"
          description="Hết một nguyên liệu? Hỏi AI cách thay thế tương đương."
          endpoint="/api/ai/substitute-ingredient"
          buildPayload={(input) => ({ ingredient: input })}
          placeholder="VD: nước mắm"
          inputType="text"
          icon={Replace}
        />

        <AiSuggestionBox
          title="Tóm tắt công thức"
          description="Dán một công thức dài, AI rút thành 5-7 bước ngắn gọn."
          endpoint="/api/ai/summarize-recipe"
          buildPayload={(input) => ({ recipe_text: input })}
          placeholder="Dán công thức tại đây…"
          inputType="textarea"
          rows={6}
          icon={FileText}
        />

        <AiSuggestionBox
          title="Phiên bản dễ nấu hơn"
          description="AI đơn giản hoá công thức — ít nguyên liệu, ít bước."
          endpoint="/api/ai/simplify-recipe"
          buildPayload={(input) => ({ recipe_text: input })}
          placeholder="Dán công thức tại đây…"
          inputType="textarea"
          rows={6}
          icon={Wand2}
        />

        {/* Meal plan generator */}
        <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5 lg:col-span-2">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F3EAE4] text-[#9F6C3E]">
              <CalendarDays size={18} />
            </span>
            <div className="flex-1">
              <h3 className="font-playfair-display text-lg font-semibold text-[#664226]">
                Tạo thực đơn 7 ngày
              </h3>
              <p className="text-sm text-[#9F6C3E]/80">
                Chọn mục tiêu — AI gợi ý thực đơn cho cả tuần.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center">
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="flex-1 rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5 text-sm text-[#664226] outline-none focus:border-[#9F6C3E]"
            >
              <option value="ăn healthy">Ăn healthy cân bằng</option>
              <option value="giảm cân">Giảm cân</option>
              <option value="tăng cơ">Tăng cơ</option>
              <option value="tiết kiệm">Tiết kiệm</option>
              <option value="nhanh gọn">Nhanh gọn (ít hơn 30 phút)</option>
              <option value="món chay">Ăn chay</option>
              <option value="gia đình">Bữa cơm gia đình</option>
            </select>
            <SoftButton
              variant="primary"
              onClick={handleGeneratePlan}
              disabled={planLoading}
            >
              <Sparkles size={14} />
              {planLoading ? "Đang tạo..." : "Tạo thực đơn"}
            </SoftButton>
          </div>
          {planText ? (
            <div className="mt-4 whitespace-pre-wrap rounded-2xl border border-[#E9DFDA] bg-[#FAF4F1] p-4 text-sm leading-relaxed text-[#664226]">
              {planText}
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
