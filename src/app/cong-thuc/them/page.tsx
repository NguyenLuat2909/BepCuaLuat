'use client'
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import CozyPageHeader from "@/components/CozyPageHeader";
import RecipeForm from "@/components/RecipeForm";

export default function AddRecipePage() {
  const { data: user, loading } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/signin?callbackUrl=/cong-thuc/them");
    }
  }, [user, loading, router]);

  const handleSubmit = async (payload: any) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Không lưu được công thức");
      }
      const j = await res.json();
      toast.success("Đã lưu công thức ✿");
      router.push(`/cong-thuc/${j.recipe.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
          Đang chuẩn bị…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CozyPageHeader
        title="Thêm công thức mới"
        subtitle="Lưu lại bí quyết nấu ăn của bạn vào sổ tay riêng."
      />
      <div className="mt-6">
        <RecipeForm
          onSubmit={handleSubmit}
          submitting={submitting}
          onCancel={() => router.push("/cong-thuc")}
        />
      </div>
    </Layout>
  );
}
