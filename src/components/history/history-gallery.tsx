"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { toast } from "sonner";

type HistoryImage = {
  id: string;
  prompt: string;
  imageUrl: string;
  createdAt: Date | string;
};

type HistoryGalleryProps = {
  images: HistoryImage[];
};

export default function HistoryGallery({ images }: HistoryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<HistoryImage | null>(null);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("画像をダウンロードしました");
    } catch (error) {
      console.error(error);
      toast.error("ダウンロードに失敗しました");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedImage(image)}
            className="group overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-square bg-slate-100">
              <Image
                src={image.imageUrl}
                alt={image.prompt}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/0 transition duration-200 group-hover:bg-black/40" />

              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="rounded-xl bg-white/90 p-3 backdrop-blur-sm">
                  <p className="line-clamp-2 text-sm font-medium text-slate-800">
                    {image.prompt}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(image.createdAt).toLocaleString("ja-JP")}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image.imageUrl);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    ダウンロード
                  </Button>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white"
              aria-label="閉じる"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-slate-100">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.prompt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between rounded-xl border bg-slate-50 p-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Prompt
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-800">
                      {selectedImage.prompt}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Created
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {new Date(selectedImage.createdAt).toLocaleString(
                        "ja-JP",
                      )}
                    </p>
                  </div>
                </div>

                <Button
                  className="mt-6 w-full"
                  onClick={() => handleDownload(selectedImage.imageUrl)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  ダウンロード
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
