import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AppLayoutHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">AI SaaS</h1>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/generate"> Generate</Link>
          <Link href="/history">History</Link>
          <Link href="/pricing">Pricing</Link>
          <UserButton />
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-6">{children}</main>
    </div>
  );
}
