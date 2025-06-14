"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoggedInUser() {
  const { data: session } = useSession();
  const user = session?.user;

  const name = user?.name || "Test User";
  const avatar = user?.image;

  return (
    <div className="flex items-center gap-3 p-2">
      {avatar ? (
        <Image
          src={avatar}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0" />
      )}
      <span className="text-sm font-medium text-gray-800">{name}</span>
    </div>
  );
}
