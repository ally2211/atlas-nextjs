"use client";

import { submitAnswer } from "@/lib/actions";
import { useState } from "react";

export function AnswerForm({ questionId }: { questionId: string }) {
  const [text, setText] = useState("");

  return (
    <form
      action={async (formData) => {
        await submitAnswer(formData);
        setText(""); // clear input after submit
      }}
      className="flex flex-col gap-2 my-6"
    >
      <input type="hidden" name="question_id" value={questionId} />
      <textarea
        name="text"
        placeholder="Write your answer..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full min-h-[100px]"
        required
      />
      <button
        type="submit"
        className="self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Answer
      </button>
    </form>
  );
}
