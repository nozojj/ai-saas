import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/user";
import Link from "next/link";

type DashboardPageProps = {
  searchParams: Promise<{ payment?: string }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  const dbUser = await getDbUser();

  if (!dbUser) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h2 className="text-xl font-semibold">ログインが必要です</h2>
        <p className="text-sm  text-slate-500">
          このページを利用するにはログインしてください
        </p>
        <Button asChild>
          <Link href="/sign-in">ログインする</Link>
        </Button>
      </div>
    );
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
      {params.payment === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          クレジット購入が完了しまた
        </div>
      )}

      {params.payment === "cancel" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          購入がキャンセルされました
        </div>
      )}

      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            画像生成の状況と残りのクレジットを確認できます
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                <div
                  key={image.id}
                  className="rounded-xl border bg-slate-50 p-4"
                >
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
    </div>
  );
}
