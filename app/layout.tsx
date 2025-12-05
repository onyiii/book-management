"use client";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = localStorage.getItem("bm_user");
    if (u) setUser(JSON.parse(u));
  }, []);

  function logout() {
    localStorage.removeItem("bm_user");
    setUser(null);
    location.href = "/";
  }

  return (
    <html lang="en">
      <head />
      <body>
        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold">
              Dominion City VI Library
            </Link>
            <nav className="space-x-4">
              <Link href="/">Home</Link>
              {!user && <Link href="/signup">Sign up</Link>}
              {!user && <Link href="/login">Log in</Link>}
              {user?.role === "admin" && <Link href="/admin">Admin</Link>}
              {user && (
                <button
                  onClick={logout}
                  className="ml-2 py-1 px-3 rounded border"
                >
                  Log out
                </button>
              )}
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
