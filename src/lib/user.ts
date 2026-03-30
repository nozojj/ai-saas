import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getDbUser() {
  const { userId } = await auth();

  if (!userId) return null;

  let dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (dbUser) return dbUser;

  const client = await clerkClient();
  const clerkUser = await client.users.getUser(userId);

  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) return null;

  dbUser = await prisma.user.upsert({
    where: {
      email: email,
    },
    update: {
      clerkId: userId,
    },
    create: {
      clerkId: userId,
      email,
    },
  });

  return dbUser;
}
