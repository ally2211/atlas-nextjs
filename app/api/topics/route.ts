// app/api/topics/route.ts

import { fetchTopics } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topics = await fetchTopics();

    const simplified = topics.map((t) => ({
      id: t.id,
      title: t.title,
    }));

    return NextResponse.json(simplified);
  } catch (err) {
    console.error("Error in /api/topics:", err);
    return NextResponse.json(
      { error: "Unable to fetch topics" },
      { status: 500 }
    );
  }
}
