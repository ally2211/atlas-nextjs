"use server";

import { sql } from "@vercel/postgres";
import { Question, Topic, User } from "./definitions";

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function fetchTopics() {
  try {
    const data = await sql<Topic>`SELECT * FROM topics`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string) {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id = ${id}`;
    return data.rows && data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchQuestions(id: string) {
  try {
    const data =
      await sql<Question>`SELECT * FROM questions WHERE topic_id = ${id} ORDER BY votes DESC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchQuestion(id: string) {
  const data = await sql`
    SELECT * FROM questions WHERE id = ${id} LIMIT 1
  `;
  return data.rows[0]; // Make sure this returns a single object
}


export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
) {
  try {
    const data =
      await sql<Question>`INSERT INTO questions (title, topic_id, votes) VALUES (${question.title}, ${question.topic_id}, ${question.votes})`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function insertTopic(topic: Pick<Topic, "title">) {
  try {
    const data =
      await sql<Topic>`INSERT INTO topics (title) VALUES (${topic.title}) RETURNING id;`;
    console.log(data.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  }
}

export async function incrementVotes(id: string) {
  try {
    const data =
      await sql<Question>`UPDATE questions SET votes = votes + 1 WHERE id = ${id}`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to increment votes.");
  }
}

export async function fetchAnswers(questionId: string) {
  try {
    const data = await sql`
      SELECT * FROM answers
      WHERE question_id = ${questionId}
      ORDER BY is_accepted DESC, created_at ASC
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch answers.");
  }
}

export async function insertAnswer({
  text,
  question_id,
  is_accepted = false,
}: {
  text: string;
  question_id: string;
  is_accepted?: boolean;
}) {
  await sql`
    INSERT INTO answers (text, question_id, is_accepted)
    VALUES (${text}, ${question_id}, ${is_accepted})
  `;
}

export async function updateAcceptedAnswer(answerId: string, questionId: string) {
  try {
    // Unmark all answers for this question
    await sql`
      UPDATE answers
      SET is_accepted = FALSE
      WHERE question_id = ${questionId}
    `;

    // Mark the selected answer as accepted
    await sql`
      UPDATE answers
      SET is_accepted = TRUE
      WHERE id = ${answerId}
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update accepted answer.");
  }
}

export async function markAnswerAsAccepted(formData: FormData) {
  const answerId = formData.get("answer_id") as string;
  const questionId = formData.get("question_id") as string;

  if (!answerId || !questionId) {
    throw new Error("Missing answer_id or question_id");
  }

  await updateAcceptedAnswer(answerId, questionId);
}