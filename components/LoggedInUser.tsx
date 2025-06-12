"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoggedInUser() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (!session || !session.user) return null;

  const user = session.user;
  const avatarUrl = user.image || "./images/logged-in-user.png"; // fallback image

  return (
    <div className="flex items-center gap-3 p-4">
      <Image
        src={avatarUrl}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <span className="text-sm font-medium text-gray-700">
        {user.name || "User"}
      </span>
    </div>
  );
}
