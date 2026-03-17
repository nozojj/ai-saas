import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    //ユーザーイベント
    if (evt.type === "user.created") {
      const { id, email_addresses } = evt.data;

      const email = email_addresses[0]?.email_address;

      if (!email) {
        throw new Error("Email not found");
      }

      //upsertで重複防止
      await prisma.user.upsert({
        where: {
          clerkId: id,
        },
        update: {
          email: email,
        },
        create: {
          clerkId: id,
          email: email,
          credits: 5,
          subscriptionStatus: "FREE",
        },
      });
      console.log("User saved:", email);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("webhook error:", error);
    return new NextResponse("webhook  error", { status: 400 });
  }
}
