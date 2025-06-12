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
  } catch (error) {
    console.error("Error in /api/topics:", error);
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    );
  }
}
