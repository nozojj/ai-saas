"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "画像生成に失敗しました");
      }

      setImage(data.imageUrl);
      setPrompt("");
      toast.success("画像が生成されました");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "エラーが発生しました",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-cold tracking-tight text-slate-900">
            generate
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            プロンプトを入力してAI画像を生成します
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="prompt"
              className="text-sm font-medium text-slate-700"
            >
              プロンプト
            </Label>
            <Textarea
              className="min-h-32 w-full rounded-md border px-3 py-2 text-sm outline-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例: a cat reading a book  on the beach"
            />
          </div>

          <Button
            className="w-full sm:w-auto"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
          >
            {loading ? "生成中..." : "画像生成する"}
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6shadow-sm">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">生成結果</h2>
          <p className="text-sms text-slate-600">
            生成された画像がここに表示されます
          </p>
        </div>

        <div className="mt-6">
          {image ? (
            <div className="overflow-hidden rounded-2xl border">
              <div className="relative aspect-square w-full">
                <Image
                  src={image}
                  alt="Generated"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed bg-slate-50 text-sm text-slate-500">
              まだ画像が生清されていません
            </div>
          )}
          ;
        </div>
      </div>
    </div>
  );
}
