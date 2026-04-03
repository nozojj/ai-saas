import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          AI Image Generator SaaS
        </h1>
        <p className="text-lg text-slate-600">
          プロンプトを入力するだけでAIが画像を生成します。
          <br />
          クレジット制で簡単に使える画像生成サービス
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {userId ? (
            <>
            <Button asChild size="lg">
              <Link href="/dashboard">ダッシュボードへ</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/generate">画像生成する</Link>
            </Button>
            </>
          ) : (
            <>
              <Button asChild size="lg">
                <Link href="/sign-up">無料で始める</Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/sign-in">ログイン</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="mb-3 text-2xl">✨</div>
          <h3 className="text-lg font-semibold text-slate-900">簡単操作</h3>
          <p className="mt-2 text-sm  text-slate-600">
            プロンプトを入力するだけで画像生成
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">高品質AI</h3>
          <p className="mt-2 text-sm text-slate-600">
            Stability AIによる画像生成
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">クレジット制</h3>
          <p className="mt-2 text-sm text-slate-600">
            必要な分だけ購入して利用可能
          </p>
        </div>
      </div>
    </div>
  );
}
