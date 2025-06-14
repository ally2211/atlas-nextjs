// src/components/LoggedInUser.tsx
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoggedInUser() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  const name = session.user.name || "Anonymous";
  const avatar = session.user.image || "/profile.png"; // Add this image to your public folder

  return (
    <div className="flex items-center gap-3 p-2">
      <Image
        src={avatar}
        alt="User avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}
