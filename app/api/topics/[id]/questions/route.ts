// app/api/topics/[id]/questions/route.ts

import { fetchQuestions } from "@/lib/data";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const topicId = context.params.id;

    const questions = await fetchQuestions(topicId);

    const simplified = questions.map((q) => ({
      id: q.id,
      title: q.title,
      topic_id: q.topic_id, // or q.topicId if camelCase
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
