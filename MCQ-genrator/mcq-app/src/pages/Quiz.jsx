import { useState } from "react";

export default function Quiz({ mcqs, setScore, setStep }) {
  const [answers, setAnswers] = useState({});

  function submit() {
    let sc = 0;

    mcqs.forEach((q, i) => {
      if (answers[i] === q.answer) sc++;
    });

    setScore(sc);
    setStep("result");
  }

  return (
    <div>
      <h1>Quiz</h1>

      {mcqs.map((q, i) => (
        <div key={i}>
          <h3>{q.question}</h3>

          {q.options.map((op, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={`q${i}`}
                value={op}
                onChange={() => setAnswers({ ...answers, [i]: op })}
              />
              {op}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submit}>Submit</button>
    </div>
  );
}
