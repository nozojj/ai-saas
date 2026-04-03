import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/user";
import Link from "next/link";
import HistoryGallery from "@/components/history/history-gallery";

export default async function HistoryPage() {
  const dbUser = await getDbUser();

  if (!dbUser) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-20 text-center">
        <h2 className="text-xl font-semibold">ログインが必要です</h2>
        <p className="text-sm text-slate-500">
          このページを利用するにはログインしてください
        </p>

        <Button asChild>
          <Link href="/sign-in">ログインする</Link>
        </Button>
      </div>
    );
  }

  const images = await prisma.imageGeneration.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          History
        </h1>
        <p className="text-sm text-slate-600 sm:text-base">
          これまでに生成した画像一覧
        </p>
      </div>

      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          <p>まだ画像がありません</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/generate">画像生成する</Link>
          </Button>
        </div>
      ) : (
        <HistoryGallery images={images} />
      )}
    </div>
  );
}