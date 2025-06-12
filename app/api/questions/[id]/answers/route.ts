import { fetchAnswers } from "@/lib/data";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const questionId = params.id;

    const answers = await fetchAnswers(questionId);

    const simplified = answers.map((a) => ({
      id: a.id,
      answer: a.answer,
      question_id: a.question_id, // or questionId if camelCase
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
