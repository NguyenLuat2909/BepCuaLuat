'use client'
import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  X,
  Check,
  Printer,
  Copy,
  RefreshCw,
  ShoppingBasket,
  Carrot,
  Apple,
  Egg,
  Milk,
  Wheat,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import CozyPageHeader from "@/components/CozyPageHeader";
import SoftButton from "@/components/SoftButton";
import EmptyState from "@/components/EmptyState";
import { GROCERY_CATEGORIES } from "@/data/constants";

const CATEGORY_ICONS: Record<string, any> = {
  rau_cu: Carrot,
  trai_cay: Apple,
  thit_ca_trung: Egg,
  sua_dam: Milk,
  ngu_coc: Wheat,
  gia_vi: Sparkles,
  khac: ShoppingBag,
};

export default function GroceryPage() {
  const { data: user, loading } = useUser();
  const router = useRouter();
  const qc = useQueryClient();
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newCat, setNewCat] = useState("khac");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/signin?callbackUrl=/di-cho");
    }
  }, [user, loading, router]);

  const { data, isLoading, refetch } = useQuery<any>({
    queryKey: ["grocery"],
    queryFn: async () => {
      const res = await fetch("/api/grocery");
      if (!res.ok) throw new Error("Không tải được");
      return res.json();
    },
    enabled: !!user,
  });

  const addMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch("/api/grocery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Không thêm được");
      return res.json();
    },
    onSuccess: () => {
      setNewName("");
      setNewQty("");
      refetch();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_checked }: { id: string; is_checked: boolean }) => {
      const res = await fetch(`/api/grocery/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_checked }),
      });
      if (!res.ok) throw new Error("Không cập nhật được");
      return res.json();
    },
    onMutate: async ({ id, is_checked }) => {
      await qc.cancelQueries({ queryKey: ["grocery"] });
      const previous = qc.getQueryData(["grocery"]);
      qc.setQueryData(["grocery"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((it: any) =>
            it.id === id ? { ...it, is_checked } : it,
          ),
        };
      });
      return { previous };
    },
    onError: (err: any, vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(["grocery"], ctx.previous);
      toast.error(err.message);
    },
    onSettled: () => refetch(),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/grocery/items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Không xoá được");
    },
    onSuccess: () => refetch(),
    onError: (e: any) => toast.error(e.message),
  });

  const regenerateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/grocery/generate", { method: "POST" });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Lỗi");
      return j;
    },
    onSuccess: (j) => {
      toast.success(`Đã tạo lại với ${j.count} món từ thực đơn tuần`);
      refetch();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const items = data?.items || [];

  const grouped = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const cat of GROCERY_CATEGORIES) map[cat.value] = [];
    for (const it of items) {
      const key = it.category || "khac";
      if (!map[key]) map[key] = [];
      map[key].push(it);
    }
    return map;
  }, [items]);

  const total = items.length;
  const checked = items.filter((it: any) => it.is_checked).length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addMutation.mutate({
      name: newName.trim(),
      quantity: newQty.trim() || null,
      category: newCat || "khac",
    });
  };

  const handleCopy = () => {
    const lines: string[] = [];
    lines.push("Danh sách đi chợ");
    for (const cat of GROCERY_CATEGORIES) {
      const list = grouped[cat.value] || [];
      if (!list.length) continue;
      lines.push(`\n* ${cat.label}`);
      for (const it of list) {
        const tick = it.is_checked ? "[x]" : "[ ]";
        lines.push(
          `${tick} ${it.name}${it.quantity ? ` — ${it.quantity}` : ""}`,
        );
      }
    }
    navigator.clipboard.writeText(lines.join("\n"));
    toast.success("Đã sao chép danh sách");
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
          Đang tải…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CozyPageHeader
        title="Đi chợ tuần này"
        subtitle="Danh sách tổng hợp từ thực đơn tuần — gọn gàng, gom theo nhóm."
        actions={
          <>
            <SoftButton
              variant="outline"
              onClick={() => regenerateMutation.mutate()}
              disabled={regenerateMutation.isPending}
            >
              <RefreshCw size={14} />
              {regenerateMutation.isPending
                ? "Đang tạo..."
                : "Tạo lại từ thực đơn"}
            </SoftButton>
            <SoftButton variant="outline" onClick={handleCopy}>
              <Copy size={14} /> Sao chép
            </SoftButton>
            <SoftButton variant="outline" onClick={handlePrint}>
              <Printer size={14} /> In
            </SoftButton>
          </>
        }
      />

      {/* Progress */}
      <div className="mt-6 rounded-3xl border border-[#E9DFDA] bg-white p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#9F6C3E]/70">Tiến độ mua sắm</div>
            <div className="font-playfair-display text-2xl font-semibold text-[#664226]">
              {checked} / {total} món
            </div>
          </div>
          <div className="text-right text-xs text-[#9F6C3E]/70">
            {total > 0
              ? `${Math.round((checked / total) * 100)}% hoàn thành`
              : "Chưa có món nào"}
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F3EAE4]">
          <div
            className="h-full rounded-full bg-[#9F6C3E] transition-all"
            style={{
              width: total > 0 ? `${(checked / total) * 100}%` : "0%",
            }}
          />
        </div>
      </div>

      {/* Add item */}
      <form
        onSubmit={handleAdd}
        className="mt-4 grid grid-cols-1 gap-2 rounded-3xl border border-[#E9DFDA] bg-white p-4 md:grid-cols-[1fr_140px_160px_auto]"
      >
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Tên nguyên liệu cần mua"
          className="rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5 text-sm text-[#664226] outline-none focus:border-[#9F6C3E]"
        />
        <input
          type="text"
          value={newQty}
          onChange={(e) => setNewQty(e.target.value)}
          placeholder="Số lượng (VD: 200g)"
          className="rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5 text-sm text-[#664226] outline-none focus:border-[#9F6C3E]"
        />
        <select
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          className="rounded-2xl border border-[#D9C9BF] bg-[#FAF4F1] px-4 py-2.5 text-sm text-[#664226] outline-none focus:border-[#9F6C3E]"
        >
          {GROCERY_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <SoftButton type="submit" variant="primary">
          <Plus size={14} /> Thêm
        </SoftButton>
      </form>

      {/* Items grouped */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-[#9F6C3E]">
            Đang tải…
          </div>
        ) : total === 0 ? (
          <div className="col-span-full">
            <EmptyState
              title="Danh sách trống"
              description="Tạo thực đơn tuần và bấm 'Tạo từ thực đơn' để tự động sinh danh sách, hoặc thêm thủ công ở trên."
              icon={ShoppingBasket}
              action={
                <SoftButton href="/thuc-don-tuan" variant="primary">
                  Mở thực đơn tuần
                </SoftButton>
              }
            />
          </div>
        ) : (
          GROCERY_CATEGORIES.map((cat) => {
            const list = grouped[cat.value] || [];
            if (!list.length) return null;
            return (
              <div
                key={cat.value}
                className="rounded-3xl border border-[#E9DFDA] bg-white p-5"
              >
                <h3 className="flex items-center gap-2 font-playfair-display text-lg font-semibold text-[#664226]">
                  <span className="text-[#9F6C3E]">
                    {React.createElement(CATEGORY_ICONS[cat.value] || ShoppingBag, { size: 20, strokeWidth: 1.5 })}
                  </span>{" "}
                  {cat.label}
                  <span className="ml-auto text-xs text-[#9F6C3E]/70">
                    {list.filter((i) => i.is_checked).length}/{list.length}
                  </span>
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {list.map((it: any) => (
                    <li
                      key={it.id}
                      className={`group flex items-center gap-2 rounded-2xl border px-3 py-2 transition-colors ${
                        it.is_checked
                          ? "border-[#E9DFDA] bg-[#FAF4F1]"
                          : "border-[#E9DFDA] bg-white"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          toggleMutation.mutate({
                            id: it.id,
                            is_checked: !it.is_checked,
                          })
                        }
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border ${
                          it.is_checked
                            ? "border-[#9F6C3E] bg-[#9F6C3E] text-white"
                            : "border-[#D9C9BF] bg-white"
                        }`}
                        aria-label="Đánh dấu mua"
                      >
                        {it.is_checked ? <Check size={12} /> : null}
                      </button>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`truncate text-sm ${
                            it.is_checked
                              ? "text-[#9F6C3E]/60 line-through"
                              : "text-[#664226]"
                          }`}
                        >
                          {it.name}
                        </div>
                        {it.quantity ? (
                          <div className="text-[10px] text-[#9F6C3E]/70">
                            {it.quantity}
                          </div>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteMutation.mutate(it.id)}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#9F6C3E]/60 opacity-0 hover:bg-[#F3EAE4] hover:text-[#9F6C3E] group-hover:opacity-100"
                        aria-label="Xoá"
                      >
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
}
