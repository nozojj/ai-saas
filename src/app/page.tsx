import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-4">
        <SignInButton mode="modal" forceRedirectUrl="/dashboard">
          <Button variant="outline">ログイン</Button>
        </SignInButton>

        <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
          <Button variant="outline">新規登録</Button>
        </SignUpButton>
      </div>
    </div>
  );
}
