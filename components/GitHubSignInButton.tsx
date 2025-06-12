"use client";
import { signIn } from "next-auth/react";

export default function GitHubSignInButton() {
  return (
    <button
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center"
      type="button"
    >
      Sign in with GitHub
    </button>
  );
}
