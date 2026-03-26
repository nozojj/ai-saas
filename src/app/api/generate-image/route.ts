import { saveGenerationAndConsumeCredit } from "@/actions/generate-image";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { translatePromptIfNeeded } from "@/lib/translate-prompt";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId, isAuthenticated } = await auth();

    if (!isAuthenticated || !userId) {
      return NextResponse.json(
        {message: "許可されていません"},
        {status: 401},
      );
    }

    const { prompt } = await req.json();

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { message: "プロンプトを入力してください" },
        { status: 400 },
      );
    }

    const translatedPrompt = await translatePromptIfNeeded(prompt);

    console.log("original prompt::", prompt);
    console.log("translated prompt:", translatedPrompt);

    const formData = new FormData();
    formData.append("prompt", translatedPrompt);
    formData.append("aspect_ratio", "1:1");
    formData.append("output_format", "png");
    formData.append("model", "stable-diffusion");

    const stabilityRes = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "image/*",
        },
        body: formData,
      },
    );

    if (!stabilityRes.ok) {
      return NextResponse.json(
        { message: "画像生成に失敗しました" },
        { status: 500 },
      );
    }

    const imageArraybuffer = await stabilityRes.arrayBuffer();
    const imageBuffer = Buffer.from(imageArraybuffer);

    const fileName = `${crypto.randomUUID()}.png`;
    const filePath = `generations/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("generated-images")
      .upload(filePath, imageBuffer, {
        contentType: "image/png",
      });

    if (uploadError) {
      return NextResponse.json(
        { message: "Storageへの保存に失敗しました" },
        { status: 500 },
      );
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from("generated-images")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    await saveGenerationAndConsumeCredit({
      prompt,
      imageUrl,
    });

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "サーバーエラーが発生しました",
      },
      { status: 500 },
    );
  }
}
