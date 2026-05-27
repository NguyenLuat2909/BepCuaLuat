'use client'
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import Layout from "@/components/Layout";
import CozyPageHeader from "@/components/CozyPageHeader";
import RecipeForm from "@/components/RecipeForm";

interface EditRecipePageProps {
  params: {
    id: string;
  };
}

export default function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = params;
  const { data: user, loading } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/account/signin?callbackUrl=/cong-thuc/${id}/sua`);
    }
  }, [user, loading, id, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["recipe-edit", id],
    queryFn: async () => {
      const res = await fetch(`/api/recipes/${id}`);
      if (!res.ok) throw new Error("Không tải được");
      return res.json();
    },
    enabled: !!user,
  });

  const recipe = data?.recipe;

  const handleSubmit = async (payload: any) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Không lưu được");
      }
      toast.success("Đã cập nhật ✿");
      router.push(`/cong-thuc/${id}`);
    } catch (e: any) {
      toast.error(e.message || "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user || isLoading || !recipe) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center text-[#9F6C3E]">
          Đang mở công thức…
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <CozyPageHeader
        title={`Sửa: ${recipe.title}`}
        subtitle="Chỉnh sửa công thức của bạn."
      />
      <div className="mt-6">
        <RecipeForm
          initial={recipe}
          onSubmit={handleSubmit}
          submitting={submitting}
          onCancel={() => router.push(`/cong-thuc/${id}`)}
        />
      </div>
    </Layout>
  );
}
