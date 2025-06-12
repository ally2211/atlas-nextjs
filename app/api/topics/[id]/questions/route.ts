// app/api/topics/[id]/questions/route.ts

import { fetchQuestions } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = params.id;

    const questions = await fetchQuestions(topicId);

    const simplified = questions.map((q) => ({
      id: q.id,
      title: q.title,
      topic_id: q.topic_id,  // Adjust key to match your database field name
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
