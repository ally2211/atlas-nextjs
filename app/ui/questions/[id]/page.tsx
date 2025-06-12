import { fetchAnswers, fetchQuestion, markAnswerAsAccepted, updateAcceptedAnswer } from "@/lib/data";
import { AnswerForm } from "@/components/AnswerForm";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

export const dynamicParams = true;

export default async function QuestionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id: questionId } = await props.params;
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

      <table className="w-full border mt-8 text-sm">
        <tbody>
          {answers.map((answer) => (
          <tr key={answer.id} className="border-b">
            <td className="p-2">
              <div className="flex items-center justify-between gap-4">
                <p>{answer.answer}</p>

                {answer.is_accepted ? (
                  <div className="text-green-600 flex items-center text-sm">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                  
                  </div>
                ) : (
                  <form action={markAnswerAsAccepted}>
                    <input type="hidden" name="answer_id" value={answer.id} />
                    <input type="hidden" name="question_id" value={questionId} />
                    <button
                      type="submit"
                      className="text-blue-600 hover:underline flex items-center text-sm"
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                     
                    </button>
                  </form>
                )}
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
