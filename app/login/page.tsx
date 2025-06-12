"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <button
        onClick={() => signIn("github", { callbackUrl: "/ui" })}
        className="w-full bg-black text-white py-2 px-4 rounded mb-3"
      >
        Sign in with GitHub
      </button>

      <button
        onClick={() => signIn("credentials", { callbackUrl: "/ui" })}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded"
      >
        Sign in with Email/Password
      </button>
    </div>
  );
}
