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
    <div>
      <div>
        <div>
          <h1></h1>
        </div>
      </div>
    </div>
  );
}
