// components/GitHubLoginButton.tsx
"use client";

import { signIn } from "next-auth/react";

export default function GitHubLoginButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/ui" })}
      className="inline-flex h-10 items-center justify-center rounded-md bg-black text-white px-8 text-sm font-medium shadow transition-colors hover:bg-gray-800"
    >
      Sign in with GitHub
    </button>
  );
}
