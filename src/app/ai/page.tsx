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
import ReactMarkdown from "react-markdown";

export default function AIPage() {
  const { data: user, loading } = useUser();
  const [planLoading, setPlanLoading] = useState(false);
  const [planText, setPlanText] = useState<string | null>(null);
  const [planData, setPlanData] = useState<any[] | null>(null);
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
    setPlanData(null);
    try {
      const res = await fetch("/api/ai/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      
      const text = await res.text();
      let j;
      try {
        j = JSON.parse(text);
      } catch (err) {
        console.error("Server returned non-JSON response:", text);
        throw new Error(`Server returned HTML error (Status ${res.status}). See console for details.`);
      }

      if (!res.ok) throw new Error(j.error || "Lỗi");

      let parsedPlan = null;
      if (j.plan) {
        if (Array.isArray(j.plan)) {
          parsedPlan = j.plan;
        } else if (typeof j.plan === 'object' && Array.isArray(j.plan.plan)) {
          parsedPlan = j.plan.plan;
        }
      }

      // Hỗ trợ parse JSON trực tiếp ở Client nếu Server trả về content là chuỗi JSON
      if (!parsedPlan && j.content) {
        try {
          const textVal = j.content;
          const a = textVal.indexOf("{");
          const b = textVal.indexOf("[");
          const s = a === -1 ? b : (b === -1 ? a : Math.min(a, b));
          const e = Math.max(textVal.lastIndexOf("}"), textVal.lastIndexOf("]"));
          if (s !== -1 && e !== -1 && s < e) {
            const slice = textVal.slice(s, e + 1);
            const parsed = JSON.parse(slice);
            if (Array.isArray(parsed)) {
              parsedPlan = parsed;
            } else if (parsed && Array.isArray(parsed.plan)) {
              parsedPlan = parsed.plan;
            }
          }
        } catch (err) {
          console.warn("Client-side parse failed:", err);
        }
      }

      if (parsedPlan) {
        setPlanData(parsedPlan);
      } else {
        setPlanText(j.content || JSON.stringify(j.plan, null, 2));
      }
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
              {planLoading ? "Đang tạo..." : "Tạo thực đơn (Bảng)"}
            </SoftButton>
          </div>
          {planText ? (
            <div className="mt-4 rounded-2xl border border-[#E9DFDA] bg-[#FAF4F1] p-4 text-sm leading-relaxed text-[#664226]">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="font-playfair-display font-bold text-[#664226] mt-4 mb-2 text-lg" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="font-playfair-display font-semibold text-[#664226] mt-3.5 mb-1.5 text-base" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="font-playfair-display font-semibold text-[#664226] mt-3 mb-1 text-base" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="font-semibold text-[#664226] mt-2.5 mb-0.5 text-sm" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed text-[#664226]" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2.5 space-y-1 text-[#664226]" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2.5 space-y-1 text-[#664226]" {...props} />,
                  li: ({ node, ...props }) => <li className="text-sm my-0.5" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold text-[#664226]" {...props} />
                }}
              >
                {planText}
              </ReactMarkdown>
            </div>
          ) : null}

          {planData ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-[#E9DFDA] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[#664226]">
                  <thead>
                    <tr className="border-b border-[#E9DFDA] bg-[#F3EAE4] text-xs font-semibold uppercase tracking-wider text-[#9F6C3E]">
                      <th className="p-4 font-semibold">Thứ / Ngày</th>
                      <th className="p-4 font-semibold">Bữa sáng 🍳</th>
                      <th className="p-4 font-semibold">Bữa trưa 🍲</th>
                      <th className="p-4 font-semibold">Bữa tối 🍚</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9DFDA]">
                    {planData.map((day, idx) => (
                      <tr key={day.day_of_week || idx} className="hover:bg-[#FAF4F1]/50 transition-colors">
                        <td className="p-4 font-medium text-[#9F6C3E] whitespace-nowrap bg-[#FAF4F1]/30">
                          {day.day_label || `Thứ ${day.day_of_week + 1}`}
                        </td>
                        <td className="p-4">{day.meals?.sang || day.meals?.breakfast || '-'}</td>
                        <td className="p-4">{day.meals?.trua || day.meals?.lunch || '-'}</td>
                        <td className="p-4">{day.meals?.toi || day.meals?.dinner || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
