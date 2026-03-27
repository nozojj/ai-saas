import { stripe } from "@/lib/stripe";
import { getDbUser } from "@/lib/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const PRICE_MAP = {
  basic: {
    priceId: "price_1TFUsG1W3YqPTWduVJZC37U0",
    creditsToAdd: 100,
  },
} as const;

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "許可されいません" },
        { status: 401 },
      );
    }
    const dbUser = await getDbUser();

    if (!dbUser) {
      return NextResponse.json(
        {
          message: "User not Found",
        },
        {
          status: 404,
        },
      );
    }

    const { plan } = await req.json();

    if (!plan || !(plan in PRICE_MAP)) {
      return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
    }
    const selectedPlan = PRICE_MAP[plan as keyof typeof PRICE_MAP];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

    if(!appUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL is not set")
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price: selectedPlan.priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/dashboard?payment=success`,
      cancel_url: `${appUrl}/pricing?payment=cancel`,

      client_reference_id: dbUser.id,

      customer_email: dbUser.email,

      metadata: {
        userId: dbUser.id,
        creditsToAdd: String(selectedPlan.creditsToAdd),
        plan,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Checkout sessionの作成に失敗しました",
      },
      {
        status: 500,
      },
    );
  }
}
