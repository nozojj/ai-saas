import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/user";
import Image from "next/image";

export default async function HistoryPage() {
  const dbUser = await getDbUser();

  if (!dbUser) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        ログインしてください
      </div>
    );
  }

  const images = await prisma.imageGeneration.findMany({
    where: {
      userId: dbUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight tet-slate-900">History</h1>
        <p className="text-sm text-slate-600 sm:text-base">
          これまでに生成した画像一覧
        </p>
      </div>

      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          まだ画像がありません
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-y-1 hover:shadow-md"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.imageUrl}
                  alt={image.prompt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-4">
                <p className="line-clamp-2 text-sm font-medium text-slate-800">
                  {image.prompt}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(image.createdAt).toLocaleString("ja-JP")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
