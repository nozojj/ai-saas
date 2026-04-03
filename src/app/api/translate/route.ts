import { NextResponse } from "next/server";
import { translatePromptIfNeeded } from "@/lib/translate-prompt";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { message: "promptが必要です" },
        { status: 400 },
      );
    }

    const translatedPrompt = await translatePromptIfNeeded(prompt);

    return NextResponse.json({ prompt: translatedPrompt });
  } catch (error) {
    console.error("Translate error:", error);

    return NextResponse.json(
      { message: "翻訳に失敗しました" },
      { status: 500 },
    );
  }
}