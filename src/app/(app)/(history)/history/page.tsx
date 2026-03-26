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
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="p-6 text-sm text-muted-foreground">これまでに生成した画像一覧</p>
      </div>

      {images.length === 0 ? (
        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
          まだ画像がありません
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl border bg-background shadow-sm"
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
                <p className="line-clamp-2 text-sm font-medium">
                  {image.prompt}
                </p>
                <p className="text-xs text-muted-foreground">
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
