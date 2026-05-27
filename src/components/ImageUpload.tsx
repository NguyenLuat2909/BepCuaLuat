'use client'
import { useRef, useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import useUpload from "@/utils/useUpload";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  className?: string;
}

export default function ImageUpload({ value, onChange, className = "" }: ImageUploadProps) {
  const [upload, { loading }] = useUpload();
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file) return;
      setLocalError(null);
      try {
        const { url, error, mimeType } = await upload({ file });
        if (error) {
          setLocalError(error);
          toast.error("Tải ảnh thất bại: " + error);
          return;
        }
        if (mimeType && !mimeType.startsWith("image/")) {
          setLocalError("File không phải ảnh");
          toast.error("File không phải ảnh");
          return;
        }
        if (url) {
          onChange?.(url);
        }
      } catch (e) {
        console.error(e);
        setLocalError("Có lỗi xảy ra khi tải ảnh");
        toast.error("Có lỗi xảy ra khi tải ảnh");
      }
    },
    [onChange, upload],
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
      {value ? (
        <div className="relative overflow-hidden rounded-3xl border border-[#E9DFDA] bg-white">
          <img
            src={value}
            alt="Ảnh bìa món ăn"
            className="h-64 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange?.("")}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#664226] hover:bg-[#F3EAE4]"
            aria-label="Xoá ảnh"
          >
            <X size={14} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#664226] hover:bg-[#F3EAE4]"
          >
            <Upload size={12} /> Đổi ảnh
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-[#D9C9BF] bg-white text-[#9F6C3E] transition-colors hover:bg-[#FAF4F1]"
        >
          {loading ? (
            <div className="text-sm">Đang tải ảnh…</div>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3EAE4]">
                <ImageIcon size={20} />
              </span>
              <span className="text-sm font-medium">
                Bấm để tải ảnh bìa món ăn
              </span>
              <span className="text-xs text-[#9F6C3E]/70">
                hoặc kéo thả ảnh vào đây
              </span>
            </>
          )}
        </button>
      )}
      {localError ? (
        <p className="mt-2 text-xs text-red-600">{localError}</p>
      ) : null}
    </div>
  );
}
