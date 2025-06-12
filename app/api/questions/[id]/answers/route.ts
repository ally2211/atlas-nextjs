// app/api/questions/[id]/answers/route.ts

import { fetchAnswers } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // ✅ Extract the ID from the pathname ("/api/questions/:id/answers")
    const url = new URL(req.url);
    const segments = url.pathname.split("/");
    const questionId = segments[segments.length - 2]; // e.g., "1234"

    if (!questionId) {
      return NextResponse.json({ error: "Missing question ID" }, { status: 400 });
    }

    const answers = await fetchAnswers(questionId);

    const simplified = answers.map((a) => ({
      id: a.id,
      answer: a.answer,
      question_id: a.question_id,
    }));

    return NextResponse.json(simplified);
  } catch (error) {
    console.error("Error in /api/questions/[id]/answers:", error);
    return NextResponse.json(
      { error: "Failed to fetch answers for question" },
      { status: 500 }
    );
  }
}
