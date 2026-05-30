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
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Lỗi");
      
      let rawData = j.plan;
      if (!rawData && j.content) {
        try {
          const parsed = JSON.parse(j.content);
          rawData = parsed;
        } catch (e) {
          // Không phải JSON chuẩn
        }
      }

      if (rawData) {
        // Trường hợp 1: data là mảng trực tiếp
        if (Array.isArray(rawData)) {
          setPlanData(rawData);
        }
        // Trường hợp 2: data là object chứa thuộc tính plan dạng mảng
        else if (rawData.plan && Array.isArray(rawData.plan)) {
          setPlanData(rawData.plan);
        }
        // Trường hợp 3: data là object chứa các ngày (ví dụ: { "Thứ 2": {...}, "Thứ 3": {...} })
        else if (typeof rawData === "object") {
          const values = Object.values(rawData);
          if (values.length > 0 && values.every(v => typeof v === "object")) {
            // Chuyển đổi key thành nhãn nếu thiếu day_label
            const normalized = Object.keys(rawData).map((key, i) => {
              const val = rawData[key];
              return {
                day_label: val.day_label || key,
                day_of_week: val.day_of_week || (i + 1),
                meals: val.meals || val
              };
            });
            setPlanData(normalized);
          } else {
            setPlanText(j.content || JSON.stringify(j.plan, null, 2));
          }
        } else {
          setPlanText(j.content || JSON.stringify(j.plan, null, 2));
        }
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
              {planLoading ? "Đang tạo..." : "Tạo thực đơn"}
            </SoftButton>
          </div>
          {planData ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-[#E9DFDA] bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-[#664226]">
                  <thead>
                    <tr className="bg-[#664226] text-white">
                      <th className="whitespace-nowrap px-5 py-3 font-playfair-display text-sm font-semibold tracking-wider">Ngày</th>
                      <th className="px-5 py-3 font-playfair-display text-sm font-semibold tracking-wider">Bữa sáng</th>
                      <th className="px-5 py-3 font-playfair-display text-sm font-semibold tracking-wider">Bữa trưa</th>
                      <th className="px-5 py-3 font-playfair-display text-sm font-semibold tracking-wider">Bữa tối</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9DFDA]">
                    {planData.map((day: any, idx: number) => (
                      <tr 
                        key={day.day_of_week || idx} 
                        className="transition-colors duration-150 hover:bg-[#FAF4F1]/40 odd:bg-[#FAF4F1]/10"
                      >
                        <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-[#9F6C3E]">
                          {day.day_label || `Thứ ${day.day_of_week + 1}`}
                        </td>
                        <td className="px-5 py-3.5 text-[#4A3728] leading-relaxed">
                          {day.meals?.sang || day.meals?.breakfast || "-"}
                        </td>
                        <td className="px-5 py-3.5 text-[#4A3728] leading-relaxed">
                          {day.meals?.trua || day.meals?.lunch || "-"}
                        </td>
                        <td className="px-5 py-3.5 text-[#4A3728] leading-relaxed">
                          {day.meals?.toi || day.meals?.dinner || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : planText ? (
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
        </div>
      </div>
    </Layout>
  );
}
