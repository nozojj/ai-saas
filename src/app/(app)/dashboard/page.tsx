import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/user";
import Link from "next/link";

export default async function DashboardPage() {
  const dbUser = await getDbUser();

  if (!dbUser) {
    return <div className="p-6 text-black">ログインしてください</div>;
  }

  const recentImages = await prisma.imageGeneration.findMany({
    where: {
      userId: dbUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-600 sn:text-base">
          画像生成の状況と残りのクレジットを確認できます
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <p className="text-sm font-medium text-slate-500 ">
            残りのクレジット
          </p>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-5xl font-bold text-slate-900">
              {dbUser.credits}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            画像を一回生成するごとにクレジット1を消費します
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Button asChild>
              <Link href="/generate">画像を生成する</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">クレジットを購入する</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">アカウント情報</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">メール</p>
              <p className="mt-1 break-all">{dbUser.email}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-500">プラン</p>
              <p className="mt-1">{dbUser.subscriptionStatus}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl corder bg-white p-6shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              最近の生成履歴
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              直近で生成した画像を表示しています
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/history">すべて見る</Link>
          </Button>
        </div>
        {recentImages.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed p-8 text-center text-sm text-slate-500">
            まだ画像がありません
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {recentImages.map((image) => (
              <div key={image.id} className="rounded-xl border bg-slate-50 p-4">
                <p className="line-clamp-2 text-sm font-medium text-slate-800">
                  {image.prompt}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {new Date(image.createdAt).toLocaleString("ja-JP")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
