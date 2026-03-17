import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/user";
import { create } from "domain";
import Image from "next/image";

export default async function HistoryPage() {
  const dbUser = await getDbUser();

  if (!dbUser) {
    return <div>ログインしてください</div>;
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
    <div>
      <h1>History</h1>
      {images.map((image) => (
        <div key={image.id}>
          <p>{image.prompt}</p>
          <Image src={image.imageUrl} alt={image.prompt} width={200} height={200} />
        </div>
      ))}
    </div>
  );
}
