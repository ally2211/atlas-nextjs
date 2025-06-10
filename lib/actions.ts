"use server";

import { revalidatePath } from "next/cache";
import { incrementVotes, insertQuestion, insertTopic, insertAnswer, updateAcceptedAnswer} from "./data";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

export async function addTopic(data: FormData) {
  let topic;
  try {
    topic = await insertTopic({
      title: data.get("title") as string,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add topic.");
  } finally {
    revalidatePath("/ui/topics/[id]", "page");
    topic && redirect(`/ui/topics/${topic.id}`);
  }
}

export async function addQuestion(question: FormData) {
  try {
    insertQuestion({
      title: question.get("title") as string,
      topic_id: question.get("topic_id") as string,
      votes: 0,
    });
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add question.");
  }
}

export async function addVote(data: FormData) {
  try {
    incrementVotes(data.get("id") as string);
    revalidatePath("/ui/topics/[id]", "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add vote.");
  }
}

export async function submitAnswer(answer: FormData) {
  try {
    await insertAnswer({
      text: answer.get("text") as string,
      question_id: answer.get("question_id") as string,
      is_accepted: false,
    });

    revalidatePath(`/ui/questions/${answer.get("question_id")}`, "page");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to submit answer.");
  }
}

export async function markAnswerAsAccepted(formData: FormData) {
  const answer_id = formData.get("answer_id") as string;
  const question_id = formData.get("question_id") as string;

  if (!answer_id || !question_id) return;

  try {
    
    revalidatePath(`/ui/questions/${question_id}`, "page");
  } catch (error) {
    console.error("Action Error:", error);
    throw new Error("Failed to mark accepted answer.");
  }
}