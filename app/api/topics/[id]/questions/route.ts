// app/api/topics/[id]/questions/route.ts

import { fetchQuestions } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // ✅ Extract topic ID from the URL
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const topicId = segments[segments.length - 2]; // e.g., "abc123"

    if (!topicId) {
      return NextResponse.json({ error: "Missing topic ID" }, { status: 400 });
    }

    const questions = await fetchQuestions(topicId);

    const simplified = questions.map((q) => ({
      id: q.id,
      title: q.title,
      topic_id: q.topic_id,
      votes: q.votes,
    }));

    return NextResponse.json(simplified);
  } catch (error) {
    console.error("Error in /api/topics/[id]/questions:", error);
    return NextResponse.json(
      { error: "Failed to fetch questions for topic" },
      { status: 500 }
    );
  }
}
