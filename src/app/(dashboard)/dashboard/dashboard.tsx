import { getDbUser } from "@/lib/user";

export default async function DashboardPage() {
  const dbUser = await getDbUser();
  if (!dbUser) {
    return <div>ログインしてください</div>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>残りクレジット: {dbUser.credits}</p>
    </div>
  );
}
