"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PricingJPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: "basic" | "pro") => {
    try {
      setLoadingPlan(plan);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
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
      setLoadingPlan(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Pricing
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          必要なクレジットを購入して画像生成を続けられます
        </p>
      </div>

      <div className="grid  grid-cols-1 gap-6 md:text-cols-2">
        <div className="rounded-2xl corder bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">Basic</p>
            <h2 className="text-3xl font-cold txt-slate-900">¥500</h2>
            <p className="text-sm text-slate-600">100 credits</p>
          </div>

          <ul className="mt-6 space-y-3 tet-sm text-slate-600">
            <li>・画像生成用クレジット100枚</li>
            <li>・買い切りプラン</li>
            <li>・まず試したい人向け</li>
          </ul>
          <Button
            className="mt-8 w-full"
            onClick={() => handleCheckout("basic")}
            disabled={loadingPlan === "basic"}
          >
            {loadingPlan === "basic" ? "Loading..." : "Buy Basic"}
          </Button>
        </div>

        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-sm">
          <div className="md-3 inline-block rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
            Recommended
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">Pro</p>
            <h2 className="text-3xl font-bold text-slate-900">¥1,500</h2>
            <p className="text-sm text-slate-600">500 credits</p>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>・画像生成用クレジット500枚</li>
            <li>・Basicよりお得</li>
            <li>・継続して使いたい人向け</li>
          </ul>
          <Button className="mt-8 w-full"
          onClick={() => handleCheckout("pro")} 
          disabled={loadingPlan === "pro"}>
           {loadingPlan === "pro" ?  "Loading..." : "Buy Pro"}
          </Button>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm opacity-80">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">Premium</p>
            <h2 className="text-3xl font-bold text-slate-900">Coming Soon</h2>
            <p className="text-sm text-slate-600">More credits / More features</p>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li>・さらに多いクレジット</li>
            <li>・将来的な拡張用</li>
            <li>・近日追加予定</li>
          </ul>

          <Button className="mt-8 w-full" disabled>
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
}
