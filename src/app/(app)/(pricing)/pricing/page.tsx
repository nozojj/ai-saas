"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PricingJPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: "basic" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? "Checkoutに失敗しました");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading}>
      {loading ? "Loading..." : "Buy 100 Credits"}
    </Button>
  );
}

