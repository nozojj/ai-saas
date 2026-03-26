"use server";

import { CreditType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getDbUser } from "@/lib/user";

type SaveGenerationParams = {
  prompt: string;
  imageUrl: string;
};

export async function saveGenerationAndConsumeCredit({
  prompt,
  imageUrl,
}: SaveGenerationParams) {
  const dbUser = await getDbUser();
  if (!dbUser) {
    throw new Error("User not found");
  }
  if (dbUser.credits <= 0) {
    throw new Error("Not enough credits");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedUser = await tx.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });
    const creditHistory = await tx.creditHistory.create({
      data: {
        userId: dbUser.id,
        amount: -1,
        type: CreditType.USE,
      },
    });

    const imageGeneration = await tx.imageGeneration.create({
      data: {
        prompt,
        imageUrl,
        userId: dbUser.id,
      },
    });
    return {
      updatedUser,
      creditHistory,
      imageGeneration,
    };
  });
  return result;
}
