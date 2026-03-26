"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (loading) return;
    try {
      if (!prompt.trim()) {
        toast.error("プロンプトを入力してください");
        return;
      }

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
    <div className="flex flex-col gap-4 max-w-md">
      <input
        className="border p-2 rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="画像にキーワードを入力してください"
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>
      {image && (
        <Image
          src={image}
          alt="Generated"
          width={300}
          height={300}
          className="rounded-lg mt-4"
        />
      )}
    </div>
  );
}
