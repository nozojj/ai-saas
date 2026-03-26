
import { getDbUser } from "@/lib/user";

export default async function DashboardPage() {
  const dbUser = await getDbUser();
  if (!dbUser) {
    return 
    <div className="p-6">
      ログインしてください
    </div>;
  }
  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">現在のクレジット</p>
        <p className="text-3xl font-bold">{dbUser.credits}</p>
      </div>

      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">メールアドレス</p>
        <p>{dbUser.email}</p>
      </div>

      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">プラン</p>
        <p>{dbUser.subscriptionStatus}</p>
      </div>
    </div>
  );
  
}
