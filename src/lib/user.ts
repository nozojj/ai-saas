import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getDbUser() {
  const { userId } = await auth();

  if (!userId) return null;

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return dbUser;
}
