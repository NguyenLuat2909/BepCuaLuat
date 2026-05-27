'use client'
import { useState } from "react";
import { Sparkles, Loader2, LucideIcon } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface AiSuggestionBoxProps {
  title: string;
  description: string;
  endpoint: string;
  buildPayload?: (input: string) => any;
  placeholder?: string;
  inputType?: "textarea" | "text";
  rows?: number;
  icon?: LucideIcon;
}

export default function AiSuggestionBox({
  title,
  description,
  endpoint,
  buildPayload,
  placeholder = "Nhập…",
  inputType = "textarea",
  rows = 4,
  icon: Icon = Sparkles,
}: AiSuggestionBoxProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return;
    }
    setLoading(true);
    setResponse(null);
    try {
      const payload = buildPayload ? buildPayload(input) : { input };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "AI gặp lỗi");
      setResponse(j.content || j.plan || "Không có phản hồi");
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#E9DFDA] bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F3EAE4] text-[#9F6C3E]">
          <Icon size={18} />
        </span>
        <div className="flex-1">
          <h3 className="font-playfair-display text-lg font-semibold text-[#664226]">
            {title}
          </h3>
          <p className="text-sm text-[#9F6C3E]/80">{description}</p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        {inputType === "textarea" ? (
          <textarea
            rows={rows}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5 text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50 focus:border-[#9F6C3E]"
          />
        ) : (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5 text-sm text-[#664226] outline-none placeholder:text-[#9F6C3E]/50 focus:border-[#9F6C3E]"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#9F6C3E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8B5A30] disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Sparkles size={14} />
          )}
          {loading ? "Đang nghĩ..." : "Hỏi AI"}
        </button>
      </form>
      {response ? (
        <div className="mt-4 rounded-2xl border border-[#E9DFDA] bg-[#FAF4F1] p-4 text-sm leading-relaxed text-[#664226]">
          {typeof response === "string" ? (
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
              {response}
            </ReactMarkdown>
          ) : (
            <pre className="overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>
      ) : null}
    </div>
  );
}
