import { useState } from "react";
import { generateMCQ } from "../api";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) return;

    setLoading(true);
    const data = await generateMCQ(topic);
    setLoading(false);

    if (data) {
      setMcqs(data);
      setUserAnswers({});
      setSubmitted(false);
    }
  }

  function handleSelect(questionIndex, optionLetter) {
    setUserAnswers({ ...userAnswers, [questionIndex]: optionLetter });
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  const score = mcqs.reduce(
    (acc, q, idx) => (userAnswers[idx] === q.answer ? acc + 1 : acc),
    0
  );

  return (
    <div className="fixed inset-0 w-full h-full overflow-auto bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-4">

      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text 
      bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 text-center">
        MCQ Test Generator
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8 w-full">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic"
          className="w-full max-w-3xl border-2 border-gray-300 rounded-lg px-4 py-3 
          focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`ml-4 bg-indigo-600 text-black font-semibold px-6 py-3 
          rounded-lg shadow-md transition duration-300
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"}`}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Test"
          )}
        </button>
      </div>

      {/* Score */}
      {submitted && (
        <div className="mb-6 p-4 bg-white shadow rounded-lg text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-green-600">
            Your Score: {score} / {mcqs.length}
          </h3>
        </div>
      )}

      {/* MCQs */}
      <div className="space-y-6 w-full max-w-6xl mx-auto">
        {mcqs.map((q, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow hover:shadow-lg transition w-full
            ${submitted
              ? userAnswers[index] === q.answer
                ? "bg-green-50 border border-green-400"
                : "bg-red-50 border border-red-400"
              : "bg-white border border-gray-200"
            }`}
          >
            <h4 className="text-lg font-semibold mb-4">
              {index + 1}. {q.question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg 
                  hover:bg-gray-100 transition"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={String.fromCharCode(65 + i)}
                    disabled={submitted}
                    checked={userAnswers[index] === String.fromCharCode(65 + i)}
                    onChange={() =>
                      handleSelect(index, String.fromCharCode(65 + i))
                    }
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  <span className="text-gray-800 font-medium">
                    {opt.replace(/^[A-D]\.\s*/, "")}
                  </span>
                </label>
              ))}
            </div>

            {submitted && (
              <div className="mt-4 bg-gray-50 p-3 rounded-lg border-l-4 border-indigo-400">
                {userAnswers[index] === q.answer ? (
                  <span className="text-green-700 font-semibold">
                    Correct ✅
                  </span>
                ) : (
                  <span className="text-red-700 font-semibold">
                    Wrong ❌ — Correct: {q.answer}
                  </span>
                )}
                <p className="mt-2 text-gray-700">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {mcqs.length > 0 && !submitted && (
        <div className="text-center mt-10">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-black font-bold px-10 py-4 
            rounded-full shadow-lg hover:bg-green-700 transition duration-300"
          >
            Submit Test
          </button>
        </div>
      )}
    </div>
  );
}
