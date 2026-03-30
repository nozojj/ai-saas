"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AppLayoutHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/generate", label: "Generate" },
    { href: "/history", label: "History" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          {/* 上段 */}
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="text-xl font-bold text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              AI SaaS
            </Link>

            <div className="flex items-center gap-3">
              {/* PC用 UserButton */}
              <div className="hidden sm:block">
                <UserButton />
              </div>

              {/* スマホ用 ハンバーガー */}
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-md border p-2 text-slate-700 hover:bg-slate-100 sm:hidden"
                aria-label="メニューを開く"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12h16" />
                    <path d="M4 6h16" />
                    <path d="M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* PC用 nav */}
          <nav className="mt-4 hidden items-center gap-6 text-sm font-medium sm:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`pb-1 transition-all duration-200 ${
                    isActive
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* スマホ用 開閉メニュー */}
          {isOpen && (
            <div className="mt-4 rounded-xl border bg-white p-4 shadow-sm sm:hidden">
              <nav className="flex flex-col gap-3 text-sm font-medium">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-md px-3 py-2 transition-all duration-200 ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4 border-t pt-4">
                <UserButton />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
