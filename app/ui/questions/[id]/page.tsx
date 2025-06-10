import { fetchAnswers, fetchQuestion, markAnswerAsAccepted, updateAcceptedAnswer } from "@/lib/data";
import { AnswerForm } from "@/components/AnswerForm";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const dynamicParams = true;

export default async function QuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const questionId = params.id;
  const question = await fetchQuestion(questionId);
  const answers = await fetchAnswers(questionId);

  if (!question) {
    return <div className="p-4 text-red-600">Question not found.</div>;
  }

  const accepted = answers.find((a) => a.is_accepted);
  const others = answers.filter((a) => !a.is_accepted);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{question.title}</h1>

      <AnswerForm questionId={questionId} />

      <div className="mt-8">
        {accepted && (
          <div className="border p-4 rounded bg-green-100 mb-4">
            <p>{accepted.text}</p>
            <div className="text-green-600 text-sm mt-2 flex items-center">
              <CheckCircleIcon className="h-4 w-4 mr-1" />
              Accepted Answer
            </div>
          </div>
        )}

        {others.map((answer) => (
          <div key={answer.id} className="border p-4 rounded mb-4 bg-white">
            <p>{answer.text}</p>
            <form action={markAnswerAsAccepted} className="mt-2">
              <input type="hidden" name="answer_id" value={answer.id} />
              <input type="hidden" name="question_id" value={questionId} />
              <button
                type="submit"
                className="text-blue-600 text-sm flex items-center hover:underline"
              >
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Mark as Accepted
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
