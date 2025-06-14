// app/(auth)/login/page.tsx
"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Login</h1>

      <button
        onClick={() => signIn("github", { callbackUrl: "/ui" })}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}