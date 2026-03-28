import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AppLayoutHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <Link href="/dashboard" className="text-xl font-bold text-slate-900">
          AI SaaS
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/dashboard" className="hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/generate" className="hover:text-slate-900">
            {" "}
            Generate
          </Link>
          <Link href="/history" className="hover:text-slate-900">
            History
          </Link>
          <Link href="/pricing" className="hover:text-slate-900">
            Pricing
          </Link>
          <UserButton />
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
