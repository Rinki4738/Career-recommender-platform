import { useState } from "react";
import { generateMCQ } from "../api";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Generate MCQs
  async function handleGenerate() {
    const data = await generateMCQ(topic); // make sure your API generates 50
    if (data) {
      setMcqs(data);
      setUserAnswers({});
      setSubmitted(false);
    }
  }

  // User selects an option (store letter only: A, B, C, D)
  function handleSelect(questionIndex, optionLetter) {
    setUserAnswers({ ...userAnswers, [questionIndex]: optionLetter });
  }

  // Submit test
  function handleSubmit() {
    setSubmitted(true);
  }

  // Calculate score
  const score = mcqs.reduce(
    (acc, q, idx) => (userAnswers[idx] === q.answer ? acc + 1 : acc),
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>MCQ Test Generator</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic"
        style={{ padding: "8px", width: "300px" }}
      />
      <button onClick={handleGenerate} style={{ marginLeft: "10px" }}>
        Generate Test
      </button>

      {/* Show score after submission */}
      {submitted && (
        <h3 style={{ marginTop: "20px", color: "#007bff" }}>
          Your Score: {score} / {mcqs.length}
        </h3>
      )}

      {/* MCQs */}
      <div style={{ marginTop: "20px" }}>
        {mcqs.map((q, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "20px",
              backgroundColor: submitted
                ? userAnswers[index] === q.answer
                  ? "#d4edda" // green
                  : "#f8d7da" // red
                : "white",
            }}
          >
            <h4>
              {index + 1}. {q.question}
            </h4>

            {/* Options */}
            <div>
              {q.options.map((opt, i) => (
                <label key={i} style={{ display: "block", marginTop: "5px" }}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={String.fromCharCode(65 + i)} // A, B, C, D
                    disabled={submitted}
                    checked={userAnswers[index] === String.fromCharCode(65 + i)}
                    onChange={() =>
                      handleSelect(index, String.fromCharCode(65 + i))
                    }
                  />{" "}
                  {opt.replace(/^[A-D]\.\s*/, "")}
                </label>
              ))}
            </div>

            {/* Explanation */}
            {submitted && (
              <div style={{ marginTop: "10px" }}>
                {userAnswers[index] === q.answer ? (
                  <span style={{ color: "green" }}>Correct ✅</span>
                ) : (
                  <span style={{ color: "red" }}>
                    Wrong ❌ — Correct: {q.answer}
                  </span>
                )}
                <p>
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {mcqs.length > 0 && !submitted && (
        <button
          onClick={handleSubmit}
          style={{ padding: "10px 20px", marginTop: "20px" }}
        >
          Submit Test
        </button>
      )}
    </div>
  );
}
